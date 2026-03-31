import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, UserCircle, Eye, EyeOff, Chrome } from 'lucide-react';
import { motion } from 'framer-motion';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [role, setRole] = useState('customer'); // customer or chef
    const [isLoginMode, setIsLoginMode] = useState(false); // Default to Signup as per request? Or Login?
    // User requested: "signup first then login already have an login account"
    // So default is Signup (false).

    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [agreeToTerms, setAgreeToTerms] = useState(false);

    const { login, signup, user, googleLogin } = useAuth();
    const navigate = useNavigate();

    // Redirect when user is authenticated
    useEffect(() => {
        if (user) {
            if (user.role === 'chef') {
                navigate('/chef-dashboard');
            } else {
                navigate('/');
            }
        }
    }, [user, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic validation
        if (!email.includes('@')) {
            alert('Please enter a valid email address');
            return;
        }

        if (password.length < 6) {
            alert('Password must be at least 6 characters');
            return;
        }

        // Validation
        if (!isLoginMode && name.length < 3) {
            alert('Please enter your full name (min 3 chars)');
            return;
        }

        if (!isLoginMode && !agreeToTerms) {
            alert('Please agree to the Terms and Conditions');
            return;
        }

        setIsLoading(true);
        try {
            if (isLoginMode) {
                try {
                    await login(email, password);
                } catch (loginError) {
                    // Special handling for the main chef account: Auto-signup if not found
                    if (email === 'chef@friends.com') {
                        await signup(email, password, 'Master Chef', 'chef');
                    } else {
                        throw loginError;
                    }
                }
            } else {
                await signup(email, password, name, role);
            }
            // Navigation is now handled by the useEffect above reacting to user state change
        } catch (error) {
            console.error(error);
            alert(error.message || 'Authentication failed');
            setIsLoading(false); // Only stop loading on error, otherwise let the redirect happen
        }
    };

    return (
        <div
            className="min-h-[calc(100vh-64px)] flex items-center justify-center p-4 relative bg-cover bg-center"
            style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=2070&auto=format&fit=crop')`
            }}
        >
            {/* Dark overlay with blur effect */}
            <div className="absolute inset-0 bg-black/40 backdrop-blur-md"></div>

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-sm bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-white/20 relative z-10"
            >
                <div className="p-6">
                    <div className="text-center mb-4">
                        <div className="w-12 h-12 bg-primary-600 rounded-2xl flex items-center justify-center shadow-lg shadow-primary-200 mx-auto mb-3 transform -rotate-6">
                            <span className="text-white font-black text-2xl">F</span>
                        </div>
                        <h2 className="text-xl font-black text-gray-900 mb-1">
                            {role === 'chef' ? (isLoginMode ? 'Kitchen Staff Access' : 'Join Kitchen Staff') : (isLoginMode ? 'Welcome Back' : 'Create Account')}
                        </h2>
                        <p className="text-gray-500 font-medium text-sm">
                            {role === 'chef'
                                ? (isLoginMode ? 'Please login to manage orders' : 'Sign up to join our team')
                                : (isLoginMode ? 'Login to continue ordering' : 'Sign up to start ordering')}
                        </p>
                        {role === 'customer' && isLoginMode && (
                            <p className="mt-2 text-gray-900 font-serif italic text-sm flex items-center justify-center gap-2">
                                <span>🎉</span> Taste the Happiness <span style={{ transform: 'scaleX(-1)' }}>🎉</span>
                            </p>
                        )}
                        {role === 'customer' && !isLoginMode && (
                            <p className="mt-2 text-gray-900 font-serif italic text-sm flex items-center justify-center gap-2">
                                <span>✨</span> Join the Feast <span>✨</span>
                            </p>
                        )}
                    </div>

                    <div className="flex p-0.5 bg-gray-100 rounded-xl mb-4">
                        <button
                            onClick={() => {
                                setRole('customer');
                                setIsLoginMode(true);
                                setEmail('');
                                setPassword('');
                                setName('');
                            }}
                            className={`flex-1 py-2 rounded-lg flex items-center justify-center gap-2 font-bold transition-all text-sm ${role === 'customer' ? 'bg-white text-primary-600 shadow-sm' : 'text-gray-500 hover:bg-white/50'
                                }`}
                        >
                            <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="Customer" className="w-5 h-5 object-contain" />
                            Customer
                        </button>
                        <button
                            onClick={() => {
                                setRole('chef');
                                setIsLoginMode(true);
                                setEmail('chef@friends.com');
                                setPassword('chef@friends');
                                setName('');
                            }}
                            className={`flex-1 py-2 rounded-lg flex items-center justify-center gap-2 font-bold transition-all text-sm ${role === 'chef' ? 'bg-white text-primary-600 shadow-sm' : 'text-gray-500 hover:bg-white/50'
                                }`}
                        >
                            <img src="https://cdn-icons-png.flaticon.com/512/1830/1830839.png" alt="Chef" className="w-5 h-5 object-contain" />
                            Staff
                        </button>
                    </div>

                    <motion.form
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        key={isLoginMode ? 'login' : 'signup'}
                        onSubmit={handleSubmit}
                        className="space-y-3"
                    >
                        {/* Show Name field if NOT in Login Mode (for both Customer and Chef) */}
                        {!isLoginMode && (
                            <div>
                                <label className="block text-xs font-bold text-gray-700 mb-1">Full Name</label>
                                <div className="relative">
                                    <UserCircle className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                    <input
                                        type="text"
                                        placeholder="Enter your name"
                                        className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-gray-50 border border-gray-100 focus:border-primary-500 focus:bg-white outline-none transition-all font-semibold text-sm"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                        disabled={isLoading}
                                    />
                                </div>
                            </div>
                        )}

                        <div>
                            <label className="block text-xs font-bold text-gray-700 mb-1">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input
                                    type="email"
                                    placeholder={role === 'chef' ? "Enter staff email" : "Enter your email"}
                                    className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-gray-50 border border-gray-100 focus:border-primary-500 focus:bg-white outline-none transition-all font-semibold text-sm"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    disabled={isLoading}
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-700 mb-1">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter your password"
                                    className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-gray-50 border border-gray-100 focus:border-primary-500 focus:bg-white outline-none transition-all font-semibold text-sm"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    disabled={isLoading}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        {isLoginMode && (
                            <div className="flex items-center justify-end">
                                <a href="#" className="text-xs font-semibold text-primary-600 hover:text-primary-700 hover:underline">
                                    Forgot Password?
                                </a>
                            </div>
                        )}

                        {!isLoginMode && (
                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    id="terms"
                                    checked={agreeToTerms}
                                    onChange={(e) => setAgreeToTerms(e.target.checked)}
                                    className="rounded text-primary-600 focus:ring-primary-500 w-4 h-4 border-gray-300"
                                />
                                <label htmlFor="terms" className="text-xs text-gray-600">
                                    I agree to the <a href="#" className="font-semibold text-primary-600 hover:underline">Terms & Conditions</a>
                                </label>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full btn-primary py-2.5 text-base flex items-center justify-center rounded-xl shadow-lg shadow-primary-200 mt-2"
                        >
                            {isLoading ? 'Processing...' : (isLoginMode ? 'Login' : 'Sign Up')}
                        </button>

                        <div className="relative flex py-2 items-center">
                            <div className="flex-grow border-t border-gray-200"></div>
                            <span className="flex-shrink-0 mx-4 text-gray-400 text-xs font-medium">Or continue with</span>
                            <div className="flex-grow border-t border-gray-200"></div>
                        </div>

                        <div className="flex gap-2">
                            <button
                                type="button"
                                onClick={async () => {
                                    setIsLoading(true);
                                    try {
                                        await googleLogin();
                                        // Navigate is handled by useEffect
                                    } catch (error) {
                                        console.error(error);
                                        alert("Google login failed");
                                        setIsLoading(false);
                                    }
                                }}
                                className="w-full py-2 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                                title="Google"
                            >
                                <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="Google" />
                                <span className="text-xs font-bold text-gray-600">Continue with Google</span>
                            </button>
                        </div>

                        {/* Toggle for Both Roles: HIDDEN for Chef to enforce direct login */}
                        {role !== 'chef' && (
                            <div className="text-center pt-2">
                                <button
                                    type="button"
                                    onClick={() => setIsLoginMode(!isLoginMode)}
                                    className="text-gray-500 font-bold hover:text-primary-600 transition-colors text-xs"
                                >
                                    {isLoginMode
                                        ? "Don't have an account? Sign Up"
                                        : "Already have an account? Login"}
                                </button>
                            </div>
                        )}
                    </motion.form>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
