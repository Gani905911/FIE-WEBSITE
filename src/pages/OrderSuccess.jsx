
import React, { useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { CheckCircle2, Home, Package, ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';

const OrderSuccess = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { order } = location.state || {};

    if (!order) {
        return (
            <div className="min-h-[calc(100vh-64px)] flex flex-col items-center justify-center p-4">
                <h2 className="text-2xl font-bold mb-4">No order found</h2>
                <Link to="/" className="btn-primary">Go to Home</Link>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto px-4 py-20 text-center">
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', damping: 12, stiffness: 200 }}
                className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-green-100"
            >
                <CheckCircle2 size={48} className="text-white" />
            </motion.div>

            <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-4xl font-black text-gray-900 mb-4"
            >
                Order <span className="text-green-600">Successful!</span>
            </motion.h1>
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-gray-500 font-medium mb-12 text-lg"
            >
                Your delicious food is being prepared by our chefs.
            </motion.p>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-white rounded-[2.5rem] shadow-xl border border-gray-50 overflow-hidden text-left mb-10"
            >
                <div className="bg-gray-50 px-8 py-6 border-b border-gray-100 flex justify-between items-center">
                    <div>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Order ID</p>
                        <p className="font-mono font-bold text-gray-800">{order.id}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Table No</p>
                        <p className="font-bold text-primary-600 text-lg">{order.tableNumber}</p>
                    </div>
                </div>

                <div className="p-8">
                    <div className="space-y-4 mb-8">
                        {order.items.map((item, index) => (
                            <div key={index} className="flex justify-between items-center">
                                <div className="flex items-center gap-3">
                                    <span className="w-8 h-8 rounded-lg bg-orange-50 text-primary-600 flex items-center justify-center font-bold text-sm">
                                        {item.quantity}x
                                    </span>
                                    <p className="font-bold text-gray-700">{item.name}</p>
                                </div>
                                <p className="font-bold text-gray-900">₹{(item.price * item.quantity).toFixed(2)}</p>
                            </div>
                        ))}
                    </div>

                    <div className="pt-6 border-t border-dashed border-gray-200 flex justify-between items-center">
                        <span className="text-lg font-bold text-gray-800">Total Paid</span>
                        <span className="text-2xl font-black text-primary-600">₹{order.totalAmount.toFixed(2)}</span>
                    </div>
                </div>
            </motion.div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/" className="w-full sm:w-auto btn-primary bg-gray-900 shadow-gray-200 hover:bg-black inline-flex items-center gap-2 px-10 py-4">
                    <Home size={20} />
                    <span>Back to Home</span>
                </Link>
                <button
                    onClick={() => navigate('/my-orders')}
                    className="w-full sm:w-auto btn-secondary inline-flex items-center gap-2 px-10 py-4"
                >
                    <Package size={20} />
                    <span>Track Order</span>
                </button>
            </div>
        </div>
    );
};

export default OrderSuccess;
