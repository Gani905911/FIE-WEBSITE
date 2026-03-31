import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { CreditCard, ShieldCheck, AlertCircle, Check, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Payment = () => {
    const { total, placeOrder, tableNumber } = useCart();
    const { user } = useAuth();
    const [selectedMethod, setSelectedMethod] = useState('upi'); // 'upi', 'bhim', 'card'
    const [isProcessing, setIsProcessing] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const navigate = useNavigate();

    // UPI State
    const [activeUpiApp, setActiveUpiApp] = useState(null);
    const [upiId, setUpiId] = useState('');
    const [upiError, setUpiError] = useState('');

    // Card State
    const [cardDetails, setCardDetails] = useState({
        number: '',
        name: '',
        expiry: '',
        cvv: ''
    });

    const handlePayment = (e) => {
        if (e) e.preventDefault();

        // Validation for UPI
        if (selectedMethod === 'upi' && activeUpiApp) {
            if (!upiId) {
                setUpiError('Please enter your UPI ID');
                return;
            }
            // Strict validation: Must be 10 digits followed by @handle
            const upiRegex = /^\d{10}@[a-zA-Z0-9]+$/;
            if (!upiRegex.test(upiId)) {
                setUpiError('Invalid UPI ID. Please enter a 10-digit mobile number followed by a handle (e.g., 9876543210@ybl)');
                return;
            }
        }

        setIsProcessing(true);
        setTimeout(async () => {
            const orderInfo = {
                customerEmail: user?.email || 'Guest',
                tableNumber: tableNumber,
                totalAmount: total,
                paymentMethod: selectedMethod,
                paymentDetails: selectedMethod === 'upi' ? { app: activeUpiApp, vpa: upiId } : {}
            };
            const order = await placeOrder(orderInfo);

            setIsProcessing(false);
            setIsSuccess(true);

            // Play success sound
            const audio = new Audio("data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU"); // Short placeholder beep for brevity, replacing with a real data URI below

            // Using a simple playful 'ding' sound data URI
            const successSound = new Audio("https://actions.google.com/sounds/v1/cartoon/cartoon_boing.ogg");
            successSound.play().catch(e => console.log("Audio play failed", e));

            setTimeout(() => {
                navigate('/order-success', { state: { order } });
            }, 2500);
        }, 2000);
    };

    const handleUpiAppSelect = (appName) => {
        setActiveUpiApp(appName);
        setUpiId('');
        setUpiError('');
    };

    return (
        <div className="min-h-[calc(100vh-64px)] flex items-center justify-center p-4">
            <AnimatePresence mode="wait">
                {isSuccess ? (
                    <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="w-full max-w-sm bg-white rounded-[2.5rem] p-10 shadow-2xl text-center"
                    >
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 200, damping: 10, delay: 0.2 }}
                            className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-green-200 shadow-xl"
                        >
                            <Check size={48} className="text-white" strokeWidth={3} />
                        </motion.div>
                        <h2 className="text-2xl font-black text-gray-800 mb-2">Payment Successful!</h2>
                        <p className="text-gray-500 font-medium">Redirecting to order details...</p>
                    </motion.div>
                ) : (
                    <motion.div
                        key="payment-form"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="w-full max-w-6xl bg-white rounded-[2.5rem] shadow-2xl border border-orange-50 overflow-hidden"
                    >
                        <div className="flex flex-col lg:flex-row h-full">
                            {/* Left Sidebar: Header & Methods */}
                            <div className="lg:w-1/3 bg-gray-50 border-r border-gray-100">
                                <div className="bg-primary-600 p-8 text-white relative h-48 flex flex-col justify-center">
                                    <h2 className="text-3xl font-black mb-2">Checkout</h2>
                                    <p className="text-orange-100 font-medium text-lg">Total Payable: <span className="text-white font-bold">₹{total.toFixed(2)}</span></p>
                                </div>
                                <div className="p-4 space-y-2">
                                    <p className="px-4 py-2 text-xs font-bold text-gray-400 uppercase tracking-widest">Select Method</p>
                                    {['upi', 'bhim', 'card'].map((method) => (
                                        <button
                                            key={method}
                                            onClick={() => {
                                                setSelectedMethod(method);
                                                setActiveUpiApp(null);
                                                setUpiId('');
                                                setUpiError('');
                                            }}
                                            className={`w-full text-left py-4 px-6 rounded-2xl text-sm font-bold transition-all flex items-center justify-between group ${selectedMethod === method
                                                ? 'bg-white text-primary-600 shadow-md border border-orange-50'
                                                : 'text-gray-500 hover:bg-white hover:shadow-sm'
                                                }`}
                                        >
                                            <div className="flex items-center gap-3">
                                                {method === 'upi' && <span className="text-lg">📱</span>}
                                                {method === 'bhim' && <span className="text-lg">🔳</span>}
                                                {method === 'card' && <span className="text-lg">💳</span>}
                                                <span className="uppercase tracking-wide">
                                                    {method === 'upi' && 'UPI Apps'}
                                                    {method === 'bhim' && 'BHIM QR'}
                                                    {method === 'card' && 'Debit Card'}
                                                </span>
                                            </div>
                                            {selectedMethod === method && <div className="w-2 h-2 rounded-full bg-primary-600"></div>}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Right Content */}
                            <div className="flex-1 bg-white">

                                <div className="p-8">
                                    {/* UPI Section */}
                                    {selectedMethod === 'upi' && (
                                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                                            {!activeUpiApp ? (
                                                <>
                                                    <h3 className="text-lg font-bold text-gray-800 mb-6">Select UPI App</h3>

                                                    {/* PhonePe */}
                                                    <button
                                                        onClick={() => handleUpiAppSelect('PhonePe')}
                                                        className="w-full bg-white border-2 border-gray-100 p-5 rounded-3xl flex items-center justify-between hover:border-[#5f259f] hover:shadow-xl transition-all group"
                                                    >
                                                        <div className="flex items-center gap-5">
                                                            <div className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform overflow-hidden">
                                                                <img
                                                                    src="https://freepnglogo.com/images/all_img/1707313013phonepe-logo-round-icon.png"
                                                                    alt="PhonePe"
                                                                    className="w-full h-full object-cover"
                                                                    onError={(e) => {
                                                                        e.target.style.display = 'none';
                                                                        e.target.parentElement.innerHTML = '<span style="color: #5f259f; font-weight: 900; font-size: 14px;">पे</span>';
                                                                    }}
                                                                />
                                                            </div>
                                                            <div className="text-left">
                                                                <span className="block font-black text-xl text-gray-800 group-hover:text-[#5f259f]">PhonePe</span>
                                                                <span className="text-sm text-gray-400 font-medium tracking-tight">Safe & Fast Payments</span>
                                                            </div>
                                                        </div>
                                                        <ChevronRight className="text-gray-300 group-hover:text-[#5f259f] group-hover:translate-x-1 transition-all" size={24} />
                                                    </button>

                                                    {/* Google Pay */}
                                                    <button
                                                        onClick={() => handleUpiAppSelect('Google Pay')}
                                                        className="w-full bg-white border-2 border-gray-100 p-5 rounded-3xl flex items-center justify-between hover:border-blue-500 hover:shadow-xl transition-all group"
                                                    >
                                                        <div className="flex items-center gap-5">
                                                            <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center p-2 shadow-sm border border-gray-100 group-hover:scale-110 transition-transform">
                                                                <img
                                                                    src="https://upload.wikimedia.org/wikipedia/commons/f/f2/Google_Pay_Logo.svg"
                                                                    alt="Google Pay"
                                                                    className="w-12 h-12 object-contain"
                                                                />
                                                            </div>
                                                            <div className="text-left">
                                                                <span className="block font-black text-xl text-gray-800 group-hover:text-blue-500">Google Pay</span>
                                                                <span className="text-sm text-gray-400 font-medium tracking-tight">Official Google UPI app</span>
                                                            </div>
                                                        </div>
                                                        <ChevronRight className="text-gray-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" size={24} />
                                                    </button>

                                                    {/* Paytm */}
                                                    <button
                                                        onClick={() => handleUpiAppSelect('Paytm')}
                                                        className="w-full bg-white border-2 border-gray-100 p-5 rounded-3xl flex items-center justify-between hover:border-[#00baf2] hover:shadow-xl transition-all group"
                                                    >
                                                        <div className="flex items-center gap-5">
                                                            <div className="w-16 h-16 rounded-2xl bg-[#00baf2]/5 flex items-center justify-center p-3 shadow-sm border border-[#00baf2]/10 group-hover:scale-110 transition-transform">
                                                                <img
                                                                    src="https://upload.wikimedia.org/wikipedia/commons/2/24/Paytm_Logo_%28standalone%29.svg"
                                                                    alt="Paytm"
                                                                    className="w-full h-full object-contain"
                                                                />
                                                            </div>
                                                            <div className="text-left">
                                                                <span className="block font-black text-xl text-gray-800 group-hover:text-[#00baf2]">Paytm</span>
                                                                <span className="text-sm text-gray-400 font-medium tracking-tight">The most trusted wallet</span>
                                                            </div>
                                                        </div>
                                                        <ChevronRight className="text-gray-300 group-hover:text-[#00baf2] group-hover:translate-x-1 transition-all" size={24} />
                                                    </button>
                                                </>
                                            ) : (
                                                <div className="space-y-4">
                                                    <div className="flex items-center justify-between mb-6">
                                                        <div className="flex items-center gap-3">
                                                            {activeUpiApp === 'PhonePe' && (
                                                                <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm overflow-hidden">
                                                                    <img
                                                                        src="https://freepnglogo.com/images/all_img/1707313013phonepe-logo-round-icon.png"
                                                                        alt="PhonePe"
                                                                        className="w-full h-full object-cover"
                                                                        onError={(e) => {
                                                                            e.target.style.display = 'none';
                                                                            e.target.parentElement.innerHTML = '<span style="color: #5f259f; font-weight: 900; font-size: 14px;">पे</span>';
                                                                        }}
                                                                    />
                                                                </div>
                                                            )}
                                                            {activeUpiApp === 'Google Pay' && (
                                                                <div className="w-14 h-14 rounded-2xl bg-white border border-gray-100 flex items-center justify-center p-2 shadow-sm">
                                                                    <img
                                                                        src="https://upload.wikimedia.org/wikipedia/commons/f/f2/Google_Pay_Logo.svg"
                                                                        alt="Google Pay"
                                                                        className="w-10 h-10 object-contain"
                                                                    />
                                                                </div>
                                                            )}
                                                            {activeUpiApp === 'Paytm' && (
                                                                <div className="w-14 h-14 rounded-2xl bg-[#00baf2]/5 flex items-center justify-center p-2.5 shadow-sm border border-[#00baf2]/10">
                                                                    <img
                                                                        src="https://upload.wikimedia.org/wikipedia/commons/2/24/Paytm_Logo_%28standalone%29.svg"
                                                                        alt="Paytm"
                                                                        className="w-full h-full object-contain"
                                                                    />
                                                                </div>
                                                            )}
                                                            <h3 className="text-lg font-bold text-gray-800">Enter {activeUpiApp} ID</h3>
                                                        </div>
                                                        <button
                                                            onClick={() => setActiveUpiApp(null)}
                                                            className="text-sm text-primary-600 font-bold hover:underline bg-orange-50 px-3 py-1 rounded-full"
                                                        >
                                                            Change App
                                                        </button>
                                                    </div>

                                                    <form onSubmit={handlePayment} className="space-y-4">
                                                        <div>
                                                            <input
                                                                type="text"
                                                                placeholder="e.g. 9876543210@ybl"
                                                                value={upiId}
                                                                onChange={(e) => {
                                                                    setUpiId(e.target.value);
                                                                    setUpiError('');
                                                                }}
                                                                className={`w-full bg-gray-50 border ${upiError ? 'border-red-500' : 'border-gray-200'} rounded-xl px-4 py-3 font-medium text-lg focus:outline-none focus:border-primary-500 focus:bg-white transition-all`}
                                                            />
                                                            {upiError && (
                                                                <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                                                                    <AlertCircle size={14} />
                                                                    {upiError}
                                                                </p>
                                                            )}
                                                        </div>

                                                        <button
                                                            type="submit"
                                                            disabled={isProcessing}
                                                            className="w-full btn-primary py-4 rounded-2xl font-bold mt-6 flex items-center justify-center gap-2"
                                                        >
                                                            {isProcessing ? (
                                                                <span>Processing...</span>
                                                            ) : (
                                                                <>
                                                                    <ShieldCheck size={20} />
                                                                    <span>Pay ₹{total.toFixed(2)}</span>
                                                                </>
                                                            )}
                                                        </button>
                                                    </form>
                                                </div>
                                            )}
                                        </motion.div>
                                    )}

                                    {/* BHIM QR Section */}
                                    {selectedMethod === 'bhim' && (
                                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center">
                                            <h3 className="text-lg font-bold text-gray-800 mb-6">Scan QR to Pay</h3>
                                            <div className="w-64 h-64 mx-auto bg-gray-100 rounded-2xl p-4 flex items-center justify-center mb-6">
                                                <img
                                                    src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=upi://pay?pa=dummy@upi&pn=FriendsRestaurant&am=${total}&cu=INR`}
                                                    alt="Payment QR"
                                                    className="w-full h-full opacity-90"
                                                />
                                            </div>
                                            <button
                                                onClick={handlePayment}
                                                disabled={isProcessing}
                                                className="w-full btn-primary py-4 rounded-2xl font-bold"
                                            >
                                                {isProcessing ? 'Processing Payment...' : 'I Have Paid'}
                                            </button>
                                        </motion.div>
                                    )}

                                    {/* Debit Card Section */}
                                    {selectedMethod === 'card' && (
                                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                                            <form
                                                onSubmit={handlePayment}
                                                className="space-y-4"
                                            >
                                                <div>
                                                    <label className="block text-sm font-bold text-gray-700 mb-2">Card Number</label>
                                                    <input
                                                        type="text"
                                                        maxLength="19"
                                                        placeholder="0000 0000 0000 0000"
                                                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 font-mono text-lg focus:outline-none focus:border-primary-500 focus:bg-white transition-all"
                                                        value={cardDetails.number}
                                                        onChange={(e) => {
                                                            const v = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
                                                            const parts = [];
                                                            for (let i = 0; i < v.length; i += 4) {
                                                                parts.push(v.substr(i, 4));
                                                            }
                                                            setCardDetails({ ...cardDetails, number: parts.join(' ') });
                                                        }}
                                                        required
                                                    />
                                                </div>
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div>
                                                        <label className="block text-sm font-bold text-gray-700 mb-2">Expiry Date</label>
                                                        <input
                                                            type="text"
                                                            maxLength="5"
                                                            placeholder="MM/YY"
                                                            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 font-mono text-lg focus:outline-none focus:border-primary-500 focus:bg-white transition-all"
                                                            value={cardDetails.expiry}
                                                            onChange={(e) => {
                                                                let v = e.target.value.replace(/[^0-9]/g, '');
                                                                if (v.length >= 2) v = v.substring(0, 2) + '/' + v.substring(2);
                                                                setCardDetails({ ...cardDetails, expiry: v });
                                                            }}
                                                            required
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-bold text-gray-700 mb-2">CVV</label>
                                                        <input
                                                            type="password"
                                                            maxLength="3"
                                                            placeholder="123"
                                                            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 font-mono text-lg focus:outline-none focus:border-primary-500 focus:bg-white transition-all"
                                                            value={cardDetails.cvv}
                                                            onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value.replace(/[^0-9]/g, '') })}
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-bold text-gray-700 mb-2">Card Holder Name</label>
                                                    <input
                                                        type="text"
                                                        placeholder="JOHN DOE"
                                                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 font-bold uppercase focus:outline-none focus:border-primary-500 focus:bg-white transition-all"
                                                        value={cardDetails.name}
                                                        onChange={(e) => setCardDetails({ ...cardDetails, name: e.target.value })}
                                                        required
                                                    />
                                                </div>

                                                <button
                                                    type="submit"
                                                    disabled={isProcessing}
                                                    className="w-full btn-primary py-4 rounded-2xl font-bold mt-6 flex items-center justify-center gap-2"
                                                >
                                                    {isProcessing ? (
                                                        <span>Processing...</span>
                                                    ) : (
                                                        <>
                                                            <ShieldCheck size={20} />
                                                            <span>Pay ₹{total.toFixed(2)}</span>
                                                        </>
                                                    )}
                                                </button>
                                            </form>
                                        </motion.div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Payment;
