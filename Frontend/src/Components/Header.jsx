import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom'; // <-- useLocation add kiya
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { 
    Search, User, ShoppingCart, Heart, Menu, Monitor, 
    Smartphone, ShieldCheck, Tv, Home, Plug, LogOut, 
    Package, History, Bell, Settings, ChevronDown
} from 'lucide-react';

function Header() {
    const { cart } = useContext(CartContext);
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation(); // <-- Current URL pata karne ke liye
    
    // === STICKY SCROLL STATE ===
    const [isSticky, setIsSticky] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsSticky(window.scrollY > 80);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const totalItems = cart ? cart.reduce((sum, item) => sum + item.quantity, 0) : 0;
    const totalPrice = cart ? cart.reduce((sum, item) => sum + (item.price * item.quantity), 0) : 0;

    const handleSignOut = () => {
        logout();
        alert("Signed out successfully!");
        navigate('/signin');
    };

    // === DYNAMIC ACTIVE LINK FUNCTION ===
    // Yeh function check karega ke current URL menu link se match karta hai ya nahi
    const getNavLinkClass = (path) => {
        // Agar home '/' hai tou exact match check karein, warna 'startsWith' check karein
        const isActive = path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);
        
        return isActive 
            ? "text-red-500 py-2 border-b-2 border-red-500 transition-all duration-300"
            : "text-gray-400 hover:text-white py-2 border-b-2 border-transparent transition-all duration-300";
    };

    // Legal Dropdown ke active state check
    const isLegalActive = location.pathname.match(/^\/(terms|privacy-policy|shipping-policy|return-policy)/);

    return (
        <header className="w-full bg-[#111111] text-white font-sans border-b border-gray-800">
            
            {/* --- 1. TOP ANNOUNCEMENT STRIP --- */}
            {!isSticky && (
                <div className="bg-red-600 text-white text-[10px] md:text-xs py-2 transition-all duration-300">
                    <div className="max-w-7xl mx-auto px-6 flex justify-between items-center tracking-widest uppercase font-bold">
                        <div className="flex gap-4 items-center">
                            <span className="bg-white/20 px-2 py-0.5 rounded text-white">🚚</span> Free Delivery on Orders Over Rs 5,000
                        </div>
                        <div className="hidden md:flex gap-4 items-center text-white/90 font-bold">
                            <Link to="/shipping-policy" className="hover:text-white cursor-pointer transition-colors">Fast Shipping</Link>
                            <span className="text-red-900/50">|</span>
                            <Link to="/return-policy" className="hover:text-white cursor-pointer transition-colors">Easy Returns</Link>
                            <span className="text-red-900/50">|</span>
                            <Link to="/contact" className="hover:text-white cursor-pointer transition-colors">Support 24/7</Link>
                        </div>
                    </div>
                </div>
            )}

            {/* --- 2. MAIN HEADER (Logo, Search, Actions) --- */}
            <div className={`w-full bg-[#111111] border-b border-gray-800 transition-all duration-300 z-50 ${isSticky ? 'fixed top-0 shadow-2xl py-2' : 'relative py-6'}`}>
                <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-between items-center gap-6">
                    {/* Logo */}
                    <Link to="/" className="shrink-0 group">
                        <img src="/logo.png" alt="Zarvix Digital Store" className={`${isSticky ? 'h-10' : 'h-16 md:h-20'} object-contain group-hover:scale-105 transition-all duration-300`} />
                    </Link>

                    {/* Search Bar */}
                    {!isSticky && (
                        <div className="grow max-w-2xl hidden md:flex items-center relative group">
                            <input
                                type="text"
                                placeholder="Search smartphones, laptops, accessories..."
                                className="w-full bg-[#1a1a1a] border border-gray-800 text-white px-5 py-3.5 rounded-l-xl focus:outline-none focus:border-red-600 focus:shadow-[0_0_20px_rgba(220,38,38,0.15)] transition-all duration-300 placeholder-gray-600 text-sm font-medium"
                            />
                            <button className="bg-red-600 px-8 py-3.5 rounded-r-xl hover:bg-red-700 transition-colors flex items-center justify-center border border-red-600 shadow-lg shadow-red-600/20">
                                <Search size={18} strokeWidth={2.5} />
                            </button>
                        </div>
                    )}

                    {/* Actions */}
                    <div className="flex items-center space-x-6 md:space-x-8">
                        
                        {/* Wishlist */}
                        {!isSticky && (
                            <Link to="/wishlist" className="flex flex-col items-center cursor-pointer group">
                                <div className="relative text-gray-400 group-hover:text-red-500 transition-colors mb-1">
                                    <Heart size={24} strokeWidth={1.5} />
                                    <span className="absolute -top-1 -right-2 bg-red-600 text-white text-[9px] font-bold w-4 h-4 flex items-center justify-center rounded-full shadow-sm">0</span>
                                </div>
                                <span className="text-[9px] text-gray-500 group-hover:text-white uppercase tracking-widest font-bold hidden sm:block transition-colors">Wishlist</span>
                            </Link>
                        )}

                        {/* Authentication / User Profile Dropdown */}
                        {user ? (
                            <div className="relative group cursor-pointer">
                                <div className="flex items-center gap-3">
                                    <div className="text-gray-400 group-hover:text-red-500 transition-colors p-2 bg-[#1a1a1a] rounded-full border border-gray-800 group-hover:border-red-500/50">
                                        <User size={20} strokeWidth={1.5} />
                                    </div>
                                    <div className="text-xs hidden lg:block">
                                        <p className="text-gray-500 uppercase tracking-widest text-[9px] mb-0.5">Welcome Back</p>
                                        <p className="font-bold text-gray-200 group-hover:text-white transition-colors line-clamp-1 max-w-25">{user.name}</p>
                                    </div>
                                </div>
                                
                                {/* User Dropdown Menu */}
                                <div className="absolute top-12 right-0 w-56 bg-white text-gray-800 shadow-2xl rounded-2xl overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 border border-gray-100 transform origin-top-right group-hover:scale-100 scale-95">
                                    <div className="p-4 border-b border-gray-50 bg-gray-50/50">
                                        <p className="font-black text-sm text-gray-900 line-clamp-1">{user.name}</p>
                                        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1">Verified Customer</p>
                                    </div>
                                    <ul className="flex flex-col py-2">
                                        <Link to="/profile" className="px-5 py-3 flex items-center gap-3 hover:bg-red-50 hover:text-red-600 transition-colors cursor-pointer text-sm font-bold"><Settings size={16} /> Manage Profile</Link>
                                        <Link to="/dashboard/orders" className="px-5 py-3 flex items-center gap-3 hover:bg-red-50 hover:text-red-600 transition-colors cursor-pointer text-sm font-bold"><Package size={16} /> Manage Orders</Link>
                                        <Link to="/dashboard/history" className="px-5 py-3 flex items-center gap-3 hover:bg-red-50 hover:text-red-600 transition-colors cursor-pointer text-sm font-bold"><History size={16} /> Order History</Link>
                                        <Link to="/dashboard/notifications" className="px-5 py-3 flex items-center gap-3 hover:bg-red-50 hover:text-red-600 transition-colors cursor-pointer text-sm font-bold"><Bell size={16} /> Notifications</Link>
                                        <Link to="/wishlist" className="px-5 py-3 flex items-center gap-3 hover:bg-red-50 hover:text-red-600 transition-colors cursor-pointer text-sm font-bold"><Heart size={16} /> My Favorites</Link>
                                    </ul>
                                    <div className="p-2 border-t border-gray-50">
                                        <button onClick={handleSignOut} className="w-full px-5 py-3 flex items-center gap-3 text-red-600 hover:bg-red-50 rounded-xl transition-colors cursor-pointer text-sm font-bold">
                                            <LogOut size={16} /> Sign Out
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <Link to="/signin" className="flex items-center gap-3 cursor-pointer group">
                                <div className="text-gray-400 group-hover:text-red-500 transition-colors p-2 bg-[#1a1a1a] rounded-full border border-gray-800 group-hover:border-red-500/50">
                                    <User size={20} strokeWidth={1.5} />
                                </div>
                                <div className="text-xs hidden lg:block">
                                    <p className="text-gray-500 uppercase tracking-widest text-[9px] mb-0.5">Welcome</p>
                                    <p className="font-bold text-gray-200 group-hover:text-white transition-colors">Sign In / Register</p>
                                </div>
                            </Link>
                        )}

                        {/* Cart */}
                        <Link to="/cart" className="flex items-center gap-3 cursor-pointer group">
                            <div className="relative text-gray-400 group-hover:text-red-500 transition-colors p-2 bg-[#1a1a1a] rounded-full border border-gray-800 group-hover:border-red-500/50">
                                <ShoppingCart size={20} strokeWidth={1.5} />
                                {totalItems > 0 && (
                                    <span className="absolute -top-1 -right-2 bg-red-600 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-[#111111] shadow-sm">
                                        {totalItems}
                                    </span>
                                )}
                            </div>
                            <div className="text-xs hidden sm:block">
                                <p className="text-gray-500 uppercase tracking-widest text-[9px] mb-0.5">My Cart</p>
                                <p className="font-bold text-gray-200 group-hover:text-white transition-colors">Rs {totalPrice.toLocaleString()}</p>
                            </div>
                        </Link>
                    </div>
                </div>

                {/* --- 3. STICKY NAV BAR (Categories & Links) --- */}
                <div className={`max-w-7xl mx-auto px-6 items-center justify-between ${isSticky ? 'hidden' : 'flex'} mt-4`}>
                    <div className="flex items-center gap-8">
                        
                        {/* Categories Dropdown */}
                        <div className="relative group">
                            <button className="bg-red-600 text-white px-6 py-3 rounded-xl shadow-lg shadow-red-600/20 flex items-center gap-3 hover:bg-red-700 transition-colors border border-red-500">
                                <Menu size={18} />
                                <span className="uppercase tracking-widest text-[11px] font-black">All Categories</span>
                            </button>
                            
                            <div className="absolute top-12 left-0 w-72 bg-white text-gray-800 shadow-2xl rounded-2xl overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 border border-gray-100 transform origin-top-left group-hover:scale-100 scale-95 pt-2">
                                <ul className="flex flex-col py-2">
                                    <Link to="/shop/Smart Security" className="px-6 py-3.5 flex items-center gap-4 hover:bg-red-50 hover:text-red-600 transition-colors cursor-pointer text-sm font-bold border-b border-gray-50">
                                        <ShieldCheck size={18} className="text-gray-400" /> Smart Security
                                    </Link>
                                    <Link to="/shop/Laptops & PCs" className="px-6 py-3.5 flex items-center gap-4 hover:bg-red-50 hover:text-red-600 transition-colors cursor-pointer text-sm font-bold border-b border-gray-50">
                                        <Monitor size={18} className="text-gray-400" /> Laptops & PCs
                                    </Link>
                                    <Link to="/shop/Home Appliances" className="px-6 py-3.5 flex items-center gap-4 hover:bg-red-50 hover:text-red-600 transition-colors cursor-pointer text-sm font-bold border-b border-gray-50">
                                        <Home size={18} className="text-gray-400" /> Home Appliances
                                    </Link>
                                    <Link to="/shop/LED TVs & Ent." className="px-6 py-3.5 flex items-center gap-4 hover:bg-red-50 hover:text-red-600 transition-colors cursor-pointer text-sm font-bold border-b border-gray-50">
                                        <Tv size={18} className="text-gray-400" /> LED TVs & Ent.
                                    </Link>
                                    <Link to="/shop/Accessories" className="px-6 py-3.5 flex items-center gap-4 hover:bg-red-50 hover:text-red-600 transition-colors cursor-pointer text-sm font-bold border-b border-gray-50">
                                        <Plug size={18} className="text-gray-400" /> Accessories
                                    </Link>
                                    <Link to="/shop/Smartphones" className="px-6 py-3.5 flex items-center gap-4 hover:bg-red-50 hover:text-red-600 transition-colors cursor-pointer text-sm font-bold">
                                        <Smartphone size={18} className="text-gray-400" /> Smartphones
                                    </Link>
                                </ul>
                            </div>
                        </div>
                        
                        {/* Navigation Links (Dynamic Animation Added Here) */}
                        <nav className="hidden lg:flex items-center space-x-8 text-[11px] tracking-[0.2em] uppercase font-black">
                            <Link to="/" className={getNavLinkClass('/')}>HOME</Link>
                            <Link to="/shop" className={getNavLinkClass('/shop')}>SHOP</Link>
                            <Link to="/shop" className={`${getNavLinkClass('/best-selling')} flex items-center gap-2`}>
                                BEST SELLING <span className="bg-orange-500 text-white text-[8px] px-1.5 py-0.5 rounded-full shadow-sm">HOT</span>
                            </Link>
                            <Link to="/about" className={getNavLinkClass('/about')}>ABOUT US</Link>
                            
                            {/* === LEGAL DROPDOWN === */}
                            <div className="relative group">
                                <button className={`${isLegalActive ? 'text-red-500 border-red-500' : 'text-gray-400 border-transparent'} hover:text-white py-2 border-b-2 flex items-center gap-1 uppercase transition-all duration-300`}>
                                    LEGAL <ChevronDown size={12} />
                                </button>
                                <div className="absolute top-8 left-0 w-48 bg-white text-gray-800 rounded-2xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 p-2 border border-gray-100">
                                    <Link to="/terms" className="block px-4 py-2 hover:bg-red-50 hover:text-red-600 rounded-lg text-xs font-bold transition-colors">Terms of Service</Link>
                                    <Link to="/privacy-policy" className="block px-4 py-2 hover:bg-red-50 hover:text-red-600 rounded-lg text-xs font-bold transition-colors">Privacy Policy</Link>
                                    <Link to="/shipping-policy" className="block px-4 py-2 hover:bg-red-50 hover:text-red-600 rounded-lg text-xs font-bold transition-colors">Shipping Policy</Link>
                                    <Link to="/return-policy" className="block px-4 py-2 hover:bg-red-50 hover:text-red-600 rounded-lg text-xs font-bold transition-colors">Refund Policy</Link>
                                </div>
                            </div>

                            <Link to="/contact" className={getNavLinkClass('/contact')}>CONTACT US</Link>
                        </nav>
                    </div>
                    
                    {/* Admin Panel Link */}
                    <Link to="/admin/login" className="hidden lg:flex items-center gap-2 text-gray-500 hover:text-red-500 text-[10px] tracking-[0.2em] uppercase font-black transition-colors">
                        Admin Panel <ShieldCheck size={14} />
                    </Link>
                </div>
            </div>
        </header>
    );
}

export default Header;