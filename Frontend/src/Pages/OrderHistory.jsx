import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { History, ArrowLeft, Loader2, CheckCircle, Clock, Truck, Package, Eye, Search } from 'lucide-react';

function OrderHistory() {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    
    // Default state ko strictly array [] rakha hai
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        window.scrollTo(0, 0);
        if (!user) {
            navigate('/signin');
            return;
        }

        // === FETCH REAL ORDERS FROM BACKEND ===
        axios.get(`http://localhost:8000/api/users/${user.id}/orders`)
            .then(response => {
                // Check lagaya hai taake null aaye tou crash na ho
                if (response.data && Array.isArray(response.data)) {
                    setOrders(response.data);
                } else {
                    setOrders([]);
                }
                setIsLoading(false);
            })
            .catch(error => {
                console.error("Error fetching order history:", error);
                setOrders([]); // Error par bhi empty array set hoga
                setIsLoading(false);
            });
    }, [user, navigate]);

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

    // 🔥 FIX: Filter logic ko safe kar diya hai aur ID ko string mein convert kiya hai
    const filteredOrders = orders.filter(order => {
        if (!order || !order.id) return false;
        // String(order.id) isliye kiya taake number par .toLowerCase error na de
        return String(order.id).toLowerCase().includes(searchTerm.toLowerCase());
    });

    if (isLoading) {
        return <div className="min-h-screen flex justify-center items-center bg-[#f4f5f7]"><Loader2 className="animate-spin text-red-600" size={40} /></div>;
    }

    return (
        <div className="bg-[#f4f5f7] min-h-screen py-16 px-4 font-sans text-gray-900">
            <div className="max-w-6xl mx-auto">
                
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                    <div className="flex items-center gap-4">
                        <Link to="/profile" className="w-10 h-10 bg-white border border-gray-200 rounded-xl flex items-center justify-center text-gray-400 hover:text-red-600 hover:border-red-600 transition-colors">
                            <ArrowLeft size={18} />
                        </Link>
                        <div>
                            <h1 className="text-3xl font-black tracking-tight">Order History</h1>
                            <p className="text-gray-500 text-sm flex items-center gap-2 mt-1">
                                Review your past purchases and download invoices.
                            </p>
                        </div>
                    </div>

                    {/* Search Bar for Orders */}
                    <div className="relative max-w-sm w-full">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input 
                            type="text" 
                            placeholder="Search by Order ID..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 text-sm font-medium"
                        />
                    </div>
                </div>

                {/* Orders Table */}
                <div className="bg-white rounded-3xl shadow-[0_15px_40px_-15px_rgba(0,0,0,0.05)] border border-gray-100 overflow-hidden">
                    {orders.length === 0 ? (
                        <div className="p-16 text-center">
                            <History size={64} className="mx-auto text-gray-200 mb-6" />
                            <h2 className="text-2xl font-black text-gray-900 mb-2">No History Found</h2>
                            <p className="text-gray-500 mb-8 max-w-md mx-auto">You don't have any past orders. Once you place an order, it will appear here.</p>
                            <Link to="/shop" className="bg-red-600 hover:bg-black text-white px-8 py-4 rounded-xl font-bold uppercase tracking-widest text-[11px] transition-colors">
                                Start Shopping
                            </Link>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-gray-50/80 border-b border-gray-100">
                                        <th className="p-6 text-xs font-bold text-gray-500 uppercase tracking-widest">Order ID</th>
                                        <th className="p-6 text-xs font-bold text-gray-500 uppercase tracking-widest">Date</th>
                                        <th className="p-6 text-xs font-bold text-gray-500 uppercase tracking-widest">Items</th>
                                        <th className="p-6 text-xs font-bold text-gray-500 uppercase tracking-widest">Total Amount</th>
                                        <th className="p-6 text-xs font-bold text-gray-500 uppercase tracking-widest">Status</th>
                                        <th className="p-6 text-xs font-bold text-gray-500 uppercase tracking-widest text-center">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {filteredOrders.length > 0 ? filteredOrders.map((order, idx) => {
                                        const orderDate = order.created_at ? new Date(order.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : "Recently";
                                        
                                        return (
                                            <tr key={idx} className="hover:bg-gray-50/50 transition-colors group">
                                                <td className="p-6 font-bold text-gray-900">{order.id}</td>
                                                <td className="p-6 text-sm font-medium text-gray-600">{orderDate}</td>
                                                <td className="p-6 text-sm font-medium text-gray-600">
                                                    <div className="flex -space-x-3">
                                                        {/* Adding safety check for order.items */}
                                                        {order.items && order.items.slice(0, 3).map((item, i) => (
                                                            <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-white overflow-hidden">
                                                                <img src={item.image_url || 'https://via.placeholder.com/100'} alt="item" className="w-full h-full object-cover" />
                                                            </div>
                                                        ))}
                                                        {order.items && order.items.length > 3 && (
                                                            <div className="w-8 h-8 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-500">
                                                                +{order.items.length - 3}
                                                            </div>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="p-6 font-black text-red-600">Rs {order.total_amount.toLocaleString()}</td>
                                                <td className="p-6">
                                                    {getStatusBadge(order.status)}
                                                </td>
                                                <td className="p-6 text-center">
                                                    <button className="w-8 h-8 bg-gray-100 text-gray-500 rounded-lg flex items-center justify-center hover:bg-red-600 hover:text-white transition-colors mx-auto" title="View Details">
                                                        <Eye size={14} />
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    }) : (
                                        <tr>
                                            <td colSpan="6" className="p-10 text-center text-gray-500 font-medium">
                                                No orders match your search "{searchTerm}"
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}

export default OrderHistory;