
import React from 'react';
import { Plus, Minus, ShoppingBag, Star, Timer } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';

const FoodCard = ({ item }) => {
    const { cart, addToCart, updateQuantity } = useCart();
    const cartItem = cart.find((i) => i.id === item.id);

    const rating = React.useMemo(() => {
        return item.rating || (3.5 + Math.random() * 1.5).toFixed(1);
    }, [item.id]);

    return (
        <div
            className="group w-full h-full bg-white rounded-[2rem] p-4 shadow-md hover:shadow-xl transition-all flex flex-col gap-4 border border-orange-50"
        >
            {/* Image Container */}
            <div className="relative w-full aspect-[4/3] flex-shrink-0 rounded-2xl overflow-hidden shadow-sm bg-gray-100 border-b border-gray-50 isolate transform-gpu">
                <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                />

                {/* Rating Badge */}
                <div className="absolute top-3 right-3 z-10">
                    <div className="bg-white/95 backdrop-blur-sm text-gray-900 text-xs font-bold px-2.5 py-1.5 rounded-full shadow-sm flex items-center gap-1.5 ring-1 ring-black/5">
                        <span className="text-yellow-500">★</span>
                        <span>{rating}</span>
                    </div>
                </div>
            </div>

            {/* Content Info */}
            <div className="flex-1 flex flex-col pt-2">
                <div className="flex justify-between items-start gap-2 mb-2">
                    <h3 className="text-xl font-display font-bold text-gray-900 leading-tight line-clamp-2 capitalize">{item.name}</h3>
                    <span className="text-lg font-black text-primary-600 whitespace-nowrap">₹{item.price}</span>
                </div>

                <p className="text-sm text-gray-500 line-clamp-2 mb-4 leading-relaxed font-sans flex-1">{item.description}</p>

                <div className="flex items-center justify-between mt-auto pt-4 border-t border-dashed border-gray-100">
                    <div
                        className="flex items-center gap-1.5 text-green-700 bg-green-50 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border border-green-200 shadow-sm"
                    >
                        <Timer size={14} className="text-green-600 animate-bounce" />
                        <span>{parseInt(item.prepTime || '25')} min</span>
                    </div>

                    {/* Add to Cart Actions */}
                    <div>
                        {cartItem ? (
                            <div className="flex items-center bg-primary-600 text-white rounded-xl p-1 shadow-md shadow-primary-200">
                                <motion.button
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => updateQuantity(item.id, -1)}
                                    className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/20 transition-colors"
                                >
                                    <Minus size={16} strokeWidth={3} />
                                </motion.button>
                                <span className="font-bold text-sm min-w-[32px] text-center">{cartItem.quantity}</span>
                                <motion.button
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => updateQuantity(item.id, 1)}
                                    className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/20 transition-colors"
                                >
                                    <Plus size={16} strokeWidth={3} />
                                </motion.button>
                            </div>
                        ) : (
                            <motion.button
                                whileHover={{ scale: 1.05, y: -2, boxShadow: "0px 10px 15px rgba(234, 88, 12, 0.4)" }}
                                whileTap={{ scale: 0.95, y: 0 }}
                                onClick={() => addToCart(item)}
                                className="bg-gradient-to-r from-primary-500 to-primary-600 text-white font-bold text-sm py-2.5 px-6 rounded-xl shadow-lg shadow-primary-200 flex items-center gap-2 group/btn"
                            >
                                <ShoppingBag size={18} className="text-white fill-white/20" />
                                <span>ADD</span>
                            </motion.button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;
