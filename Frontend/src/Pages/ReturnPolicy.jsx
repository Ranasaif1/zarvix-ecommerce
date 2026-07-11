import React, { useEffect } from 'react';
import { RefreshCw, HelpCircle, Phone, Mail, MapPin, Clock, CheckCircle, ShieldCheck } from 'lucide-react';

function ReturnPolicy() {
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
                    <RefreshCw className="mx-auto text-red-600 mb-6 drop-shadow-[0_0_15px_rgba(220,38,38,0.5)]" size={56} strokeWidth={1.5} />
                    <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">Return & Refund Policy</h1>
                    <p className="text-red-500 font-bold tracking-[0.2em] uppercase text-xs mb-6">Easy Returns. Hassle-Free Shopping.</p>
                    <p className="text-gray-400 font-light text-sm max-w-2xl mx-auto leading-relaxed">
                        At Zarvix Digital, customer satisfaction is our priority. If you're not completely satisfied with your purchase, we're here to help. Please read our Return & Refund Policy carefully to understand the conditions for returns, replacements, and refunds.
                    </p>
                </div>
            </div>

            {/* --- 2. MAIN CONTENT WRAPPER --- */}
            <div className="max-w-5xl mx-auto px-6 -mt-12 relative z-20">
                
                {/* Welcome Card */}
                <div className="bg-white rounded-t-3xl shadow-[0_20px_50px_-10px_rgba(0,0,0,0.08)] border-b border-gray-100 p-8 md:p-12">
                    <h2 className="text-2xl font-black text-gray-900 mb-4 tracking-tight">Welcome to Zarvix Digital</h2>
                    <p className="text-gray-600 font-light leading-relaxed mb-4">
                        We want every customer to shop with confidence. That's why we offer a simple and transparent return process for eligible products.
                    </p>
                    <p className="text-gray-800 font-medium">
                        Please review the information below before requesting a return or refund.
                    </p>
                </div>

                {/* The 10 Sections */}
                <div className="bg-white rounded-b-3xl shadow-[0_20px_50px_-10px_rgba(0,0,0,0.08)] p-8 md:p-12 space-y-12 text-gray-600 font-light leading-relaxed">
                    {[
                        {
                            title: "Return Eligibility",
                            content: (
                                <>
                                    <p className="mb-3">You may request a return if:</p>
                                    <ul className="grid sm:grid-cols-2 gap-2 mb-4 ml-2">
                                        {["The product is damaged during delivery.", "You received the wrong item.", "The product has a manufacturing defect.", "The item is incomplete or missing accessories.", "The product is unused and in its original condition."].map((item, i) => (
                                            <li key={i} className="flex items-start gap-2 text-gray-700"><CheckCircle size={16} className="text-red-500 shrink-0 mt-1" /> <span>{item}</span></li>
                                        ))}
                                    </ul>
                                    <p className="mb-3 font-medium text-gray-800 mt-6">To be eligible for a return, the product must:</p>
                                    <ul className="grid sm:grid-cols-2 gap-2 mb-2 ml-2">
                                        {["Be returned within 7 days of delivery.", "Include the original packaging.", "Include all accessories, manuals, and invoices.", "Be free from physical damage caused by misuse."].map((item, i) => (
                                            <li key={i} className="flex items-start gap-2 text-gray-700"><CheckCircle size={16} className="text-red-500 shrink-0 mt-1" /> <span>{item}</span></li>
                                        ))}
                                    </ul>
                                </>
                            )
                        },
                        {
                            title: "Non-Returnable Items",
                            content: (
                                <>
                                    <p className="mb-3">For hygiene, safety, or manufacturer restrictions, the following items cannot be returned unless they arrive damaged or defective:</p>
                                    <ul className="space-y-2 mb-4 ml-2">
                                        {["Opened software or digital products.", "Gift cards or promotional vouchers.", "Products damaged by improper use.", "Items without original packaging or proof of purchase.", "Products marked as Final Sale or Non-Returnable."].map((item, i) => (
                                            <li key={i} className="flex items-center gap-2 text-gray-700"><CheckCircle size={16} className="text-red-500 shrink-0" /> {item}</li>
                                        ))}
                                    </ul>
                                </>
                            )
                        },
                        {
                            title: "How to Request a Return",
                            content: (
                                <>
                                    <p className="mb-4">Returning a product is simple. Please follow these steps:</p>
                                    <div className="space-y-4">
                                        <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                                            <h4 className="font-bold text-gray-900 mb-1">Step 1: Contact Us</h4>
                                            <p className="text-sm">Contact our customer support team within the eligible return period.</p>
                                        </div>
                                        <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                                            <h4 className="font-bold text-gray-900 mb-1">Step 2: Provide Details</h4>
                                            <p className="text-sm">Provide your Order Number, Product Name, Reason for Return, and Photos or videos (if the item is damaged or defective).</p>
                                        </div>
                                        <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                                            <h4 className="font-bold text-gray-900 mb-1">Step 3: Await Instructions</h4>
                                            <p className="text-sm">Our support team will review your request and provide return instructions.</p>
                                        </div>
                                        <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                                            <h4 className="font-bold text-gray-900 mb-1">Step 4: Ship the Product</h4>
                                            <p className="text-sm">Ship the product back to us using the recommended courier service.</p>
                                        </div>
                                    </div>
                                </>
                            )
                        },
                        {
                            title: "Product Inspection",
                            content: (
                                <>
                                    <p className="mb-3">Once we receive your returned product, our team will inspect it. If the return meets our policy requirements, we will approve your request for:</p>
                                    <ul className="flex flex-wrap gap-4 mb-4 ml-2 font-bold text-gray-800">
                                        <li className="flex items-center gap-2"><CheckCircle size={16} className="text-red-500 shrink-0" /> Replacement</li>
                                        <li className="flex items-center gap-2"><CheckCircle size={16} className="text-red-500 shrink-0" /> Exchange</li>
                                        <li className="flex items-center gap-2"><CheckCircle size={16} className="text-red-500 shrink-0" /> Refund (where applicable)</li>
                                    </ul>
                                    <p>Inspection usually takes 2–5 business days after receiving the product.</p>
                                </>
                            )
                        },
                        {
                            title: "Refund Policy",
                            content: (
                                <>
                                    <p className="mb-3">If your refund is approved:</p>
                                    <ul className="space-y-2 mb-4 ml-2">
                                        {["Refunds will be processed using the original payment method whenever possible.", "Cash on Delivery (COD) refunds may be issued through bank transfer or another agreed method.", "Refund processing may take 5–10 business days, depending on your payment provider or bank.", "Shipping charges are generally non-refundable, unless the return is due to our mistake or a defective product."].map((item, i) => (
                                            <li key={i} className="flex items-start gap-2 text-gray-700"><CheckCircle size={16} className="text-red-500 shrink-0 mt-1" /> <span>{item}</span></li>
                                        ))}
                                    </ul>
                                </>
                            )
                        },
                        {
                            title: "Exchange Policy",
                            content: (
                                <>
                                    <p className="mb-3">Eligible products may be exchanged if:</p>
                                    <ul className="space-y-2 mb-4 ml-2">
                                        {["The item is defective.", "The wrong product was delivered.", "The product arrived damaged."].map((item, i) => (
                                            <li key={i} className="flex items-center gap-2 text-gray-700"><CheckCircle size={16} className="text-red-500 shrink-0" /> {item}</li>
                                        ))}
                                    </ul>
                                    <p className="font-medium text-gray-800">Exchanges are subject to product availability.</p>
                                </>
                            )
                        },
                        {
                            title: "Damaged or Incorrect Orders",
                            content: (
                                <>
                                    <p className="mb-2">If your order arrives damaged, defective, or incorrect, please contact us within <strong>48 hours</strong> of delivery.</p>
                                    <p className="mb-3">To help us resolve your request quickly, include:</p>
                                    <ul className="grid sm:grid-cols-3 gap-2 mb-4 ml-2">
                                        {["Photos of the product", "Photos of the packaging", "Your order number"].map((item, i) => (
                                            <li key={i} className="flex items-center gap-2 text-gray-700"><CheckCircle size={16} className="text-red-500 shrink-0" /> {item}</li>
                                        ))}
                                    </ul>
                                    <p>Our team will arrange a replacement or another suitable solution after verification.</p>
                                </>
                            )
                        },
                        {
                            title: "Return Shipping",
                            content: (
                                <>
                                    <p className="mb-3">If the return is due to <strong>Our mistake, A defective product, A damaged shipment, or An incorrect item</strong>, Zarvix Digital will cover the return shipping cost.</p>
                                    <p className="text-gray-700 bg-gray-50 p-4 rounded-lg border border-gray-100">
                                        If the return is due to a change of mind or another customer-related reason, the customer may be responsible for the return shipping charges.
                                    </p>
                                </>
                            )
                        },
                        {
                            title: "Order Cancellation",
                            content: (
                                <>
                                    <p className="mb-2">Orders may be cancelled before they are shipped.</p>
                                    <p>Once an order has been dispatched, it cannot be cancelled. However, you may request a return after receiving the product if it meets the return conditions.</p>
                                </>
                            )
                        },
                        {
                            title: "Our Commitment",
                            content: (
                                <>
                                    <p>We are committed to making every shopping experience smooth, secure, and customer-friendly. Our support team is always available to assist you with returns, exchanges, or refund-related questions.</p>
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
                            Your satisfaction is our priority. We are committed to providing quality products, transparent policies, and reliable customer support to ensure a safe and confident shopping experience with Zarvix Digital.
                        </p>
                    </div>
                </div>

                {/* --- FAQ SECTION --- */}
                <div className="mt-16">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-black text-gray-900 tracking-tight mb-3">Frequently Asked Questions</h2>
                        <p className="text-gray-500 font-light text-sm">Quick answers to common queries regarding returns and refunds.</p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                        {[
                            { q: "Can I return a product if I simply change my mind?", a: "Returns for a change of mind may be accepted only if the product is unused, unopened, and in its original packaging, subject to our review." },
                            { q: "How long do refunds take?", a: "Approved refunds are typically processed within 5–10 business days." },
                            { q: "Who pays for return shipping?", a: "If the return is due to our error or a defective product, we will cover the return shipping cost. Otherwise, return shipping may be the customer's responsibility." },
                            { q: "Can I exchange my product?", a: "Yes, eligible products can be exchanged, depending on stock availability and compliance with this policy." },
                            { q: "What if I receive a damaged product?", a: "Please contact us within 48 hours of delivery with photos of the product and packaging. We will review your request and arrange an appropriate resolution." }
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
                        <p className="text-gray-400 font-light text-sm max-w-md">If you have any questions about our Return & Refund Policy, please contact our support team.</p>
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

export default ReturnPolicy;