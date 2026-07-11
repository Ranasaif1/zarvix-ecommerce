import React, { useEffect } from 'react';
import { ShieldCheck, Info, HelpCircle, Phone, Mail, MapPin, Clock, CheckCircle2, AlertTriangle, ChevronRight } from 'lucide-react';

function Terms() {
    // Page load hone par automatically top par scroll karne ke liye
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="bg-[#f4f5f7] min-h-screen pb-24" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            
            {/* --- 1. PREMIUM HERO SECTION --- */}
            <div className="bg-[#050505] pt-32 pb-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(220,38,38,0.12),transparent_70%)] pointer-events-none"></div>
                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
                
                <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
                    <ShieldCheck className="mx-auto text-red-600 mb-6 drop-shadow-[0_0_15px_rgba(220,38,38,0.5)]" size={56} strokeWidth={1.5} />
                    <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">Terms & Conditions</h1>
                    <p className="text-red-500 font-bold tracking-[0.2em] uppercase text-xs mb-6">Transparent. Fair. Customer First.</p>
                    <p className="text-gray-400 font-light text-sm max-w-2xl mx-auto leading-relaxed">
                        Please read these Terms & Conditions carefully before using Zarvix Digital. By accessing our website or placing an order, you agree to the policies outlined below.
                    </p>
                </div>
            </div>

            {/* --- 2. MAIN CONTENT WRAPPER --- */}
            <div className="max-w-5xl mx-auto px-6 -mt-12 relative z-20">
                
                {/* Welcome Card */}
                <div className="bg-white rounded-t-3xl shadow-[0_20px_50px_-10px_rgba(0,0,0,0.08)] border-b border-gray-100 p-8 md:p-12">
                    <h2 className="text-2xl font-black text-gray-900 mb-4 tracking-tight">Welcome to Zarvix Digital</h2>
                    <p className="text-gray-600 font-light leading-relaxed mb-4">
                        At Zarvix Digital, we are committed to providing a secure, transparent, and reliable shopping experience. These Terms & Conditions govern your use of our website and all purchases made through our platform. By continuing to browse or shop with us, you acknowledge that you have read, understood, and agreed to these terms.
                    </p>
                    <p className="text-gray-800 font-medium">
                        Our goal is to build long-term trust by delivering quality products, honest service, and customer satisfaction.
                    </p>
                </div>

                {/* The 12 Sections */}
                <div className="bg-white rounded-b-3xl shadow-[0_20px_50px_-10px_rgba(0,0,0,0.08)] p-8 md:p-12 space-y-12 text-gray-600 font-light leading-relaxed">
                    
                    {[
                        {
                            title: "Website Usage",
                            content: (
                                <>
                                    <p className="mb-2">You agree to use this website responsibly and only for lawful purposes. Any attempt to misuse, disrupt, or gain unauthorized access to our website, servers, or services is strictly prohibited.</p>
                                    <p>Users must provide accurate and up-to-date information when creating an account or placing an order.</p>
                                </>
                            )
                        },
                        {
                            title: "Product Information",
                            content: (
                                <>
                                    <p className="mb-2">We strive to ensure that all product descriptions, images, specifications, and prices are accurate. However, slight variations in color, packaging, or specifications may occur due to manufacturer updates or display settings.</p>
                                    <p>Zarvix Digital reserves the right to update product information without prior notice.</p>
                                </>
                            )
                        },
                        {
                            title: "Orders & Confirmation",
                            content: (
                                <>
                                    <p className="mb-3">After placing an order, you will receive an order confirmation email or message. Order confirmation does not guarantee acceptance of the order. We reserve the right to cancel or decline any order due to:</p>
                                    <ul className="space-y-2 mb-3 ml-2">
                                        {["Product unavailability", "Pricing or technical errors", "Suspicious or fraudulent activity", "Incomplete customer information"].map((item, i) => (
                                            <li key={i} className="flex items-center gap-2 text-gray-700"><CheckCircle2 size={16} className="text-red-500 shrink-0" /> {item}</li>
                                        ))}
                                    </ul>
                                    <p>If your order is cancelled after payment, the eligible amount will be refunded according to our refund policy.</p>
                                </>
                            )
                        },
                        {
                            title: "Pricing & Payments",
                            content: (
                                <>
                                    <p className="mb-2">All prices displayed on Zarvix Digital are subject to change without notice.</p>
                                    <p>We accept secure payment methods available during checkout. Orders will only be processed after payment verification or order confirmation, depending on the selected payment method.</p>
                                </>
                            )
                        },
                        {
                            title: "Shipping & Delivery",
                            content: (
                                <>
                                    <p className="mb-2">We partner with trusted courier services to deliver your orders safely and on time. Estimated delivery times may vary depending on your location, weather conditions, courier operations, or public holidays.</p>
                                    <p>While we do our best to ensure timely delivery, Zarvix Digital is not responsible for delays caused by third-party courier services.</p>
                                </>
                            )
                        },
                        {
                            title: "Returns & Refunds",
                            content: (
                                <>
                                    <p className="mb-3">Customer satisfaction is important to us. Products may be eligible for return or replacement if they meet the conditions outlined in our Return Policy. Returned items must:</p>
                                    <ul className="space-y-2 mb-3 ml-2">
                                        {["Be unused and in original condition", "Include original packaging", "Contain all accessories and documentation"].map((item, i) => (
                                            <li key={i} className="flex items-center gap-2 text-gray-700"><CheckCircle2 size={16} className="text-red-500 shrink-0" /> {item}</li>
                                        ))}
                                    </ul>
                                    <p>Refunds will be processed after successful inspection and approval.</p>
                                </>
                            )
                        },
                        {
                            title: "Warranty",
                            content: (
                                <>
                                    <p className="mb-2">Warranty coverage varies depending on the manufacturer and product category. Warranty claims are subject to manufacturer terms and conditions.</p>
                                    <p>Customers should retain their invoice or proof of purchase for warranty claims.</p>
                                </>
                            )
                        },
                        {
                            title: "User Responsibilities",
                            content: (
                                <>
                                    <p className="mb-3">By using Zarvix Digital, you agree that you will not:</p>
                                    <ul className="space-y-2 mb-3 ml-2">
                                        {["Use the website for illegal activities", "Upload malicious software or harmful content", "Attempt unauthorized access to customer accounts", "Misuse promotions or discount offers", "Interfere with website functionality"].map((item, i) => (
                                            <li key={i} className="flex items-center gap-2 text-gray-700"><CheckCircle2 size={16} className="text-red-500 shrink-0" /> {item}</li>
                                        ))}
                                    </ul>
                                    <p className="font-medium text-gray-800">Violation of these rules may result in account suspension or legal action.</p>
                                </>
                            )
                        },
                        {
                            title: "Intellectual Property",
                            content: (
                                <>
                                    <p className="mb-2">All content on Zarvix Digital, including logos, graphics, product images, text, website design, icons, and branding, is the property of Zarvix Digital unless otherwise stated.</p>
                                    <p>Unauthorized copying, reproduction, or distribution of any content is prohibited without written permission.</p>
                                </>
                            )
                        },
                        {
                            title: "Limitation of Liability",
                            content: (
                                <>
                                    <p className="mb-2">Zarvix Digital shall not be held liable for indirect, incidental, or consequential damages resulting from the use of our website or purchased products.</p>
                                    <p>Our maximum liability shall not exceed the amount paid for the relevant product.</p>
                                </>
                            )
                        },
                        {
                            title: "Privacy & Security",
                            content: (
                                <>
                                    <p className="mb-2">We value your privacy and are committed to protecting your personal information. Customer data is handled securely and used only for order processing, customer support, and service improvements.</p>
                                    <p>For complete details, please refer to our Privacy Policy.</p>
                                </>
                            )
                        },
                        {
                            title: "Updates to These Terms",
                            content: (
                                <>
                                    <p className="mb-2">Zarvix Digital reserves the right to update or modify these Terms & Conditions at any time without prior notice.</p>
                                    <p className="mb-2">Any changes will become effective immediately after being published on this page.</p>
                                    <p>We encourage customers to review this page periodically.</p>
                                </>
                            )
                        }
                    ].map((section, index) => (
                        <div key={index} className="flex gap-4 md:gap-6">
                            <div className="shrink-0 mt-1">
                                <span className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-900 font-bold text-sm">
                                    {index + 1}
                                </span>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3 tracking-tight">{section.title}</h3>
                                <div className="text-sm md:text-base text-gray-600">
                                    {section.content}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* --- 3. IMPORTANT NOTICE WIDGET --- */}
                <div className="mt-8 bg-red-50 border border-red-100 rounded-3xl p-8 flex items-start gap-4">
                    <AlertTriangle className="text-red-600 shrink-0 mt-1" size={28} />
                    <div>
                        <h4 className="text-lg font-bold text-red-900 mb-2">Important Notice</h4>
                        <p className="text-red-800 font-light text-sm leading-relaxed">
                            By accessing or using Zarvix Digital, you acknowledge that you have read, understood, and agreed to these Terms & Conditions. If you do not agree with any part of these terms, please discontinue the use of our website.
                        </p>
                    </div>
                </div>

                {/* --- 4. FAQ SECTION --- */}
                <div className="mt-16">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-black text-gray-900 tracking-tight mb-3">Frequently Asked Questions</h2>
                        <p className="text-gray-500 font-light text-sm">Quick answers to common queries regarding our policies.</p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                        {[
                            { q: "Can I cancel my order?", a: "Yes. Orders may be cancelled before they are dispatched. Once shipped, cancellation may no longer be possible." },
                            { q: "How long does delivery take?", a: "Most orders are delivered within 3–7 business days, depending on your location." },
                            { q: "Can I return a product?", a: "Yes. Eligible products can be returned according to our Return & Refund Policy." },
                            { q: "Are my payments secure?", a: "Absolutely. We use secure payment methods and industry-standard security practices to protect your transactions." }
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

                {/* --- 5. NEED ASSISTANCE SECTION --- */}
                <div className="mt-16 bg-[#111111] rounded-3xl p-8 md:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
                    <div className="text-center md:text-left">
                        <h3 className="text-2xl font-black tracking-tight mb-2">Need Assistance?</h3>
                        <p className="text-gray-400 font-light text-sm">We're Here to Help. If you have any questions regarding these Terms & Conditions, our support team is always ready to assist you.</p>
                    </div>
                    <div className="shrink-0 flex flex-col gap-4 w-full md:w-auto">
                        <div className="flex items-center gap-3 bg-[#1a1a1a] px-6 py-3 rounded-xl border border-gray-800">
                            <Mail className="text-red-500" size={18} /> <span className="text-sm font-medium tracking-wide">support@zarvix.com</span>
                        </div>
                        <div className="flex items-center gap-3 bg-[#1a1a1a] px-6 py-3 rounded-xl border border-gray-800">
                            <Phone className="text-red-500" size={18} /> <span className="text-sm font-medium tracking-wide">+92 300 1234567</span>
                        </div>
                    </div>
                </div>
                
                {/* Contact Footer Details */}
                <div className="mt-6 flex flex-wrap justify-center gap-6 text-xs font-semibold uppercase tracking-widest text-gray-400">
                    <span className="flex items-center gap-2"><Clock size={14} className="text-red-600" /> Mon – Sat | 9:00 AM – 7:00 PM</span>
                    <span className="flex items-center gap-2"><MapPin size={14} className="text-red-600" /> Karachi, Pakistan</span>
                </div>

            </div>
        </div>
    );
}

export default Terms;