import React, { useState, useEffect } from 'react'; // Missing import added
import { Link, useLocation } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, CheckCircle, Truck, ShieldCheck, MessageCircle, ArrowRight } from 'lucide-react';

function Footer() {
    // 1. Testimonials Data & State
    const testimonials = [
        { text: "Zarvix gadgets are premium and top-quality!", name: "Jems Dons", role: "Marketing" },
        { text: "Fast delivery and excellent customer support, highly recommended.", name: "Sarah Khan", role: "Designer" },
        { text: "A trustworthy store, perfect for every tech lover.", name: "Ali Ahmed", role: "Developer" }
    ];

    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % testimonials.length);
        }, 3000);
        return () => clearInterval(timer);
    }, []);

    // 2. URL Location Check (For hiding newsletter on Home)
    const location = useLocation();
    const isHomePage = location.pathname === '/';

    return (
        <footer className="bg-[#111111] text-gray-300 mt-auto">

            

            {/* ⭐ 1. NEWSLETTER (Hidden on Home Page) */}
            {!isHomePage && (
                <div className="bg-[#ffffff] py-12 border-b border-gray-200">
                    <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
                        <div>
                            <h4 className="text-3xl font-black text-[#111111] tracking-tight mb-2">Stay Updated with Zarvix</h4>
                            <p className="text-sm text-gray-500 font-light">
                                Subscribe to receive exclusive offers, new arrivals, and the latest technology updates.
                            </p>
                        </div>
                        <form className="flex flex-col sm:flex-row gap-0 w-full md:w-auto shadow-lg rounded-md overflow-hidden">
                            <input 
                                type="email"
                                placeholder="Enter your email address" 
                                className="px-6 py-4 bg-gray-50 border-none outline-none w-full md:w-80 text-[#111111] focus:bg-white transition-colors text-sm" 
                                required
                            />
                            <button className="bg-red-600 hover:bg-[#b80000] text-white px-8 py-4 font-bold uppercase tracking-widest text-[10px] transition-colors whitespace-nowrap">
                                Subscribe Now
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* ⭐ 10. TRUSTED PROMISE STRIP (Moved INSIDE return) */}
            <div className="bg-[#0a0a0a] border-b border-gray-800 py-6">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-x divide-gray-800">
                    <div className="flex flex-col items-center gap-2">
                        <CheckCircle className="text-red-600" size={24} strokeWidth={1.5} />
                        <span className="text-[10px] uppercase tracking-widest font-bold text-gray-300">Genuine Products</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <Truck className="text-red-600" size={24} strokeWidth={1.5} />
                        <span className="text-[10px] uppercase tracking-widest font-bold text-gray-300">Fast Nationwide Delivery</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <ShieldCheck className="text-red-600" size={24} strokeWidth={1.5} />
                        <span className="text-[10px] uppercase tracking-widest font-bold text-gray-300">Secure Checkout</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <MessageCircle className="text-red-600" size={24} strokeWidth={1.5} />
                        <span className="text-[10px] uppercase tracking-widest font-bold text-gray-300">Friendly Support</span>
                    </div>
                </div>
            </div>

            {/* 2. Main Footer Grid (5 Columns) */}
            <div className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">

                {/* Column 1: Logo & Intro */}
                <div className="pr-4">
                    <Link to="/" className="block mb-6">
                        <img src="/logo.png" alt="Zarvix Digital" className="h-16 w-auto object-contain drop-shadow-md" />
                    </Link>
                    <p className="text-gray-400 text-sm leading-relaxed font-light">
                        Zarvix Digital is your trusted destination for premium electronics, smart gadgets, and innovative technology. We deliver quality products, competitive prices, and exceptional customer service.
                    </p>
                </div>

                {/* Column 2: Products */}
                <div>
                    <h3 className="text-white text-lg font-black tracking-wider uppercase mb-6 flex items-center gap-2">
                        <span className="w-1.5 h-5 bg-red-600 block"></span> Products
                    </h3>
                    <ul className="space-y-4 text-sm font-light text-gray-400">
                        {['Categories', 'New Arrivals', 'Best Sellers', 'Prices Drop', 'Sitemap'].map((item, idx) => (
                            <li key={idx}>
                                <Link to="/" className="hover:text-red-500 hover:translate-x-2 transition-all duration-300 flex items-center gap-2 group">
                                    <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all duration-300" />
                                    {item}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Column 3: Our Company */}
                <div>
                    <h3 className="text-white text-lg font-black tracking-wider uppercase mb-6 flex items-center gap-2">
                        <span className="w-1.5 h-5 bg-red-600 block"></span> Our Company
                    </h3>
                    <ul className="space-y-4 text-sm font-light text-gray-400">
                        {[
                            { name: 'About Us', path: '/about' },
                            { name: 'Contact Us', path: '/contact' },
                            { name: 'Shipping Policy', path: '/shipping-policy' },
                            { name: 'Return Policy', path: '/return-policy' },
                            { name: 'Privacy Policy', path: '/privacy-policy' },
                            { name: 'Terms & Conditions', path: '/terms' }
                        ].map((item, idx) => (
                            <li key={idx}>
                                <Link to={item.path} className="hover:text-red-500 hover:translate-x-2 transition-all duration-300 flex items-center gap-2 group">
                                    <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all duration-300" />
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Column 4: Contact Info */}
                <div>
                    <h3 className="text-white text-lg font-black tracking-wider uppercase mb-6 flex items-center gap-2">
                        <span className="w-1.5 h-5 bg-red-600 block"></span> Reach Us
                    </h3>
                    <ul className="space-y-5 text-sm font-light text-gray-400">
                        <li className="flex items-start gap-4 hover:text-white transition-colors">
                            <MapPin className="text-red-600 shrink-0 mt-0.5" size={18} />
                            <span>Karachi, Sindh,<br />Pakistan</span>
                        </li>
                        <li className="flex items-center gap-4 hover:text-white transition-colors">
                            <Phone className="text-red-600 shrink-0" size={18} />
                            <span>+92 300 1234567</span>
                        </li>
                        <li className="flex items-center gap-4 hover:text-white transition-colors">
                            <Mail className="text-red-600 shrink-0" size={18} />
                            <span>support@zarvix.com</span>
                        </li>
                        <li className="flex items-center gap-4 hover:text-white transition-colors">
                            <Clock className="text-red-600 shrink-0" size={18} />
                            <span>Mon – Sat | 9:00 AM – 7:00 PM</span>
                        </li>
                    </ul>
                </div>

                {/* Column 5: Testimonials Slider */}
                <div className="bg-[#1a1a1a] p-6 rounded-md shadow-lg border border-gray-800 text-center h-62.5 flex flex-col justify-between">
                    <h3 className="text-red-600 text-lg font-semibold mb-4">What They Say</h3>
                    <div className="grow flex items-center justify-center">
                        <p className="text-sm text-gray-300 italic transition-opacity duration-500">
                            "{testimonials[index].text}"
                        </p>
                    </div>
                    <div className="mt-4">
                        <p className="text-red-600 font-bold text-sm">{testimonials[index].name}</p>
                        <p className="text-xs text-gray-500 uppercase tracking-widest">{testimonials[index].role}</p>
                    </div>
                    <div className="flex justify-center gap-2 mt-6">
                        {testimonials.map((_, i) => (
                            <span key={i} className={`w-2.5 h-2.5 rounded-full transition-colors ${i === index ? 'bg-red-600' : 'bg-gray-600'}`} />
                        ))}
                    </div>
                </div>

            </div>

            {/* Bottom Red Bar */}
            <div className="bg-red-600 py-4">
                <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4 text-white text-sm">
                    
                    {/* Social Icons */}
                    <div className="flex space-x-3">
                        <a href="#" className="w-9 h-9 flex items-center justify-center bg-white text-red-600 rounded-full hover:bg-black hover:text-white hover:scale-110 transition-all duration-300 shadow-lg font-bold">𝕏</a>
                        <a href="#" className="w-9 h-9 flex items-center justify-center bg-white text-red-600 rounded-full hover:bg-linear-to-tr hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888] hover:text-white hover:scale-110 transition-all duration-300 shadow-lg font-bold">ig</a>
                        <a href="#" className="w-9 h-9 flex items-center justify-center bg-white text-red-600 rounded-full hover:bg-[#0A66C2] hover:text-white hover:scale-110 transition-all duration-300 shadow-lg font-bold">in</a>
                        <a href="#" className="w-9 h-9 flex items-center justify-center bg-white text-red-600 rounded-full hover:bg-[#FF0000] hover:text-white hover:scale-110 transition-all duration-300 shadow-lg font-bold">▶</a>
                        <a href="#" className="w-9 h-9 flex items-center justify-center bg-white text-red-600 rounded-full hover:bg-[#1877F2] hover:text-white hover:scale-110 transition-all duration-300 shadow-lg font-bold">f</a>
                    </div>

                    {/* Copyright */}
                    <div className="text-white  text-xs font-light text-center">
                        © 2026 Zarvix Digital. All Rights Reserved.
                    </div>

                    {/* Payment Icons */}
                    <div className="flex flex-wrap justify-center gap-2">
                        {['VISA', 'MASTERCARD', 'PAYPAK', 'JAZZCASH', 'EASYPAISA'].map(method => (
                            <span key={method} className="bg-white text-black border border-gray-800 px-3 py-1.5 rounded-sm text-[8px] font-black tracking-widest uppercase hover:text-white hover:border-red-600 transition-colors cursor-default">
                                {method}
                            </span>
                        ))}  {/* Missing closing tag added here */}
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;