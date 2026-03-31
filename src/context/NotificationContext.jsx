import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { useCart } from './CartContext';
import { useAuth } from './AuthContext';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
    const { orders } = useCart();
    const { user } = useAuth();
    const [notifications, setNotifications] = useState(() => {
        const saved = localStorage.getItem('notifications');
        return saved ? JSON.parse(saved) : [];
    });
    const previousOrdersRef = useRef({});

    useEffect(() => {
        localStorage.setItem('notifications', JSON.stringify(notifications));
    }, [notifications]);

    useEffect(() => {
        if (!user) return;

        const currentOrdersMap = {};

        orders.forEach(order => {
            currentOrdersMap[order.id] = order;

            const prevOrder = previousOrdersRef.current[order.id];

            // Only notify if we have seen this order before and status changed
            if (prevOrder && prevOrder.status !== order.status) {
                if (order.status === 'Prepared') {
                    addNotification({
                        title: 'Food Prepared 👨‍🍳',
                        message: `Your order including ${order.items.map(i => i.name).slice(0, 2).join(', ')}${order.items.length > 2 ? '...' : ''} is now prepared!`,
                        type: 'success',
                        timestamp: new Date().toISOString()
                    });
                } else if (order.status === 'Served') {
                    addNotification({
                        title: 'Order Served 🍽️',
                        message: `Your order #${order.id.slice(0, 6)} has been served. Bon appétit!`,
                        type: 'info',
                        timestamp: new Date().toISOString()
                    });
                }
            }
        });

        // Update ref for next render
        previousOrdersRef.current = currentOrdersMap;
    }, [orders, user]);

    const addNotification = (notif) => {
        const newNotif = {
            id: Date.now(),
            read: false,
            ...notif
        };
        setNotifications(prev => [newNotif, ...prev]);
    };

    const markAsRead = (id) => {
        setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
    };

    const markAllAsRead = () => {
        setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    };

    const unreadCount = notifications.filter(n => !n.read).length;

    return (
        <NotificationContext.Provider value={{ notifications, unreadCount, markAsRead, markAllAsRead, addNotification }}>
            {children}
        </NotificationContext.Provider>
    );
};

export const useNotification = () => useContext(NotificationContext);
