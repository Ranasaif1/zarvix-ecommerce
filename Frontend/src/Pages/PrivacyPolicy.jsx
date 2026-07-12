import React, { useEffect } from 'react';
import { Lock, HelpCircle, Phone, Mail, MapPin, Clock, CheckCircle, ShieldCheck } from 'lucide-react';

function PrivacyPolicy() {
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
                    <Lock className="mx-auto text-red-600 mb-6 drop-shadow-[0_0_15px_rgba(220,38,38,0.5)]" size={56} strokeWidth={1.5} />
                    <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">Privacy Policy</h1>
                    <p className="text-red-500 font-bold tracking-[0.2em] uppercase text-xs mb-6">Protecting Your Privacy Matters</p>
                    <p className="text-gray-400 font-light text-sm max-w-2xl mx-auto leading-relaxed">
                        At Zarvix Digital, your privacy is one of our top priorities. This Privacy Policy explains how we collect, use, store, and protect your personal information when you visit our website or make a purchase.
                    </p>
                </div>
            </div>

            {/* --- 2. MAIN CONTENT WRAPPER --- */}
            <div className="max-w-5xl mx-auto px-6 -mt-12 relative z-20">
                
                {/* Welcome Card */}
                <div className="bg-white rounded-t-3xl shadow-[0_20px_50px_-10px_rgba(0,0,0,0.08)] border-b border-gray-100 p-8 md:p-12">
                    <h2 className="text-2xl font-black text-gray-900 mb-4 tracking-tight">Welcome to Zarvix Digital</h2>
                    <p className="text-gray-600 font-light leading-relaxed mb-4">
                        We believe that trust is built through transparency. Whether you're browsing our products, creating an account, or placing an order, we are committed to protecting your personal information and ensuring a safe online shopping experience.
                    </p>
                    <p className="text-gray-800 font-medium">
                        This policy explains what information we collect, why we collect it, and how we use it.
                    </p>
                </div>

                {/* The 10 Sections */}
                <div className="bg-white rounded-b-3xl shadow-[0_20px_50px_-10px_rgba(0,0,0,0.08)] p-8 md:p-12 space-y-12 text-gray-600 font-light leading-relaxed">
                    {[
                        {
                            title: "Information We Collect",
                            content: (
                                <>
                                    <p className="mb-4">When you interact with Zarvix Digital, we may collect the following information:</p>
                                    
                                    <h4 className="font-bold text-gray-800 mb-2">Personal & Account Information</h4>
                                    <ul className="grid sm:grid-cols-2 gap-2 mb-4 ml-2">
                                        {["Full Name", "Email Address", "Phone Number", "Shipping Address", "Billing Address", "Username", "Password (encrypted)", "Order History"].map((item, i) => (
                                            <li key={i} className="flex items-center gap-2 text-gray-700"><CheckCircle size={16} className="text-red-500 shrink-0" /> {item}</li>
                                        ))}
                                    </ul>

                                    <h4 className="font-bold text-gray-800 mt-6 mb-2">Payment Information</h4>
                                    <p className="mb-4 text-sm bg-gray-50 p-3 rounded-lg border border-gray-100">We do not store your debit or credit card details. Payments are securely processed through trusted payment providers.</p>

                                    <h4 className="font-bold text-gray-800 mt-6 mb-2">Technical Information</h4>
                                    <ul className="grid sm:grid-cols-2 gap-2 mb-3 ml-2">
                                        {["IP Address", "Browser Type", "Device Information", "Operating System", "Pages Visited", "Time Spent on Website"].map((item, i) => (
                                            <li key={i} className="flex items-center gap-2 text-gray-700"><CheckCircle size={16} className="text-red-500 shrink-0" /> {item}</li>
                                        ))}
                                    </ul>
                                </>
                            )
                        },
                        {
                            title: "How We Use Your Information",
                            content: (
                                <>
                                    <p className="mb-3">Your information is collected to:</p>
                                    <ul className="space-y-2 mb-4 ml-2">
                                        {["Process and deliver your orders", "Verify payments", "Provide customer support", "Improve our website and services", "Send order updates", "Notify you about promotions and special offers (only if you subscribe)", "Prevent fraud and unauthorized activities"].map((item, i) => (
                                            <li key={i} className="flex items-center gap-2 text-gray-700"><CheckCircle size={16} className="text-red-500 shrink-0" /> {item}</li>
                                        ))}
                                    </ul>
                                    <p className="font-medium text-gray-800">We only collect information necessary to provide a better shopping experience.</p>
                                </>
                            )
                        },
                        {
                            title: "Cookies",
                            content: (
                                <>
                                    <p className="mb-3">Our website uses cookies to improve your browsing experience. Cookies help us:</p>
                                    <ul className="space-y-2 mb-4 ml-2">
                                        {["Remember your preferences", "Keep items in your shopping cart", "Analyze website traffic", "Improve website performance", "Personalize your shopping experience"].map((item, i) => (
                                            <li key={i} className="flex items-center gap-2 text-gray-700"><CheckCircle size={16} className="text-red-500 shrink-0" /> {item}</li>
                                        ))}
                                    </ul>
                                    <p>You can disable cookies through your browser settings, although some website features may not work properly.</p>
                                </>
                            )
                        },
                        {
                            title: "Data Security",
                            content: (
                                <>
                                    <p className="mb-3">We take appropriate technical and organizational measures to protect your information. Our security practices include:</p>
                                    <ul className="space-y-2 mb-4 ml-2">
                                        {["Secure website connections (SSL encryption)", "Protected customer accounts", "Regular security monitoring", "Restricted access to personal information"].map((item, i) => (
                                            <li key={i} className="flex items-center gap-2 text-gray-700"><CheckCircle size={16} className="text-red-500 shrink-0" /> {item}</li>
                                        ))}
                                    </ul>
                                    <p>Although no online system is 100% secure, we continuously work to protect your data.</p>
                                </>
                            )
                        },
                        {
                            title: "Sharing Your Information",
                            content: (
                                <>
                                    <p className="mb-2 font-medium text-gray-800">We respect your privacy. We do not sell, rent, or trade your personal information to third parties.</p>
                                    <p className="mb-3">Your information may only be shared with trusted service providers when necessary, such as:</p>
                                    <ul className="space-y-2 mb-4 ml-2">
                                        {["Shipping and courier companies", "Payment service providers", "Technical service providers supporting our website", "Government authorities when required by law"].map((item, i) => (
                                            <li key={i} className="flex items-center gap-2 text-gray-700"><CheckCircle size={16} className="text-red-500 shrink-0" /> {item}</li>
                                        ))}
                                    </ul>
                                    <p>These parties are only given the information necessary to perform their services.</p>
                                </>
                            )
                        },
                        {
                            title: "Email Communication",
                            content: (
                                <>
                                    <p className="mb-3">If you subscribe to our newsletter, you may receive:</p>
                                    <ul className="grid grid-cols-2 gap-2 mb-4 ml-2">
                                        {["Product launches", "Special discounts", "Promotional offers", "Technology updates", "Store announcements"].map((item, i) => (
                                            <li key={i} className="flex items-center gap-2 text-gray-700"><CheckCircle size={16} className="text-red-500 shrink-0" /> {item}</li>
                                        ))}
                                    </ul>
                                    <p>You can unsubscribe at any time by clicking the Unsubscribe link included in our emails.</p>
                                </>
                            )
                        },
                        {
                            title: "Your Rights",
                            content: (
                                <>
                                    <p className="mb-3">As a customer, you have the right to:</p>
                                    <ul className="space-y-2 mb-4 ml-2">
                                        {["Access your personal information", "Update incorrect information", "Request deletion of your account (where applicable)", "Unsubscribe from marketing emails", "Contact us regarding your personal data"].map((item, i) => (
                                            <li key={i} className="flex items-center gap-2 text-gray-700"><CheckCircle size={16} className="text-red-500 shrink-0" /> {item}</li>
                                        ))}
                                    </ul>
                                    <p>We aim to respond to privacy-related requests as quickly as possible.</p>
                                </>
                            )
                        },
                        {
                            title: "Third-Party Links",
                            content: (
                                <>
                                    <p className="mb-2">Our website may contain links to third-party websites.</p>
                                    <p>We are not responsible for the privacy practices or content of those external websites. We encourage you to review their privacy policies before sharing your information.</p>
                                </>
                            )
                        },
                        {
                            title: "Children's Privacy",
                            content: (
                                <>
                                    <p className="mb-2">Zarvix Digital is not intended for children under the age of 13.</p>
                                    <p>We do not knowingly collect personal information from children. If such information is identified, it will be removed promptly.</p>
                                </>
                            )
                        },
                        {
                            title: "Changes to This Privacy Policy",
                            content: (
                                <>
                                    <p className="mb-2">We may update this Privacy Policy from time to time to reflect changes in our services or legal requirements.</p>
                                    <p className="mb-2">Any updates will be posted on this page with the revised <strong>Last Updated</strong> date.</p>
                                    <p>We encourage you to review this page periodically.</p>
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

                {/* --- YOUR PRIVACY PROMISE WIDGET --- */}
                <div className="mt-8 bg-green-50 border border-green-100 rounded-3xl p-8 flex items-start gap-4 shadow-sm">
                    <ShieldCheck className="text-green-600 shrink-0 mt-1" size={28} />
                    <div>
                        <h4 className="text-lg font-bold text-green-900 mb-2">Your Privacy Promise</h4>
                        <p className="text-green-800 font-light text-sm leading-relaxed">
                            At Zarvix Digital, protecting your information is more than a responsibility—it's a commitment. We work hard to provide a secure, transparent, and trustworthy shopping experience for every customer.
                        </p>
                    </div>
                </div>

                {/* --- FAQ SECTION --- */}
                <div className="mt-16">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-black text-gray-900 tracking-tight mb-3">Frequently Asked Questions</h2>
                        <p className="text-gray-500 font-light text-sm">Quick answers to common queries regarding your privacy.</p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                        {[
                            { q: "Is my personal information safe?", a: "Yes. We use industry-standard security measures to help protect your personal information." },
                            { q: "Do you sell customer data?", a: "No. We never sell or rent your personal information." },
                            { q: "Can I unsubscribe from promotional emails?", a: "Yes. You can unsubscribe at any time using the link provided in our emails." },
                            { q: "Do you store payment card information?", a: "No. Payment details are securely handled by trusted payment providers and are not stored on our servers." },
                            { q: "Can I request deletion of my account?", a: "Yes. You can contact our support team to request account deletion, subject to any legal or operational requirements." }
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

                {/* --- CONTACT SECTION --- */}
                <div className="mt-16 bg-[#111111] rounded-3xl p-8 md:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
                    <div className="text-center md:text-left">
                        <h3 className="text-2xl font-black tracking-tight mb-2">Contact Us</h3>
                        <p className="text-gray-400 font-light text-sm max-w-md">If you have any questions about this Privacy Policy or how your information is handled, please contact us.</p>
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

export default PrivacyPolicy;