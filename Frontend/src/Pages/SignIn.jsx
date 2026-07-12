import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Mail, Lock, Eye, EyeOff, LogIn, Loader2 } from 'lucide-react';
import { AuthContext } from '../context/AuthContext'; // Auth Context lazmi import karein

function SignIn() {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    
    // === AUTH & API STATES ===
    const { login } = useContext(AuthContext); // Context se login function liyq
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Handle Input
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle Login API Call
    const handleSignIn = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const response = await axios.post('https://zarvix-ecommerce.vercel.app/api/auth/login', formData);
            
            // Backend se aane wala data aur token Context mein save karein
            login(response.data.user, response.data.access_token);
            
            alert("Sign In Successful! 🎉 Redirecting...");
            navigate('/'); // Login ke baad Homepage par bhej dein
        } catch (err) {
            // Agar credentials galat hon
            setError(err.response?.data?.detail || "Invalid Email or Password. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-[#f8f9fa] min-h-screen flex items-center justify-center py-20 px-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            <div className="bg-white max-w-md w-full rounded-3xl shadow-[0_20px_50px_-10px_rgba(0,0,0,0.08)] border border-gray-100 p-8 md:p-10">
                
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight mb-2">Welcome Back</h1>
                    <p className="text-sm text-gray-500 font-light">Sign in to your Zarvix Digital account</p>
                </div>

                {/* ERROR MESSAGE ALERT */}
                {error && (
                    <div className="bg-red-50 border border-red-100 text-red-600 p-3 rounded-xl text-sm font-bold text-center mb-6">
                        {error}
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleSignIn} className="space-y-6">
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Email Address</label>
                        <div className="relative">
                            <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input 
                                type="email" 
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                placeholder="you@example.com" 
                                className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl pl-12 pr-4 py-3 text-sm focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 focus:bg-white transition-all"
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest">Password</label>
                            <Link to="/forgot-password" className="text-xs font-bold text-red-600 hover:text-black transition-colors">Forgot?</Link>
                        </div>
                        <div className="relative">
                            <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input 
                                type={showPassword ? "text" : "password"} 
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                placeholder="••••••••" 
                                className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl pl-12 pr-12 py-3 text-sm focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 focus:bg-white transition-all"
                            />
                            <button 
                                type="button" 
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-900 transition-colors"
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    <button 
                        type="submit" 
                        disabled={isLoading}
                        className="w-full bg-red-600 text-white font-bold text-sm px-6 py-4 rounded-xl hover:bg-black transition-colors shadow-md flex items-center justify-center gap-2 uppercase tracking-widest mt-4 disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                        {isLoading ? <Loader2 size={18} className="animate-spin" /> : <><LogIn size={18} /> Sign In</>}
                    </button>
                </form>

                {/* Footer */}
                <div className="mt-8 text-center border-t border-gray-100 pt-6">
                    <p className="text-sm text-gray-500">
                        Don't have an account?{' '}
                        <Link to="/signup" className="font-bold text-gray-900 hover:text-red-600 transition-colors">Create one now</Link>
                    </p>
                </div>

            </div>
        </div>
    );
}

export default SignIn;