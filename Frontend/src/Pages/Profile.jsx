import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Phone, MapPin, Plus, Trash2, Save, ShieldCheck, Loader2 } from 'lucide-react';

function Profile() {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    
    // Profile States
    const [phone, setPhone] = useState('');
    const [primaryAddress, setPrimaryAddress] = useState('');
    const [secondaryAddresses, setSecondaryAddresses] = useState([]); // Array for extra addresses

    useEffect(() => {
        // Agar user login nahi hai tou direct signin pe bhej do
        if (!user) {
            navigate('/signin');
            return;
        }

        // Backend se profile ka data mangwao
        axios.get(`https://zarvix-ecommerce.vercel.app/api/users/${user.id}/profile`)
            .then(response => {
                setPhone(response.data.phone || '');
                setPrimaryAddress(response.data.primary_address || '');
                // Secondary addresses database mein string format mein save honge, unhe array banayen
                setSecondaryAddresses(JSON.parse(response.data.secondary_addresses || '[]'));
                setIsLoading(false);
            })
            .catch(error => {
                console.error("Profile Fetch Error:", error);
                setIsLoading(false);
            });
    }, [user, navigate]);

    // Secondary Address Handle karne ke functions
    const addSecondaryAddress = () => {
        setSecondaryAddresses([...secondaryAddresses, '']);
    };

    const removeSecondaryAddress = (index) => {
        const newAddresses = [...secondaryAddresses];
        newAddresses.splice(index, 1);
        setSecondaryAddresses(newAddresses);
    };

    const handleSecondaryAddressChange = (index, value) => {
        const newAddresses = [...secondaryAddresses];
        newAddresses[index] = value;
        setSecondaryAddresses(newAddresses);
    };

    // Save Profile Function
    const handleSaveProfile = async (e) => {
        e.preventDefault();
        setIsSaving(true);

        const profileData = {
            phone: phone,
            primary_address: primaryAddress,
            secondary_addresses: JSON.stringify(secondaryAddresses) // Array ko string bana kar bhej rahe hain
        };

        try {
            await axios.post(`https://zarvix-ecommerce.vercel.app/api/users/${user.id}/profile`, profileData);
            alert("Profile successfully updated! 🎉");
        } catch (error) {
            console.error("Update Error:", error);
            alert("Something went wrong. Please try again.");
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) {
        return <div className="min-h-screen flex justify-center items-center"><Loader2 size={40} className="animate-spin text-red-600" /></div>;
    }

    return (
        <div className="bg-[#f4f5f7] min-h-screen py-16 px-4 font-sans text-gray-900">
            <div className="max-w-4xl mx-auto">
                
                {/* Header Section */}
                <div className="flex items-center gap-4 mb-10">
                    <div className="w-16 h-16 bg-red-600 text-white rounded-2xl flex items-center justify-center text-2xl font-black shadow-lg shadow-red-600/30">
                        {user?.name?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                        <h1 className="text-3xl font-black tracking-tight">My Profile</h1>
                        <p className="text-gray-500 text-sm flex items-center gap-2">
                            <ShieldCheck size={14} className="text-green-500" /> Secure Account Management
                        </p>
                    </div>
                </div>

                {/* Form Card */}
                <form onSubmit={handleSaveProfile} className="bg-white rounded-3xl shadow-[0_15px_40px_-15px_rgba(0,0,0,0.05)] border border-gray-100 overflow-hidden">
                    
                    {/* Basic Info (Read Only) */}
                    <div className="p-8 border-b border-gray-100 bg-gray-50/50">
                        <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-6">Account Details</h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs font-bold text-gray-600 uppercase mb-2">Full Name</label>
                                <div className="flex items-center bg-gray-100 px-4 py-3 rounded-xl border border-gray-200 cursor-not-allowed">
                                    <User size={18} className="text-gray-400 mr-3" />
                                    <span className="text-gray-700 font-medium">{user?.name}</span>
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-600 uppercase mb-2">Email Address</label>
                                <div className="flex items-center bg-gray-100 px-4 py-3 rounded-xl border border-gray-200 cursor-not-allowed">
                                    <Mail size={18} className="text-gray-400 mr-3" />
                                    <span className="text-gray-700 font-medium">{user?.email}</span>
                                </div>
                            </div>
                        </div>
                        <p className="text-[10px] text-gray-400 mt-3 font-medium flex items-center gap-1">* Account details can only be changed by contacting support.</p>
                    </div>

                    {/* Editable Delivery Details */}
                    <div className="p-8">
                        <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-6 flex items-center gap-2">
                            <MapPin size={16} /> Delivery Information
                        </h2>
                        
                        <div className="space-y-6">
                            {/* Phone Number */}
                            <div>
                                <label className="block text-xs font-bold text-gray-600 uppercase mb-2">Phone Number</label>
                                <div className="relative">
                                    <Phone size={18} className="absolute left-4 top-3.5 text-gray-400" />
                                    <input 
                                        type="tel" 
                                        required
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        placeholder="0300 1234567" 
                                        className="w-full bg-white border border-gray-200 text-gray-900 px-12 py-3 rounded-xl focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-all font-medium"
                                    />
                                </div>
                            </div>

                            {/* Primary Address */}
                            <div>
                                <label className="block text-xs font-bold text-gray-600 uppercase mb-2">Primary Address</label>
                                <textarea 
                                    required
                                    value={primaryAddress}
                                    onChange={(e) => setPrimaryAddress(e.target.value)}
                                    placeholder="Enter your complete home or office address..." 
                                    rows="3"
                                    className="w-full bg-white border border-gray-200 text-gray-900 px-4 py-3 rounded-xl focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-all font-medium resize-none"
                                ></textarea>
                            </div>

                            {/* Dynamic Secondary Addresses */}
                            <div className="pt-4">
                                <label className="flex items-center justify-between text-xs font-bold text-gray-600 uppercase mb-4">
                                    <span>Secondary Addresses</span>
                                    <button type="button" onClick={addSecondaryAddress} className="text-red-600 flex items-center gap-1 hover:text-red-700 hover:bg-red-50 px-3 py-1.5 rounded-lg transition-colors">
                                        <Plus size={14} /> Add Address
                                    </button>
                                </label>

                                <div className="space-y-4">
                                    {secondaryAddresses.map((addr, index) => (
                                        <div key={index} className="flex items-start gap-3 bg-gray-50 p-4 rounded-xl border border-gray-100 relative group transition-all">
                                            <div className="pt-2 text-gray-400"><MapPin size={18} /></div>
                                            <textarea 
                                                value={addr}
                                                onChange={(e) => handleSecondaryAddressChange(index, e.target.value)}
                                                placeholder={`Secondary Address ${index + 1}`} 
                                                rows="2"
                                                className="w-full bg-transparent border-none text-gray-900 focus:outline-none font-medium resize-none"
                                            ></textarea>
                                            <button 
                                                type="button" 
                                                onClick={() => removeSecondaryAddress(index)}
                                                className="absolute right-4 top-4 text-gray-300 hover:text-red-600 transition-colors"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    ))}
                                    {secondaryAddresses.length === 0 && (
                                        <div className="text-center py-6 border-2 border-dashed border-gray-200 rounded-xl">
                                            <p className="text-gray-400 text-sm font-light">No secondary addresses added.</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="p-8 border-t border-gray-100 bg-gray-50 flex justify-end">
                        <button 
                            type="submit" 
                            disabled={isSaving}
                            className="bg-[#111111] hover:bg-red-600 text-white font-bold px-8 py-3.5 rounded-xl uppercase tracking-widest text-[10px] transition-all shadow-lg flex items-center gap-2 disabled:bg-gray-400"
                        >
                            {isSaving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />} 
                            Save Changes
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}

export default Profile;