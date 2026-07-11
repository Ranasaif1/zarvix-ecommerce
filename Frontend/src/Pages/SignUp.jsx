import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { User, Mail, Lock, Eye, EyeOff, UserPlus, Loader2 } from 'lucide-react';

function SignUp() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    
    // === FORM STATES ===
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Handle Input Changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle Form Submit (API Call)
    const handleSignUp = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            // Backend ko bhejne ke liye First Name aur Last Name ko jor diya
            const payload = {
                name: `${formData.firstName} ${formData.lastName}`.trim(),
                email: formData.email,
                password: formData.password
            };

            const response = await axios.post('http://localhost:8000/api/auth/register', payload);
            
            alert("Account Created Successfully! 🎉 Please Sign In.");
            navigate('/signin'); // Register hotay hi Sign In par bhej do
        } catch (err) {
            // Agar email pehle se exist karti ho ya koi aur masla ho
            setError(err.response?.data?.detail || "Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-[#f8f9fa] min-h-screen flex items-center justify-center py-20 px-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            <div className="bg-white max-w-lg w-full rounded-3xl shadow-[0_20px_50px_-10px_rgba(0,0,0,0.08)] border border-gray-100 p-8 md:p-10">
                
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight mb-2">Create Account</h1>
                    <p className="text-sm text-gray-500 font-light">Join Zarvix Digital for a premium experience</p>
                </div>

                {/* ERROR MESSAGE (Agar koi error aaye) */}
                {error && (
                    <div className="bg-red-50 border border-red-100 text-red-600 p-3 rounded-xl text-sm font-bold text-center mb-6">
                        {error}
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleSignUp} className="space-y-5">
                    
                    {/* Name Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">First Name</label>
                            <div className="relative">
                                <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input 
                                    type="text" 
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    required
                                    placeholder="Saif" 
                                    className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl pl-12 pr-4 py-3 text-sm focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 focus:bg-white transition-all"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Last Name</label>
                            <div className="relative">
                                <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input 
                                    type="text" 
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    required
                                    placeholder="Rehman" 
                                    className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl pl-12 pr-4 py-3 text-sm focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 focus:bg-white transition-all"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Email */}
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

                    {/* Password */}
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Password</label>
                        <div className="relative">
                            <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input 
                                type={showPassword ? "text" : "password"} 
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                minLength="8"
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
                        <p className="text-[10px] text-gray-400 mt-2 font-medium">Must be at least 8 characters long.</p>
                    </div>

                    <button 
                        type="submit" 
                        disabled={isLoading}
                        className="w-full bg-[#111111] text-white font-bold text-sm px-6 py-4 rounded-xl hover:bg-red-600 transition-colors shadow-md flex items-center justify-center gap-2 uppercase tracking-widest mt-6 disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                        {isLoading ? <Loader2 size={18} className="animate-spin" /> : <><UserPlus size={18} /> Create Account</>}
                    </button>
                </form>

                {/* Footer */}
                <div className="mt-8 text-center border-t border-gray-100 pt-6">
                    <p className="text-sm text-gray-500">
                        Already have an account?{' '}
                        <Link to="/signin" className="font-bold text-gray-900 hover:text-red-600 transition-colors">Sign in here</Link>
                    </p>
                </div>

            </div>
        </div>
    );
}

export default SignUp;