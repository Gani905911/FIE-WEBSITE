import React, { useState, useEffect } from 'react';
import FoodCard from '../components/FoodCard';
import { Search, Utensils, Coffee, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { db } from '../firebase';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { seedDatabase } from '../seedData';

const Home = () => {
    const [activeTab, setActiveTab] = useState('tiffins');
    const [searchQuery, setSearchQuery] = useState('');
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const tabs = [
        { id: 'tiffins', label: 'Tiffins', icon: <Coffee size={20} /> },
        { id: 'lunch', label: 'Lunch', icon: <Sun size={20} /> },
        { id: 'dinner', label: 'Dinner', icon: <Moon size={20} /> },
    ];

    // Seed Data Check
    const hasSeeded = React.useRef(false);
    useEffect(() => {
        if (!hasSeeded.current) {
            seedDatabase();
            hasSeeded.current = true;
        }
    }, []);

    // Fetch Products
    useEffect(() => {
        setLoading(true);
        const q = query(
            collection(db, 'food_items'),
            where('category', '==', activeTab)
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const items = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })).sort((a, b) => a.displayOrder - b.displayOrder);
            setProducts(items);
            setLoading(false);
        }, (error) => {
            console.error("Error fetching items:", error);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [activeTab]);

    const filteredItems = products.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen pb-20 bg-gray-100">
            {/* Hero Section */}
            <section className="relative h-[400px] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=1600"
                        className="w-full h-full object-cover brightness-[0.4]"
                        alt="Restaurant Background"
                    />
                </div>
                <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight"
                    >
                        Order Your <span className="text-primary-500">Favorite</span> Dish
                    </motion.h1>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="relative max-w-xl mx-auto"
                    >
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search for food items..."
                            className="w-full pl-12 pr-6 py-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all font-medium text-lg"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </motion.div>
                </div>
            </section>

            {/* Menu Tabs */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
                <div className="bg-white rounded-3xl p-3 shadow-xl border border-orange-50 flex flex-wrap gap-2 md:gap-4 justify-center">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => {
                                setActiveTab(tab.id);
                                setSearchQuery('');
                            }}
                            className={`flex items-center space-x-2 px-6 py-3 rounded-2xl font-bold transition-all duration-300 ${activeTab === tab.id
                                ? 'bg-primary-600 text-white shadow-lg shadow-primary-200'
                                : 'bg-orange-50 text-gray-500 hover:bg-orange-100'
                                }`}
                        >
                            {tab.icon}
                            <span>{tab.label}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Food Grid */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl font-black text-gray-800">
                        Our <span className="text-primary-600 capitalize">{activeTab}</span> Menu
                    </h2>
                    <div className="text-sm font-semibold text-gray-400 bg-gray-100 px-4 py-1.5 rounded-full">
                        {loading ? 'Loading...' : `${filteredItems.length} Items Found`}
                    </div>
                </div>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
                    </div>
                ) : filteredItems.length > 0 ? (
                    <motion.div
                        layout
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                    >
                        <AnimatePresence mode="popLayout">
                            {filteredItems.map((item) => (
                                <FoodCard key={item.id} item={item} />
                            ))}
                        </AnimatePresence>
                    </motion.div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                            <Utensils size={40} className="text-gray-300" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-800">No items found</h3>
                        <p className="text-gray-500">Try searching for something else!</p>
                    </div>
                )}
            </section>
        </div>
    );
};

export default Home;
