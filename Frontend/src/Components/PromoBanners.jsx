import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom'; // 🔥 Naya Import
import promo1 from '../assets/promo-1.png';
import promo2 from '../assets/promo-2.png';
import promo3 from '../assets/promo-3.png';
import promo4 from '../assets/promo-4.png';

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

function PromoBanners() {
    return (
        <div className="max-w-7xl mx-auto px-6 pb-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                <FadeInSection direction="left">
                    <div className="relative rounded-3xl overflow-hidden group h-70 bg-[#0a0a0a] shadow-[0_15px_40px_-10px_rgba(0,0,0,0.3)] hover:shadow-[0_25px_50px_-12px_rgba(220,38,38,0.4)] hover:-translate-y-2 transition-all duration-500 cursor-pointer">
                        <img src={promo1} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 group-hover:opacity-80 transition-all duration-700 opacity-90" />
                        <div className="absolute inset-0 flex flex-col justify-center items-end text-right px-8 bg-linear-to-l from-black/95 via-black/60 to-transparent">
                            <h2 className="text-white text-3xl font-black mb-2 tracking-tight">Wear Smarter</h2>
                            <p className="text-gray-300 text-xs max-w-50 mb-6 leading-relaxed font-light">Smart technology that keeps up with your lifestyle.</p>
                            {/* 🔥 Button ko Link mein badal diya */}
                            <Link to="/shop/Smartwatches" className="inline-block text-center bg-white text-black px-6 py-2.5 text-[10px] font-bold uppercase tracking-[0.15em] hover:bg-red-600 hover:text-white transition-colors">
                                Explore
                            </Link>
                        </div>
                    </div>
                </FadeInSection>
                
                <FadeInSection direction="right">
                    <div className="relative rounded-3xl overflow-hidden group h-70 bg-[#0a0a0a] shadow-[0_15px_40px_-10px_rgba(0,0,0,0.3)] hover:shadow-[0_25px_50px_-12px_rgba(220,38,38,0.4)] hover:-translate-y-2 transition-all duration-500 cursor-pointer">
                        <img src={promo2} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 group-hover:opacity-80 transition-all duration-700 opacity-90" />
                        <div className="absolute inset-0 flex flex-col justify-center items-end text-right px-8 bg-linear-to-l from-black/95 via-black/60 to-transparent">
                            <h2 className="text-white text-3xl font-black mb-2 tracking-tight">Hear Every Detail</h2>
                            <p className="text-gray-300 text-xs max-w-55 mb-6 leading-relaxed font-light">Experience powerful sound with premium wireless audio devices.</p>
                            {/* 🔥 Button ko Link mein badal diya */}
                            <Link to="/shop/Audio & Headphones" className="inline-block text-center bg-white text-black px-6 py-2.5 text-[10px] font-bold uppercase tracking-[0.15em] hover:bg-red-600 hover:text-white transition-colors">
                                Shop Audio
                            </Link>
                        </div>
                    </div>
                </FadeInSection>

                <FadeInSection direction="left">
                    <div className="relative rounded-3xl overflow-hidden group h-70 bg-[#0a0a0a] shadow-[0_15px_40px_-10px_rgba(0,0,0,0.3)] hover:shadow-[0_25px_50px_-12px_rgba(220,38,38,0.4)] hover:-translate-y-2 transition-all duration-500 cursor-pointer">
                        <img src={promo3} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 group-hover:opacity-80 transition-all duration-700 opacity-90" />
                        <div className="absolute inset-0 flex flex-col justify-center items-end text-right px-8 bg-linear-to-l from-black/95 via-black/60 to-transparent">
                            <h2 className="text-white text-3xl font-black mb-2 tracking-tight">Power Your Setup</h2>
                            <p className="text-gray-300 text-xs max-w-55 mb-6 leading-relaxed font-light">Essential accessories for work, gaming, and everyday use.</p>
                            {/* 🔥 Button ko Link mein badal diya */}
                            <Link to="/shop/Accessories" className="inline-block text-center bg-white text-black px-6 py-2.5 text-[10px] font-bold uppercase tracking-[0.15em] hover:bg-red-600 hover:text-white transition-colors">
                                Browse
                            </Link>
                        </div>
                    </div>
                </FadeInSection>

                <FadeInSection direction="right">
                    <div className="relative rounded-3xl overflow-hidden group h-70 bg-[#0a0a0a] shadow-[0_15px_40px_-10px_rgba(0,0,0,0.3)] hover:shadow-[0_25px_50px_-12px_rgba(220,38,38,0.4)] hover:-translate-y-2 transition-all duration-500 cursor-pointer">
                        <img src={promo4} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 group-hover:opacity-80 transition-all duration-700 opacity-90" />
                        <div className="absolute inset-0 flex flex-col justify-center items-start text-left px-8 bg-linear-to-r from-black/95 via-black/60 to-transparent">
                            <h2 className="text-white text-3xl font-black mb-2 tracking-tight">Smart Living Starts Here</h2>
                            <p className="text-gray-300 text-xs max-w-55 mb-6 leading-relaxed font-light">Connected devices that make your home safer and smarter.</p>
                            {/* 🔥 Button ko Link mein badal diya */}
                            <Link to="/shop/Home Appliances" className="inline-block text-center bg-white text-black px-6 py-2.5 text-[10px] font-bold uppercase tracking-[0.15em] hover:bg-red-600 hover:text-white transition-colors">
                                Discover
                            </Link>
                        </div>
                    </div>
                </FadeInSection>
                
            </div>
        </div>
    );
}

export default PromoBanners;