import React, { useContext, useEffect } from 'react';
import { CartContext } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, ArrowLeft, Trash2, User, Zap, ShieldCheck } from 'lucide-react';

function Cart() {
    const { cart, clearCart } = useContext(CartContext); 
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Total calculation
    const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    // Checkout Handle Function (Updated)
    const handleCheckout = (type) => {
        // Ab alert ki jagah direct Checkout page par bhej rahe hain
        navigate("/checkout"); 
    };

    // EMPTY CART STATE (Premium Design)
    if (cart.length === 0) {
        return (
            <div className="bg-[#f8f9fa] min-h-screen pt-12 pb-24" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                <div className="max-w-[1400px] mx-auto px-4 md:px-6">
                    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-12 md:p-24 text-center max-w-3xl mx-auto mt-10">
                        <div className="w-24 h-24 bg-gray-50 text-gray-300 rounded-full flex items-center justify-center mx-auto mb-6">
                            <ShoppingCart size={48} />
                        </div>
                        <h2 className="text-3xl font-black text-gray-900 mb-4 tracking-tight">Your Cart is Empty</h2>
                        <p className="text-gray-500 font-light mb-8 max-w-md mx-auto">
                            Looks like you haven't added anything to your cart yet. Explore our premium collection and upgrade your tech experience today.
                        </p>
                        <Link to="/shop" className="inline-flex items-center justify-center gap-2 bg-red-600 text-white font-bold px-10 py-4 rounded-xl hover:bg-black transition-colors shadow-md">
                            <ArrowLeft size={18} /> Continue Shopping
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    // FILLED CART STATE
    return (
        <div className="bg-[#f8f9fa] min-h-screen pt-6 pb-24" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            <div className="max-w-[1400px] mx-auto px-4 md:px-6">
                
                {/* Clean Breadcrumb */}
                <div className="pb-6 flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400">
                    <Link to="/" className="hover:text-red-600 transition-colors">Home</Link>
                    <span>/</span>
                    <span className="text-gray-900">Shopping Cart</span>
                </div>

                <div className="grid lg:grid-cols-12 gap-8 items-start">
                    
                    {/* ================= LEFT: CART ITEMS ================= */}
                    <div className="lg:col-span-8 bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
                        <div className="flex items-center justify-between border-b border-gray-100 pb-6 mb-6">
                            <h2 className="text-2xl font-black text-gray-900 tracking-tight flex items-center gap-3">
                                <ShoppingCart size={28} className="text-red-600" /> Shopping Cart
                            </h2>
                            <span className="text-sm font-bold text-gray-400 bg-gray-50 px-3 py-1 rounded-lg">
                                {cart.length} Items
                            </span>
                        </div>

                        <div className="space-y-6">
                            {cart.map((item, index) => (
                                <div key={index} className="flex flex-col sm:flex-row items-center justify-between border-b border-gray-50 pb-6 gap-6 group">
                                    <div className="flex items-center gap-6 w-full sm:w-auto">
                                        {/* Product Image */}
                                        <div className="w-24 h-24 bg-gray-50 rounded-xl border border-gray-100 flex items-center justify-center overflow-hidden shrink-0">
                                            {item.image_url || item.img ? (
                                                <img src={item.image_url || item.img} alt={item.name} className="w-full h-full object-cover mix-blend-multiply" />
                                            ) : (
                                                <ShoppingCart className="text-gray-300" size={24} />
                                            )}
                                        </div>
                                        {/* Product Details */}
                                        <div>
                                            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">{item.brand || 'Zarvix'}</div>
                                            <h3 className="text-base font-bold text-gray-900 mb-1 line-clamp-2">{item.name}</h3>
                                            <p className="text-sm text-gray-500 font-medium">${item.price} <span className="text-gray-300 mx-1">x</span> {item.quantity}</p>
                                        </div>
                                    </div>
                                    
                                    {/* Price & Remove */}
                                    <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-8">
                                        <div className="text-xl font-black text-red-600">
                                            ${(item.price * item.quantity).toFixed(2)}
                                        </div>
                                        {/* Agar future mein remove function banayein tou ispe laga dijiyega */}
                                        <button className="w-10 h-10 bg-gray-50 text-gray-400 rounded-lg flex items-center justify-center hover:bg-red-50 hover:text-red-600 transition-colors">
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Continue Shopping Button */}
                        <div className="mt-8 pt-4">
                            <Link to="/shop" className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-red-600 transition-colors">
                                <ArrowLeft size={16} /> Continue Shopping
                            </Link>
                        </div>
                    </div>

                    {/* ================= RIGHT: ORDER SUMMARY ================= */}
                    <div className="lg:col-span-4 space-y-6">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 sticky top-24">
                            <h3 className="text-lg font-black text-gray-900 border-b border-gray-100 pb-4 mb-6 tracking-tight">Order Summary</h3>
                            
                            <div className="space-y-4 mb-6 text-sm">
                                <div className="flex justify-between text-gray-600">
                                    <span>Subtotal</span>
                                    <span className="font-bold text-gray-900">${totalAmount.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Shipping Estimate</span>
                                    <span className="font-bold text-green-600">Free</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Tax Estimate</span>
                                    <span className="font-bold text-gray-900">$0.00</span>
                                </div>
                            </div>
                            
                            <div className="flex justify-between items-end border-t border-gray-100 pt-6 mb-8">
                                <span className="text-base font-bold text-gray-900">Total</span>
                                <span className="text-3xl font-black text-red-600">${totalAmount.toFixed(2)}</span>
                            </div>

                            {/* --- CHECKOUT BUTTONS --- */}
                            <div className="space-y-4">
                                {/* Option 1: Checkout as Guest */}
                                <button 
                                    onClick={() => handleCheckout('guest')} 
                                    className="w-full bg-red-600 text-white font-bold text-sm px-6 py-4 rounded-xl hover:bg-red-700 transition shadow-md flex items-center justify-center gap-2"
                                >
                                    <Zap size={18} /> Checkout as Guest
                                </button>
                                
                                {/* Option 2: Sign In & Checkout */}
                                <button 
                                    onClick={() => handleCheckout('user')} 
                                    className="w-full bg-[#111111] text-white font-bold text-sm px-6 py-4 rounded-xl hover:bg-gray-900 transition shadow-md flex items-center justify-center gap-2"
                                >
                                    <User size={18} /> Sign In & Checkout
                                </button>
                            </div>

                            {/* Trust Badge */}
                            <div className="mt-8 bg-gray-50 rounded-xl p-4 flex items-start gap-3 border border-gray-100">
                                <ShieldCheck size={20} className="text-green-600 shrink-0 mt-0.5" />
                                <p className="text-xs text-gray-500 font-medium leading-relaxed">
                                    Secure Checkout. Your data is protected with industry-standard encryption.
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Cart;