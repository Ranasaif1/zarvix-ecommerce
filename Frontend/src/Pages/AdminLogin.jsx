import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios
import { Lock, Mail, Eye, EyeOff, ShieldAlert, ArrowLeft, Loader2 } from 'lucide-react'; 

function AdminLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false); // 🔥 Loading state add ki
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleAdminLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // Backend se check karo
            const response = await axios.post('http://localhost:8000/api/admin/login', {
                email: email,
                password: password
            });

            if (response.data.message === "Success") {
                localStorage.setItem('isAdminLoggedIn', 'true'); // 🔥 Ye line add karein
                alert("Admin Access Granted! Welcome back, Saif.");
                navigate('/admin');
            } else {
                alert("Access Denied: " + (response.data.error || "Incorrect Credentials"));
            }
        } catch (error) {
            console.error("Login Error:", error);
            alert("Connection error! Check karo ke backend chal raha hai.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-[#050505] min-h-screen flex items-center justify-center py-20 px-4 relative overflow-hidden" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-600/20 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="bg-[#111111] max-w-md w-full rounded-3xl shadow-2xl border border-gray-800 p-8 md:p-10 relative z-10">
                <div className="text-center mb-10">
                    <ShieldAlert size={48} className="mx-auto text-red-600 mb-4" />
                    <h1 className="text-2xl font-black text-white tracking-tight mb-2">ZARVIX ADMIN</h1>
                    <p className="text-xs text-gray-500 font-bold tracking-[0.2em] uppercase">Control Center Panel</p>
                </div>

                <form onSubmit={handleAdminLogin} className="space-y-6">
                    <div>
                        <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Admin Email</label>
                        <div className="relative">
                            <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                            <input 
                                type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                                placeholder="admin@zarvix.com" 
                                className="w-full bg-[#1a1a1a] border border-gray-800 text-white rounded-xl pl-12 pr-4 py-3 text-sm focus:outline-none focus:border-red-600 transition-colors"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Master Password</label>
                        <div className="relative">
                            <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                            <input 
                                type={showPassword ? "text" : "password"} required value={password} onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••" 
                                className="w-full bg-[#1a1a1a] border border-gray-800 text-white rounded-xl pl-12 pr-12 py-3 text-sm focus:outline-none focus:border-red-600 transition-colors"
                            />
                            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white">
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    <button 
                        type="submit" disabled={isLoading}
                        className="w-full bg-red-600 text-white font-bold text-sm px-6 py-4 rounded-xl hover:bg-red-700 transition-colors shadow-md flex items-center justify-center gap-2 uppercase tracking-widest mt-4 disabled:opacity-50"
                    >
                        {isLoading ? <><Loader2 size={18} className="animate-spin" /> Authenticating...</> : <><Lock size={18} /> Authenticate</>}
                    </button>
                </form>

                <div className="mt-8 pt-6 border-t border-gray-800 text-center">
                    <button onClick={() => navigate('/')} className="text-gray-500 hover:text-white text-xs font-bold flex items-center justify-center gap-2 transition-colors mx-auto uppercase tracking-widest">
                        <ArrowLeft size={14} /> Back to Storefront
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AdminLogin;