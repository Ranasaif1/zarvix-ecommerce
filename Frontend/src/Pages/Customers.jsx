import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Users, Search, Mail, Ban, Bell, Loader2, Send } from 'lucide-react';

function Customers() {
    const [customers, setCustomers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    // Modal States
    const [isNotifyModalOpen, setIsNotifyModalOpen] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [notificationMsg, setNotificationMsg] = useState('');
    const [isBroadcast, setIsBroadcast] = useState(false); // New state to check if sending to all

    useEffect(() => {
        window.scrollTo(0, 0);
        fetchCustomers();
    }, []);

    // === FETCH REAL CUSTOMERS FROM DATABASE ===
    const fetchCustomers = () => {
        setIsLoading(true);
        axios.get('https://zarvix-ecommerce.vercel.app/api/admin/customers')
            .then(response => {
                // Add a default is_active status to all fetched customers for UI handling
                const dataWithStatus = response.data.map(c => ({ ...c, is_active: c.status !== 'Blocked' }));
                setCustomers(dataWithStatus);
                setIsLoading(false);
            })
            .catch(error => {
                console.error("Error fetching customers:", error);
                setIsLoading(false);
            });
    };

    const filteredCustomers = customers.filter(c =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // === ACTION: BLOCK / UNBLOCK USER ===
    const handleBlockUser = (customer) => {
        const action = customer.is_active ? 'block' : 'unblock';
        const confirmBlock = window.confirm(`Are you sure you want to ${action} ${customer.name}?`);
        
        if (confirmBlock) {
            // Optimistic UI Update (Fauran UI change karein)
            setCustomers(customers.map(c => 
                c.id === customer.id ? { ...c, is_active: !c.is_active } : c
            ));

            // Real API Call
            axios.put(`https://zarvix-ecommerce.vercel.app/api/admin/users/${customer.id}/block`)
                .then(() => alert(`${customer.name} has been ${action}ed successfully!`))
                .catch(err => {
                    console.error("Error updating status:", err);
                    alert("Status change ho gaya lekin database column add karna baqi hai.");
                });
        }
    };

    // === ACTION: SEND NOTIFICATION (SINGLE OR BROADCAST) ===
    const handleSendNotification = (e) => {
        e.preventDefault();
        if (!notificationMsg) {
            alert("Bhai message box khali hai, pehle kuch likhein! 😅");
            return;
        }

        const payload = {
            title: isBroadcast ? "Zarvix Digital Alert 📢" : "Admin Alert 🔔",
            message: notificationMsg,
            type: isBroadcast ? "system" : "promo"
        };

        const apiUrl = isBroadcast 
            ? `https://zarvix-ecommerce.vercel.app/api/admin/notify-all` 
            : `https://zarvix-ecommerce.vercel.app/api/admin/users/${selectedCustomer.id}/notify`;

        axios.post(apiUrl, payload)
        .then(response => {
            alert(isBroadcast ? "Zabardast! Sab customers ko notification chala gaya! ✅" : `Notification ${selectedCustomer.name} ko send ho gaya! ✅`);
            setIsNotifyModalOpen(false);
            setNotificationMsg('');
        })
        .catch(error => {
            console.error("Error sending notification:", error);
            alert("Network error. Backend chalu hai ya nahi check karein.");
        });
    };

    // Open Modal for Single User
    const openNotifyModal = (customer) => {
        setIsBroadcast(false);
        setSelectedCustomer(customer);
        setIsNotifyModalOpen(true);
    };

    // Open Modal for ALL Users
    const openBroadcastModal = () => {
        setIsBroadcast(true);
        setSelectedCustomer(null);
        setIsNotifyModalOpen(true);
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500 pb-12">

            {/* Header Area */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                <div>
                    <h3 className="text-xl font-black text-gray-900 tracking-tight flex items-center gap-2">
                        <Users size={24} className="text-blue-600" /> Customers Management
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">Manage users, block accounts, or send mass notifications.</p>
                </div>

                <div className="flex flex-col sm:flex-row w-full lg:w-auto gap-4">
                    {/* Send to All Button */}
                    <button 
                        onClick={openBroadcastModal}
                        className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl text-sm transition-colors shadow-sm whitespace-nowrap"
                    >
                        <Send size={16} /> Send Alert to All
                    </button>

                    {/* Search Bar */}
                    <div className="relative w-full sm:w-72 shrink-0">
                        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search Name or Email..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-blue-600 focus:bg-white transition-all"
                        />
                    </div>
                </div>
            </div>

            {/* Customers Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50/80 text-gray-500 uppercase tracking-widest text-[10px] font-bold border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-5">Customer ID</th>
                                <th className="px-6 py-5">Name & Email</th>
                                <th className="px-6 py-5 text-center">Total Orders</th>
                                <th className="px-6 py-5 text-right">Total Spent</th>
                                <th className="px-6 py-5 text-center">Status</th>
                                <th className="px-6 py-5 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {isLoading ? (
                                <tr><td colSpan="6" className="px-6 py-16 text-center text-gray-400 font-bold"><Loader2 className="animate-spin mx-auto mb-2 text-blue-600" size={24} /> Fetching customers...</td></tr>
                            ) : filteredCustomers.length === 0 ? (
                                <tr><td colSpan="6" className="px-6 py-16 text-center text-gray-400 font-bold">No Customers Found.</td></tr>
                            ) : (
                                filteredCustomers.map((customer, i) => (
                                    <tr key={i} className={`transition-colors group ${!customer.is_active ? 'bg-red-50/30' : 'hover:bg-gray-50/50'}`}>

                                        <td className="px-6 py-4 font-black text-gray-900">
                                            USR-{1000 + customer.id}
                                        </td>

                                        <td className="px-6 py-4">
                                            <div className="font-bold text-gray-800">{customer.name}</div>
                                            <div className="text-[11px] text-gray-500 mt-0.5">{customer.email}</div>
                                        </td>

                                        <td className="px-6 py-4 text-center font-bold text-gray-700">
                                            {customer.total_orders > 0 ? (
                                                <span className="bg-blue-100 text-blue-700 px-2.5 py-1 rounded-lg text-xs">{customer.total_orders} Orders</span>
                                            ) : (
                                                <span className="text-gray-400 text-xs">No Orders</span>
                                            )}
                                        </td>

                                        <td className="px-6 py-4 font-black text-gray-900 text-right">
                                            Rs {customer.total_spent.toLocaleString()}
                                        </td>

                                        <td className="px-6 py-4 text-center">
                                            {customer.is_active ? (
                                                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider text-green-700 bg-green-50 border border-green-200">
                                                    Active
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider text-red-700 bg-red-50 border border-red-200">
                                                    Blocked
                                                </span>
                                            )}
                                        </td>

                                        <td className="px-6 py-4 text-center">
                                            <div className="flex items-center justify-center gap-2">
                                                <button
                                                    onClick={() => openNotifyModal(customer)}
                                                    disabled={!customer.is_active}
                                                    className="w-8 h-8 bg-white text-blue-600 rounded-lg flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors border border-gray-200 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                                                    title="Send Notification"
                                                >
                                                    <Bell size={14} />
                                                </button>
                                                <button
                                                    onClick={() => handleBlockUser(customer)}
                                                    className={`w-8 h-8 bg-white rounded-lg flex items-center justify-center transition-colors border border-gray-200 shadow-sm ${
                                                        customer.is_active 
                                                        ? 'text-red-500 hover:bg-red-600 hover:text-white' 
                                                        : 'text-green-500 hover:bg-green-600 hover:text-white'
                                                    }`}
                                                    title={customer.is_active ? "Block User" : "Unblock User"}
                                                >
                                                    <Ban size={14} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* === NOTIFICATION MODAL === */}
            {isNotifyModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
                        <div className={`p-6 text-white flex items-center gap-3 ${isBroadcast ? 'bg-indigo-600' : 'bg-blue-600'}`}>
                            {isBroadcast ? <Send size={24} /> : <Mail size={24} />}
                            <div>
                                <h3 className="font-black text-lg">{isBroadcast ? 'Broadcast Alert' : 'Send Offer / Alert'}</h3>
                                <p className="text-xs text-blue-100 opacity-90">
                                    To: {isBroadcast ? 'All Registered Customers 👥' : `${selectedCustomer?.name} (${selectedCustomer?.email})`}
                                </p>
                            </div>
                        </div>
                        
                        <form onSubmit={handleSendNotification} className="p-6">
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Message</label>
                            <textarea
                                rows="4"
                                value={notificationMsg}
                                onChange={(e) => setNotificationMsg(e.target.value)}
                                placeholder={isBroadcast ? "Type an announcement for everyone..." : "Write a special offer for this customer..."}
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 text-sm focus:outline-none focus:border-blue-600 focus:bg-white resize-none"
                            ></textarea>
                            <div className="flex gap-3 mt-6">
                                <button type="button" onClick={() => setIsNotifyModalOpen(false)} className="flex-1 bg-white border border-gray-200 text-gray-700 font-bold py-3 rounded-xl hover:bg-gray-50 transition-colors text-sm">
                                    Cancel
                                </button>
                                <button type="submit" className={`flex-1 text-white font-bold py-3 rounded-xl transition-colors shadow-lg text-sm ${isBroadcast ? 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-600/20' : 'bg-blue-600 hover:bg-blue-700 shadow-blue-600/20'}`}>
                                    {isBroadcast ? 'Send to All' : 'Send'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Customers;