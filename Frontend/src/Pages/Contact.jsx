import React, { useState, useEffect } from 'react';
import { MessageCircle, MapPin, Phone, Mail, Clock, Send, HelpCircle, ChevronDown } from 'lucide-react';

// FAQ Item Component
function FaqItem({ faq }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border border-gray-100 rounded-2xl overflow-hidden transition-all duration-300 bg-white hover:border-red-200 shadow-sm hover:shadow-md">
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="w-full text-left px-6 py-5 flex justify-between items-center focus:outline-none"
            >
                <span className={`font-bold text-[15px] transition-colors ${isOpen ? 'text-red-600' : 'text-gray-900'}`}>
                    <HelpCircle size={18} className={`inline-block mr-3 mb-0.5 ${isOpen ? 'text-red-600' : 'text-gray-400'}`} />
                    {faq.q}
                </span>
                <ChevronDown size={20} className={`transition-transform duration-300 ${isOpen ? 'rotate-180 text-red-600' : 'text-gray-400'}`} />
            </button>
            <div 
                className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-40 pb-5 opacity-100' : 'max-h-0 opacity-0'}`}
            >
                <p className="text-gray-500 text-sm font-light leading-relaxed pl-8">{faq.a}</p>
            </div>
        </div>
    );
}

function Contact() {
    // Page load hone par automatically top par scroll karne ke liye
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="bg-[#f4f5f7] min-h-screen pb-24" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            
            {/* --- 1. PREMIUM DARK HERO SECTION --- */}
            <div className="bg-[#050505] pt-32 pb-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(220,38,38,0.12),transparent_70%)] pointer-events-none"></div>
                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
                
                <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
                    <MessageCircle className="mx-auto text-red-600 mb-6 drop-shadow-[0_0_15px_rgba(220,38,38,0.5)]" size={56} strokeWidth={1.5} />
                    <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">Contact Us</h1>
                    <p className="text-red-500 font-bold tracking-[0.2em] uppercase text-xs mb-6">We're Here to Help</p>
                    <p className="text-gray-400 font-light text-sm max-w-2xl mx-auto leading-relaxed">
                        Have a question about our gadgets, your order, or just want to say hi? Fill out the form below or reach out to us directly. Our support team is always ready to assist you.
                    </p>
                </div>
            </div>

            {/* --- 2. MAIN CONTENT WRAPPER --- */}
            <div className="max-w-6xl mx-auto px-6 -mt-12 relative z-20">
                
                {/* TOP CARD: Contact Info Grid */}
                <div className="bg-white rounded-t-3xl shadow-[0_20px_50px_-10px_rgba(0,0,0,0.08)] border-b border-gray-100 p-8 md:p-12">
                    <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8 divide-y sm:divide-y-0 sm:divide-x divide-gray-100">
                        {[
                            { title: "Address", desc: "Karachi, Pakistan", icon: MapPin },
                            { title: "Call Us", desc: "+92 300 1234567", icon: Phone },
                            { title: "Email Us", desc: "support@zarvix.com", icon: Mail },
                            { title: "Open Time", desc: "Mon-Sat | 9AM - 7PM", icon: Clock }
                        ].map((item, idx) => (
                            <div key={idx} className={`flex flex-col items-center text-center ${idx !== 0 ? 'pt-6 sm:pt-0' : ''}`}>
                                <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center text-red-600 mb-4 shadow-sm">
                                    <item.icon size={20} strokeWidth={2} />
                                </div>
                                <h3 className="text-gray-900 font-bold mb-1 text-base">{item.title}</h3>
                                <p className="text-sm text-gray-500 font-light">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* BOTTOM CARD: Map & Contact Form */}
                <div className="bg-white rounded-b-3xl shadow-[0_20px_50px_-10px_rgba(0,0,0,0.08)] p-8 md:p-12">
                    <div className="grid lg:grid-cols-2 gap-12">
                        
                        {/* Left: Map Section */}
                        <div className="rounded-2xl border border-gray-100 overflow-hidden shadow-inner w-full min-h-87.5 lg:min-h-full flex relative group">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14484.185542721092!2d67.07149244762505!3d24.828087270226465!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33c6ffa24d363%3A0xd4f6e17a243d0167!2sQayyumabad%2C%20Karachi%2C%20Pakistan!5e0!3m2!1sen!2s!4v1782994578972!5m2!1sen!2s"
                                width="100%"
                                height="100%"
                                style={{ border: 0, flexGrow: 1, minHeight: '100%' }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Zarvix Location"
                            ></iframe>
                        </div>

                        {/* Right: Contact Form */}
                        <div>
                            <h2 className="text-2xl font-black mb-2 text-gray-900 text-center tracking-tight">Send a Message</h2>
                            <p className="text-gray-500 text-sm mb-8 font-light">
                                If you have any questions about your orders or deliveries, please fill out the form below. We reply within 24 hours.
                            </p>

                            <form className="space-y-5">
                                {/* Row 1: Name & Order ID */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <input 
                                        type="text" 
                                        placeholder="Full Name" 
                                        className="w-full bg-gray-50 border border-gray-200 text-sm p-4 rounded-xl focus:border-red-500 focus:bg-white focus:shadow-[0_0_0_4px_rgba(220,38,38,0.1)] outline-none transition-all" 
                                        required
                                    />
                                    <input 
                                        type="text" 
                                        placeholder="Order ID (Optional)" 
                                        className="w-full bg-gray-50 border border-gray-200 text-sm p-4 rounded-xl focus:border-red-500 focus:bg-white focus:shadow-[0_0_0_4px_rgba(220,38,38,0.1)] outline-none transition-all" 
                                    />
                                </div>

                                {/* Row 2: Subject & Email */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <select className="w-full bg-gray-50 border border-gray-200 text-sm p-4 rounded-xl text-gray-500 focus:text-gray-900 focus:border-red-500 focus:bg-white focus:shadow-[0_0_0_4px_rgba(220,38,38,0.1)] outline-none transition-all appearance-none">
                                        <option value="">Select Subject</option>
                                        <option value="customer_service">Customer Service</option>
                                        <option value="returns">Returns & Refunds</option>
                                        <option value="technical_support">Technical Support</option>
                                    </select>
                                    <input 
                                        type="email" 
                                        placeholder="Email Address" 
                                        className="w-full bg-gray-50 border border-gray-200 text-sm p-4 rounded-xl focus:border-red-500 focus:bg-white focus:shadow-[0_0_0_4px_rgba(220,38,38,0.1)] outline-none transition-all" 
                                        required
                                    />
                                </div>

                                {/* Row 3: Attachment */}
                                <div>
                                    <label className="block text-xs font-semibold text-gray-700 mb-2 tracking-wide uppercase">
                                        Attachment <span className="text-gray-400 font-normal normal-case">(Screenshot / Receipt)</span>
                                    </label>
                                    <input 
                                        type="file" 
                                        className="w-full text-sm text-gray-500 border border-gray-200 rounded-xl cursor-pointer bg-gray-50
                                        file:mr-4 file:py-3 file:px-4
                                        file:border-0 file:border-r file:border-gray-200
                                        file:text-sm file:font-semibold
                                        file:bg-white file:text-gray-700
                                        hover:file:bg-gray-100 transition-all focus:outline-none"
                                    />
                                </div>

                                {/* Row 4: Message */}
                                <textarea 
                                    placeholder="How can we help you today?" 
                                    className="w-full bg-gray-50 border border-gray-200 text-sm p-4 rounded-xl h-32 focus:border-red-500 focus:bg-white focus:shadow-[0_0_0_4px_rgba(220,38,38,0.1)] outline-none transition-all resize-none"
                                    required
                                ></textarea>

                                {/* Checkbox */}
                                <label className="flex items-start gap-3 text-sm text-gray-500 font-light cursor-pointer">
                                    <input type="checkbox" className="mt-1 rounded text-red-600 focus:ring-red-500 cursor-pointer" required />
                                    <span>I agree to the <span className="text-red-600 font-medium">terms and conditions</span> and the privacy policy of Zarvix Digital.</span>
                                </label>

                                {/* Submit Button */}
                                <button className="bg-[#111111] hover:bg-red-600 text-white px-8 py-4 rounded-xl font-bold tracking-wide transition-colors duration-300 w-full text-sm shadow-lg flex items-center justify-center gap-2 group">
                                    Send Message
                                    <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

                {/* --- FAQ SECTION (Design Match: Terms & Conditions) --- */}
                <div className="mt-20">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-black text-gray-900 tracking-tight mb-3">Frequently Asked Questions</h2>
                        <p className="text-gray-500 font-light text-sm">Quick answers to common queries regarding your inquiries.</p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                        {[
                            { q: "How can I contact Zarvix Digital?", a: "You can reach us via email, phone, or by filling out the contact form on this page. Our support team is available during business hours to assist you." },
                            { q: "What are your customer support hours?", a: "Our support team is available Monday to Saturday, 9:00 AM – 7:00 PM (PKT)." },
                            { q: "How long does it take to receive a response?", a: "We usually respond to all inquiries within 24 hours on business days." },
                            { q: "Can I track my order?", a: "Yes. Once your order has been shipped, you'll receive a tracking number via email or SMS." }
                        ].map((faq, i) => (
                            <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                                <h4 className="font-bold text-gray-900 mb-2 flex items-start gap-2">
                                    <HelpCircle size={18} className="text-red-600 shrink-0 mt-0.5" /> {faq.q}
                                </h4>
                                <p className="text-sm text-gray-500 font-light pl-7 leading-relaxed">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Contact;