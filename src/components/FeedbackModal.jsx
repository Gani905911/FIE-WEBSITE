import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, X, MessageSquare, ThumbsUp, Heart, Send, Utensils, Smile, ChefHat } from 'lucide-react';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';

const FeedbackModal = ({ isOpen, onClose }) => {
    const { user } = useAuth();

    // Multi-criteria ratings
    const [foodRating, setFoodRating] = useState(0);
    const [serviceRating, setServiceRating] = useState(0);
    const [ambianceRating, setAmbianceRating] = useState(0);

    const [hoveredFood, setHoveredFood] = useState(0);
    const [hoveredService, setHoveredService] = useState(0);
    const [hoveredAmbiance, setHoveredAmbiance] = useState(0);

    const [comment, setComment] = useState('');
    const [tags, setTags] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const availableTags = [
        { id: 'spicy', label: 'Perfect Spice', icon: '🌶️' },
        { id: 'presentation', label: 'Great Presentation', icon: '🎨' },
        { id: 'healthy', label: 'Healthy Choice', icon: '🥗' },
        { id: 'value', label: 'Good Value', icon: '💰' },
        { id: 'friendly', label: 'Friendly Staff', icon: '🤝' }
    ];

    const toggleTag = (tagId) => {
        setTags(prev =>
            prev.includes(tagId) ? prev.filter(t => t !== tagId) : [...prev, tagId]
        );
    };

    const RatingRow = ({ label, icon: Icon, value, setValue, hovered, setHovered, colorClass }) => (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors">
            <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${colorClass} bg-opacity-10 text-opacity-100`}>
                    <Icon size={20} className={colorClass.replace('bg-', 'text-')} />
                </div>
                <span className="font-bold text-gray-700">{label}</span>
            </div>
            <div className="flex gap-1.5">
                {[1, 2, 3, 4, 5].map((star) => (
                    <motion.button
                        key={star}
                        type="button"
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        onMouseEnter={() => setHovered(star)}
                        onMouseLeave={() => setHovered(0)}
                        onClick={() => setValue(star)}
                        className="focus:outline-none relative p-1"
                    >
                        <Star
                            size={28}
                            className={`transition-all duration-300 drop-shadow-sm ${(hovered || value) >= star
                                    ? 'fill-yellow-400 text-yellow-400'
                                    : 'text-gray-300 fill-gray-200'
                                }`}
                            strokeWidth={2}
                        />
                    </motion.button>
                ))}
            </div>
        </div>
    );

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Calculate overall average
        const overallRating = Math.round((foodRating + serviceRating + ambianceRating) / 3);

        if (overallRating === 0) {
            alert("Please provide at least one rating!");
            return;
        }

        setIsSubmitting(true);

        try {
            await addDoc(collection(db, "feedback"), {
                userId: user?.uid || 'anonymous',
                userName: user?.name || 'Anonymous Guest',
                userEmail: user?.email || 'N/A',
                rating: overallRating, // Main rating for summary
                details: {
                    food: foodRating,
                    service: serviceRating,
                    ambiance: ambianceRating
                },
                tags,
                comment,
                createdAt: serverTimestamp(),
                date: new Date().toLocaleString()
            });

            setShowSuccess(true);
            setTimeout(() => {
                setShowSuccess(false);
                onClose();
                setFoodRating(0);
                setServiceRating(0);
                setAmbianceRating(0);
                setComment('');
                setTags([]);
            }, 2500);
        } catch (error) {
            console.error("Error submitting feedback:", error);
            alert("Failed to submit feedback. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
                    {/* Click outside to close */}
                    <div className="absolute inset-0" onClick={onClose}></div>

                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 50, scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 350, damping: 25 }}
                        className="bg-white rounded-3xl w-full max-w-[500px] shadow-2xl overflow-hidden relative z-10 flex flex-col max-h-[90vh]"
                    >
                        {showSuccess ? (
                            <div className="p-12 flex flex-col items-center justify-center text-center h-[500px]">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: "spring", stiffness: 200, damping: 12 }}
                                    className="w-28 h-28 bg-green-50 rounded-full flex items-center justify-center mb-8 relative"
                                >
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                        className="absolute inset-0 border-4 border-dashed border-green-200 rounded-full"
                                    />
                                    <ThumbsUp size={56} className="text-green-500" fill="currentColor" />
                                </motion.div>
                                <h3 className="text-3xl font-black text-gray-900 mb-2">Thank You!</h3>
                                <p className="text-gray-500 font-medium max-w-[200px]">Your feedback makes us better every day.</p>
                            </div>
                        ) : (
                            <>
                                {/* Professional Header */}
                                <div className="bg-white px-8 py-6 border-b border-gray-100 flex justify-between items-center sticky top-0 z-20">
                                    <div>
                                        <h2 className="text-2xl font-black text-gray-800 tracking-tight">Feedback Form</h2>
                                        <p className="text-sm font-medium text-gray-400">Share your dining experience</p>
                                    </div>
                                    <button
                                        onClick={onClose}
                                        className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-100 transition-colors"
                                    >
                                        <X size={20} />
                                    </button>
                                </div>

                                <form onSubmit={handleSubmit} className="overflow-y-auto p-8 space-y-8 custom-scrollbar">

                                    {/* Categorized Ratings */}
                                    <div className="space-y-4">
                                        <RatingRow
                                            label="Food Quality"
                                            icon={Utensils}
                                            value={foodRating}
                                            setValue={setFoodRating}
                                            hovered={hoveredFood}
                                            setHovered={setHoveredFood}
                                            colorClass="bg-orange-500"
                                        />
                                        <RatingRow
                                            label="Service"
                                            icon={Smile}
                                            value={serviceRating}
                                            setValue={setServiceRating}
                                            hovered={hoveredService}
                                            setHovered={setHoveredService}
                                            colorClass="bg-blue-500"
                                        />
                                        <RatingRow
                                            label="Ambiance"
                                            icon={ChefHat}
                                            value={ambianceRating}
                                            setValue={setAmbianceRating}
                                            hovered={hoveredAmbiance}
                                            setHovered={setHoveredAmbiance}
                                            colorClass="bg-rose-500"
                                        />
                                    </div>

                                    {/* Highlights Tags */}
                                    <div>
                                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Highlights</label>
                                        <div className="flex flex-wrap gap-2">
                                            {availableTags.map((tag) => (
                                                <motion.button
                                                    key={tag.id}
                                                    type="button"
                                                    whileTap={{ scale: 0.95 }}
                                                    onClick={() => toggleTag(tag.id)}
                                                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border flex items-center gap-2
                                                        ${tags.includes(tag.id)
                                                            ? 'bg-gray-800 text-white border-gray-800 shadow-md'
                                                            : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
                                                        }`}
                                                >
                                                    <span>{tag.icon}</span>
                                                    {tag.label}
                                                </motion.button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Comment Textarea */}
                                    <div>
                                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Additional Comments</label>
                                        <textarea
                                            value={comment}
                                            onChange={(e) => setComment(e.target.value)}
                                            placeholder="Tell us more about your visit..."
                                            className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-primary-500 focus:bg-white outline-none min-h-[100px] text-sm resize-none font-medium text-gray-700"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full bg-primary-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-primary-200 hover:bg-primary-700 hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 active:scale-95"
                                    >
                                        {isSubmitting ? (
                                            <span className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        ) : (
                                            <>
                                                Submit Feedback
                                                <Send size={18} />
                                            </>
                                        )}
                                    </button>
                                </form>
                            </>
                        )}
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default FeedbackModal;
