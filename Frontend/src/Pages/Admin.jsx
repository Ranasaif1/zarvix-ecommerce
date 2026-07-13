import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { LayoutDashboard, ShoppingCart, Package, Users, Settings as SettingsIcon, LogOut, DollarSign, PlusCircle, Box, AlertCircle, Activity } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';

// === IMPORTING ALL SUB-PAGES ===
import AddProduct from './AddProduct';
import AllProducts from './AllProducts';
import Orders from './Orders';
import Customers from './Customers';
import SettingsPanel from './Settings'; 

function Admin() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('overview');

    // === REAL BACKEND STATES ===
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);
        fetchDashboardData();
    }, []);

    // 🔥 FIX: Dono APIs ko safely fetch karna
    const fetchDashboardData = async () => {
        setIsLoading(true);
        try {
            const [prodRes, orderRes] = await Promise.all([
                // Aapka working VIP route use kar rahay hain
                axios.get('https://backend-phi-three-82.vercel.app/api/products').catch(() => ({ data: [] })),
                // Orders ka route
                axios.get('https://backend-phi-three-82.vercel.app/api/orders').catch(() => ({ data: [] }))
            ]);
            
            setProducts(Array.isArray(prodRes.data) ? prodRes.data : []);
            setOrders(Array.isArray(orderRes.data) ? orderRes.data : []);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('isAdminLoggedIn'); // Login session khatam
        alert("Logged out of Admin Panel.");
        navigate('/admin/login');
    };

    // === REAL CALCULATIONS ===
    const totalProducts = products.length;
    const totalOrders = orders.length;
    
    // Revenue Calculation Safely
    const totalRevenue = orders.reduce((sum, ord) => sum + Number(ord.total_amount || ord.total || 0), 0);
    
    // Inventory Value Calculation Safely
    const totalInventoryValue = products.reduce((sum, item) => sum + (Number(item.price || 0) * Number(item.stock || 0)), 0);
    const lowStockItems = products.filter(item => Number(item.stock || 0) < 10).length;

    // === 🔥 FIX: REAL GRAPH DATA GENERATION (Moving Graph) ===
    const salesByDate = orders.reduce((acc, order) => {
        // Agar real date hai tou use karein, warna 'Today' assign karein
        const date = order.created_at ? new Date(order.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'Today';
        acc[date] = (acc[date] || 0) + Number(order.total_amount || order.total || 0);
        return acc;
    }, {});

    let graphData = Object.keys(salesByDate).map(date => ({
        name: date,
        sales: salesByDate[date]
    }));

    // 🔥 MAIN GRAPH TRICK: Recharts needs at least 2 points to draw an area/line.
    if (graphData.length === 1) {
        // Agar 1 hi din ki sale hai, toh graph ko shuru se oopar uthta hua dikhane ke liye ek 0 point add karo
        graphData.unshift({ name: 'Start', sales: 0 }); 
    } else if (graphData.length === 0) {
        // Agar koi order nahi hai, toh empty seedhi line dikhao
        graphData = [
            { name: 'Last Week', sales: 0 },
            { name: 'Today', sales: 0 }
        ];
    }

    return (
        <div className="flex min-h-screen bg-[#f4f5f7]" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            
            {/* --- FIXED PREMIUM SIDEBAR --- */}
            <div className="w-64 bg-[#050505] text-white hidden md:flex flex-col fixed top-0 left-0 h-screen z-50 shadow-2xl">
                
                {/* Logo & Branding */}
                <div className="p-12 border-b border-gray-800 flex flex-col items-center text-center">
                    <img src="/logo.png" alt="Zarvix Digital" className="w-32 mb-4 object-contain" />
                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.3em]">Admin Panel</p>
                </div>
                
                <nav className="flex-1 p-4 space-y-2 overflow-y-auto custom-scrollbar">
                    <button 
                        onClick={() => { setActiveTab('overview'); fetchDashboardData(); }}
                        className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl font-bold text-sm transition-all ${activeTab === 'overview' ? 'bg-red-600 text-white shadow-lg shadow-red-600/20' : 'text-gray-400 hover:bg-[#111111] hover:text-white'}`}
                    >
                        <LayoutDashboard size={18} /> Overview
                    </button>
                    <button 
                        onClick={() => setActiveTab('add-product')}
                        className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl font-bold text-sm transition-all ${activeTab === 'add-product' ? 'bg-red-600 text-white shadow-lg shadow-red-600/20' : 'text-gray-400 hover:bg-[#111111] hover:text-white'}`}
                    >
                        <PlusCircle size={18} /> Add Product
                    </button>
                    <button 
                        onClick={() => setActiveTab('all-products')}
                        className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl font-bold text-sm transition-all ${activeTab === 'all-products' ? 'bg-red-600 text-white shadow-lg shadow-red-600/20' : 'text-gray-400 hover:bg-[#111111] hover:text-white'}`}
                    >
                        <Package size={18} /> All Products
                    </button>
                    <button 
                        onClick={() => setActiveTab('orders')}
                        className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl font-bold text-sm transition-all ${activeTab === 'orders' ? 'bg-red-600 text-white shadow-lg shadow-red-600/20' : 'text-gray-400 hover:bg-[#111111] hover:text-white'}`}
                    >
                        <ShoppingCart size={18} /> Orders
                    </button>
                    <button 
                        onClick={() => setActiveTab('customers')}
                        className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl font-bold text-sm transition-all ${activeTab === 'customers' ? 'bg-red-600 text-white shadow-lg shadow-red-600/20' : 'text-gray-400 hover:bg-[#111111] hover:text-white'}`}
                    >
                        <Users size={18} /> Customers
                    </button>
                </nav>

                <div className="p-4 border-t border-gray-800 space-y-2">
                    <button 
                        onClick={() => setActiveTab('settings')}
                        className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl font-bold text-sm transition-all ${activeTab === 'settings' ? 'bg-gray-800 text-white' : 'text-gray-400 hover:bg-[#111111] hover:text-white'}`}
                    >
                        <SettingsIcon size={18} /> Settings
                    </button>
                    <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3.5 text-red-500 hover:bg-red-600/10 rounded-xl font-bold text-sm transition-colors">
                        <LogOut size={18} /> Logout
                    </button>
                </div>
            </div>

            {/* --- MAIN CONTENT AREA --- */}
            <main className="flex-1 md:ml-64 p-6 md:p-10 min-h-screen overflow-x-hidden">
                
                {/* DYNAMIC TOPBAR */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
                    <div>
                        <h2 className="text-3xl font-black text-gray-900 tracking-tight">
                            {activeTab === 'overview' && 'Dashboard Overview'}
                            {activeTab === 'add-product' && 'Create New Listing'}
                            {activeTab === 'all-products' && 'Inventory Management'}
                            {activeTab === 'orders' && 'Order Fulfillment'}
                            {activeTab === 'customers' && 'Customer Database'}
                            {activeTab === 'settings' && 'Store Configuration'}
                        </h2>
                        <p className="text-sm text-gray-500 mt-1">Real-time control center for Zarvix Digital.</p>
                    </div>
                    <div className="bg-white px-5 py-2.5 rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.04)] border border-gray-100 text-sm font-bold text-gray-700">
                        {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                    </div>
                </div>

                {/* ANIMATED TAB SWITCHING */}
                <AnimatePresence mode="wait">
                    <motion.div 
                        key={activeTab}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -15 }}
                        transition={{ duration: 0.3 }}
                    >
                        
                        {/* === TAB 1: OVERVIEW (Real Stats, Graphs & Orders) === */}
                        {activeTab === 'overview' && (
                            <div className="space-y-8">
                                
                                {/* 1. Real Stats Cards */}
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                    <div className="bg-white p-6 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100">
                                        <div className="flex items-center gap-3 mb-2 text-green-600">
                                            <div className="p-2 bg-green-50 rounded-lg"><DollarSign size={20} /></div>
                                            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Total Sales</p>
                                        </div>
                                        <h3 className="text-2xl font-black text-gray-900">Rs {isLoading ? '...' : totalRevenue.toLocaleString()}</h3>
                                    </div>

                                    <div className="bg-white p-6 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100">
                                        <div className="flex items-center gap-3 mb-2 text-blue-600">
                                            <div className="p-2 bg-blue-50 rounded-lg"><ShoppingCart size={20} /></div>
                                            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Total Orders</p>
                                        </div>
                                        <h3 className="text-2xl font-black text-gray-900">{isLoading ? '...' : totalOrders}</h3>
                                    </div>

                                    <div className="bg-white p-6 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100">
                                        <div className="flex items-center gap-3 mb-2 text-purple-600">
                                            <div className="p-2 bg-purple-50 rounded-lg"><Box size={20} /></div>
                                            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Stock Value</p>
                                        </div>
                                        <h3 className="text-2xl font-black text-gray-900">Rs {isLoading ? '...' : totalInventoryValue.toLocaleString()}</h3>
                                    </div>

                                    <div className="bg-white p-6 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100">
                                        <div className="flex items-center gap-3 mb-2 text-red-600">
                                            <div className="p-2 bg-red-50 rounded-lg"><AlertCircle size={20} /></div>
                                            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Low Stock Items</p>
                                        </div>
                                        <h3 className="text-2xl font-black text-gray-900">{isLoading ? '...' : lowStockItems}</h3>
                                    </div>
                                </div>

                                {/* 2. Real-Time Graph */}
                                <div className="bg-white p-6 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100 h-96 flex flex-col">
                                    <div className="flex justify-between items-center mb-6">
                                        <h3 className="text-lg font-black text-gray-900 flex items-center gap-2">
                                            <Activity size={20} className="text-red-600"/> Revenue Analytics (PKR)
                                        </h3>
                                    </div>
                                    <div className="flex-1 min-h-0">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <AreaChart data={graphData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                                                <defs>
                                                    <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                                                        <stop offset="5%" stopColor="#dc2626" stopOpacity={0.8}/>
                                                        <stop offset="95%" stopColor="#dc2626" stopOpacity={0}/>
                                                    </linearGradient>
                                                </defs>
                                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                                                <XAxis dataKey="name" tick={{fontSize: 12, fill: '#9ca3af'}} axisLine={false} tickLine={false} />
                                                <YAxis tick={{fontSize: 12, fill: '#9ca3af'}} axisLine={false} tickLine={false} tickFormatter={(val) => `Rs ${val}`} />
                                                <Tooltip 
                                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
                                                    formatter={(value) => [`Rs ${value.toLocaleString()}`, 'Sales']}
                                                />
                                                <Area type="monotone" dataKey="sales" stroke="#dc2626" strokeWidth={3} fillOpacity={1} fill="url(#colorSales)" />
                                            </AreaChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>

                                {/* 3. Recent Real Orders Table */}
                                <div className="bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100 overflow-hidden">
                                    <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                                        <h3 className="text-lg font-black text-gray-900 tracking-tight">Recent Live Orders</h3>
                                        <button onClick={() => setActiveTab('orders')} className="text-sm font-bold text-red-600 hover:text-black transition-colors">Manage Fulfillment</button>
                                    </div>
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-left text-sm">
                                            <thead className="bg-gray-50/50 text-gray-500 uppercase tracking-widest text-[10px] font-bold">
                                                <tr>
                                                    <th className="px-6 py-4">Order ID</th>
                                                    <th className="px-6 py-4">Customer</th>
                                                    <th className="px-6 py-4">Status</th>
                                                    <th className="px-6 py-4 text-right">Total (PKR)</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-100">
                                                {isLoading ? (
                                                    <tr><td colSpan="4" className="px-6 py-8 text-center text-gray-400 font-medium">Fetching Live Orders...</td></tr>
                                                ) : orders.length === 0 ? (
                                                    <tr><td colSpan="4" className="px-6 py-8 text-center text-gray-400 font-medium">No orders found in database yet.</td></tr>
                                                ) : (
                                                    orders.slice(0, 5).map((order, i) => (
                                                        <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                                                            <td className="px-6 py-4 font-bold text-gray-900">{order.id || order._id}</td>
                                                            <td className="px-6 py-4 font-medium text-gray-700">{order.customer_name || order.customer || 'Guest User'}</td>
                                                            <td className="px-6 py-4">
                                                                <span className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${
                                                                    order.status === 'Delivered' ? 'text-green-600 bg-green-50' : 
                                                                    order.status === 'Shipped' ? 'text-blue-600 bg-blue-50' : 'text-orange-600 bg-orange-50'
                                                                }`}>
                                                                    {order.status || 'Processing'}
                                                                </span>
                                                            </td>
                                                            <td className="px-6 py-4 font-black text-gray-900 text-right">Rs {Number(order.total_amount || order.total || 0).toLocaleString()}</td>
                                                        </tr>
                                                    ))
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                            </div>
                        )}

                        {/* === RENDER IMPORTED COMPONENTS === */}
                        {activeTab === 'add-product' && <AddProduct />}
                        {activeTab === 'all-products' && <AllProducts />}
                        {activeTab === 'orders' && <Orders />}
                        {activeTab === 'customers' && <Customers />}
                        {activeTab === 'settings' && <SettingsPanel />}

                    </motion.div>
                </AnimatePresence>
            </main>
        </div>
    );
}

export default Admin;