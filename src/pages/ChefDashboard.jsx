
import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { ChefHat, Clock, CheckCircle, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import { db } from '../firebase';
import { collection, getCountFromServer, onSnapshot, query, orderBy } from 'firebase/firestore';

const ChefDashboard = () => {
    const { orders, updateOrderStatus } = useCart();
    const [userCount, setUserCount] = useState(0);
    const [feedbacks, setFeedbacks] = useState([]);
    const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);

    const handleStatusUpdate = async (orderId, status) => {
        await updateOrderStatus(orderId, status);
    };

    // Calculate Stats
    const stats = orders.reduce((acc, order) => {
        order.items.forEach(item => {
            acc.itemCounts[item.name] = (acc.itemCounts[item.name] || 0) + item.quantity;
            if (item.category) {
                acc.categoryCounts[item.category] = (acc.categoryCounts[item.category] || 0) + item.quantity;
            }
        });
        return acc;
    }, { itemCounts: {}, categoryCounts: {} });

    const popularItems = Object.entries(stats.itemCounts)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 5);

    const activeOrders = orders.filter(o => o.status !== 'Served');

    // Sort all orders for the history modal
    const allOrdersHistory = [...orders].sort((a, b) => {
        const dateA = typeof a.date === 'string' ? new Date(a.date) : new Date(a.date?.seconds * 1000);
        const dateB = typeof b.date === 'string' ? new Date(b.date) : new Date(b.date?.seconds * 1000);
        return dateB - dateA;
    });

    useEffect(() => {
        const fetchUserCount = async () => {
            try {
                const coll = collection(db, "users");
                const snapshot = await getCountFromServer(coll);
                setUserCount(snapshot.data().count);
            } catch (err) {
                console.error("Error fetching user count", err);
            }
        };
        fetchUserCount();

        // Subscribe to feedbacks
        const q = query(collection(db, "feedback"), orderBy("createdAt", "desc"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const feedbackData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setFeedbacks(feedbackData);
        });

        return () => unsubscribe();
    }, []);

    const totalSales = orders.reduce((acc, order) => {
        // Assume order.totalAmount exists, or calculate if needed. 
        // In CartContext provided earlier, 'subtotal' etc were calculated but maybe not stored directly in 'orders' object unless 'placeOrder' added it.
        // Let's check 'placeOrder' in CartContext... it added '...orderDetails'.
        // If orderDetails had the total, good. If not, we might need to sum items.
        // But let's assume valid 'total' or sum items.price * quantity
        const orderTotal = order.total || order.items?.reduce((sum, i) => sum + (Number(i.price) * i.quantity), 0) || 0;
        return acc + orderTotal;
    }, 0);

    const [isSalesModalOpen, setIsSalesModalOpen] = useState(false);
    const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);

    // Flatten all sales for the modal
    const allSales = orders.flatMap(order =>
        order.items.map(item => ({
            ...item,
            orderDate: typeof order.date === 'string' ? order.date : new Date(order.date?.seconds * 1000).toLocaleString(),
            orderId: order.id,
            totalPrice: item.price * item.quantity
        }))
    ).sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 md:mb-12">
                <div>
                    <h1 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight flex items-center gap-3 md:gap-4">
                        Kitchen <span className="text-primary-600">Dashboard</span>
                        <ChefHat size={32} className="text-primary-600 md:w-10 md:h-10" />
                    </h1>
                    <p className="text-gray-500 font-medium mt-2 text-sm md:text-base">Manage incoming orders and food preparation</p>
                </div>



                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                    <div className="bg-orange-50 border border-orange-100 rounded-2xl md:rounded-3xl px-4 py-3 md:px-6 md:py-4">
                        <p className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Active</p>
                        <p className="text-xl md:text-2xl font-black text-primary-600">{activeOrders.length}</p>
                    </div>
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setIsHistoryModalOpen(true)}
                        className="bg-green-50 border border-green-100 rounded-2xl md:rounded-3xl px-4 py-3 md:px-6 md:py-4 cursor-pointer hover:shadow-lg transition-all"
                    >
                        <p className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-widest mb-1 flex items-center gap-1">
                            Total Orders <span className="bg-green-200 text-green-700 px-1 py-0.5 rounded text-[8px]">VIEW</span>
                        </p>
                        <p className="text-xl md:text-2xl font-black text-green-600">{orders.length}</p>
                    </motion.div>
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setIsSalesModalOpen(true)}
                        className="bg-blue-50 border border-blue-100 rounded-2xl md:rounded-3xl px-4 py-3 md:px-6 md:py-4 cursor-pointer hover:shadow-lg transition-all"
                    >
                        <p className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-widest mb-1 flex items-center gap-1">
                            Total Sales <span className="bg-blue-200 text-blue-700 px-1 py-0.5 rounded text-[8px]">VIEW</span>
                        </p>
                        <p className="text-xl md:text-2xl font-black text-blue-600">₹{totalSales.toLocaleString()}</p>
                    </motion.div>
                    <div className="bg-purple-50 border border-purple-100 rounded-2xl md:rounded-3xl px-4 py-3 md:px-6 md:py-4">
                        <p className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Users</p>
                        <p className="text-xl md:text-2xl font-black text-purple-600">{userCount}</p>
                    </div>
                </div>

                <div
                    onClick={() => setIsFeedbackModalOpen(true)}
                    className="mt-6 bg-gradient-to-r from-pink-500 to-rose-500 rounded-3xl p-1 cursor-pointer hover:shadow-xl hover:scale-[1.01] transition-all group"
                >
                    <div className="bg-white rounded-[1.4rem] p-6 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center text-rose-600">
                                <span className="text-2xl">💬</span>
                            </div>
                            <div>
                                <h3 className="text-lg font-black text-gray-900 group-hover:text-rose-600 transition-colors">Customer Feedback</h3>
                                <p className="text-sm text-gray-500 font-medium">{feedbacks.length} reviews received</p>
                            </div>
                        </div>
                        <div className="flex -space-x-2">
                            {feedbacks.slice(0, 3).map((f, i) => (
                                <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-500 overflow-hidden" title={f.userName}>
                                    {f.userName.charAt(0)}
                                </div>
                            ))}
                            {feedbacks.length > 3 && (
                                <div className="w-10 h-10 rounded-full border-2 border-white bg-gray-50 flex items-center justify-center text-xs font-bold text-gray-500">
                                    +{feedbacks.length - 3}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Order History Modal */}
            <AnimatePresence>
                {isHistoryModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="bg-white rounded-[2.5rem] w-full max-w-4xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden"
                        >
                            <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                                <div>
                                    <h2 className="text-2xl font-black text-gray-900">Order History</h2>
                                    <p className="text-gray-500 text-sm font-medium">Complete list of all orders placed</p>
                                </div>
                                <button
                                    onClick={() => setIsHistoryModalOpen(false)}
                                    className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition-colors"
                                >
                                    ✕
                                </button>
                            </div>

                            <div className="overflow-y-auto p-6 flex-1">
                                <table className="w-full text-left text-sm">
                                    <thead>
                                        <tr className="border-b-2 border-gray-100 text-gray-400 uppercase text-[10px] tracking-widest">
                                            <th className="pb-4 pl-2">Date</th>
                                            <th className="pb-4">Order ID</th>
                                            <th className="pb-4 text-center">Table</th>
                                            <th className="pb-4">Items Summary</th>
                                            <th className="pb-4">Customer</th>
                                            <th className="pb-4 text-center">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        {allOrdersHistory.map((order) => (
                                            <tr key={order.id} className="group hover:bg-gray-50 transition-colors">
                                                <td className="py-4 pl-2">
                                                    <p className="font-bold text-gray-900 text-xs">
                                                        {typeof order.date === 'string' ? order.date.split(',')[0] : 'N/A'}
                                                    </p>
                                                    <p className="text-[10px] text-gray-400 font-mono">
                                                        {typeof order.date === 'string' ? order.date.split(',')[1] : ''}
                                                    </p>
                                                </td>
                                                <td className="py-4 font-mono text-xs text-gray-500">#{order.id.slice(0, 6)}</td>
                                                <td className="py-4 text-center font-black text-primary-600">T-{order.tableNumber}</td>
                                                <td className="py-4 text-gray-600">
                                                    <div className="text-xs max-w-[200px] truncate" title={order.items.map(i => i.name).join(', ')}>
                                                        {order.items.map(i => `${i.quantity}x ${i.name}`).join(', ')}
                                                    </div>
                                                </td>
                                                <td className="py-4 text-xs text-gray-500 max-w-[150px] truncate">{order.customerEmail}</td>
                                                <td className="py-4 text-center">
                                                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide ${order.status === 'Served' ? 'bg-green-100 text-green-700' :
                                                        order.status === 'Prepared' ? 'bg-orange-100 text-orange-700' :
                                                            'bg-blue-100 text-blue-700'
                                                        }`}>
                                                        {order.status || 'Pending'}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Sales Detail Modal */}
            <AnimatePresence>
                {isSalesModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="bg-white rounded-[2.5rem] w-full max-w-2xl max-h-[80vh] flex flex-col shadow-2xl overflow-hidden"
                        >
                            <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                                <div>
                                    <h2 className="text-2xl font-black text-gray-900">Sales Report</h2>
                                    <p className="text-gray-500 text-sm font-medium">Detailed breakdown of all items sold</p>
                                </div>
                                <button
                                    onClick={() => setIsSalesModalOpen(false)}
                                    className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition-colors"
                                >
                                    ✕
                                </button>
                            </div>

                            <div className="overflow-y-auto p-6 flex-1">
                                <table className="w-full text-left text-sm">
                                    <thead>
                                        <tr className="border-b-2 border-gray-100 text-gray-400 uppercase text-[10px] tracking-widest">
                                            <th className="pb-4 pl-2">Item Name</th>
                                            <th className="pb-4 text-center">Qty</th>
                                            <th className="pb-4 text-right">Price</th>
                                            <th className="pb-4 text-right">Total</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        {allSales.map((item, idx) => (
                                            <tr key={`${item.orderId}-${idx}`} className="group hover:bg-gray-50 transition-colors">
                                                <td className="py-4 pl-2">
                                                    <p className="font-bold text-gray-800">{item.name}</p>
                                                    <p className="text-[10px] text-gray-400 font-mono">{item.orderDate.split(',')[0]}</p>
                                                </td>
                                                <td className="py-4 text-center font-medium text-gray-500">x{item.quantity}</td>
                                                <td className="py-4 text-right text-gray-500">₹{item.price}</td>
                                                <td className="py-4 text-right font-bold text-gray-900">₹{item.totalPrice}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <div className="p-6 bg-gray-50 border-t border-gray-100">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">Grand Total Revenue</span>
                                    <span className="text-3xl font-black text-primary-600">₹{totalSales.toLocaleString()}</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Feedback Modal */}
            <AnimatePresence>
                {isFeedbackModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
                        <motion.div
                            initial={{ opacity: 0, y: 50, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-[#F8FAFC] rounded-[2.5rem] w-full max-w-5xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden ring-1 ring-white/20"
                        >
                            {/* Modal Header with Stats */}
                            <div className="bg-white p-8 border-b border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-rose-50 rounded-full blur-3xl -transtale-y-1/2 translate-x-1/2 opacity-50 pointer-events-none"></div>

                                <div className="z-10">
                                    <h2 className="text-3xl font-black text-gray-900 tracking-tight flex items-center gap-3">
                                        Customer Insights <span className="bg-rose-100 text-rose-600 px-3 py-1 rounded-full text-sm font-bold shadow-sm">Live</span>
                                    </h2>
                                    <p className="text-gray-500 font-medium mt-1">Real-time feedback from your valued guests</p>
                                </div>

                                <div className="flex gap-6 z-10">
                                    <div className="text-center px-6 py-2 bg-gray-50 rounded-2xl border border-gray-100">
                                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Total Reviews</p>
                                        <p className="text-3xl font-black text-gray-900">{feedbacks.length}</p>
                                    </div>
                                    <div className="text-center px-6 py-2 bg-yellow-50 rounded-2xl border border-yellow-100">
                                        <p className="text-xs font-bold text-yellow-600/60 uppercase tracking-widest mb-1">Avg Rating</p>
                                        <div className="flex items-center gap-1 justify-center">
                                            <span className="text-3xl font-black text-yellow-500">
                                                {(feedbacks.reduce((acc, curr) => acc + (curr.rating || 0), 0) / (feedbacks.length || 1)).toFixed(1)}
                                            </span>
                                            <span className="text-yellow-400 text-lg">★</span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setIsFeedbackModalOpen(false)}
                                        className="w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm active:scale-95"
                                    >
                                        <span className="text-xl font-bold text-gray-500">✕</span>
                                    </button>
                                </div>
                            </div>

                            <div className="overflow-y-auto p-6 md:p-8 grid grid-cols-1 lg:grid-cols-2 gap-6 bg-[#F8FAFC]">
                                {feedbacks.length === 0 ? (
                                    <div className="col-span-full flex flex-col items-center justify-center py-20 text-gray-400 gap-4">
                                        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center text-4xl grayscale opacity-50">💬</div>
                                        <p className="font-medium text-lg">No feedback received yet.</p>
                                        <p className="text-sm opacity-60">Insights will appear here once customers review their orders.</p>
                                    </div>
                                ) : (
                                    feedbacks.map((item, idx) => (
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: idx * 0.05 }}
                                            key={item.id}
                                            className="bg-white rounded-[2rem] p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100/50 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all group relative overflow-hidden flex flex-col h-full"
                                        >
                                            {/* Decorative Gradient Line */}
                                            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 opacity-0 group-hover:opacity-100 transition-opacity"></div>

                                            <div className="flex justify-between items-start mb-6">
                                                <div className="flex items-center gap-4">
                                                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black text-xl shadow-inner
                                                        ${idx % 4 === 0 ? 'bg-rose-100 text-rose-600' :
                                                            idx % 4 === 1 ? 'bg-blue-100 text-blue-600' :
                                                                idx % 4 === 2 ? 'bg-amber-100 text-amber-600' :
                                                                    'bg-emerald-100 text-emerald-600'}`}>
                                                        {item.userName?.[0]}
                                                    </div>
                                                    <div>
                                                        <h4 className="font-bold text-gray-900 text-lg leading-tight flex items-center gap-2">
                                                            {item.userName}
                                                            {item.userEmail !== 'N/A' && (
                                                                <span className="bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide border border-blue-100">Verified</span>
                                                            )}
                                                        </h4>
                                                        <p className="text-xs font-medium text-gray-400 mt-1 flex items-center gap-1.5">
                                                            <span>{item.date?.split(',')[0]}</span>
                                                            <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                                                            <span>{item.date?.split(',')[1]}</span>
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="flex flex-col items-end gap-1">
                                                    <div className="flex gap-1">
                                                        {[...Array(5)].map((_, i) => (
                                                            <svg key={i} className={`w-5 h-5 ${i < item.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200 fill-gray-100'}`} viewBox="0 0 24 24">
                                                                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                                            </svg>
                                                        ))}
                                                    </div>
                                                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{item.rating === 5 ? 'Excellent' : item.rating >= 4 ? 'Good' : 'Average'}</span>
                                                </div>
                                            </div>

                                            <div className="bg-gray-50/80 rounded-3xl p-6 relative flex-grow border border-gray-100">
                                                <span className="absolute -top-3 -left-2 text-6xl text-gray-200 font-serif leading-none select-none opacity-50">“</span>
                                                <p className="text-gray-600 text-[15px] leading-relaxed relative z-10 font-medium">
                                                    {item.comment || <span className="text-gray-400 italic">No written review provided.</span>}
                                                </p>
                                            </div>

                                            {item.tags && item.tags.length > 0 && (
                                                <div className="flex flex-wrap gap-2 mt-5">
                                                    {item.tags.map(tag => (
                                                        <span key={tag} className="px-3 py-1.5 rounded-xl text-xs font-bold bg-white border border-gray-200 text-gray-600 shadow-sm flex items-center gap-1.5">
                                                            <span className="text-base">
                                                                {tag === 'tasty' ? '😋' :
                                                                    tag === 'service' ? '⚡' :
                                                                        tag === 'portion' ? '🍱' :
                                                                            tag === 'ambiance' ? '✨' : '💰'}
                                                            </span>
                                                            <span className="capitalize">{tag === 'money' ? 'Value' : tag}</span>
                                                        </span>
                                                    ))}
                                                </div>
                                            )}
                                        </motion.div>
                                    ))
                                )}
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Analytics Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white rounded-[2rem] p-6 border border-gray-100 shadow-sm">
                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <span className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600 text-xs">★</span>
                        Popular Items
                    </h3>
                    <div className="space-y-3">
                        {popularItems.map(([name, count], idx) => (
                            <div key={name} className="flex items-center gap-3">
                                <span className="font-mono text-gray-400 text-xs w-4">0{idx + 1}</span>
                                <div className="flex-1">
                                    <div className="flex justify-between text-sm mb-1">
                                        <span className="font-bold text-gray-700">{name}</span>
                                        <span className="font-black text-gray-900">{count}</span>
                                    </div>
                                    <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-yellow-400 rounded-full"
                                            style={{ width: `${(count / (popularItems[0]?.[1] || 1)) * 100}%` }}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {popularItems.length === 0 && <p className="text-gray-400 text-sm">No sales data yet.</p>}
                    </div>
                </div>

                <div className="bg-white rounded-[2rem] p-6 border border-gray-100 shadow-sm">
                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <span className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600"><ChefHat size={14} /></span>
                        Category Sales
                    </h3>
                    <div className="space-y-4">
                        {Object.entries(stats.categoryCounts).map(([cat, count]) => (
                            <div key={cat}>
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="font-bold text-gray-700 capitalize">{cat}</span>
                                    <span className="font-medium text-gray-500">{count} items</span>
                                </div>
                                <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full rounded-full ${cat === 'tiffins' ? 'bg-orange-400' :
                                            cat === 'lunch' ? 'bg-red-400' : 'bg-indigo-400'
                                            }`}
                                        style={{ width: `${(count / orders.reduce((sum, o) => sum + o.items.length, 0)) * 100}%` }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                        {Object.keys(stats.categoryCounts).length === 0 && <p className="text-gray-400 text-sm">No category data yet.</p>}
                    </div>
                </div>
            </div>

            {activeOrders.length === 0 ? (
                <div className="bg-white rounded-[2.5rem] border-2 border-dashed border-gray-100 py-32 text-center">
                    <motion.div
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="inline-block"
                    >
                        <ChefHat size={64} className="text-gray-200" />
                    </motion.div>
                    <h3 className="text-xl font-bold text-gray-400 mt-6">Waiting for new orders...</h3>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
                    <AnimatePresence mode="popLayout">
                        {activeOrders.map((order) => (
                            <motion.div
                                key={order.id}
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className={`rounded-[2rem] shadow-sm border overflow-hidden transition-all group relative ${order.status === 'Served' ? 'bg-gray-50 border-gray-100 opacity-75 grayscale-[0.5] hover:grayscale-0 hover:opacity-100' : 'bg-white border-orange-50 hover:shadow-xl'
                                    }`}
                            >
                                {order.status === 'Served' && (
                                    <div className="absolute top-4 right-4 z-10 bg-green-100 text-green-700 font-bold text-xs px-3 py-1 rounded-full flex items-center gap-1">
                                        <CheckCircle size={12} /> SERVED
                                    </div>
                                )}
                                <div className="p-6 border-b border-orange-50 flex justify-between items-start">
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="bg-primary-600 text-white text-[10px] font-black px-2 py-0.5 rounded-full">NEW</span>
                                            <p className="font-mono font-bold text-gray-400 text-sm">#{order.id.slice(0, 8)}</p>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <div className="flex items-center gap-1.5 text-gray-900">
                                                <span className="text-3xl font-black text-primary-600 leading-none">T-{order.tableNumber}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xs font-bold text-gray-400 mb-1 flex items-center justify-end gap-1">
                                            <Clock size={12} /> {typeof order.date === 'string' ? order.date.split(',')[1] : 'Just now'}
                                        </p>
                                        <div className="flex items-center justify-end gap-1 text-gray-500 text-xs font-bold">
                                            <Mail size={12} /> {order.customerEmail}
                                        </div>
                                    </div>
                                </div>

                                <div className="p-6 space-y-4">
                                    {order.items.map((item, idx) => (
                                        <div key={idx} className="flex justify-between items-center bg-gray-50 rounded-2xl px-4 py-3">
                                            <div className="flex items-center gap-3">
                                                <span className="w-8 h-8 rounded-xl bg-white text-primary-600 shadow-sm flex items-center justify-center font-black">
                                                    {item.quantity}
                                                </span>
                                                <p className="font-bold text-gray-800">{item.name}</p>
                                            </div>
                                            {item.description && (
                                                <p className="text-xs text-gray-400 mt-1 pl-11">{item.description}</p>
                                            )}
                                        </div>
                                    ))}
                                </div>

                                <div className="p-6 pt-0 mt-auto space-y-3">
                                    {(order.status === 'Pending' || order.status === 'pending' || !order.status) && (
                                        <button
                                            onClick={() => handleStatusUpdate(order.id, 'Prepared')}
                                            className="w-full py-4 rounded-xl bg-orange-50 text-orange-600 font-bold hover:bg-orange-500 hover:text-white transition-all flex items-center justify-center gap-2 group/btn"
                                        >
                                            <ChefHat size={20} className="group-hover/btn:scale-110 transition-transform" />
                                            <span>Mark as Prepared</span>
                                        </button>
                                    )}

                                    {order.status === 'Prepared' && (
                                        <div className="space-y-3">
                                            <div className="w-full py-3 rounded-xl bg-orange-100 text-orange-700 font-bold flex items-center justify-center gap-2 opacity-80 cursor-default border border-orange-200">
                                                <ChefHat size={20} />
                                                <span>Prepared</span>
                                            </div>

                                            <motion.button
                                                initial={{ scale: 0.9, opacity: 0 }}
                                                animate={{ scale: 1, opacity: 1 }}
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={() => handleStatusUpdate(order.id, 'Served')}
                                                className="w-full py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-black shadow-lg shadow-emerald-200 flex items-center justify-center gap-2 relative overflow-hidden"
                                            >
                                                <motion.div
                                                    className="absolute inset-0 bg-white/20"
                                                    animate={{ x: ['-100%', '100%'] }}
                                                    transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                                                />
                                                <CheckCircle size={22} className="relative z-10" />
                                                <span className="relative z-10">Serve Order</span>
                                            </motion.button>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            )}
        </div>
    );
};

export default ChefDashboard;
