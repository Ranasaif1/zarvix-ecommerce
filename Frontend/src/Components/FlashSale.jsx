import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

function FlashSale() {
    const [timeLeft, setTimeLeft] = useState({ hours: 14, minutes: 28, seconds: 59 });

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                let { hours, minutes, seconds } = prev;
                if (seconds > 0) seconds--;
                else {
                    seconds = 59;
                    if (minutes > 0) minutes--;
                    else {
                        minutes = 59;
                        if (hours > 0) hours--;
                    }
                }
                return { hours, minutes, seconds };
            });
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (time) => time.toString().padStart(2, '0');

    return (
        <div className="bg-red-600 text-white py-3 shadow-lg relative z-20">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-3">
                    <Clock className="animate-pulse" size={20} />
                    <h3 className="font-bold text-sm uppercase tracking-widest">⚡ Flash Sale Ends In</h3>
                </div>
                <div className="flex items-center gap-6">
                    <div className="flex gap-2">
                        <div className="bg-black/20 px-3 py-1.5 rounded text-center min-w-12.5 font-bold text-xl">{formatTime(timeLeft.hours)}</div>
                        <span className="text-xl font-bold">:</span>
                        <div className="bg-black/20 px-3 py-1.5 rounded text-center min-w-12.5 font-bold text-xl">{formatTime(timeLeft.minutes)}</div>
                        <span className="text-xl font-bold">:</span>
                        <div className="bg-black/20 px-3 py-1.5 rounded text-center min-w-12.5 font-bold text-xl">{formatTime(timeLeft.seconds)}</div>
                    </div>
                    <button className="bg-white text-red-600 px-6 py-2.5 text-[10px] font-black uppercase tracking-widest hover:bg-gray-100 transition-colors rounded-sm shadow-md">
                        Grab Deals
                    </button>
                </div>
            </div>
        </div>
    );
}

export default FlashSale;