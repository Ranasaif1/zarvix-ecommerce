import React, { useState, useEffect, useContext, useRef } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; // Routing ke liye add kiya
import { CartContext } from '../context/CartContext';

// Icons
import { ShoppingCart, Star, Truck, HeadphonesIcon, ShieldCheck, RefreshCw, ArrowRight, Mail, Loader2 } from 'lucide-react';

// Imported Components
import Hero from '../Components/Hero';
import FlashSale from '../Components/FlashSale';
import PromoBanners from '../Components/PromoBanners';

// Images for the rest of the page
import midBanner from '../assets/mid-banner.png';
import gal1 from '../assets/gallery-1.png';
import gal2 from '../assets/gallery-2.png';
import catCamera from '../assets/Cameras.png';
import catLaptop from '../assets/Laptop-and-Pcs.png';
import catAppliance from '../assets/Home-appliance.png';
import catLED from '../assets/Led-and-Speakers.png';
import catAccessories from '../assets/Mobile-Accessories.png';
import catPhone from '../assets/Smart-phones.png';

// --- CUSTOM SCROLL ANIMATION COMPONENT ---
const FadeInSection = ({ children, direction = 'up', delay = '0ms' }) => {
    const [isVisible, setVisible] = useState(false);
    const domRef = useRef();

    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        const { current } = domRef;
        if (current) observer.observe(current);
        return () => { if (current) observer.unobserve(current); };
    }, []);

    let transformClass = 'translate-y-12';
    if (direction === 'left') transformClass = '-translate-x-12';
    if (direction === 'right') transformClass = 'translate-x-12';

    return (
        <div
            ref={domRef}
            className={`transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-x-0 translate-y-0' : `opacity-0 ${transformClass}`}`}
            style={{ transitionDelay: delay }}
        >
            {children}
        </div>
    );
};

function Home() {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { addToCart } = useContext(CartContext);
    const navigate = useNavigate();

    useEffect(() => {
        setIsLoading(true);
        axios.get('https://backend-phi-three-82.vercel.app/api/products')
            .then(response => {
                setProducts(response.data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error("API Error:", error);
                setIsLoading(false);
            });
    }, []);

    // REAL DATA SLICING (Dummy data completely removed)
    // New Arrivals mein latest 4 products, Best Sellers mein shuru ke 4 products
    const newArrivals = [...products].reverse().slice(0, 4);
    const bestSellers = products.slice(0, 4);

    const brands = ["AUDIONIC", "DAWLANCE", "HAIER", "TCL", "INFINIX", "TECNO", "RONIN", "DANY", "SPACE", "ECOSTAR"];

    // Helper function to extract the first image
    const getPrimaryImage = (imageUrlString) => {
        if (!imageUrlString) return 'https://via.placeholder.com/500?text=No+Image';
        return imageUrlString.split(',')[0];
    };

    return (
        <div className="bg-[#f4f5f7] min-h-screen text-[#111111] w-full relative" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            
            {/* FIXED GLOBAL AMBIENT GLOWS */}
            <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-[-1] bg-[radial-gradient(ellipse_at_top_right,rgba(220,38,38,0.03),transparent_50%)]"></div>
            <div className="fixed bottom-0 left-0 w-full h-full pointer-events-none z-[-1] bg-[radial-gradient(ellipse_at_bottom_left,rgba(0,0,0,0.02),transparent_50%)]"></div>

            <style>
                {`
                @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;600;800;900&display=swap');
                @keyframes float { 0% { transform: translateY(0px); } 50% { transform: translateY(-15px); } 100% { transform: translateY(0px); } }
                .animate-float { animation: float 6s ease-in-out infinite; }
                @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
                .animate-marquee { animation: marquee 30s linear infinite; display: flex; width: max-content; }
                .hero-tech-grid { background-image: linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px); background-size: 50px 50px; }
                `}
            </style>

            {/* 1. EXTRACTED HERO SECTION */}
            <Hero />

            {/* 2. EXTRACTED FLASH SALE BANNER */}
            <FlashSale />
            <div className="max-w-7xl mx-auto px-6 py-12"></div>

            {/* 3. EXTRACTED 4 SMALL BANNERS */}
            <PromoBanners />

            {/* 🔥 BEST SELLERS SECTION (REAL DATABASE) */}
            <div className="max-w-7xl mx-auto px-6 pb-24">
                <FadeInSection>
                    <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
                        <div>
                            <div className="flex items-center mb-2">
                                <div className="w-1.5 h-6 bg-red-600 mr-3 rounded-full"></div>
                                <h2 className="text-[10px] font-bold text-red-600 uppercase tracking-[0.3em]">Top Rated</h2>
                            </div>
                            <h2 className="text-4xl font-black tracking-tighter text-gray-900">Best Sellers</h2>
                            <p className="text-gray-500 mt-2 font-light text-sm">Discover the products our customers love the most.</p>
                        </div>
                        <button onClick={() => navigate('/shop')} className="text-gray-900 font-bold text-xs uppercase tracking-widest hover:text-red-600 transition-colors flex items-center gap-2">
                            View All <ArrowRight size={14} />
                        </button>
                    </div>
                </FadeInSection>

                {isLoading ? (
                    <div className="flex justify-center items-center py-20">
                        <Loader2 className="animate-spin text-red-600" size={40} />
                    </div>
                ) : bestSellers.length === 0 ? (
                    <p className="text-center text-gray-500 py-10">No products available. Add from Admin Panel.</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                        {bestSellers.map((product, index) => (
                            <FadeInSection key={`bs-${index}`} delay={`${index * 100}ms`}>
                                <div className="group relative bg-white rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_50px_-10px_rgba(220,38,38,0.15)] border border-gray-100/50 overflow-hidden flex flex-col h-full hover:-translate-y-2 transition-all duration-500">
                                    <div className="relative bg-white aspect-square flex items-center justify-center p-6 border-b border-gray-50 cursor-pointer" onClick={() => navigate(`/product/${product.id}`)}>
                                        <span className="absolute top-4 right-4 text-yellow-400 drop-shadow-md z-10">⭐</span>
                                        <img src={getPrimaryImage(product.image_url)} alt={product.name} className="w-full h-auto object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500" />
                                        <div className="absolute bottom-4 left-0 w-full px-4 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                                            <button 
                                                onClick={(e) => { e.stopPropagation(); addToCart({...product, image: getPrimaryImage(product.image_url), quantity: 1}); alert('Added to cart!'); }} 
                                                className="w-full bg-[#111111] text-white font-bold uppercase text-[10px] tracking-[0.15em] py-3 shadow-lg hover:bg-red-600 transition-colors flex items-center justify-center gap-2 rounded-lg"
                                            >
                                                <ShoppingCart size={14} /> Quick Add
                                            </button>
                                        </div>
                                    </div>
                                    <div className="p-6 grow flex flex-col justify-between">
                                        <div>
                                            <p className="text-[10px] text-gray-400 mb-1 uppercase tracking-widest">{product.brandName && product.brandName !== 'No Brand' ? product.brandName : product.category}</p>
                                            <Link to={`/product/${product.id}`}>
                                                <h3 className="text-sm font-bold text-gray-900 mb-2 hover:text-red-600 cursor-pointer transition-colors line-clamp-2">{product.name}</h3>
                                            </Link>
                                        </div>
                                        <div className="mt-3">
                                            <div className="flex text-yellow-400 mb-2 space-x-1">
                                                {[...Array(5)].map((_, i) => <Star key={i} size={12} fill="currentColor" color="currentColor" />)}
                                            </div>
                                            <span className="text-red-600 font-black text-lg">Rs {Number(product.price).toLocaleString()}</span>
                                        </div>
                                    </div>
                                </div>
                            </FadeInSection>
                        ))}
                    </div>
                )}
            </div>

            {/* SHOP BY CATEGORY */}
            <div className="max-w-7xl mx-auto px-6 py-20">
                <FadeInSection>
                    <div className="text-center mb-16">
                        <div className="flex items-center justify-center mb-3">
                            <div className="w-8 h-0.5 bg-red-600 mr-3"></div>
                            <h2 className="text-[10px] font-bold text-red-600 uppercase tracking-[0.3em]">DISCOVER COLLECTIONS</h2>
                            <div className="w-8 h-0.5 bg-red-600 ml-3"></div>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter mb-4">Shop By Category</h2>
                        <p className="text-gray-500 max-w-2xl mx-auto font-light text-sm leading-relaxed">
                            Browse our carefully selected technology collections for work, gaming, entertainment, and everyday life.
                        </p>
                    </div>
                </FadeInSection>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    {[
                        { name: "Smart Security", img: catCamera },
                        { name: "Laptops & PCs", img: catLaptop },
                        { name: "Home Appliances", img: catAppliance},
                        { name: "LED TVs & Ent.", img: catLED },
                        { name: "Accessories", img: catAccessories },
                        { name: "Smartphones", img: catPhone }
                    ].map((cat, idx) => (
                        <FadeInSection key={idx} delay={`${idx * 50}ms`}>
                            <div 
                                onClick={() => navigate(`/shop/${cat.name}`)} 
                                className="relative rounded-3xl overflow-hidden h-87.5 group cursor-pointer shadow-[0_15px_40px_-15px_rgba(0,0,0,0.3)] hover:shadow-[0_25px_50px_-12px_rgba(220,38,38,0.25)] hover:-translate-y-2 transition-all duration-500"
                            >
                                <img src={cat.img} alt={cat.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500"></div>
                                <div className="absolute inset-0 flex flex-col justify-end p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                    <h3 className="text-white text-2xl font-black mb-3 tracking-tight">{cat.name}</h3>
                                    <button className="text-red-500 font-bold text-[10px] uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center gap-2">
                                        Explore Category <ArrowRight size={14} />
                                    </button>
                                </div>
                            </div>
                        </FadeInSection>
                    ))}
                </div>
            </div>

            {/* NEW ARRIVALS (REAL DATABASE) */}
            <div className="max-w-7xl mx-auto px-6 pb-24 pt-10">
                <FadeInSection>
                    <div className="mb-12 border-b border-gray-200 pb-4 text-center md:text-left flex flex-col md:flex-row justify-between items-end">
                        <div>
                            <div className="flex items-center mb-2 justify-center md:justify-start">
                                <div className="w-1.5 h-6 bg-red-600 mr-3 rounded-full"></div>
                                <h2 className="text-4xl font-black tracking-tighter text-gray-900">New Arrivals</h2>
                            </div>
                            <p className="text-gray-500 mt-2 font-light text-sm ml-0 md:ml-4">Fresh arrivals featuring the latest innovations and premium technology.</p>
                        </div>
                    </div>
                </FadeInSection>

                {isLoading ? (
                    <div className="flex justify-center items-center py-20">
                        <Loader2 className="animate-spin text-red-600" size={40} />
                    </div>
                ) : newArrivals.length === 0 ? (
                    <p className="text-center text-gray-500 py-10">No products available. Add from Admin Panel.</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                        {newArrivals.map((product, index) => (
                            <FadeInSection key={`new-${index}`} delay={`${index * 100}ms`}>
                                <div className="group relative bg-white rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_50px_-10px_rgba(220,38,38,0.15)] border border-gray-100/50 overflow-hidden flex flex-col h-full hover:-translate-y-2 transition-all duration-500">
                                    <div className="relative bg-[#F9F9F9] aspect-square flex items-center justify-center p-6 border-b border-gray-50 cursor-pointer" onClick={() => navigate(`/product/${product.id}`)}>
                                        <span className="absolute top-4 left-4 bg-red-600 text-white text-[9px] font-bold uppercase tracking-[0.2em] px-2.5 py-1 rounded-sm z-10 shadow-md">
                                            NEW
                                        </span>
                                        <img src={getPrimaryImage(product.image_url)} alt={product.name} className="w-full h-auto object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500" />
                                        <div className="absolute bottom-4 left-0 w-full px-4 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                                            <button 
                                                onClick={(e) => { e.stopPropagation(); addToCart({...product, image: getPrimaryImage(product.image_url), quantity: 1}); alert('Added to cart!'); }} 
                                                className="w-full bg-[#111111] text-white font-bold uppercase text-[10px] tracking-[0.15em] py-3 rounded-lg shadow-lg hover:bg-red-600 transition-colors flex items-center justify-center gap-2"
                                            >
                                                <ShoppingCart size={14} /> Quick Add
                                            </button>
                                        </div>
                                    </div>
                                    <div className="p-6 grow flex flex-col justify-between">
                                        <div>
                                            <p className="text-[10px] text-gray-400 mb-1 uppercase tracking-widest">{product.brandName && product.brandName !== 'No Brand' ? product.brandName : product.category}</p>
                                            <Link to={`/product/${product.id}`}>
                                                <h3 className="text-sm font-bold text-gray-900 mb-2 hover:text-red-600 cursor-pointer transition-colors line-clamp-2 tracking-tight">{product.name}</h3>
                                            </Link>
                                        </div>
                                        <div className="mt-3">
                                            <div className="flex text-yellow-400 mb-2 space-x-1">
                                                {[...Array(5)].map((_, i) => <Star key={i} size={12} fill="currentColor" color="currentColor" />)}
                                            </div>
                                            <span className="text-red-600 font-black text-lg tracking-tight">Rs {Number(product.price).toLocaleString()}</span>
                                        </div>
                                    </div>
                                </div>
                            </FadeInSection>
                        ))}
                    </div>
                )}
            </div>

            {/* MIDDLE PARALLAX BANNER */}
            <div className="relative h-100 md:h-125 flex items-center my-12 shadow-[0_20px_50px_rgba(0,0,0,0.3)] bg-[#050505] overflow-hidden">
                <div className="absolute inset-0 hero-tech-grid opacity-30 z-0 pointer-events-none"></div>
                <div className="absolute top-1/2 right-0 w-125 h-125 bg-red-600/20 rounded-full blur-[120px] -translate-y-1/2 z-0 pointer-events-none"></div>

                <div 
                    className="absolute inset-0 z-10 pointer-events-none opacity-90"
                    style={{ 
                        backgroundImage: `url(${midBanner})`,
                        backgroundAttachment: 'fixed',
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat'
                    }}
                ></div>
                <div className="absolute inset-0 bg-linear-to-r from-[#050505] via-black/60 to-transparent z-20 pointer-events-none"></div>

                <div className="max-w-7xl mx-auto px-6 w-full relative z-30">
                    <FadeInSection direction="left">
                        <div className="text-left text-white max-w-xl">
                            <h2 className="text-4xl md:text-6xl font-black mb-4 tracking-tighter drop-shadow-lg leading-[1.1]">
                                Create Without <br /> <span className="text-red-500 drop-shadow-[0_0_15px_rgba(220,38,38,0.5)]">Limits</span>
                            </h2>
                            <p className="text-gray-300 text-sm md:text-base mb-8 font-light leading-relaxed">
                                Build your ideal workspace with high-performance laptops, monitors, and premium accessories designed for professionals and creators.
                            </p>
                            <button onClick={() => navigate('/shop')} className="bg-red-600 border border-red-600 text-white hover:bg-black hover:text-white px-10 py-4 uppercase tracking-[0.15em] font-bold text-[10px] transition-all shadow-[0_0_20px_rgba(220,38,38,0.3)] hover:shadow-none">
                                Explore Collection
                            </button>
                        </div>
                    </FadeInSection>
                </div>
            </div>

            {/* WHY CHOOSE ZARVIX (FEATURES) */}
            <div className="max-w-7xl mx-auto px-6 py-20">
                <FadeInSection>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        {[
                            { icon: <Truck size={32} strokeWidth={1.5} />, title: "Fast Delivery", desc: "Fast and reliable shipping nationwide." },
                            { icon: <HeadphonesIcon size={32} strokeWidth={1.5} />, title: "Customer Support", desc: "Friendly support whenever you need assistance." },
                            { icon: <ShieldCheck size={32} strokeWidth={1.5} />, title: "Secure Payments", desc: "Protected checkout with trusted payment methods." },
                            { icon: <RefreshCw size={32} strokeWidth={1.5} />, title: "Easy Returns", desc: "Simple and hassle-free return process." }
                        ].map((feat, idx) => (
                            <div key={idx} className="bg-white rounded-3xl p-8 flex flex-col items-center group cursor-pointer shadow-[0_10px_40px_-10px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_50px_-10px_rgba(220,38,38,0.12)] border border-gray-100 hover:-translate-y-2 transition-all duration-500">
                                <div className="text-red-600 mb-6 bg-red-50 p-5 rounded-full group-hover:-translate-y-2 group-hover:scale-110 transition-transform duration-500 shadow-sm">
                                    {feat.icon}
                                </div>
                                <h3 className="font-bold text-gray-900 mb-2 tracking-tight">{feat.title}</h3>
                                <p className="text-xs text-gray-500 leading-relaxed font-light">{feat.desc}</p>
                            </div>
                        ))}
                    </div>
                </FadeInSection>
            </div>

            {/* THE ZARVIX DIFFERENCE */}
            <div className="max-w-7xl mx-auto px-6 py-24">
                <FadeInSection>
                    <div className="mb-16 text-center max-w-2xl mx-auto">
                        <div className="flex items-center justify-center mb-3">
                            <div className="w-1.5 h-6 bg-red-600 mr-3 rounded-full"></div>
                            <h2 className="text-[10px] font-bold text-red-600 uppercase tracking-[0.3em]">BEHIND THE BRAND</h2>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-gray-900 mb-4">The Zarvix Difference</h2>
                    </div>
                </FadeInSection>

                <div className="grid md:grid-cols-2 gap-10">
                    <FadeInSection direction="left">
                        <div className="group cursor-pointer bg-white p-4 rounded-3xl shadow-[0_15px_40px_-15px_rgba(0,0,0,0.1)] hover:shadow-[0_25px_50px_-12px_rgba(220,38,38,0.2)] hover:-translate-y-2 transition-all duration-500 border border-gray-100">
                            <div className="overflow-hidden mb-6 rounded-2xl">
                                <img src={gal1} alt="Quality You Can Trust" className="w-full h-87.5 object-cover group-hover:scale-105 transition-transform duration-700" />
                            </div>
                            <div className="px-4 pb-4">
                                <h3 className="font-bold text-2xl text-gray-900 group-hover:text-red-600 transition-colors tracking-tight">Quality You Can Trust</h3>
                                <p className="text-gray-500 mt-2 leading-relaxed font-light text-sm">Every product is selected for exceptional quality, reliability, and long-term performance.</p>
                            </div>
                        </div>
                    </FadeInSection>
                    <FadeInSection direction="right" delay="200ms">
                        <div className="group cursor-pointer bg-white p-4 rounded-3xl shadow-[0_15px_40px_-15px_rgba(0,0,0,0.1)] hover:shadow-[0_25px_50px_-12px_rgba(220,38,38,0.2)] hover:-translate-y-2 transition-all duration-500 border border-gray-100">
                            <div className="overflow-hidden mb-6 rounded-2xl">
                                <img src={gal2} alt="Built for Modern Life" className="w-full h-87.5 object-cover group-hover:scale-105 transition-transform duration-700" />
                            </div>
                            <div className="px-4 pb-4">
                                <h3 className="font-bold text-2xl text-gray-900 group-hover:text-red-600 transition-colors tracking-tight">Built for Modern Life</h3>
                                <p className="text-gray-500 mt-2 leading-relaxed font-light text-sm">Technology that fits seamlessly into your daily routine—whether you're working, learning, or relaxing.</p>
                            </div>
                        </div>
                    </FadeInSection>
                </div>
            </div>

            {/* NEWSLETTER SECTION */}
            <div className="bg-[#050505] py-24 relative overflow-hidden mt-10">
                <div className="absolute inset-0 hero-tech-grid opacity-50"></div>
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-red-900/20 via-[#0a0a0a] to-[#0a0a0a]"></div>
                
                <FadeInSection>
                    <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
                        <div className="inline-block px-5 py-2 rounded-full border border-gray-800 text-gray-300 text-[10px] font-bold tracking-[0.2em] uppercase mb-6 bg-black/50 backdrop-blur-sm shadow-[0_0_20px_rgba(220,38,38,0.1)]">
                            Premium Tech. Everyday Value.
                        </div>
                        <h2 className="text-4xl font-black tracking-tighter text-white mb-4">Stay Updated with Zarvix</h2>
                        <p className="text-gray-400 font-light text-sm mb-10 max-w-xl mx-auto leading-relaxed">
                            Be the first to discover exclusive offers, new arrivals, and exciting product launches.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
                            <div className="relative grow">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                                <input 
                                    type="email" 
                                    placeholder="Enter your email address" 
                                    className="w-full bg-[#111] border border-gray-800 text-white px-12 py-4 rounded-xl focus:outline-none focus:border-red-600 transition-colors text-sm shadow-inner"
                                />
                            </div>
                            <button className="bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-4 rounded-xl uppercase tracking-widest text-[10px] transition-colors whitespace-nowrap shadow-[0_0_15px_rgba(220,38,38,0.3)] hover:shadow-none hover:-translate-y-1">
                                Subscribe Now
                            </button>
                        </div>
                    </div>
                </FadeInSection>
            </div>

            {/* TOP PAKISTANI BRANDS MARQUEE */}
            <div className="bg-white py-16 border-t border-gray-100 overflow-hidden shadow-[0_-10px_40px_rgba(0,0,0,0.02)]">
                <div className="max-w-7xl mx-auto px-6 mb-8 text-center">
                    <h2 className="text-xs font-bold text-gray-400 uppercase tracking-[0.3em]">Trusted Brands</h2>
                    <p className="text-gray-500 text-xs mt-1">Featuring products from the world's leading technology brands.</p>
                </div>
                <div className="flex overflow-hidden relative w-full">
                    <div className="absolute left-0 top-0 bottom-0 w-32 bg-linear-to-r from-white to-transparent z-10"></div>
                    <div className="absolute right-0 top-0 bottom-0 w-32 bg-linear-to-l from-white to-transparent z-10"></div>
                    
                    <div className="animate-marquee flex items-center space-x-16 px-8">
                        {[...brands, ...brands].map((brand, i) => (
                            <h2 key={i} className="text-2xl font-black tracking-[0.2em] text-gray-300 hover:text-red-600 transition-all duration-300 cursor-pointer whitespace-nowrap hover:scale-110 drop-shadow-sm">
                                {brand}
                            </h2>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Home;