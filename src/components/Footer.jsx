import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Instagram, MessageCircle, Map, Star, CheckCircle2 } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300 font-sans border-t-4 border-primary-600">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

                    {/* Brand & About */}
                    <div className="space-y-6">
                        <h2 className="text-3xl font-display font-black text-white tracking-tight">
                            Friends<span className="text-primary-500">.</span>
                        </h2>
                        <p className="text-gray-400 leading-relaxed">
                            Friends Restaurant serves authentic Andhra-style veg & non-veg food, prepared with fresh ingredients and traditional recipes. We focus on quality, taste, and hygiene to give you a homely dining experience.
                        </p>
                    </div>

                    {/* Why Choose Us */}
                    <div>
                        <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                            <Star size={18} className="text-primary-500 fill-primary-500" />
                            Why Choose Us
                        </h3>
                        <ul className="space-y-4">
                            {[
                                "Authentic Andhra taste",
                                "Fresh & hygienic ingredients",
                                "Affordable prices",
                                "Fast service",
                                "Family-friendly environment"
                            ].map((item, index) => (
                                <li key={index} className="flex items-start gap-3 text-gray-400 group">
                                    <CheckCircle2 size={18} className="text-primary-500 mt-0.5 group-hover:text-white transition-colors" />
                                    <span className="group-hover:text-primary-400 transition-colors">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Location */}
                    <div>
                        <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                            <MapPin size={18} className="text-primary-500" />
                            Location
                        </h3>
                        <address className="not-italic space-y-4 text-gray-400">
                            <p className="font-medium text-white">Friends Restaurant</p>
                            <p className="leading-relaxed">
                                Near Madanapalli bus stand, beside of Apollo Pharmacy
                                <br />
                                517418
                            </p>
                            <a
                                href="https://maps.google.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-primary-500 hover:text-primary-400 font-medium transition-colors"
                            >
                                <Map size={16} />
                                <span>Get Directions</span>
                            </a>
                        </address>
                    </div>

                    {/* Contact & Follow */}
                    <div>
                        <h3 className="text-lg font-bold text-white mb-6 text-primary-500">Contact Us</h3>
                        <div className="space-y-6">
                            <ul className="space-y-4 font-medium">
                                <li>
                                    <a href="tel:9059116637" className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors group">
                                        <div className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center group-hover:bg-primary-600 transition-colors">
                                            <Phone size={16} className="text-primary-500 group-hover:text-white" />
                                        </div>
                                        <span>9059116637</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="mailto:friendsrestaurant@gmail.com" className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors group">
                                        <div className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center group-hover:bg-primary-600 transition-colors">
                                            <Mail size={16} className="text-primary-500 group-hover:text-white" />
                                        </div>
                                        <span>friendsrestaurant@gmail.com</span>
                                    </a>
                                </li>
                            </ul>

                            <div className="pt-4 border-t border-gray-800">
                                <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-wider text-xs">Follow Us</h4>
                                <div className="space-y-3">
                                    <a href="#" className="flex items-center gap-3 text-gray-400 hover:text-pink-500 transition-colors group">
                                        <Instagram size={20} className="group-hover:scale-110 transition-transform" />
                                        <span className="text-sm">ganesh_kumar_reddy_official</span>
                                    </a>
                                    <a href="https://wa.me/919059116637" className="flex items-center gap-3 text-gray-400 hover:text-green-500 transition-colors group">
                                        <MessageCircle size={20} className="group-hover:scale-110 transition-transform" />
                                        <span className="text-sm">+91 90591 16637</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Founder Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-16 mb-8 relative group"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-primary-600/0 via-primary-600/10 to-primary-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl"></div>
                    <div className="relative border border-gray-800 bg-gray-800/30 rounded-2xl p-8 text-center backdrop-blur-sm overflow-hidden">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-primary-500 to-transparent"></div>

                        <p className="text-primary-500 text-xs font-bold tracking-[0.2em] uppercase mb-3">Visionary Leadership</p>
                        <h3 className="text-2xl md:text-3xl font-display font-black text-white tracking-tight mb-1">
                            PEDDAJOLLU GANESH KUMAR REDDY
                        </h3>
                        <p className="text-gray-400 text-sm font-medium">Founder & Chairman</p>

                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/4 h-[1px] bg-gradient-to-r from-transparent via-primary-500/50 to-transparent"></div>
                    </div>
                </motion.div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
                    <p>
                        © {new Date().getFullYear()} <span className="text-white font-bold">Friends Restaurant</span>. All rights reserved.
                    </p>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
