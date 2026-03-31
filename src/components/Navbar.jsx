import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut, X, ClipboardList, Clock, Utensils, Truck, MapPin, Phone, Instagram, Facebook, Twitter, CreditCard, ChevronRight, ChevronLeft, User, MessageSquare, Info, Star, Heart, Bell, Wallet, Settings, HelpCircle, ShoppingBag, Home } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useNotification } from '../context/NotificationContext';

import homeIcon from '../assets/home_icon_new.png';
import cartIcon from '../assets/cart_icon_new.png';


import FeedbackModal from './FeedbackModal';

const Navbar = () => {
    const { user, logout } = useAuth();
    const { cart } = useCart();
    const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotification();
    const navigate = useNavigate();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);

    const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <nav className="sticky top-0 z-50 glass bg-white/80 border-b border-orange-100 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center space-x-2">
                            <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center shadow-lg shadow-primary-200">
                                <span className="text-white font-bold text-xl">F</span>
                            </div>
                            <span className="text-xl font-bold font-mono tracking-tight text-gray-800">
                                FRIENDS<span className="text-primary-600">-Restaurant</span>
                            </span>
                        </Link>
                    </div>

                    <div className="flex items-center gap-4">
                        {user && user.role === 'customer' && (
                            <div className="hidden md:flex items-center gap-4">
                                <Link to="/" className="relative group p-1 focus:outline-none" title="Home">
                                    <div className="flex flex-col items-center gap-0.5">
                                        <div className="w-10 h-10 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center group-hover:scale-105 transition-transform overflow-hidden">
                                            <Home size={20} className="text-gray-600 group-hover:text-primary-600 transition-colors" />
                                        </div>
                                        <span className="text-[10px] font-bold text-gray-500 group-hover:text-primary-600 transition-colors uppercase tracking-wide">Home</span>
                                    </div>
                                </Link>

                                <Link to="/cart" className="relative group p-1 focus:outline-none" title="Cart">
                                    <div className="flex flex-col items-center gap-0.5">
                                        <div className="w-10 h-10 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center group-hover:scale-105 transition-transform overflow-hidden">
                                            <ShoppingBag size={20} className="text-gray-600 group-hover:text-primary-600 transition-colors" />
                                        </div>
                                        <span className="text-[10px] font-bold text-gray-500 group-hover:text-primary-600 transition-colors uppercase tracking-wide">Cart</span>
                                        {cartCount > 0 && (
                                            <span className="absolute top-0 right-1 bg-primary-600 text-white text-[9px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white animate-bounce-short shadow-sm">
                                                {cartCount}
                                            </span>
                                        )}
                                    </div>
                                </Link>
                            </div>
                        )}

                        {user ? (
                            <>
                                {user.role === 'chef' && (
                                    <Link to="/chef-dashboard" className="text-sm font-semibold text-primary-600 hover:text-primary-700">
                                        Orders
                                    </Link>
                                )}



                                <div className="relative">


                                    <AnimatePresence>
                                        {isNotificationOpen && (
                                            <>
                                                <div
                                                    className="fixed inset-0 z-40 bg-transparent"
                                                    onClick={() => setIsNotificationOpen(false)}
                                                />
                                                <motion.div
                                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                                    exit={{ opacity: 0, scale: 0.95 }}
                                                    className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50 origin-top-right"
                                                >
                                                    <div className="p-4 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
                                                        <h3 className="font-bold text-gray-800 text-sm">Notifications</h3>
                                                        {unreadCount > 0 && (
                                                            <button
                                                                onClick={markAllAsRead}
                                                                className="text-xs text-primary-600 hover:text-primary-700 font-bold uppercase tracking-wider"
                                                            >
                                                                Mark all read
                                                            </button>
                                                        )}
                                                    </div>
                                                    <div className="max-h-[300px] overflow-y-auto">
                                                        {notifications.length === 0 ? (
                                                            <div className="p-8 text-center text-gray-400 text-sm flex flex-col items-center gap-2">
                                                                <Bell size={32} className="opacity-20" />
                                                                <p>No new notifications</p>
                                                            </div>
                                                        ) : (
                                                            notifications.map((notif) => (
                                                                <div
                                                                    key={notif.id}
                                                                    onClick={() => markAsRead(notif.id)}
                                                                    className={`group/item p-4 border-b border-gray-50 hover:bg-gray-50 transition-colors cursor-pointer flex gap-3 ${!notif.read ? 'bg-orange-50/40' : ''}`}
                                                                >
                                                                    <div className={`mt-1.5 w-2 h-2 rounded-full flex-shrink-0 ${!notif.read ? 'bg-primary-500 ring-2 ring-primary-200' : 'bg-gray-200'}`} />
                                                                    <div className="flex-1">
                                                                        <div className="flex justify-between items-start mb-1">
                                                                            <h4 className={`text-sm ${!notif.read ? 'font-bold text-gray-900' : 'font-medium text-gray-600'}`}>
                                                                                {notif.title}
                                                                            </h4>
                                                                            <span className="text-[10px] text-gray-400 whitespace-nowrap ml-2">
                                                                                {notif.timestamp ? new Date(notif.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Just now'}
                                                                            </span>
                                                                        </div>
                                                                        <p className="text-xs text-gray-500 leading-relaxed group-hover/item:text-gray-700 transition-colors">{notif.message}</p>
                                                                    </div>
                                                                </div>
                                                            ))
                                                        )}
                                                    </div>
                                                </motion.div>
                                            </>
                                        )}
                                    </AnimatePresence>
                                </div>

                                <div className="relative">
                                    <button
                                        onClick={() => setIsDropdownOpen(true)}
                                        className="relative group p-1 focus:outline-none"
                                        title="Menu"
                                    >
                                        <div className="flex flex-col items-center gap-0.5">
                                            <div className="w-10 h-10 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center group-hover:scale-105 transition-transform overflow-hidden">
                                                <img
                                                    src="https://cdn-icons-png.flaticon.com/512/1077/1077114.png"
                                                    alt="Profile"
                                                    className="w-6 h-6 object-contain opacity-80"
                                                />
                                            </div>
                                            <span className="text-[10px] font-bold text-gray-500 group-hover:text-primary-600 transition-colors uppercase tracking-wide">Profile</span>
                                        </div>
                                    </button>

                                    <AnimatePresence>
                                        {isDropdownOpen && (
                                            <>
                                                {/* Desktop Dropdown Panel */}
                                                <div className="absolute top-full right-0 z-[9999] pt-2">

                                                    {/* Invisible Backdrop for clicking outside */}
                                                    <div
                                                        className="fixed inset-0 z-[9990] bg-transparent"
                                                        onClick={() => setIsDropdownOpen(false)}
                                                    />

                                                    <motion.div
                                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                                        transition={{ duration: 0.2, ease: "easeOut" }}
                                                        className="relative w-80 bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100 overflow-hidden z-[9999] origin-top-right ring-1 ring-black/5"
                                                    >
                                                        {/* 1. Header Section */}
                                                        {/* Header Row with Back Button */}
                                                        <div className="px-5 pt-4 pb-2 flex items-center justify-between border-b border-gray-50/50">
                                                            <div className="flex items-center gap-3">
                                                                <button
                                                                    onClick={() => setIsDropdownOpen(false)}
                                                                    className="p-1.5 rounded-full bg-gray-50 hover:bg-gray-100 text-gray-500 hover:text-gray-800 transition-colors"
                                                                    title="Go Back"
                                                                >
                                                                    <ChevronLeft size={20} />
                                                                </button>
                                                            </div>
                                                        </div>

                                                        {/* Profile Card Section */}
                                                        <div className="p-4 pt-2">
                                                            <motion.div
                                                                whileHover={{ y: -3, scale: 1.01, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.01)" }}
                                                                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                                                                className="flex items-center gap-4 p-4 bg-gradient-to-br from-gray-50 to-slate-100 rounded-2xl border border-gray-200 shadow-sm cursor-pointer group relative overflow-hidden"
                                                            >
                                                                <div className="w-14 h-14 rounded-full border-2 border-white shadow-md overflow-hidden flex-shrink-0 relative z-10 transition-transform group-hover:scale-105 duration-300">
                                                                    <div className="w-full h-full bg-white flex items-center justify-center">
                                                                        <img
                                                                            src="https://cdn-icons-png.flaticon.com/512/1077/1077114.png"
                                                                            alt="User"
                                                                            className="w-full h-full object-cover"
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div className="flex-1 min-w-0 z-10">
                                                                    <h3 className="text-lg font-bold text-gray-800 truncate tracking-tight group-hover:text-red-600 transition-colors duration-300">{user.name || 'Foodie'}</h3>
                                                                    <p className="text-sm text-gray-500 truncate font-medium">{user.email}</p>
                                                                    <Link
                                                                        to="/profile"
                                                                        onClick={() => setIsDropdownOpen(false)}
                                                                        className="text-xs font-bold text-red-500 hover:text-red-700 mt-1 inline-flex items-center gap-1 group-hover:translate-x-2 transition-transform duration-300"
                                                                    >
                                                                        View Profile <ChevronRight size={12} strokeWidth={3} />
                                                                    </Link>
                                                                </div>

                                                                {/* Subtle gradient overlay animation */}
                                                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent translate-x-[-150%] group-hover:translate-x-[150%] transition-transform duration-700 ease-in-out z-0" />
                                                            </motion.div>
                                                        </div>

                                                        {/* 2. Menu Options */}
                                                        <div className="py-2">
                                                            <Link
                                                                to="/profile"
                                                                onClick={() => setIsDropdownOpen(false)}
                                                                className="flex items-center gap-3 px-6 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors group"
                                                            >
                                                                <User size={18} className="text-gray-400 group-hover:text-red-500 transition-colors" />
                                                                My Profile
                                                            </Link>

                                                            <Link
                                                                to="/my-orders"
                                                                onClick={() => setIsDropdownOpen(false)}
                                                                className="flex items-center gap-3 px-6 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors group"
                                                            >
                                                                <ClipboardList size={18} className="text-gray-400 group-hover:text-red-500 transition-colors" />
                                                                Orders & History
                                                            </Link>

                                                            <button
                                                                onClick={() => {
                                                                    setIsDropdownOpen(false);
                                                                    setIsNotificationOpen(true);
                                                                }}
                                                                className="w-full flex items-center gap-3 px-6 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors group text-left"
                                                            >
                                                                <div className="relative">
                                                                    <Bell size={18} className="text-gray-400 group-hover:text-red-500 transition-colors" />
                                                                    {unreadCount > 0 && (
                                                                        <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                                                                    )}
                                                                </div>
                                                                Notifications
                                                                {unreadCount > 0 && (
                                                                    <span className="ml-auto text-[10px] font-bold bg-red-100 text-red-600 px-2 py-0.5 rounded-full">
                                                                        {unreadCount}
                                                                    </span>
                                                                )}
                                                            </button>



                                                            <button
                                                                onClick={() => alert("Wallet coming soon!")}
                                                                className="w-full flex items-center gap-3 px-6 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors group text-left"
                                                            >
                                                                <Wallet size={18} className="text-gray-400 group-hover:text-red-500 transition-colors" />
                                                                Wallet
                                                            </button>
                                                        </div>

                                                        <div className="h-px bg-gray-100 mx-6 my-1"></div>

                                                        <div className="py-2">
                                                            <button
                                                                onClick={() => alert("Settings coming soon!")}
                                                                className="w-full flex items-center gap-3 px-6 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors group text-left"
                                                            >
                                                                <Settings size={18} className="text-gray-400 group-hover:text-red-500 transition-colors" />
                                                                Settings
                                                            </button>

                                                            <button
                                                                onClick={() => alert("Help coming soon!")}
                                                                className="w-full flex items-center gap-3 px-6 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors group text-left"
                                                            >
                                                                <HelpCircle size={18} className="text-gray-400 group-hover:text-red-500 transition-colors" />
                                                                Help & Support
                                                            </button>

                                                            <button
                                                                onClick={() => {
                                                                    setIsDropdownOpen(false);
                                                                    setIsFeedbackOpen(true);
                                                                }}
                                                                className="w-full flex items-center gap-3 px-6 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors group text-left"
                                                            >
                                                                <MessageSquare size={18} className="text-gray-400 group-hover:text-red-500 transition-colors" />
                                                                Feedback
                                                            </button>
                                                        </div>

                                                        {/* 3. Logout Section */}
                                                        <div className="bg-gray-50/50 p-2 border-t border-gray-100 mt-1">
                                                            <button
                                                                onClick={() => {
                                                                    if (window.confirm("Are you sure you want to logout?")) {
                                                                        logout();
                                                                        navigate('/login');
                                                                        setIsDropdownOpen(false);
                                                                    }
                                                                }}
                                                                className="w-full flex items-center justify-center gap-2 p-2.5 rounded-lg text-red-600 hover:bg-red-50 hover:text-red-700 transition-all font-semibold text-sm group"
                                                            >
                                                                <LogOut size={16} className="text-red-500 group-hover:text-red-700 transition-colors" />
                                                                Log Out
                                                            </button>
                                                        </div>

                                                    </motion.div>
                                                </div>
                                            </>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </>
                        ) : (
                            <Link to="/login" className="btn-primary py-2 px-5">
                                Login
                            </Link>
                        )}
                    </div>
                </div >

                <FeedbackModal
                    isOpen={isFeedbackOpen}
                    onClose={() => setIsFeedbackOpen(false)}
                />
            </div >
        </nav >
    );
};

export default Navbar;
