
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Plus, Minus, Trash2, ArrowRight, ShoppingBag, Hash } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';

const Cart = () => {
    const { cart, removeFromCart, updateQuantity, subtotal, tax, total, tableNumber, setTableNumber } = useCart();
    const navigate = useNavigate();

    if (cart.length === 0) {
        return (
            <div className="min-h-[calc(100vh-64px)] flex flex-col items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center"
                >
                    <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <ShoppingBag size={48} className="text-primary-600" />
                    </div>
                    <h2 className="text-3xl font-black text-gray-800 mb-4">Your cart is empty</h2>
                    <p className="text-gray-500 mb-8 font-medium">Add some delicious dishes to get started!</p>
                    <Link to="/" className="btn-primary inline-flex items-center gap-2 px-8 py-4">
                        Browse Menu
                    </Link>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <h1 className="text-4xl font-black text-gray-900 mb-10 tracking-tight">Your <span className="text-primary-600">Order</span></h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Cart Items */}
                <div className="lg:col-span-2 space-y-6">
                    <AnimatePresence mode="popLayout">
                        {cart.map((item) => (
                            <motion.div
                                key={item.id}
                                layout
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                className="bg-white p-4 rounded-[2rem] shadow-sm border border-orange-50 flex items-center gap-4 hover:shadow-md transition-shadow"
                            >
                                <div className="w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0">
                                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-lg font-bold text-gray-800">{item.name}</h3>
                                    <p className="text-primary-600 font-bold">₹{item.price}</p>
                                </div>
                                <div className="flex flex-col items-end gap-3">
                                    <div className="flex items-center bg-gray-50 rounded-xl p-1 border border-gray-100">
                                        <button
                                            onClick={() => updateQuantity(item.id, -1)}
                                            className="w-8 h-8 flex items-center justify-center rounded-lg bg-white text-gray-600 shadow-sm hover:text-primary-600 transition-all"
                                        >
                                            <Minus size={14} />
                                        </button>
                                        <span className="font-bold text-gray-700 w-8 text-center">{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(item.id, 1)}
                                            className="w-8 h-8 flex items-center justify-center rounded-lg bg-white text-gray-600 shadow-sm hover:text-primary-600 transition-all"
                                        >
                                            <Plus size={14} />
                                        </button>
                                    </div>
                                    <button
                                        onClick={() => removeFromCart(item.id)}
                                        className="text-red-400 hover:text-red-500 transition-colors"
                                    >
                                        <Trash2 size={20} />
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* Order Summary */}
                <div className="lg:col-span-1">
                    <div className="bg-white p-8 rounded-[2rem] shadow-xl border border-orange-50 sticky top-24">
                        <h2 className="text-xl font-black text-gray-900 mb-6">Summary</h2>

                        <div className="space-y-4 mb-8">
                            <div className="flex justify-between text-gray-500 font-medium">
                                <span>Subtotal</span>
                                <span>₹{subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-gray-500 font-medium">
                                <span>GST & Taxes (5%)</span>
                                <span>₹{tax.toFixed(2)}</span>
                            </div>
                            <div className="pt-4 border-t border-dashed border-gray-200 flex justify-between">
                                <span className="text-xl font-bold text-gray-900">Grand Total</span>
                                <span className="text-2xl font-black text-primary-600">₹{total.toFixed(2)}</span>
                            </div>
                        </div>

                        <div className="mb-8">
                            <label className="block text-sm font-bold text-gray-700 mb-3">Table Number</label>
                            <div className="relative">
                                <Hash className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-400" size={18} />
                                <input
                                    type="number"
                                    placeholder="Enter Table #"
                                    className="w-full pl-12 pr-4 py-4 rounded-2xl bg-orange-50/50 border-2 border-primary-100 focus:border-primary-500 outline-none transition-all font-bold text-lg"
                                    value={tableNumber}
                                    min="1"
                                    max="100"
                                    onChange={(e) => {
                                        const val = parseInt(e.target.value);
                                        if (e.target.value === '' || (val > 0 && val <= 100)) {
                                            setTableNumber(e.target.value);
                                        }
                                    }}
                                    required
                                />
                            </div>
                        </div>

                        <button
                            onClick={() => {
                                if (!tableNumber) {
                                    alert('Please enter a table number');
                                    return;
                                }
                                navigate('/payment');
                            }}
                            className="w-full btn-primary py-4 text-lg flex items-center justify-center gap-2 group"
                        >
                            <span>Checkout</span>
                            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
