
import React from 'react';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';
import { Clock, Calendar, ChevronRight, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

const MyOrders = () => {
    const { orders } = useCart();

    if (orders.length === 0) {
        return (
            <div className="min-h-[calc(100vh-64px)] flex flex-col items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center"
                >
                    <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Clock size={48} className="text-primary-600" />
                    </div>
                    <h2 className="text-3xl font-black text-gray-800 mb-4">No order history</h2>
                    <p className="text-gray-500 mb-8 font-medium">You haven't placed any orders yet.</p>
                    <Link to="/" className="btn-primary inline-flex items-center gap-2 px-8 py-4">
                        Order Now
                    </Link>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <h1 className="text-4xl font-black text-gray-900 mb-10 tracking-tight">Order <span className="text-primary-600">History</span></h1>

            <div className="space-y-6">
                {orders.map((order, index) => (
                    <motion.div
                        key={order.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white rounded-[2rem] p-6 shadow-sm border border-orange-50 hover:shadow-md transition-shadow group"
                    >
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                                    <ShoppingBag size={24} className="text-primary-600" />
                                </div>
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <h3 className="text-lg font-bold text-gray-900">{order.id}</h3>
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${order.status === 'Completed' || order.status === 'Served'
                                            ? 'bg-green-100 text-green-700'
                                            : order.status === 'Prepared'
                                                ? 'bg-orange-100 text-orange-700'
                                                : (order.status === 'Pending' || order.status === 'pending')
                                                    ? 'bg-blue-100 text-blue-700'
                                                    : 'bg-yellow-100 text-yellow-700'
                                            }`}>
                                            {(order.status === 'Pending' || order.status === 'pending') ? 'Preparing' : order.status}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-4 text-sm text-gray-500 font-medium">
                                        <span className="flex items-center gap-1">
                                            <Calendar size={14} />
                                            {order.date}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                                            {order.items.length} Items
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="text-left md:text-right">
                                <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">Total Amount</p>
                                <p className="text-2xl font-black text-primary-600">₹{order.totalAmount?.toFixed(2)}</p>
                            </div>
                        </div>

                        <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
                            <div className="space-y-3">
                                {order.items.map((item, i) => (
                                    <div key={i} className="flex justify-between items-center text-sm">
                                        <div className="flex items-center gap-2 text-gray-700">
                                            <span className="font-bold text-primary-600">{item.quantity}x</span>
                                            <span className="font-medium">{item.name}</span>
                                        </div>
                                        <span className="font-bold text-gray-900">₹{item.price * item.quantity}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default MyOrders;
