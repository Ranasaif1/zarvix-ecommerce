import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Info, Truck, ShieldCheck, CheckCircle, Clock, MapPin, Star, Check } from 'lucide-react';

// Images Import (Aapke Canva/Local wale)
// Note: Apne local folder mein shopping bags wali image ko kisi achi "Gaming setup" ya "Laptop desk" image se replace kar lein.
import grid1 from '../assets/about-grid-1.png';
import grid2 from '../assets/about-grid-2.jpg';
import grid3 from '../assets/about-grid-3.png';
import grid4 from '../assets/about-grid-4.jpg';
import visionImg from '../assets/about-vision.png';
import statsBg from '../assets/about-stats-bg.png';

function About() {
    // Tabs State
    const [activeTab, setActiveTab] = useState('innovation');
    // Accordion State
    const [activeAccordion, setActiveAccordion] = useState(0);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Premium Content updated for Zarvix Digital Electronics Store
    const tabContent = {
        innovation:
            "Innovation drives everything we do. We carefully select the latest smartphones, laptops, smart home devices, gaming accessories, and premium electronics to help our customers stay connected, productive, and entertained with confidence.",

        quality:
            "Quality is the foundation of everything we do. We work with trusted suppliers to provide genuine electronics, competitive pricing, and dependable products that meet the highest standards of performance and durability.",

        customer:
            "Customer satisfaction is our highest priority. We are committed to secure shopping, transparent pricing, fast nationwide delivery, and responsive customer support to ensure every shopping experience is simple, safe, and enjoyable."
    };

    const accordions = [
        {
            title: "Our Vision",
            content:
                "To become Pakistan's leading online destination for premium electronics by delivering innovative technology, trusted brands, exceptional customer service, and an outstanding shopping experience."
        },
        {
            title: "Our Mission",
            content:
                "Our mission is to make premium technology accessible to everyone through genuine products, competitive pricing, secure shopping, and fast nationwide delivery while building long-term customer trust."
        },
        {
            title: "Customer Commitment",
            content:
                "Every order is handled with care from checkout to delivery. We are committed to providing quality products, transparent communication, secure payments, and responsive customer support before and after every purchase."
        }
    ];

    // Stats data
    const stats = [
        { num: "500+", label: "Premium Products" },
        { num: "1,000+", label: "Happy Customers" },
        { num: "99%", label: "Customer Satisfaction" },
        { num: "24/7", label: "Customer Support" }
    ];

    return (
        <div className="bg-[#f4f5f7] min-h-screen pb-24 font-sans" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            
            {/* --- 1. PREMIUM DARK HERO SECTION --- */}
            <div className="bg-[#050505] pt-32 pb-28 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(220,38,38,0.12),transparent_70%)] pointer-events-none"></div>
                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
                
                <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
                    <Info className="mx-auto text-red-600 mb-6 drop-shadow-[0_0_15px_rgba(220,38,38,0.5)]" size={56} strokeWidth={1.5} />
                    <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">ABOUT ZARVIX DIGITAL</h1>
                    <p className="text-red-500 font-bold tracking-[0.2em] uppercase text-xs mb-6">Technology That Powers Modern Life</p>
                    <p className="text-gray-400 font-light text-sm max-w-2xl mx-auto leading-relaxed mb-8">
                        At Zarvix Digital, we offer a carefully curated collection of premium electronics, smart gadgets, gaming accessories, and modern technology. Our goal is to provide genuine products, competitive prices, and a seamless shopping experience that customers can trust.
                    </p>
                    
                    {/* --- NEW TRUST BADGES --- */}
                    <div className="flex flex-col items-center justify-center gap-4">
                        <div className="flex items-center gap-1 text-yellow-400 drop-shadow-md">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} size={16} fill="currentColor" />
                            ))}
                            <span className="text-gray-300 ml-2 text-sm font-medium">Trusted by Hundreds of Customers</span>
                        </div>
                        <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-xs font-bold text-gray-400 uppercase tracking-widest">
                            <span className="flex items-center gap-1.5"><Check size={16} className="text-green-500" /> Genuine Products</span>
                            <span className="flex items-center gap-1.5"><Check size={16} className="text-green-500" /> Fast Delivery</span>
                            <span className="flex items-center gap-1.5"><Check size={16} className="text-green-500" /> Secure Checkout</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- 2. MAIN CONTENT WRAPPER --- */}
            <div className="max-w-6xl mx-auto px-6 -mt-12 relative z-20">
                
                {/* Sleek Tabs & Story Section */}
                <div className="bg-white rounded-t-3xl shadow-[0_20px_50px_-10px_rgba(0,0,0,0.08)] border-b border-gray-100 p-8 md:p-16 text-center">
                    <div className="flex flex-wrap justify-center gap-2 mb-10 border-b border-gray-200/60 pb-2">
                        {['innovation', 'quality', 'customer'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-8 py-3 font-bold uppercase tracking-[0.15em] text-xs transition-all duration-300 relative ${activeTab === tab ? 'text-red-600' : 'text-gray-400 hover:text-gray-800'}`}
                            >
                                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                                {activeTab === tab && (
                                    <span className="absolute -bottom-0.5 left-0 w-full h-0.5 bg-red-600 rounded-t-md shadow-[0_0_8px_rgba(220,38,38,0.5)]"></span>
                                )}
                            </button>
                        ))}
                    </div>
                    <p className="text-gray-600 leading-8 text-lg min-h-36 max-w-3xl mx-auto font-light">
                        {tabContent[activeTab]}
                    </p>
                </div>

                {/* Premium Image Grid */}
                <div className="bg-white p-8 md:p-16 border-b border-gray-100">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                        <div className="md:col-span-5 h-100 md:h-125 overflow-hidden rounded-2xl shadow-xl">
                            <img src={grid1} alt="Zarvix Professional" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 ease-in-out" />
                        </div>
                        <div className="md:col-span-7 flex flex-col gap-6">
                            <div className="h-64 overflow-hidden rounded-2xl shadow-xl">
                                <img src={grid2} alt="Zarvix Gadgets" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 ease-in-out" />
                            </div>
                            <div className="grid grid-cols-2 gap-6 grow">
                                <div className="overflow-hidden rounded-2xl shadow-xl">
                                    <img src={grid3} alt="Shop Online" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 ease-in-out" />
                                </div>
                                <div className="overflow-hidden rounded-2xl shadow-xl">
                                    <img src={grid4} alt="Mobile Analysis" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 ease-in-out" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Vision & Mission (Tech Accordion UI) */}
                <div className="bg-white p-8 md:p-16 border-b border-gray-100">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-4xl md:text-5xl font-black mb-10 tracking-tight leading-[1.1] text-gray-900">
                                Why Choose <br />
                                <span className="text-red-600">
                                    Zarvix Digital
                                </span>
                            </h2>
                            <div className="space-y-4">
                                {accordions.map((acc, idx) => (
                                    <div key={idx} className={`border rounded-xl overflow-hidden transition-all duration-300 ${activeAccordion === idx ? 'border-red-200 shadow-md bg-red-50/10' : 'border-gray-100 bg-white'}`}>
                                        <button
                                            onClick={() => setActiveAccordion(idx)}
                                            className="w-full text-left px-8 py-5 flex justify-between items-center font-bold text-lg focus:outline-none group"
                                        >
                                            <span className={`transition-colors duration-300 ${activeAccordion === idx ? 'text-red-600' : 'text-gray-800 group-hover:text-red-500'}`}>
                                                {acc.title}
                                            </span>
                                            <span className={`text-xl transition-transform duration-500 ${activeAccordion === idx ? 'rotate-180 text-red-600' : 'text-gray-300'}`}>
                                                ↓
                                            </span>
                                        </button>
                                        <div className={`px-8 overflow-hidden transition-all duration-500 ease-in-out ${activeAccordion === idx ? 'max-h-40 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}>
                                            <p className="text-gray-500 text-sm leading-relaxed">{acc.content}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-linear-to-r from-red-600 to-red-400 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
                            <img src={visionImg} alt="Global Vision" className="relative w-full rounded-2xl shadow-2xl" />
                        </div>
                    </div>
                </div>

                {/* Core Features with Custom SVGs */}
                <div className="bg-white p-8 md:p-16 border-b border-gray-100">
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-gray-50 p-12 text-center rounded-2xl border border-gray-100 hover:shadow-lg transition-all duration-500 group">
                            <div className="w-20 h-20 mx-auto bg-white shadow-sm flex items-center justify-center rounded-full mb-8 group-hover:scale-110 transition-transform duration-500">
                                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <h3 className="font-extrabold text-xl mb-4 text-gray-900 group-hover:text-red-600 transition-colors">Genuine Products</h3>
                            <p className="text-gray-500 text-sm leading-relaxed">Every product is carefully sourced from trusted brands to ensure authenticity, durability, and premium quality.</p>
                        </div>

                        <div className="bg-gray-50 p-12 text-center rounded-2xl border border-gray-100 hover:shadow-lg transition-all duration-500 group">
                            <div className="w-20 h-20 mx-auto bg-white shadow-sm flex items-center justify-center rounded-full mb-8 group-hover:scale-110 transition-transform duration-500">
                                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m6-8V7a6 6 0 10-12 0v2" />
                                </svg>
                            </div>
                            <h3 className="font-extrabold text-xl mb-4 text-gray-900 group-hover:text-red-600 transition-colors">Secure Shopping</h3>
                            <p className="text-gray-500 text-sm leading-relaxed">Enjoy secure payments, encrypted checkout, and complete protection of your personal information every time you shop.</p>
                        </div>

                        <div className="bg-gray-50 p-12 text-center rounded-2xl border border-gray-100 hover:shadow-lg transition-all duration-500 group">
                            <div className="w-20 h-20 mx-auto bg-white shadow-sm flex items-center justify-center rounded-full mb-8 group-hover:scale-110 transition-transform duration-500">
                                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12h18M12 3l9 9-9 9m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                            </div>
                            <h3 className="font-extrabold text-xl mb-4 text-gray-900 group-hover:text-red-600 transition-colors">Fast Delivery</h3>
                            <p className="text-gray-500 text-sm leading-relaxed">Fast and reliable nationwide shipping with secure packaging and live order tracking for complete peace of mind.</p>
                        </div>
                    </div>
                </div>

                {/* Stats Banner */}
                <div className="bg-white p-8 md:p-16 border-b border-gray-100 relative overflow-hidden">
                    <div className="absolute inset-0 bg-cover bg-center opacity-10" style={{ backgroundImage: `url(${statsBg})` }}></div>
                    <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        {stats.map((stat, idx) => (
                            <div key={idx}>
                                <div className="text-5xl md:text-6xl text-red-600 font-extrabold mb-2">{stat.num}</div>
                                <div className="text-gray-900 uppercase tracking-widest text-sm font-bold">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* --- 6. GRAND BOTTOM CTA (Updated for Electronics E-commerce) --- */}
                <div className="bg-white rounded-b-3xl p-8 md:p-20 text-center shadow-[0_20px_50px_-10px_rgba(0,0,0,0.08)]">
                    <p className="text-sm text-red-600 font-bold uppercase tracking-[0.2em] mb-4">READY TO UPGRADE?</p>
                    <h2 className="text-4xl md:text-5xl font-black mb-8 text-gray-900 tracking-tight">Upgrade Your <br /> Tech Experience</h2>
                    <p className="text-gray-500 mb-12 text-lg font-light leading-relaxed max-w-2xl mx-auto">
                        Discover premium electronics designed for work, entertainment, gaming, and everyday life. Browse our carefully selected collection and experience technology backed by quality, trust, and reliable customer service.
                    </p>
                    <Link to="/shop">
                        <button className="bg-[#111111] hover:bg-red-600 text-white px-12 py-4 rounded-full font-bold uppercase tracking-widest transition-all duration-300 shadow-[0_10px_20px_rgba(0,0,0,0.1)] hover:shadow-[0_10px_30px_rgba(220,38,38,0.3)] hover:-translate-y-1">
                            Explore Products
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default About;