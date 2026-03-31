import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, addDoc, onSnapshot, query, orderBy, where, serverTimestamp, doc, updateDoc } from 'firebase/firestore';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [orders, setOrders] = useState([]);
    const [tableNumber, setTableNumber] = useState('');
    const { user } = useAuth();

    // Load Cart from LocalStorage (Keep Cart Local until ordered)
    useEffect(() => {
        const savedCart = localStorage.getItem('friends_cart');
        if (savedCart) setCart(JSON.parse(savedCart));
    }, []);

    useEffect(() => {
        localStorage.setItem('friends_cart', JSON.stringify(cart));
    }, [cart]);

    // Real-time Orders Listener (Firestore)
    useEffect(() => {
        if (!user) {
            setOrders([]);
            return;
        }

        let q;
        if (user.role === 'chef') {
            // Chef sees ALL orders
            q = query(collection(db, "orders"));
        } else {
            // Customers see ONLY their orders
            // Note: We filter by userId. If we also added orderBy('createdAt') here,
            // Firestore would require a composite index. To keep it simple for now,
            // we'll fetch unordered and sort in the client JS below.
            q = query(collection(db, "orders"), where("userId", "==", user.uid));
        }

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const ordersData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            // Sort by createdAt descending (newest first)
            // Handle both Firestore Timestamps and ISO strings if mixed
            ordersData.sort((a, b) => {
                const dateA = a.createdAt?.toDate ? a.createdAt.toDate() : new Date(a.createdAt);
                const dateB = b.createdAt?.toDate ? b.createdAt.toDate() : new Date(b.createdAt);
                return dateB - dateA;
            });

            setOrders(ordersData);
        }, (error) => {
            console.error("Error fetching orders:", error);
        });

        return () => unsubscribe();
    }, [user]);

    const addToCart = (product) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find((item) => item.id === product.id);
            if (existingItem) {
                return prevCart.map((item) =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prevCart, { ...product, quantity: 1 }];
        });
    };

    const removeFromCart = (productId) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
    };

    const updateQuantity = (productId, delta) => {
        setCart((prevCart) =>
            prevCart.map((item) => {
                if (item.id === productId) {
                    const newQty = Math.max(1, item.quantity + delta);
                    return { ...item, quantity: newQty };
                }
                return item;
            })
        );
    };

    const clearCart = () => {
        setCart([]);
        setTableNumber('');
    };

    const placeOrder = async (orderDetails) => {
        if (!user) throw new Error("You must be logged in to place an order");

        const orderData = {
            ...orderDetails,
            items: [...cart],
            userId: user.uid,
            customerEmail: user.email,
            customerName: user.name || 'Anonymous',
            createdAt: serverTimestamp(), // Use Firestore Server Timestamp
            date: new Date().toLocaleString(), // Keep readable string for easy display
            status: 'Pending',
            tableNumber: tableNumber || 'N/A'
        };

        // Add to Firestore
        const docRef = await addDoc(collection(db, "orders"), orderData);

        // Return local version immediately for UI feedback if needed, 
        // though the onSnapshot will update the list shortly.
        const newOrder = { ...orderData, id: docRef.id };

        clearCart();
        return newOrder;
    };

    const updateOrderStatus = async (orderId, newStatus) => {
        if (!user || user.role !== 'chef') throw new Error("Unauthorized");

        try {
            const orderRef = doc(db, "orders", orderId);
            await updateDoc(orderRef, {
                status: newStatus
            });
        } catch (error) {
            console.error("Error updating order:", error);
            throw error;
        }
    };

    const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const tax = subtotal * 0.05; // 5% tax
    const total = subtotal + tax;

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                subtotal,
                tax,
                total,
                orders,
                placeOrder,
                updateOrderStatus,
                tableNumber,
                setTableNumber
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
