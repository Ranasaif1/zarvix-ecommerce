import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Package, Truck, CheckCircle, Clock, ChevronRight, ShoppingBag, ArrowLeft, Loader2 } from 'lucide-react';

function ManageOrders() {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);
        if (!user) {
            navigate('/signin');
            return;
        }

        // === FETCH CUSTOMER ORDERS ===
        const fetchOrders = () => {
            setIsLoading(true);
            axios.get(`https://zarvix-ecommerce.vercel.app/api/users/${user.id}/orders`)
                .then(response => {
                    if (response.data && Array.isArray(response.data)) {
                        setOrders(response.data);
                    } else {
                        setOrders([]);
                    }
                    setIsLoading(false);
                })
                .catch(error => {
                    console.error("Error fetching user orders:", error);
                    setOrders([]); // Error aane par crash se bachanay ke liye
                    setIsLoading(false); 
                });
        };

        fetchOrders(); // 🔥 YEH LINE MISSING THI! Iske baghair API call hi nahi ho rahi thi.

    }, [user, navigate]); // 🔥 YEH BRACKETS MISSING THE!

    // Status Badge Helper Function
    const getStatusBadge = (status) => {
        switch(status) {
            case 'Pending': return <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center gap-1 w-max"><Clock size={12}/> Pending</span>;
            case 'Processing': return <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center gap-1 w-max"><Package size={12}/> Processing</span>;
            case 'Shipped': return <span className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center gap-1 w-max"><Truck size={12}/> Shipped</span>;
            case 'Delivered': return <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center gap-1 w-max"><CheckCircle size={12}/> Delivered</span>;
            default: return <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest w-max">Unknown</span>;
        }
    };

    if (isLoading) {
        return <div className="min-h-screen flex justify-center items-center bg-[#f4f5f7]"><Loader2 className="animate-spin text-red-600" size={40} /></div>;
    }

    return (
        <div className="bg-[#f4f5f7] min-h-screen py-16 px-4 font-sans text-gray-900">
            <div className="max-w-5xl mx-auto">
                
                {/* Header Section */}
                <div className="flex items-center gap-4 mb-10">
                    <Link to="/profile" className="w-10 h-10 bg-white border border-gray-200 rounded-xl flex items-center justify-center text-gray-400 hover:text-red-600 hover:border-red-600 transition-colors">
                        <ArrowLeft size={18} />
                    </Link>
                    <div>
                        <h1 className="text-3xl font-black tracking-tight">Manage Orders</h1>
                        <p className="text-gray-500 text-sm flex items-center gap-2 mt-1">
                            Track, return, or buy items again.
                        </p>
                    </div>
                </div>

                {/* If No Real Orders Exist */}
                {orders.length === 0 ? (
                    <div className="bg-white rounded-3xl p-16 text-center border border-gray-100 shadow-sm">
                        <ShoppingBag size={64} className="mx-auto text-gray-200 mb-6" />
                        <h2 className="text-2xl font-black text-gray-900 mb-2">No Orders Yet</h2>
                        <p className="text-gray-500 mb-8 max-w-md mx-auto">Looks like you haven't made your first purchase with Zarvix Digital yet. Discover our premium tech collection.</p>
                        <Link to="/shop" className="bg-red-600 hover:bg-black text-white px-8 py-4 rounded-xl font-bold uppercase tracking-widest text-[11px] transition-colors">
                            Start Shopping
                        </Link>
                    </div>
                ) : (
                    // Display Real Orders
                    <div className="space-y-6">
                        {orders.map((order, idx) => {
                            // Date ko readable format mein dikhane ke liye
                            const orderDate = order.created_at ? new Date(order.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : "Recently";
                            
                            return (
                                <div key={idx} className="bg-white rounded-3xl shadow-[0_10px_30px_-15px_rgba(0,0,0,0.05)] border border-gray-100 overflow-hidden hover:shadow-[0_20px_40px_-10px_rgba(220,38,38,0.1)] transition-all duration-300">
                                    
                                    {/* Order Header */}
                                    <div className="bg-gray-50/80 border-b border-gray-100 p-6 flex flex-wrap items-center justify-between gap-4">
                                        <div className="flex flex-wrap gap-8">
                                            <div>
                                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Order Placed</p>
                                                <p className="text-sm font-medium text-gray-900">{orderDate}</p>
                                            </div>
                                            <div>
                                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Total Amount</p>
                                                <p className="text-sm font-black text-red-600">Rs {order.total_amount.toLocaleString()}</p>
                                            </div>
                                            <div>
                                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Order ID</p>
                                                <p className="text-sm font-medium text-gray-900">{order.id}</p>
                                            </div>
                                            {order.tracking && order.tracking !== 'Pending' && (
                                                <div>
                                                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Tracking #</p>
                                                    <p className="text-sm font-bold text-gray-900">{order.tracking}</p>
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex flex-col items-end gap-2">
                                            {getStatusBadge(order.status)}
                                            <button className="text-xs font-bold text-red-600 hover:text-red-800 flex items-center gap-1 transition-colors mt-1">
                                                View Invoice <ChevronRight size={14} />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Order Items */}
                                    <div className="p-6">
                                        <div className="space-y-4">
                                            {order.items.map((item, itemIdx) => (
                                                <div key={itemIdx} className="flex items-center gap-4 py-2">
                                                    <div className="w-20 h-20 bg-gray-50 rounded-xl overflow-hidden border border-gray-100 shrink-0 p-2">
                                                        <img src={item.image_url || 'https://via.placeholder.com/200?text=No+Image'} alt={item.product_name} className="w-full h-full object-contain mix-blend-multiply" />
                                                    </div>
                                                    <div className="grow">
                                                        <Link to={`/product/${item.product_id}`}>
                                                            <h4 className="text-sm font-bold text-gray-900 line-clamp-1 hover:text-red-600 transition-colors cursor-pointer">{item.product_name}</h4>
                                                        </Link>
                                                        <div className="flex items-center gap-3 mt-1">
                                                            <span className="text-xs text-gray-500 font-medium">Qty: {item.quantity}</span>
                                                            <span className="text-xs font-black text-gray-900">Rs {(item.price * item.quantity).toLocaleString()}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}

export default ManageOrders;