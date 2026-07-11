import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom'; // 🔥 Naya Import Add Kiya Hai
import heroImg from '../assets/hero-1.png'; // Path zaroor check kar lein

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

function Hero() {
    return (
        <div className="bg-[#050505] relative overflow-hidden h-137.5 md:h-175 flex items-center shadow-2xl">
            <div className="absolute inset-0 hero-tech-grid z-0"></div>
            <div className="absolute top-0 left-0 w-150 h-150 bg-red-900/10 rounded-full blur-[150px] -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none"></div>
            <div className="absolute bottom-0 right-0 w-200 h-200 bg-red-800/20 rounded-full blur-[180px] translate-x-1/3 translate-y-1/3 z-0 pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-6 w-full grid md:grid-cols-2 items-center gap-8 relative z-10">
                <FadeInSection direction="left">
                    <div className="space-y-6">
                        <div className="inline-block px-5 py-2 rounded-full bg-linear-to-r from-red-600/20 to-transparent border-l-2 border-red-500 text-red-500 text-[10px] font-bold tracking-[0.2em] uppercase backdrop-blur-sm">
                            THE FUTURE STARTS HERE
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[1.1] text-white">
                            Technology That <br /> <span className="text-red-600 drop-shadow-[0_0_20px_rgba(220,38,38,0.4)]">Moves You Forward</span>
                        </h1>
                        <h3 className="text-xl text-gray-200 font-semibold tracking-tight">Smarter Tech. Better Living.</h3>
                        <p className="text-gray-400 text-sm md:text-base max-w-md leading-relaxed font-light">
                            Discover premium electronics designed to enhance your everyday life. From cutting-edge gadgets to smart home solutions, Zarvix Digital delivers technology you can trust.
                        </p>
                        
                        {/* 🔥 Yahan Button ko Link mein badal diya gaya hai */}
                        <Link 
                            to="/shop" 
                            className="inline-block text-center bg-red-600 border border-red-600 text-white hover:bg-transparent hover:text-red-500 px-12 py-4 uppercase tracking-[0.2em] font-bold text-xs transition-all duration-300 mt-4 shadow-[0_0_25px_rgba(220,38,38,0.4)] hover:shadow-none"
                        >
                            Shop Now
                        </Link>
                        
                    </div>
                </FadeInSection>

                <FadeInSection direction="right" delay="200ms">
                    <div className="relative flex justify-center md:flex items-center">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-112.5 h-112.5 bg-red-600/20 rounded-full blur-[100px] animate-pulse"></div>
                        <div className="relative w-full max-w-162.5 scale-110 flex items-center justify-center p-6 animate-float">
                            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-red-500 shadow-[0_0_15px_rgba(220,38,38,0.5)]"></div>
                            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-red-500 shadow-[0_0_15px_rgba(220,38,38,0.5)]"></div>
                            <img src={heroImg} alt="Zarvix Premium Tech" className="w-full h-auto drop-shadow-[0_30px_50px_rgba(0,0,0,0.8)] relative z-10" />
                        </div>
                    </div>
                </FadeInSection>
            </div>
        </div>
    );
}

export default Hero;