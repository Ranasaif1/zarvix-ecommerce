import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Package, Truck, CheckCircle, Search, Edit, X, FileText, RefreshCw, XCircle } from 'lucide-react';

function Orders() {
    // === REAL STATE FOR BACKEND DATA ===
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    // === MODAL STATE ===
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [updateStatus, setUpdateStatus] = useState('');
    const [updateTracking, setUpdateTracking] = useState('');
    const [isUpdating, setIsUpdating] = useState(false);

    // Component Load Hotay Hi Real Orders Mangwao
    useEffect(() => {
        window.scrollTo(0, 0);
        fetchOrders();
    }, []);

   // === FETCH ORDERS (GET REQUEST) ===
    const fetchOrders = () => {
        setIsLoading(true);
        // Dhyan se dekhein: URL ab /api/admin/orders hai
        axios.get('https://backend-phi-three-82.vercel.app/api/admin/orders')
            .then(response => {
                // Agar data theek hai tou orders set karo, warna empty array []
                if (response.data && Array.isArray(response.data)) {
                    setOrders(response.data);
                } else {
                    setOrders([]);
                }
                setIsLoading(false);
            })
            .catch(error => {
                console.error("Error fetching orders:", error);
                setOrders([]); // Error aane par bhi array empty rahay, null na ho taake crash na ho
                setIsLoading(false); 
            });
    };

    // === OPEN MODAL ===
    const handleOpenModal = (order) => {
        setSelectedOrder(order);
        setUpdateStatus(order.status || 'Processing');
        setUpdateTracking(order.tracking && order.tracking !== 'Pending' ? order.tracking : '');
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedOrder(null);
    };

    // === UPDATE ORDER SUBMIT (PUT REQUEST) ===
    const handleUpdateOrder = (e) => {
        e.preventDefault();
        setIsUpdating(true);
        
        const payload = {
            status: updateStatus,
            tracking: updateTracking || 'Pending'
        };

        // Yahan real_id bhejni zaroori hai kyunke 'id' mein ZRVX-10001 hai
        axios.put(`https://backend-phi-three-82.vercel.app/api/orders/${selectedOrder.real_id}`, payload)
            .then(response => {
                alert(`Order ${selectedOrder.id} Successfully Updated! ✅\nCustomer will now see this updated status in their panel.`);
                setIsUpdating(false);
                handleCloseModal();
                fetchOrders(); 
            })
            .catch(error => {
                console.error("Error updating order:", error);
                alert("Order update karne mein masla hua. Backend connection check karein.");
                setIsUpdating(false);
            });
    };

    // Search Logic (Order ID ya Customer Name se search)
    const filteredOrders = orders.filter(order => {
        const orderIdMatch = (order.id || '').toString().toLowerCase().includes(searchTerm.toLowerCase());
        const customerMatch = (order.customer_name || '').toLowerCase().includes(searchTerm.toLowerCase());
        return orderIdMatch || customerMatch;
    });

    return (
        <div className="space-y-8 animate-in fade-in duration-500 pb-12">
            
            {/* Header Area */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 hover:shadow-md transition-shadow">
                <div>
                    <h3 className="text-xl font-black text-gray-900 tracking-tight flex items-center gap-2">
                        <Package size={24} className="text-red-600" /> Order Management
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">Live customer orders. Update tracking to notify customers.</p>
                </div>
                
                {/* Search & Refresh Bar */}
                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                    <div className="relative w-full sm:w-64 shrink-0">
                        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input 
                            type="text" 
                            placeholder="Search Order ID or Name..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-red-600 focus:bg-white focus:ring-4 focus:ring-red-600/10 transition-all"
                        />
                    </div>
                    <button 
                        onClick={fetchOrders} 
                        className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold px-6 py-3 rounded-xl text-sm transition-colors whitespace-nowrap flex items-center justify-center gap-2 shadow-sm hover:shadow-md"
                        title="Refresh Live Orders"
                    >
                        <RefreshCw size={16} className={isLoading ? "animate-spin text-red-600" : ""} /> Refresh
                    </button>
                </div>
            </div>

            {/* Orders Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50/80 text-gray-500 uppercase tracking-widest text-[10px] font-bold border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-5">Order ID & Date</th>
                                <th className="px-6 py-5">Customer Details</th>
                                <th className="px-6 py-5">Tracking No.</th>
                                <th className="px-6 py-5">Status</th>
                                <th className="px-6 py-5 text-right">Total (PKR)</th>
                                <th className="px-6 py-5 text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {isLoading ? (
                                <tr><td colSpan="6" className="px-6 py-16 text-center text-gray-400 font-bold animate-pulse">Fetching Live Orders...</td></tr>
                            ) : filteredOrders.length === 0 ? (
                                <tr><td colSpan="6" className="px-6 py-16 text-center text-gray-400 font-bold">No Orders Found. Waiting for customers!</td></tr>
                            ) : (
                                filteredOrders.map((order, i) => (
                                    <tr key={i} className="hover:bg-gray-50/50 transition-colors group">
                                        
                                        {/* ID & Date */}
                                        <td className="px-6 py-4">
                                            <div className="font-black text-gray-900 line-clamp-1">{order.id}</div>
                                            <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">
                                                {order.created_at ? new Date(order.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : 'Recent'}
                                            </div>
                                        </td>
                                        
                                        {/* Customer */}
                                        <td className="px-6 py-4">
                                            <div className="font-bold text-gray-800">{order.customer_name}</div>
                                            <div className="text-[11px] text-gray-500 mt-0.5">{order.items ? order.items.length : 1} Items</div>
                                        </td>
                                        
                                        {/* Tracking */}
                                        <td className="px-6 py-4">
                                            {!order.tracking || order.tracking === 'Pending' ? (
                                                <span className="text-gray-400 font-medium text-[11px] italic">Not Assigned</span>
                                            ) : (
                                                <span className="font-bold text-gray-700 text-xs tracking-wider bg-gray-100 px-2.5 py-1.5 rounded-lg border border-gray-200">
                                                    {order.tracking}
                                                </span>
                                            )}
                                        </td>
                                        
                                        {/* Status Badge */}
                                        <td className="px-6 py-4">
                                            {order.status === 'Delivered' ? (
                                                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider text-green-700 bg-green-50 border border-green-200">
                                                    <CheckCircle size={12} /> Delivered
                                                </span>
                                            ) : order.status === 'Shipped' ? (
                                                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 border border-blue-200">
                                                    <Truck size={12} /> Shipped
                                                </span>
                                            ) : order.status === 'Cancelled' ? (
                                                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider text-red-700 bg-red-50 border border-red-200">
                                                    <XCircle size={12} /> Cancelled
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider text-orange-700 bg-orange-50 border border-orange-200">
                                                    <Package size={12} /> {order.status || 'Processing'}
                                                </span>
                                            )}
                                        </td>
                                        
                                        {/* Total (PKR) */}
                                        <td className="px-6 py-4 font-black text-gray-900 text-right">
                                            Rs {Number(order.total_amount || 0).toLocaleString()}
                                        </td>
                                        
                                        {/* Action Button */}
                                        <td className="px-6 py-4 text-center">
                                            <button 
                                                onClick={() => handleOpenModal(order)}
                                                className="w-9 h-9 bg-white text-blue-600 rounded-xl flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors mx-auto border border-gray-200 shadow-sm"
                                                title="Update Order Status"
                                            >
                                                <Edit size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* ================= UPDATE ORDER MODAL ================= */}
            {isModalOpen && selectedOrder && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
                        
                        {/* Modal Header */}
                        <div className="flex justify-between items-center p-6 md:p-8 border-b border-gray-50 bg-gray-50/50">
                            <div>
                                <h3 className="text-xl font-black text-gray-900 tracking-tight">Update Order</h3>
                                <p className="text-xs font-bold text-gray-500 mt-1">ID: {selectedOrder.id}</p>
                            </div>
                            <button onClick={handleCloseModal} className="w-8 h-8 flex items-center justify-center bg-white border border-gray-200 rounded-full text-gray-400 hover:text-red-600 hover:border-red-200 transition-colors shadow-sm">
                                <X size={16} />
                            </button>
                        </div>

                        {/* Modal Body (Form) */}
                        <form onSubmit={handleUpdateOrder} className="p-6 md:p-8 space-y-6">
                            
                            {/* Update Status */}
                            <div>
                                <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-2">Order Status *</label>
                                <select 
                                    value={updateStatus} 
                                    onChange={(e) => setUpdateStatus(e.target.value)}
                                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 text-sm font-bold focus:outline-none focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-600/10 appearance-none cursor-pointer text-gray-900 transition-all"
                                >
                                    <option value="Processing">📦 Processing (Getting Ready)</option>
                                    <option value="Shipped">🚚 Shipped (In Transit)</option>
                                    <option value="Delivered">✅ Delivered (Completed)</option>
                                    <option value="Cancelled">❌ Cancelled</option>
                                </select>
                            </div>

                            {/* Tracking Number */}
                            <div>
                                <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-2">Tracking Number</label>
                                <div className="relative">
                                    <FileText size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input 
                                        type="text" 
                                        value={updateTracking}
                                        onChange={(e) => setUpdateTracking(e.target.value)}
                                        placeholder="e.g. TCS-123456789"
                                        className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-11 pr-4 py-3.5 text-sm focus:outline-none focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-600/10 transition-all" 
                                    />
                                </div>
                                <p className="text-[10px] text-gray-400 mt-2 font-medium leading-relaxed">Add tracking info so the customer can track their package from their panel.</p>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-3 pt-6 border-t border-gray-100">
                                <button type="button" onClick={handleCloseModal} className="flex-1 bg-white border border-gray-200 text-gray-700 font-bold py-4 rounded-xl hover:bg-gray-50 transition-colors text-sm shadow-sm">
                                    Cancel
                                </button>
                                <button type="submit" disabled={isUpdating} className="flex-1 bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2 text-sm uppercase tracking-widest disabled:bg-gray-400 disabled:cursor-not-allowed">
                                    <CheckCircle size={18} /> {isUpdating ? 'Updating...' : 'Confirm Update'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

        </div>
    );
}

export default Orders;