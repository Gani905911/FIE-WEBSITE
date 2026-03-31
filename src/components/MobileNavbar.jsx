
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, ShoppingBag, ClipboardList, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const MobileNavbar = () => {
    const { user } = useAuth();
    const { cart } = useCart();
    const location = useLocation();

    if (!user || user.role !== 'customer') return null;

    const isActive = (path) => location.pathname === path;

    const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-50 px-6 py-2 pb-safe">
            <div className="flex justify-between items-center">
                <Link to="/" className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${isActive('/') ? 'text-primary-600' : 'text-gray-400 hover:text-gray-600'}`}>
                    <Home size={24} strokeWidth={isActive('/') ? 2.5 : 2} fill={isActive('/') ? "currentColor" : "none"} className={isActive('/') ? "opacity-20 translate-y-[-2px]" : ""} />
                    {isActive('/') && <span className="absolute mt-1 text-primary-600"><Home size={24} strokeWidth={2.5} /></span>}
                    {!isActive('/') && <Home size={24} />}
                    <span className="text-[10px] font-bold">Home</span>
                </Link>

                <Link to="/my-orders" className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${isActive('/my-orders') ? 'text-primary-600' : 'text-gray-400 hover:text-gray-600'}`}>
                    <ClipboardList size={24} strokeWidth={isActive('/my-orders') ? 2.5 : 2} />
                    <span className="text-[10px] font-bold">History</span>
                </Link>

                <Link to="/cart" className={`relative flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${isActive('/cart') ? 'text-primary-600' : 'text-gray-400 hover:text-gray-600'}`}>
                    <div className="relative">
                        <ShoppingBag size={24} strokeWidth={isActive('/cart') ? 2.5 : 2} fill={isActive('/cart') ? "currentColor" : "none"} className={isActive('/cart') ? "opacity-20" : ""} />
                        {isActive('/cart') && <span className="absolute top-0 left-0 text-primary-600"><ShoppingBag size={24} strokeWidth={2.5} /></span>}
                        {cartCount > 0 && (
                            <span className="absolute -top-1.5 -right-1.5 bg-primary-600 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full border border-white">
                                {cartCount}
                            </span>
                        )}
                    </div>
                    <span className="text-[10px] font-bold">Cart</span>
                </Link>

                <Link to="/profile" className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${isActive('/profile') ? 'text-primary-600' : 'text-gray-400 hover:text-gray-600'}`}>
                    {/* Placeholder for future profile page if needed, or link to somewhere else. For now let's just use it as a 'More' or 'Profile' indicator even if it goes to home or just shows info */}
                    {/* Actually, user might want to logout on mobile. Let's make this a Logout or Profile button if we have a profile page. We don't have a profile page. Let's redirect to standard Profile or just keep Home/Orders/Cart for now. */}
                    {/* Let's stick to 3 items for simplicity and maximizing space, or add User if we had a profile page. */}
                </Link>
            </div>
            {/* Simple 3-item layout centered */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none flex justify-between px-6 py-2 pb-safe opacity-0">
                {/* phantom spacing helper */}
            </div>
        </div>
    );
};

// Re-writing the return for strictly 3 items since we don't have a profile page yet
const MobileNavbarFinal = () => {
    const { user } = useAuth();
    const { cart } = useCart();
    const location = useLocation();

    if (!user || user.role !== 'customer') return null;

    const isActive = (path) => location.pathname === path;
    const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-[420px] bg-white/90 backdrop-blur-md border border-white/20 shadow-2xl rounded-2xl z-50 px-6 py-3 flex justify-around items-center ring-1 ring-black/5">
            <Link to="/" className={`flex flex-col items-center gap-0.5 min-w-[64px] ${isActive('/') ? 'text-primary-600' : 'text-gray-400'}`}>
                <Home size={22} strokeWidth={isActive('/') ? 3 : 2} fill={isActive('/') ? "currentColor" : "none"} className={isActive('/') ? "fill-primary-100" : ""} />
                <span className="text-[10px] font-bold">Home</span>
            </Link>

            <Link to="/my-orders" className={`flex flex-col items-center gap-0.5 min-w-[64px] ${isActive('/my-orders') ? 'text-primary-600' : 'text-gray-400'}`}>
                <ClipboardList size={22} strokeWidth={isActive('/my-orders') ? 3 : 2} />
                <span className="text-[10px] font-bold">Orders</span>
            </Link>

            <Link to="/cart" className={`relative flex flex-col items-center gap-0.5 min-w-[64px] ${isActive('/cart') ? 'text-primary-600' : 'text-gray-400'}`}>
                <div className="relative">
                    <ShoppingBag size={22} strokeWidth={isActive('/cart') ? 3 : 2} fill={isActive('/cart') ? "currentColor" : "none"} className={isActive('/cart') ? "fill-primary-100" : ""} />
                    {cartCount > 0 && (
                        <span className="absolute -top-1.5 -right-1.5 bg-primary-600 text-white text-[9px] font-bold w-4 h-4 flex items-center justify-center rounded-full border-2 border-white">
                            {cartCount}
                        </span>
                    )}
                </div>
                <span className="text-[10px] font-bold">Cart</span>
            </Link>
        </div>
    );
}

export default MobileNavbarFinal;
