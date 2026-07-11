import React, { useState } from 'react';
import axios from 'axios';
import { UploadCloud, X, Plus, CheckCircle, Box, Trash2, Tag, Cpu, AlignLeft, Info, Truck, Layers, Loader2 } from 'lucide-react';

function AddProduct() {
    // === 1. COMPREHENSIVE FORM STATES ===
    const [formData, setFormData] = useState({
        title: '',
        category: '', // Exact Home Page Categories
        sku: '',
        condition: 'New', 
        brandType: 'no-brand',
        brandName: '',
        modelName: '',
        mpn: '', 
        color: '',
        storage_ram: '', 
        price: '',
        stock: '',
        weight: '', 
        descriptionText: ''
    });

    const [bulletPoints, setBulletPoints] = useState(['']); 
    const [customSpecs, setCustomSpecs] = useState([{ name: '', value: '' }]); 

    const [productImages, setProductImages] = useState([]); 
    const [descImages, setDescImages] = useState([]); 
    const [isSubmitting, setIsLoading] = useState(false);

    // === HANDLERS ===
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleBulletChange = (index, value) => {
        const newBullets = [...bulletPoints];
        newBullets[index] = value;
        setBulletPoints(newBullets);
    };
    const addBullet = () => setBulletPoints([...bulletPoints, '']);
    const removeBullet = (index) => {
        if (bulletPoints.length > 1) setBulletPoints(bulletPoints.filter((_, i) => i !== index));
    };

    const handleCustomSpecChange = (index, field, value) => {
        const newSpecs = [...customSpecs];
        newSpecs[index][field] = value;
        setCustomSpecs(newSpecs);
    };
    const addCustomSpec = () => setCustomSpecs([...customSpecs, { name: '', value: '' }]);
    const removeCustomSpec = (index) => {
        if (customSpecs.length > 1) setCustomSpecs(customSpecs.filter((_, i) => i !== index));
    };

    // === IMAGE UPLOADS (RESTRICTIONS REMOVED) ===
    const handleProductImageUpload = (e) => {
        const files = Array.from(e.target.files);
        if (productImages.length + files.length > 10) {
            alert("Maximum 10 images hi upload ki ja sakti hain!");
            return;
        }
        // Ab koi size restriction nahi hai, har photo accept ho जाएगी
        files.forEach(file => {
            setProductImages(prev => [...prev, { file, preview: URL.createObjectURL(file) }]);
        });
        e.target.value = null; 
    };

    const removeProductImage = (index) => setProductImages(prev => prev.filter((_, i) => i !== index));

    const handleDescImageUpload = (e) => {
        const files = Array.from(e.target.files);
        // Banners ke liye bhi saari restriction khatam
        files.forEach(file => {
            setDescImages(prev => [...prev, { file, preview: URL.createObjectURL(file) }]);
        });
        e.target.value = null;
    };

    const removeDescImage = (index) => setDescImages(prev => prev.filter((_, i) => i !== index));

    // === SUBMIT TO BACKEND ===
    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (productImages.length === 0) {
            alert("Please kam az kam ek main product image zaroor upload karein!");
            return;
        }

        setIsLoading(true);

        const data = new FormData();
        data.append('title', formData.title);
        data.append('category', formData.category); 
        data.append('sku', formData.sku);
        data.append('condition', formData.condition);
        data.append('brandType', formData.brandType);
        data.append('brandName', formData.brandType === 'branded' ? formData.brandName : 'No Brand');
        data.append('modelName', formData.modelName);
        data.append('mpn', formData.mpn);
        data.append('color', formData.color);
        data.append('storage_ram', formData.storage_ram);
        data.append('customSpecs', JSON.stringify(customSpecs.filter(s => s.name.trim() !== '')));
        data.append('bulletPoints', JSON.stringify(bulletPoints.filter(b => b.trim() !== '')));
        data.append('descriptionText', formData.descriptionText);
        data.append('price', formData.price);
        data.append('stock', formData.stock);
        data.append('weight', formData.weight);

        productImages.forEach((imgObj) => data.append(`product_images`, imgObj.file));
        descImages.forEach((imgObj) => data.append(`desc_images`, imgObj.file));

        axios.post('http://localhost:8000/api/products', data, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })
        .then(response => {
            alert(`Listing Live Ho Gayi Hai! (${formData.category} category mein) 🎉`);
            setFormData({
                title: '', category: '', sku: '', condition: 'New', brandType: 'no-brand', brandName: '', modelName: '', mpn: '', color: '', storage_ram: '', price: '', stock: '', weight: '', descriptionText: ''
            });
            setBulletPoints(['']);
            setCustomSpecs([{ name: '', value: '' }]);
            setProductImages([]);
            setDescImages([]);
            setIsLoading(false);
        })
        .catch(error => {
            console.error("Error:", error);
            alert("Error in saving product. Ensure backend is running!");
            setIsLoading(false);
        });
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-5xl space-y-8 pb-12 animate-in fade-in duration-500">
            
            {/* ================= 1. BASIC DETAILS ================= */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 hover:shadow-md transition-shadow">
                <h3 className="text-lg font-black text-gray-900 mb-6 border-b border-gray-50 pb-4 flex items-center gap-2">
                    <Info size={20} className="text-red-600" /> Basic Details
                </h3>
                
                <div className="space-y-6">
                    <div>
                        <div className="flex justify-between mb-2">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Listing Title *</label>
                            <span className={`text-xs font-bold ${formData.title.length > 150 ? 'text-red-600' : 'text-gray-400'}`}>
                                {formData.title.length}/150
                            </span>
                        </div>
                        <input 
                            type="text" name="title" required maxLength={150} value={formData.title} onChange={handleInputChange} 
                            placeholder="e.g. Samsung Galaxy S24 Ultra 5G, 256GB, Titanium Black"
                            className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-red-600 focus:bg-white focus:ring-4 focus:ring-red-600/10 transition-all" 
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* --- EXACT HOMEPAGE CATEGORIES --- */}
                        <div>
                            <label className="flex text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 items-center gap-1"><Layers size={14} /> Category *</label>
                            <select name="category" value={formData.category} onChange={handleInputChange} required className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-red-600 focus:bg-white focus:ring-4 focus:ring-red-600/10 cursor-pointer text-gray-900 font-medium transition-all">
                                <option value="" disabled>Select exact category...</option>
                                <option value="Smartphones">📱 Smartphones</option>
                                <option value="Laptops & PCs">💻 Laptops & PCs</option>
                                <option value="Smart Security">🔒 Smart Security</option>
                                <option value="LED TVs & Ent.">📺 LED TVs & Ent.</option>
                                <option value="Home Appliances">🏠 Home Appliances</option>
                                <option value="Accessories">🔌 Accessories</option>
                            </select>
                        </div>
                        
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Item Condition *</label>
                            <select name="condition" value={formData.condition} onChange={handleInputChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-red-600 focus:bg-white focus:ring-4 focus:ring-red-600/10 cursor-pointer transition-all">
                                <option value="New">New / Brand New</option>
                                <option value="Open Box">Open Box</option>
                                <option value="Refurbished">Refurbished</option>
                                <option value="Used">Used</option>
                            </select>
                        </div>
                        
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Custom SKU</label>
                            <input 
                                type="text" name="sku" value={formData.sku} onChange={handleInputChange} 
                                placeholder="e.g. SAM-S24U-BLK"
                                className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-red-600 focus:bg-white focus:ring-4 focus:ring-red-600/10 transition-all" 
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* ================= 2. ITEM SPECIFICS ================= */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 hover:shadow-md transition-shadow">
                <h3 className="text-lg font-black text-gray-900 mb-6 border-b border-gray-50 pb-4 flex items-center gap-2">
                    <Cpu size={20} className="text-red-600" /> Item Specifics
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="md:col-span-1">
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Brand</label>
                        <select name="brandType" value={formData.brandType} onChange={handleInputChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-red-600 focus:bg-white focus:ring-4 focus:ring-red-600/10 mb-3 transition-all cursor-pointer">
                            <option value="no-brand">Unbranded / Generic</option>
                            <option value="branded">Branded</option>
                        </select>
                        {formData.brandType === 'branded' && (
                            <input type="text" name="brandName" value={formData.brandName} onChange={handleInputChange} placeholder="Brand Name" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-red-600 focus:bg-white focus:ring-4 focus:ring-red-600/10 transition-all" />
                        )}
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Model</label>
                        <input type="text" name="modelName" value={formData.modelName} onChange={handleInputChange} placeholder="e.g. Galaxy S24 Ultra" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-red-600 focus:bg-white focus:ring-4 focus:ring-red-600/10 transition-all" />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">MPN / Part No.</label>
                        <input type="text" name="mpn" value={formData.mpn} onChange={handleInputChange} placeholder="e.g. SM-S928B" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-red-600 focus:bg-white focus:ring-4 focus:ring-red-600/10 transition-all" />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Color</label>
                        <input type="text" name="color" value={formData.color} onChange={handleInputChange} placeholder="e.g. Titanium Black" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-red-600 focus:bg-white focus:ring-4 focus:ring-red-600/10 transition-all" />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Storage / RAM</label>
                        <input type="text" name="storage_ram" value={formData.storage_ram} onChange={handleInputChange} placeholder="e.g. 256GB ROM, 12GB RAM" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-red-600 focus:bg-white focus:ring-4 focus:ring-red-600/10 transition-all" />
                    </div>
                </div>

                {/* DYNAMIC CUSTOM SPECS */}
                <div className="bg-gray-50 p-5 rounded-2xl border border-gray-200">
                    <label className="block text-xs font-black text-gray-900 uppercase tracking-widest mb-4">Additional Custom Specifics (Dynamic)</label>
                    <div className="space-y-3">
                        {customSpecs.map((spec, idx) => (
                            <div key={idx} className="flex gap-2">
                                <input 
                                    type="text" placeholder="Name (e.g. Connectivity)" value={spec.name} onChange={(e) => handleCustomSpecChange(idx, 'name', e.target.value)}
                                    className="w-1/3 bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-red-600 transition-all" 
                                />
                                <input 
                                    type="text" placeholder="Value (e.g. 5G, Wi-Fi 7)" value={spec.value} onChange={(e) => handleCustomSpecChange(idx, 'value', e.target.value)}
                                    className="flex-1 bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-red-600 transition-all" 
                                />
                                {customSpecs.length > 1 && (
                                    <button type="button" onClick={() => removeCustomSpec(idx)} className="bg-white hover:bg-red-50 text-gray-400 hover:text-red-600 px-4 border border-gray-200 rounded-xl transition-colors">
                                        <Trash2 size={18} />
                                    </button>
                                )}
                            </div>
                        ))}
                        <button type="button" onClick={addCustomSpec} className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 mt-3 px-2">
                            <Plus size={14} /> Add Custom Spec
                        </button>
                    </div>
                </div>
            </div>

            {/* ================= 3. MEDIA GALLERY ================= */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 hover:shadow-md transition-shadow">
                <h3 className="text-lg font-black text-gray-900 mb-1 flex items-center gap-2"><Tag size={20} className="text-red-600" /> Media Gallery</h3>
                <p className="text-[11px] text-gray-500 mb-6 font-medium">Upload any size images seamlessly into the storefront template.</p>
                
                <div className="mb-8">
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Product Photos (Max 10)</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-4">
                        {productImages.length < 10 && (
                            <label className="border-2 border-dashed border-gray-300 rounded-2xl flex flex-col items-center justify-center p-4 h-36 cursor-pointer hover:border-red-600 hover:bg-red-50/30 transition-all group">
                                <UploadCloud size={28} className="text-gray-400 group-hover:text-red-600 mb-2 transition-colors" />
                                <span className="text-[10px] font-bold text-gray-500 text-center">Add Photo<br/>(Any Size)</span>
                                <input type="file" multiple accept="image/*" className="hidden" onChange={handleProductImageUpload} />
                            </label>
                        )}
                        {productImages.map((img, idx) => (
                            <div key={idx} className="relative h-36 bg-gray-50 rounded-2xl border border-gray-200 overflow-hidden group shadow-sm">
                                <img src={img.preview} alt="preview" className="w-full h-full object-cover" />
                                <button type="button" onClick={() => removeProductImage(idx)} className="absolute top-2 right-2 bg-red-600 text-white p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"><X size={14} /></button>
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Description Banners</label>
                    <div className="flex flex-wrap gap-4">
                        <label className="border-2 border-dashed border-gray-300 rounded-2xl flex flex-col items-center justify-center p-4 w-56 h-24 cursor-pointer hover:border-red-600 transition-colors bg-gray-50/50">
                            <span className="text-[10px] font-bold text-gray-500 flex flex-col items-center gap-1"><UploadCloud size={18}/> Add Banner (Any Size)</span>
                            <input type="file" multiple accept="image/*" className="hidden" onChange={handleDescImageUpload} />
                        </label>
                        {descImages.map((img, idx) => (
                            <div key={idx} className="relative w-56 h-24 bg-gray-50 rounded-2xl border border-gray-200 overflow-hidden group shadow-sm">
                                <img src={img.preview} alt="banner" className="w-full h-full object-cover" />
                                <button type="button" onClick={() => removeDescImage(idx)} className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity"><X size={12} /></button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ================= 4. DESCRIPTION & HIGHLIGHTS ================= */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 hover:shadow-md transition-shadow">
                <h3 className="text-lg font-black text-gray-900 mb-6 border-b border-gray-50 pb-4 flex items-center gap-2">
                    <AlignLeft size={20} className="text-red-600" /> Description & Features
                </h3>
                
                <div className="mb-6">
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Key Features (Bullet Points)</label>
                    <div className="space-y-3">
                        {bulletPoints.map((bullet, idx) => (
                            <div key={idx} className="flex gap-2">
                                <input type="text" value={bullet} onChange={(e) => handleBulletChange(idx, e.target.value)} placeholder="e.g. Snapdragon 8 Gen 3 Mobile Platform" className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-red-600 focus:bg-white focus:ring-4 focus:ring-red-600/10 transition-all" />
                                {bulletPoints.length > 1 && (
                                    <button type="button" onClick={() => removeBullet(idx)} className="bg-gray-100 hover:bg-red-50 text-gray-400 hover:text-red-600 px-4 rounded-xl transition-colors"><Trash2 size={18} /></button>
                                )}
                            </div>
                        ))}
                        <button type="button" onClick={addBullet} className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 mt-2 px-2">
                            <Plus size={14} /> Add new bullet point
                        </button>
                    </div>
                </div>

                <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Detailed Description</label>
                    <textarea 
                        name="descriptionText" value={formData.descriptionText} onChange={handleInputChange} 
                        placeholder="Write a comprehensive overview of the product..."
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-4 text-sm focus:outline-none focus:border-red-600 focus:bg-white focus:ring-4 focus:ring-red-600/10 transition-all leading-relaxed" rows="6"
                    ></textarea>
                </div>
            </div>

            {/* ================= 5. PRICING & SHIPPING ================= */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 hover:shadow-md transition-shadow">
                <h3 className="text-lg font-black text-gray-900 mb-6 border-b border-gray-50 pb-4 flex items-center gap-2">
                    <Truck size={20} className="text-red-600" /> Pricing & Shipping
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Retail Price *</label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-black text-sm">Rs</span>
                            <input type="number" name="price" value={formData.price} onChange={handleInputChange} required placeholder="0.00" className="w-full bg-gray-50 border border-gray-200 text-gray-900 font-bold rounded-xl pl-12 pr-4 py-3.5 text-sm focus:outline-none focus:border-red-600 focus:bg-white focus:ring-4 focus:ring-red-600/10 transition-all" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Stock Quantity *</label>
                        <div className="relative">
                            <Box size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input type="number" name="stock" value={formData.stock} onChange={handleInputChange} required placeholder="Inventory count" className="w-full bg-gray-50 border border-gray-200 text-gray-900 font-bold rounded-xl pl-10 pr-4 py-3.5 text-sm focus:outline-none focus:border-red-600 focus:bg-white focus:ring-4 focus:ring-red-600/10 transition-all" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Package Weight</label>
                        <input type="text" name="weight" value={formData.weight} onChange={handleInputChange} placeholder="e.g. 1.2 kg" className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-red-600 focus:bg-white focus:ring-4 focus:ring-red-600/10 transition-all" />
                    </div>
                </div>
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex justify-end gap-4 pt-4">
                <button type="submit" disabled={isSubmitting} className="w-full md:w-auto bg-[#111111] text-white font-bold px-12 py-4 rounded-xl hover:bg-red-600 transition-all shadow-xl hover:shadow-red-600/30 flex items-center justify-center gap-2 uppercase tracking-widest disabled:bg-gray-400 disabled:cursor-not-allowed">
                    {isSubmitting ? <Loader2 size={18} className="animate-spin" /> : <CheckCircle size={18} />} 
                    {isSubmitting ? 'Uploading to Database...' : 'List Item Now'}
                </button>
            </div>

        </form>
    );
}

export default AddProduct;