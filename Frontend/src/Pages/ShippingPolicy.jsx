import React, { useEffect } from 'react';
import { Truck, HelpCircle, Phone, Mail, MapPin, Clock, CheckCircle, ShieldCheck } from 'lucide-react';

function ShippingPolicy() {
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
                    <Truck className="mx-auto text-red-600 mb-6 drop-shadow-[0_0_15px_rgba(220,38,38,0.5)]" size={56} strokeWidth={1.5} />
                    <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">Shipping Policy</h1>
                    <p className="text-red-500 font-bold tracking-[0.2em] uppercase text-xs mb-6">Fast, Safe & Reliable Delivery</p>
                    <p className="text-gray-400 font-light text-sm max-w-2xl mx-auto leading-relaxed">
                        At Zarvix Digital, we are committed to delivering your orders quickly, safely, and securely. This Shipping Policy explains how we process, ship, and deliver your purchases.
                    </p>
                </div>
            </div>

            {/* --- 2. MAIN CONTENT WRAPPER --- */}
            <div className="max-w-5xl mx-auto px-6 -mt-12 relative z-20">
                
                {/* Welcome Card */}
                <div className="bg-white rounded-t-3xl shadow-[0_20px_50px_-10px_rgba(0,0,0,0.08)] border-b border-gray-100 p-8 md:p-12">
                    <h2 className="text-2xl font-black text-gray-900 mb-4 tracking-tight">Welcome to Zarvix Digital</h2>
                    <p className="text-gray-600 font-light leading-relaxed mb-4">
                        We understand how important timely delivery is. That's why we work with trusted courier partners to ensure your products reach you in excellent condition and within the estimated delivery time.
                    </p>
                    <p className="text-gray-800 font-medium">
                        Our goal is to provide a smooth and reliable shipping experience for every customer.
                    </p>
                </div>

                {/* The 10 Sections */}
                <div className="bg-white rounded-b-3xl shadow-[0_20px_50px_-10px_rgba(0,0,0,0.08)] p-8 md:p-12 space-y-12 text-gray-600 font-light leading-relaxed">
                    {[
                        {
                            title: "Order Processing",
                            content: (
                                <>
                                    <p className="mb-3">All orders are processed after successful payment confirmation or order verification.</p>
                                    <ul className="grid sm:grid-cols-2 gap-2 mb-2 ml-2">
                                        {["Orders are processed during business days only.", "Orders placed on weekends or public holidays will be processed on the next working day.", "Processing time usually takes 1–2 business days.", "Once your order has been shipped, you will receive a confirmation email or SMS with your tracking details."].map((item, i) => (
                                            <li key={i} className="flex items-start gap-2 text-gray-700"><CheckCircle size={16} className="text-red-500 shrink-0 mt-1" /> <span>{item}</span></li>
                                        ))}
                                    </ul>
                                </>
                            )
                        },
                        {
                            title: "Shipping Time",
                            content: (
                                <>
                                    <p className="mb-3">Estimated delivery times may vary depending on your location.</p>
                                    <ul className="space-y-2 mb-4 ml-2">
                                        <li className="flex items-center gap-2 text-gray-700"><CheckCircle size={16} className="text-red-500 shrink-0" /> <strong>Major Cities:</strong> 2–4 Business Days</li>
                                        <li className="flex items-center gap-2 text-gray-700"><CheckCircle size={16} className="text-red-500 shrink-0" /> <strong>Other Cities & Towns:</strong> 3–7 Business Days</li>
                                        <li className="flex items-center gap-2 text-gray-700"><CheckCircle size={16} className="text-red-500 shrink-0" /> <strong>Remote Areas:</strong> 5–10 Business Days</li>
                                    </ul>
                                    <p className="font-medium text-gray-800">Delivery times are estimates and may vary due to weather conditions, public holidays, or courier delays.</p>
                                </>
                            )
                        },
                        {
                            title: "Shipping Charges",
                            content: (
                                <>
                                    <p className="mb-3">Shipping charges are calculated during checkout based on your location and order value. We may also offer:</p>
                                    <ul className="space-y-2 mb-4 ml-2">
                                        {["Free Shipping on eligible orders", "Promotional shipping offers during special campaigns", "Discounted delivery charges for selected products"].map((item, i) => (
                                            <li key={i} className="flex items-center gap-2 text-gray-700"><CheckCircle size={16} className="text-red-500 shrink-0" /> {item}</li>
                                        ))}
                                    </ul>
                                    <p>Any applicable shipping fee will be clearly displayed before payment.</p>
                                </>
                            )
                        },
                        {
                            title: "Order Tracking",
                            content: (
                                <>
                                    <p className="mb-2">Once your order has been dispatched, you will receive a tracking number.</p>
                                    <p className="mb-2">You can use this tracking number to monitor the status of your shipment through the courier's tracking system.</p>
                                    <p>If you need assistance, our customer support team is always available to help.</p>
                                </>
                            )
                        },
                        {
                            title: "Delivery Information",
                            content: (
                                <>
                                    <p className="mb-3">To ensure successful delivery:</p>
                                    <ul className="space-y-2 mb-4 ml-2">
                                        {["Please provide a complete and accurate shipping address.", "Include a valid phone number for delivery confirmation.", "Ensure someone is available to receive the package."].map((item, i) => (
                                            <li key={i} className="flex items-center gap-2 text-gray-700"><CheckCircle size={16} className="text-red-500 shrink-0" /> {item}</li>
                                        ))}
                                    </ul>
                                    <p className="text-gray-700 bg-gray-50 p-4 rounded-lg border border-gray-100">
                                        Incorrect or incomplete delivery information may result in delays or additional shipping charges.
                                    </p>
                                </>
                            )
                        },
                        {
                            title: "Delivery Delays",
                            content: (
                                <>
                                    <p className="mb-3">Although we aim to deliver every order on time, delays may occur due to:</p>
                                    <ul className="grid sm:grid-cols-2 gap-2 mb-4 ml-2">
                                        {["Severe weather conditions", "Public holidays", "Courier service disruptions", "High order volumes", "Incorrect delivery information"].map((item, i) => (
                                            <li key={i} className="flex items-center gap-2 text-gray-700"><CheckCircle size={16} className="text-red-500 shrink-0" /> {item}</li>
                                        ))}
                                    </ul>
                                    <p>If your order is delayed, our support team will assist you in tracking your shipment.</p>
                                </>
                            )
                        },
                        {
                            title: "Damaged or Missing Items",
                            content: (
                                <>
                                    <p className="mb-2">If your order arrives damaged or incomplete, please notify us within <strong>48 hours</strong> of receiving your package.</p>
                                    <p className="mb-3">To help us investigate your request, please provide:</p>
                                    <ul className="grid sm:grid-cols-2 gap-2 mb-4 ml-2">
                                        {["Your Order Number", "Photos of the damaged product", "Photos of the package", "A brief description of the issue"].map((item, i) => (
                                            <li key={i} className="flex items-center gap-2 text-gray-700"><CheckCircle size={16} className="text-red-500 shrink-0" /> {item}</li>
                                        ))}
                                    </ul>
                                    <p>After verification, we will arrange a replacement or another suitable resolution where applicable.</p>
                                </>
                            )
                        },
                        {
                            title: "International Shipping",
                            content: (
                                <>
                                    <p className="mb-2">Currently, Zarvix Digital primarily serves customers within Pakistan.</p>
                                    <p>International shipping may become available in the future. Any updates will be announced on our website.</p>
                                </>
                            )
                        },
                        {
                            title: "Failed Delivery Attempts",
                            content: (
                                <>
                                    <p className="mb-3">If the courier is unable to deliver your package after multiple attempts:</p>
                                    <ul className="space-y-2 mb-2 ml-2">
                                        {["The order may be returned to our warehouse.", "Our team will contact you to arrange re-delivery.", "Additional shipping charges may apply in certain cases."].map((item, i) => (
                                            <li key={i} className="flex items-center gap-2 text-gray-700"><CheckCircle size={16} className="text-red-500 shrink-0" /> {item}</li>
                                        ))}
                                    </ul>
                                </>
                            )
                        },
                        {
                            title: "Shipping Restrictions",
                            content: (
                                <>
                                    <p className="mb-3">Some products may have shipping restrictions based on:</p>
                                    <ul className="grid sm:grid-cols-2 gap-2 mb-4 ml-2">
                                        {["Product size or weight", "Delivery location", "Courier service limitations", "Government regulations"].map((item, i) => (
                                            <li key={i} className="flex items-center gap-2 text-gray-700"><CheckCircle size={16} className="text-red-500 shrink-0" /> {item}</li>
                                        ))}
                                    </ul>
                                    <p>If a product cannot be shipped to your location, we will inform you before processing the order.</p>
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

                {/* --- OUR PROMISE WIDGET --- */}
                <div className="mt-8 bg-green-50 border border-green-100 rounded-3xl p-8 flex items-start gap-4 shadow-sm">
                    <ShieldCheck className="text-green-600 shrink-0 mt-1" size={28} />
                    <div>
                        <h4 className="text-lg font-bold text-green-900 mb-2">Our Promise</h4>
                        <p className="text-green-800 font-light text-sm leading-relaxed">
                            At Zarvix Digital, we are committed to delivering your orders safely, quickly, and with complete transparency. From secure packaging to reliable delivery, your satisfaction is our priority every step of the way.
                        </p>
                    </div>
                </div>

                {/* --- FAQ SECTION --- */}
                <div className="mt-16">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-black text-gray-900 tracking-tight mb-3">Frequently Asked Questions</h2>
                        <p className="text-gray-500 font-light text-sm">Quick answers to common queries regarding shipping and delivery.</p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                        {[
                            { q: "How long does delivery take?", a: "Most orders are delivered within 2–7 business days, depending on your location." },
                            { q: "Do you offer free shipping?", a: "Yes. Free shipping may be available on eligible orders or during promotional campaigns." },
                            { q: "How can I track my order?", a: "After your order is shipped, you will receive a tracking number via email or SMS." },
                            { q: "What should I do if my order is delayed?", a: "Please contact our customer support team. We will help track your shipment and provide the latest delivery updates." },
                            { q: "What if I receive a damaged package?", a: "Contact us within 48 hours of delivery and share photos of the product and packaging. We will review your request and arrange an appropriate solution." }
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
                        <h3 className="text-2xl font-black tracking-tight mb-2">Need Help?</h3>
                        <p className="text-gray-400 font-light text-sm max-w-md">If you have any questions regarding our Shipping Policy, please contact us.</p>
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

export default ShippingPolicy;