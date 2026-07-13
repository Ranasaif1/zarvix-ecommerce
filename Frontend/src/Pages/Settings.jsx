import React, { useState, useEffect } from 'react';
import axios from 'axios';
// DHYAN DEIN: Yahan maine CheckCircle aur KeyRound add kar diye hain taake app crash na ho!
import { Settings as SettingsIcon, Store, Truck, CreditCard, Shield, Save, Power, Lock, KeyRound, CheckCircle } from 'lucide-react';

function Settings() {
    // === FIXED STORE INFO (Not Editable) ===
    const fixedInfo = {
        storeName: 'Zarvix Digital',
        supportEmail: 'support@zarvix.com',
        phone: '+92 300 1234567', // Aap apna real official number yahan hardcode kar sakte hain
        address: 'Karachi, Pakistan'
    };

    // === EDITABLE SETTINGS STATE (Backend se aayega) ===
    const [settings, setSettings] = useState({
        currency: 'PKR (Rs)',
        shippingFee: 200,
        freeShippingThreshold: 5000,
        codEnabled: true,
        cardEnabled: false,
        maintenanceMode: false
    });

    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: ''
    });

    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [isUpdatingPwd, setIsUpdatingPwd] = useState(false);

    // Component load hotay hi existing settings fetch karo
    useEffect(() => {
        window.scrollTo(0, 0);
        fetchSettings();
    }, []);

    const fetchSettings = () => {
        setIsLoading(true);
        axios.get('https://backend-phi-three-82.vercel.app/api/settings')
            .then(response => {
                // Agar backend par data hai toh update karein warna default use karein
                if(response.data) setSettings(response.data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error("Error fetching settings:", error);
                // 404 Error aane par page load hona band ho jaye
                setIsLoading(false);
            });
    };

    // Handlers for inputs
    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setSettings(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handlePasswordChange = (e) => {
        setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
    };

    // === SAVE SETTINGS (PUT REQUEST) ===
    const handleSaveSettings = (e) => {
        e.preventDefault();
        setIsSaving(true);
        
        // Backend par settings save karne ki request
        axios.put('https://backend-phi-three-82.vercel.app/api/settings', settings)
            .then(response => {
                alert("Store Settings successfully updated and applied! ⚙️✅");
                setIsSaving(false);
            })
            .catch(error => {
                console.error("Error saving settings:", error);
                alert("Settings save karne mein masla hua. Backend connection check karein.");
                setIsSaving(false);
            });
    };

    // === UPDATE PASSWORD (POST/PUT REQUEST) ===
    const handleUpdatePassword = (e) => {
        e.preventDefault();
        
        if(!passwordData.currentPassword || !passwordData.newPassword) {
            alert("Please current aur new password dono enter karein.");
            return;
        }

        setIsUpdatingPwd(true);
        axios.post('https://backend-phi-three-82.vercel.app/api/admin/update-password', passwordData)
            .then(response => {
                alert("Admin Password updated successfully! 🔒");
                setPasswordData({ currentPassword: '', newPassword: '' });
                setIsUpdatingPwd(false);
            })
            .catch(error => {
                console.error("Error updating password:", error);
                alert("Password update fail ho gaya. Shayad current password galat hai.");
                setIsUpdatingPwd(false);
            });
    };

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center py-32 animate-in fade-in duration-500">
                <SettingsIcon size={40} className="text-gray-300 animate-spin mb-4" />
                <div className="text-center font-bold text-gray-400 tracking-widest uppercase text-sm">Loading Configuration...</div>
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-in fade-in duration-500 pb-12">
            
            {/* Header */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 hover:shadow-md transition-shadow">
                <div>
                    <h3 className="text-xl font-black text-gray-900 tracking-tight flex items-center gap-2">
                        <SettingsIcon size={24} className="text-red-600" /> Store Configuration
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">Manage your business rules, shipping, and security controls.</p>
                </div>
                
                <button 
                    onClick={handleSaveSettings}
                    disabled={isSaving}
                    className="bg-[#111111] hover:bg-red-600 text-white font-bold px-8 py-3.5 rounded-xl text-sm transition-all shadow-md hover:shadow-red-600/30 flex items-center justify-center gap-2 whitespace-nowrap disabled:bg-gray-400 disabled:cursor-not-allowed uppercase tracking-widest"
                >
                    <Save size={16} /> {isSaving ? 'Saving...' : 'Save All Settings'}
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* === 1. FIXED GENERAL STORE INFO (Read Only) === */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 space-y-6 relative overflow-hidden hover:shadow-md transition-shadow">
                    <div className="absolute top-0 right-0 bg-gray-100/80 text-gray-500 px-4 py-1.5 text-[10px] font-bold uppercase rounded-bl-2xl flex items-center gap-1 border-b border-l border-gray-200 backdrop-blur-sm">
                        <Lock size={10} /> Core Details Locked
                    </div>
                    
                    <h4 className="text-lg font-black text-gray-900 border-b border-gray-50 pb-4 flex items-center gap-2">
                        <Store size={20} className="text-red-600" /> Brand Identity
                    </h4>
                    
                    <div>
                        <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">Store Name</label>
                        <div className="w-full bg-gray-50 border border-gray-100 text-gray-500 rounded-xl px-4 py-3.5 text-sm font-bold cursor-not-allowed flex justify-between items-center shadow-inner">
                            {fixedInfo.storeName} <Lock size={14} className="text-gray-300" />
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">Support Email</label>
                            <div className="w-full bg-gray-50 border border-gray-100 text-gray-500 rounded-xl px-4 py-3.5 text-sm font-bold cursor-not-allowed flex justify-between items-center shadow-inner">
                                {fixedInfo.supportEmail} <Lock size={14} className="text-gray-300" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">Contact Phone</label>
                            <div className="w-full bg-gray-50 border border-gray-100 text-gray-500 rounded-xl px-4 py-3.5 text-sm font-bold cursor-not-allowed flex justify-between items-center shadow-inner">
                                {fixedInfo.phone} <Lock size={14} className="text-gray-300" />
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">Head Office Address</label>
                        <div className="w-full bg-gray-50 border border-gray-100 text-gray-500 rounded-xl px-4 py-3.5 text-sm font-bold cursor-not-allowed flex justify-between items-center shadow-inner leading-relaxed">
                            {fixedInfo.address} <Lock size={14} className="text-gray-300" />
                        </div>
                    </div>
                </div>


                {/* === 3. PAYMENT METHODS (Editable) === */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 space-y-6 hover:shadow-md transition-shadow">
                    <h4 className="text-lg font-black text-gray-900 border-b border-gray-50 pb-4 flex items-center gap-2">
                        <CreditCard size={20} className="text-red-600" /> Checkout & Payments
                    </h4>
                    
                    <div className="space-y-4">
                        <label className={`flex items-center justify-between p-5 border-2 rounded-xl cursor-pointer transition-all shadow-sm ${settings.codEnabled ? 'border-green-600 bg-green-50/40' : 'border-gray-100 hover:border-gray-300'}`}>
                            <div>
                                <span className="font-bold text-sm text-gray-900 block mb-0.5">Cash on Delivery (COD)</span>
                                <span className="text-[10px] text-gray-500 font-medium">Customers pay rider upon parcel delivery.</span>
                            </div>
                            <div className={`w-5 h-5 rounded flex items-center justify-center transition-colors ${settings.codEnabled ? 'bg-green-600' : 'bg-gray-200'}`}>
                                {settings.codEnabled && <CheckCircle size={14} className="text-white" />}
                            </div>
                            <input type="checkbox" name="codEnabled" checked={settings.codEnabled} onChange={handleInputChange} className="hidden" />
                        </label>

                        <label className={`flex items-center justify-between p-5 border-2 rounded-xl cursor-pointer transition-all shadow-sm ${settings.cardEnabled ? 'border-green-600 bg-green-50/40' : 'border-gray-100 hover:border-gray-300'}`}>
                            <div>
                                <span className="font-bold text-sm text-gray-900 block mb-0.5">Credit / Debit Cards</span>
                                <span className="text-[10px] text-gray-500 font-medium">Accept direct online payments via Stripe/PayFast.</span>
                            </div>
                            <div className={`w-5 h-5 rounded flex items-center justify-center transition-colors ${settings.cardEnabled ? 'bg-green-600' : 'bg-gray-200'}`}>
                                {settings.cardEnabled && <CheckCircle size={14} className="text-white" />}
                            </div>
                            <input type="checkbox" name="cardEnabled" checked={settings.cardEnabled} onChange={handleInputChange} className="hidden" />
                        </label>
                    </div>

                    <div className="pt-4 border-t border-gray-50">
                        <label className={`flex items-center justify-between p-5 border-2 rounded-xl cursor-pointer transition-all shadow-sm ${settings.maintenanceMode ? 'border-red-600 bg-red-50/50' : 'border-gray-100 hover:border-red-200 hover:bg-red-50/10'}`}>
                            <div className="flex items-center gap-4">
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${settings.maintenanceMode ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-400'}`}>
                                    <Power size={20} />
                                </div>
                                <div>
                                    <span className={`font-black text-sm block mb-0.5 ${settings.maintenanceMode ? 'text-red-600' : 'text-gray-900'}`}>Maintenance Mode</span>
                                    <span className="text-[10px] text-gray-500 font-medium">Temporarily disable storefront for users.</span>
                                </div>
                            </div>
                            <div className={`w-12 h-6 rounded-full p-1 transition-colors ${settings.maintenanceMode ? 'bg-red-600' : 'bg-gray-300'}`}>
                                <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${settings.maintenanceMode ? 'translate-x-6' : 'translate-x-0'}`}></div>
                            </div>
                            <input type="checkbox" name="maintenanceMode" checked={settings.maintenanceMode} onChange={handleInputChange} className="hidden" />
                        </label>
                    </div>
                </div>

                {/* === 4. SECURITY (Password Update) === */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 space-y-6 hover:shadow-md transition-shadow">
                    <h4 className="text-lg font-black text-gray-900 border-b border-gray-50 pb-4 flex items-center gap-2">
                        <Shield size={20} className="text-red-600" /> Access & Security
                    </h4>
                    
                    <form onSubmit={handleUpdatePassword} className="space-y-5">
                        <div>
                            <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-2">Current Admin Password</label>
                            <input 
                                type="password" 
                                name="currentPassword"
                                value={passwordData.currentPassword}
                                onChange={handlePasswordChange}
                                placeholder="Verify current password"
                                className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-red-600 focus:ring-4 focus:ring-red-600/10 transition-all shadow-sm" 
                            />
                        </div>
                        <div>
                            <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-2">New Password</label>
                            <input 
                                type="password" 
                                name="newPassword"
                                value={passwordData.newPassword}
                                onChange={handlePasswordChange}
                                placeholder="Enter strong new password"
                                className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-red-600 focus:ring-4 focus:ring-red-600/10 transition-all shadow-sm" 
                            />
                        </div>
                        <button type="submit" disabled={isUpdatingPwd} className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-3.5 rounded-xl transition-colors text-sm flex items-center justify-center gap-2 uppercase tracking-widest disabled:bg-gray-50 disabled:text-gray-400">
                            <KeyRound size={16} /> {isUpdatingPwd ? 'Updating...' : 'Update Password'}
                        </button>
                    </form>
                </div>

            </div>
        </div>
    );
}

export default Settings;