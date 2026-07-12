import React, { useState, useEffect, useContext, useCallback } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Bell, ArrowLeft, Package, Tag, ShieldCheck, Check, Trash2, Loader2, Info } from 'lucide-react';

function Notifications() {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    
    const [isLoading, setIsLoading] = useState(true);
    const [notifications, setNotifications] = useState([]);

    // === FETCH REAL NOTIFICATIONS FROM BACKEND ===
    const fetchNotifications = useCallback(() => {
        setIsLoading(true);
        axios.get(`https://zarvix-ecommerce.vercel.app/api/users/${user.id}/notifications`)
            .then(response => {
                // 🔥 DEBUGGING: Yeh line humein browser console mein asal data dikhayegi
                console.log("Backend se ye notifications aayi hain:", response.data); 
                
                if (response.data && Array.isArray(response.data)) {
                    setNotifications(response.data);
                } else {
                    setNotifications([]);
                }
                setIsLoading(false);
            })
            .catch(error => {
                console.error("Error fetching notifications:", error);
                setNotifications([]);
                setIsLoading(false);
            });
    }, [user]);

    useEffect(() => {
        window.scrollTo(0, 0);
        if (!user) {
            navigate('/signin');
            return;
        }
        fetchNotifications();
    }, [user, navigate, fetchNotifications]);

    // === MARK AS READ (API CALL) ===
    const markAsRead = (id) => {
        // Safe UI Update
        setNotifications(prev => prev.map(n => n.id === id ? { ...n, is_read: true } : n));
        
        axios.put(`https://zarvix-ecommerce.vercel.app/api/notifications/${id}/read`)
            .catch(error => console.error("Error marking read:", error));
    };

    const markAllAsRead = () => {
        // Optimistic update all at once
        setNotifications(prev => prev.map(n => ({ ...n, is_read: true })));
        
        notifications.forEach(n => {
            if (!n.is_read) {
                axios.put(`https://zarvix-ecommerce.vercel.app/api/notifications/${n.id}/read`)
                    .catch(error => console.error("Error marking read:", error));
            }
        });
    };

    // === DELETE NOTIFICATION (API CALL) ===
    const deleteNotification = (id) => {
        // Safe UI removal
        setNotifications(prev => prev.filter(n => n.id !== id));
        
        axios.delete(`https://zarvix-ecommerce.vercel.app/api/notifications/${id}`)
            .catch(error => console.error("Error deleting notification:", error));
    };

    const getIcon = (type) => {
        switch(type) {
            case 'order': return <Package size={20} className="text-blue-600" />;
            case 'promo': return <Tag size={20} className="text-red-600" />;
            case 'system': return <ShieldCheck size={20} className="text-green-600" />;
            default: return <Info size={20} className="text-gray-600" />;
        }
    };

    if (isLoading) {
        return <div className="min-h-screen flex justify-center items-center bg-[#f4f5f7]"><Loader2 className="animate-spin text-red-600" size={40} /></div>;
    }

    const unreadCount = notifications.filter(n => !n.is_read).length;

    return (
        <div className="bg-[#f4f5f7] min-h-screen py-16 px-4 font-sans text-gray-900">
            <div className="max-w-4xl mx-auto">
                
                {/* Header Section */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
                    <div className="flex items-center gap-4">
                        <Link to="/profile" className="w-10 h-10 bg-white border border-gray-200 rounded-xl flex items-center justify-center text-gray-400 hover:text-red-600 hover:border-red-600 transition-colors shrink-0">
                            <ArrowLeft size={18} />
                        </Link>
                        <div>
                            <h1 className="text-3xl font-black tracking-tight flex items-center gap-3">
                                Notifications
                                {unreadCount > 0 && (
                                    <span className="bg-red-600 text-white text-[10px] px-2 py-0.5 rounded-full flex items-center justify-center -translate-y-0.5">
                                        {unreadCount} New
                                    </span>
                                )}
                            </h1>
                            <p className="text-gray-500 text-sm mt-1">
                                Stay updated with your orders and exclusive offers from Zarvix Digital.
                            </p>
                        </div>
                    </div>

                    {unreadCount > 0 && (
                        <button 
                            onClick={markAllAsRead}
                            className="text-xs font-bold text-gray-500 hover:text-red-600 transition-colors flex items-center gap-1 sm:self-end mb-2"
                        >
                            <Check size={14} /> Mark all as read
                        </button>
                    )}
                </div>

                {/* Notifications List */}
                <div className="bg-white rounded-3xl shadow-[0_15px_40px_-15px_rgba(0,0,0,0.05)] border border-gray-100 overflow-hidden">
                    {notifications.length === 0 ? (
                        <div className="p-16 text-center">
                            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Bell size={32} className="text-gray-300" />
                            </div>
                            <h2 className="text-xl font-black text-gray-900 mb-2">All Caught Up!</h2>
                            <p className="text-gray-500 text-sm max-w-sm mx-auto mb-8">You have no new notifications. We'll alert you when there's an update on your orders or new offers.</p>
                            <Link to="/shop" className="text-red-600 font-bold text-sm hover:underline">
                                Continue Shopping
                            </Link>
                        </div>
                    ) : (
                        <div className="divide-y divide-gray-50">
                            {notifications.map((notif) => {
                                const notifDate = notif.created_at ? new Date(notif.created_at).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : "Just Now";

                                return (
                                    <div 
                                        key={notif.id} 
                                        onMouseEnter={() => !notif.is_read && markAsRead(notif.id)} 
                                        className={`p-6 flex gap-4 transition-colors group relative ${notif.is_read ? 'bg-white hover:bg-gray-50/50' : 'bg-red-50/30'}`}
                                    >
                                        <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${notif.is_read ? 'bg-gray-100' : 'bg-white shadow-sm'}`}>
                                            {getIcon(notif.type)}
                                        </div>

                                        <div className="grow pr-8">
                                            <div className="flex items-center gap-2 mb-1">
                                                <h3 className={`text-sm ${notif.is_read ? 'font-bold text-gray-700' : 'font-black text-gray-900'}`}>
                                                    {notif.title}
                                                </h3>
                                                {!notif.is_read && <span className="w-2 h-2 rounded-full bg-red-600"></span>}
                                            </div>
                                            <p className={`text-sm mb-2 leading-relaxed ${notif.is_read ? 'text-gray-500 font-light' : 'text-gray-600 font-medium'}`}>
                                                {notif.message}
                                            </p>
                                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                                {notifDate}
                                            </p>
                                        </div>

                                        <button 
                                            onClick={() => deleteNotification(notif.id)}
                                            className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-300 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-all p-2 bg-white rounded-lg shadow-sm border border-gray-100"
                                            title="Delete Notification"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}

export default Notifications;