import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, CreditCard, Banknote, MapPin, CheckCircle, ChevronRight, ShoppingBag, Loader2, AlertCircle } from 'lucide-react';

function Checkout() {
    const { cart, clearCart } = useContext(CartContext);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const [isProcessing, setIsProcessing] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('cod');
    
    // 🔥 1. Settings State Add Ki
    const [settings, setSettings] = useState(null);

    const [formData, setFormData] = useState({
        email: user ? user.email : '',
        firstName: user ? user.name : '',
        lastName: '',
        address: '',
        city: 'Karachi',
        phone: ''
    });

    useEffect(() => {
        window.scrollTo(0, 0);
        if (!user) {
            navigate('/signin');
        } else if (cart.length === 0) {
            navigate('/shop');
        }

        // 🔥 2. Backend se Admin Settings Fetch Karein
        axios.get('https://backend-phi-three-82.vercel.app/api/settings')
            .then(response => {
                const data = response.data;
                setSettings(data);
                
                // Smart Logic: Agar COD band hai tou automatically Card select kar lo
                if (!data.codEnabled && data.cardEnabled) {
                    setPaymentMethod('card');
                } else if (data.codEnabled) {
                    setPaymentMethod('cod');
                }
            })
            .catch(error => console.error("Error fetching settings:", error));

    }, [cart, user, navigate]);

    // === SMART PRICE CALCULATIONS ===
    const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    // Ab Shipping aur Free Threshold Backend se aayega!
    const shippingFee = settings ? settings.shippingFee : 500;
    const freeThreshold = settings ? settings.freeShippingThreshold : 5000;
    const currency = settings ? settings.currency.split(' ')[0] : 'Rs'; // Extract 'PKR' or 'USD'

    const shippingCost = totalAmount >= freeThreshold ? 0 : shippingFee;
    
    // COD Par Extra Charges
    const codFee = paymentMethod === 'cod' ? 1000 : 0; 
    const finalTotal = totalAmount + shippingCost + codFee;

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // === SUBMIT ORDER ===
    const handlePlaceOrder = async (e) => {
        e.preventDefault(); 
        
        if(!formData.firstName || !formData.phone || !formData.address) {
            alert("Bhai, please zaroori details (Name, Phone, Address) fill karein!");
            return;
        }

        setIsProcessing(true);

        const orderPayload = {
            user_id: user.id,
            total_amount: finalTotal,
            payment_method: paymentMethod,
            payment_status: paymentMethod === 'card' ? 'Paid (Advance)' : 'Pending',
            items: cart.map(item => ({
                product_id: item.id,
                product_name: item.name,
                price: item.price,
                quantity: item.quantity,
                image_url: item.image_url || item.image || ""
            }))
        };

        try {
            const response = await axios.post("https://backend-phi-three-82.vercel.app/api/orders", orderPayload);
            
            if (paymentMethod === 'card') {
                alert(`Mubarak ho! ${currency} ${finalTotal.toLocaleString()} ki Advance Payment successfully receive ho gayi hai. 🎉\nOrder ID: ZRVX-${10000 + response.data.order_id}`);
            } else {
                alert(`Mubarak ho! Cash on Delivery order receive ho gaya hai. ${currency} 1,000 COD charges shamil hain.\nOrder ID: ZRVX-${10000 + response.data.order_id}`);
            }
            
            clearCart(); 
            navigate("/dashboard/orders"); 
            
        } catch (error) {
            console.error("Order Place Error:", error);
            alert("Oops! Order place karte waqt koi masla aaya hai.");
        } finally {
            setIsProcessing(false);
        }
    };

    if (cart.length === 0 || !user || !settings) return null; // Jab tak settings na aayen, wait karein

    return (
        <div className="bg-[#f8f9fa] min-h-screen pt-6 pb-24" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            <div className="max-w-350 mx-auto px-4 md:px-6">
                
                {/* Breadcrumb */}
                <div className="pb-6 flex flex-wrap items-center gap-2 text-[11px] sm:text-xs font-bold uppercase tracking-widest text-gray-400">
                    <Link to="/cart" className="hover:text-red-600 transition-colors">Cart</Link>
                    <ChevronRight size={14} />
                    <span className="text-gray-900">Information & Shipping</span>
                    <ChevronRight size={14} />
                    <span className="text-gray-400">Payment</span>
                </div>

                <form onSubmit={handlePlaceOrder} className="grid lg:grid-cols-12 gap-8 items-start">
                    
                    {/* LEFT FORM */}
                    <div className="lg:col-span-7 space-y-6">
                        
                        {/* Contact Info */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
                            <h2 className="text-xl font-black text-gray-900 mb-6 tracking-tight">Contact Information</h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Email Address</label>
                                    <input 
                                        type="email" 
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-red-600 bg-gray-50 focus:bg-white"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Shipping Address */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
                            <h2 className="text-xl font-black text-gray-900 mb-6 tracking-tight flex items-center gap-2">
                                <MapPin size={20} className="text-red-600" /> Shipping Address
                            </h2>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="col-span-2 sm:col-span-1">
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">First Name *</label>
                                    <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} required className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-red-600 bg-gray-50 focus:bg-white" />
                                </div>
                                <div className="col-span-2 sm:col-span-1">
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Last Name</label>
                                    <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-red-600 bg-gray-50 focus:bg-white" />
                                </div>
                                <div className="col-span-2">
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Complete Address *</label>
                                    <input type="text" name="address" value={formData.address} onChange={handleInputChange} required placeholder="House/Apartment no, Street, Area" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-red-600 bg-gray-50 focus:bg-white" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">City *</label>
                                    <select name="city" value={formData.city} onChange={handleInputChange} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-red-600 bg-gray-50 focus:bg-white appearance-none cursor-pointer">
                                        <option value="Karachi">Karachi</option>
                                        <option value="Lahore">Lahore</option>
                                        <option value="Islamabad">Islamabad</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Phone Number *</label>
                                    <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} required placeholder="03XX-XXXXXXX" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-red-600 bg-gray-50 focus:bg-white" />
                                </div>
                            </div>
                        </div>

                        {/* Payment Selection */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
                            <h2 className="text-xl font-black text-gray-900 mb-6 tracking-tight">Payment Method</h2>
                            <div className="space-y-3">
                                
                                {/* 🔥 DYNAMIC COD OPTION */}
                                {settings.codEnabled && (
                                    <div 
                                        onClick={() => setPaymentMethod('cod')}
                                        className={`flex items-center justify-between p-4 border-2 rounded-xl cursor-pointer transition-all ${paymentMethod === 'cod' ? 'border-red-600 bg-red-50/10' : 'border-gray-100 hover:border-gray-200'}`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'cod' ? 'border-red-600' : 'border-gray-300'}`}>
                                                {paymentMethod === 'cod' && <div className="w-2.5 h-2.5 bg-red-600 rounded-full"></div>}
                                            </div>
                                            <div>
                                                <span className="font-bold text-sm text-gray-900 block">Cash on Delivery (COD)</span>
                                                <span className="text-xs text-red-600 font-bold">+ {currency} 1,000 extra handling charges applied</span>
                                            </div>
                                        </div>
                                        <Banknote size={24} className={paymentMethod === 'cod' ? 'text-red-600' : 'text-gray-400'} />
                                    </div>
                                )}

                                {/* 🔥 DYNAMIC CARD OPTION */}
                                {settings.cardEnabled && (
                                    <div 
                                        onClick={() => setPaymentMethod('card')}
                                        className={`flex items-center justify-between p-4 border-2 rounded-xl cursor-pointer transition-all ${paymentMethod === 'card' ? 'border-red-600 bg-red-50/10' : 'border-gray-100 hover:border-gray-200'}`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'card' ? 'border-red-600' : 'border-gray-300'}`}>
                                                {paymentMethod === 'card' && <div className="w-2.5 h-2.5 bg-red-600 rounded-full"></div>}
                                            </div>
                                            <div>
                                                <span className="font-bold text-sm text-gray-900 block">Advance Payment (Credit / Debit Card)</span>
                                                <span className="text-xs text-green-600 font-bold">No extra charges! Save {currency} 1,000</span>
                                            </div>
                                        </div>
                                        <CreditCard size={24} className={paymentMethod === 'card' ? 'text-red-600' : 'text-gray-400'} />
                                    </div>
                                )}

                                {/* Agar dono payment methods Admin ne band kar diye hon */}
                                {!settings.codEnabled && !settings.cardEnabled && (
                                    <div className="p-4 bg-orange-50 border border-orange-200 rounded-xl flex items-center gap-3 text-orange-700">
                                        <AlertCircle size={20} />
                                        <span className="text-sm font-bold">No payment methods are currently available. Please contact support.</span>
                                    </div>
                                )}

                                {/* Card Input Fields */}
                                {paymentMethod === 'card' && settings.cardEnabled && (
                                    <div className="mt-4 p-4 bg-gray-50 border border-gray-100 rounded-xl space-y-4 animate-in fade-in zoom-in duration-300">
                                        <input type="text" placeholder="Card Number" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-red-600" />
                                        <div className="grid grid-cols-2 gap-4">
                                            <input type="text" placeholder="Expiration Date (MM/YY)" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-red-600" />
                                            <input type="text" placeholder="Security Code (CVV)" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-red-600" />
                                        </div>
                                        <input type="text" placeholder="Name on Card" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-red-600" />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* RIGHT ORDER SUMMARY */}
                    <div className="lg:col-span-5 space-y-6">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 sticky top-24">
                            <h3 className="text-lg font-black text-gray-900 border-b border-gray-100 pb-4 mb-6 tracking-tight flex items-center gap-2">
                                <ShoppingBag size={20} className="text-red-600" /> Order Summary
                            </h3>
                            
                            <div className="space-y-4 mb-6 max-h-75 overflow-y-auto pr-2 custom-scrollbar">
                                {cart.map((item, index) => (
                                    <div key={index} className="flex items-center gap-4">
                                        <div className="w-16 h-16 bg-gray-50 rounded-lg border border-gray-100 flex items-center justify-center overflow-hidden shrink-0 relative p-1">
                                            <img src={item.image_url || item.image || 'https://via.placeholder.com/100'} alt={item.name} className="w-full h-full object-contain mix-blend-multiply" />
                                            <span className="absolute -top-2 -right-2 bg-gray-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold shadow-sm border border-white">
                                                {item.quantity}
                                            </span>
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="text-sm font-bold text-gray-900 line-clamp-1">{item.name}</h4>
                                            <p className="text-xs text-gray-500">{item.brandName || item.category || 'Zarvix'}</p>
                                        </div>
                                        <div className="text-sm font-bold text-gray-900">
                                            {currency} {(item.price * item.quantity).toLocaleString()}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Totals Breakdown */}
                            <div className="space-y-3 mb-6 text-sm border-t border-gray-100 pt-4">
                                <div className="flex justify-between text-gray-600">
                                    <span>Subtotal</span>
                                    <span className="font-bold text-gray-900">{currency} {totalAmount.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Shipping</span>
                                    <span className="font-bold text-gray-900">
                                        {shippingCost === 0 ? <span className="text-green-600">Free</span> : `${currency} ${shippingCost.toLocaleString()}`}
                                    </span>
                                </div>
                                
                                {/* Dynamic Display of COD Handling Fee */}
                                {paymentMethod === 'cod' && settings.codEnabled && (
                                    <div className="flex justify-between text-red-600 animate-in fade-in duration-200">
                                        <span>COD Handling Fee</span>
                                        <span className="font-bold">{currency} 1,000</span>
                                    </div>
                                )}
                            </div>
                            
                            <div className="flex justify-between items-end border-t border-gray-100 pt-6 mb-8">
                                <span className="text-base font-bold text-gray-900">Total</span>
                                <div className="text-right">
                                    <span className="text-xs text-gray-400 mr-1">{currency}</span>
                                    <span className="text-3xl font-black text-red-600">{finalTotal.toLocaleString()}</span>
                                </div>
                            </div>

                            <button 
                                type="submit" 
                                disabled={isProcessing || (!settings.codEnabled && !settings.cardEnabled)}
                                className={`w-full text-white font-bold text-sm px-6 py-4 rounded-xl transition shadow-md flex items-center justify-center gap-2 uppercase tracking-widest ${isProcessing || (!settings.codEnabled && !settings.cardEnabled) ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700'}`}
                            >
                                {isProcessing ? (
                                    <><Loader2 size={18} className="animate-spin" /> Processing Order...</>
                                ) : (
                                    <><CheckCircle size={18} /> Place Order</>
                                )}
                            </button>

                            <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-400 font-medium">
                                <ShieldCheck size={14} className="text-green-600" />
                                <span>Guaranteed Safe & Secure Checkout</span>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Checkout;