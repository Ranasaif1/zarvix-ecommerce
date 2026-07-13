import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Package, Search, Edit, Trash2, X, Box, CheckCircle, AlertTriangle, AlertCircle, Layers, Tag, RotateCcw, Loader2, ExternalLink } from 'lucide-react';

function AllProducts() {
    // State initialization empty array se ki hai taake `.filter` crash na ho
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    // === EDIT MODAL STATES ===
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [editForm, setEditForm] = useState(null);

    // Component load hotay hi products mangwao
    useEffect(() => {
        window.scrollTo(0, 0);
        fetchProducts();
    }, []);

    // === FETCH PRODUCTS (GET) ===
    const fetchProducts = () => {
        setIsLoading(true);
        // 🔥 FIX: Ab hum purane route ke bajaye direct apne VIP route se data mangwayenge
        axios.get('https://backend-phi-three-82.vercel.app/api/products')
            .then(response => {
                setProducts(Array.isArray(response.data) ? response.data : []);
                setIsLoading(false);
            })
            .catch(error => {
                console.error("Error fetching products:", error);
                setProducts([]);
                setIsLoading(false);
            });
    };

    // === DELETE PRODUCT (DELETE) ===
    const handleDelete = (id, name) => {
        const confirmDelete = window.confirm(`Kiya aap waqai "${name}" ko delete karna chahte hain? Yeh action wapas nahi ho sakta!`);
        if (confirmDelete) {
            axios.delete(`https://backend-phi-three-82.vercel.app/api/products/${id}`)
                .then(() => {
                    alert("Product deleted successfully! 🗑️");
                    fetchProducts(); 
                })
                .catch(error => {
                    console.error("Error deleting:", error);
                    alert("Delete karne mein masla hua. Backend check karein.");
                });
        }
    };

    // === OPEN EDIT MODAL ===
    const handleOpenEdit = (product) => {
        setSelectedProduct(product);
        // Poora product copy kar rahe hain taake update ke waqt images wagera delete na hon
        setEditForm({
            ...product,
            name: product.name || product.title || '',
            category: product.category || '',
            sku: product.sku || '',
            price: product.price || 0,
            stock: product.stock || 0
        });
        setIsEditModalOpen(true);
    };

    // === SUBMIT EDIT FORM (PUT) ===
    const handleEditSubmit = (e) => {
        e.preventDefault();
        
        // 🔥 FIX: Backend ko har angle se data bhej rahay hain taake koi ghalti na ho
        const payload = {
            name: editForm.name || editForm.title || '', 
            title: editForm.title || editForm.name || '',
            category: editForm.category || 'Uncategorized',
            sku: editForm.sku || 'N/A',
            price: Number(editForm.price),
            stock: Number(editForm.stock)
        };

        // Console mein check karne ke liye (Browser mein F12 daba kar dekh sakte hain)
        console.log("Frontend Bhej Raha Hai:", payload);
        axios.put(`https://backend-phi-three-82.vercel.app/api/products/${selectedProduct.id}`, payload)

            .then(response => {
                alert("Zabardast! Product mukammal update ho gaya! ✅");
                setIsEditModalOpen(false);
                fetchProducts(); 
            })
            .catch(error => {
                console.error("Error updating:", error);
                alert("Update karne mein masla hua. Backend terminal check karein.");
            });
    };

    // === SEARCH FILTER ===
    // Array check lazmi hai taake white screen error na aaye
    const filteredProducts = Array.isArray(products) ? products.filter(product => 
        (product.name || product.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (product.sku || '').toLowerCase().includes(searchTerm.toLowerCase())
    ) : [];

    return (
        <div className="space-y-8 animate-in fade-in duration-500 pb-12">
            
            {/* Header & Search */}
            <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.02)] border border-gray-100 p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h3 className="text-2xl font-black text-gray-900 tracking-tight flex items-center gap-3">
                        <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center">
                            <Package size={20} className="text-red-600" />
                        </div>
                        Inventory Management
                    </h3>
                    <p className="text-sm text-gray-500 mt-2 font-medium">Manage your stock, update pricing, categories, and view live products.</p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                    <div className="relative w-full sm:w-72 shrink-0">
                        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input 
                            type="text" 
                            placeholder="Search by name or SKU..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-gray-50 border border-gray-200 rounded-2xl pl-12 pr-4 py-3.5 text-sm font-medium focus:outline-none focus:border-red-600 focus:bg-white focus:ring-4 focus:ring-red-600/10 transition-all shadow-sm"
                        />
                    </div>
                    <button 
                        onClick={fetchProducts} 
                        className="bg-gray-900 hover:bg-red-600 text-white font-bold px-6 py-3.5 rounded-2xl text-sm transition-colors shadow-lg flex items-center justify-center gap-2 group"
                    >
                        <RotateCcw size={16} className="group-hover:rotate-180 transition-transform duration-500" /> Refresh
                    </button>
                </div>
            </div>

            {/* Products Table */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50/80 text-gray-500 uppercase tracking-widest text-[10px] font-black border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-5">Item & Details</th>
                                <th className="px-6 py-5">Category</th>
                                <th className="px-6 py-5">Price (PKR)</th>
                                <th className="px-6 py-5">Stock Status</th>
                                <th className="px-6 py-5 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {isLoading ? (
                                <tr>
                                    <td colSpan="5" className="px-6 py-20 text-center">
                                        <Loader2 className="animate-spin mx-auto mb-3 text-red-600" size={32} />
                                        <span className="text-gray-500 font-bold tracking-widest uppercase text-xs">Syncing Inventory...</span>
                                    </td>
                                </tr>
                            ) : filteredProducts.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="px-6 py-20 text-center">
                                        <Box className="mx-auto mb-3 text-gray-300" size={48} />
                                        <h3 className="text-gray-900 font-black text-lg mb-1">No Products Found</h3>
                                        <p className="text-gray-500">Modify your search or add a new listing to your store.</p>
                                    </td>
                                </tr>
                            ) : (
                                filteredProducts.map((product, i) => {
                                    const stockNum = Number(product.stock);
                                    return (
                                        <tr key={product.id || i} className="hover:bg-gray-50/50 transition-colors group">
                                            
                                            {/* Image, Title & SKU */}
                                            <td className="px-6 py-4 flex items-center gap-4">
                                                <div className="w-16 h-16 bg-white rounded-2xl border border-gray-100 overflow-hidden flex items-center justify-center shrink-0 shadow-sm p-1">
                                                    {product.image_url ? (
                                                        <img src={product.image_url.split(',')[0]} alt={product.name} className="w-full h-full object-contain mix-blend-multiply" />
                                                    ) : (
                                                        <Box size={24} className="text-gray-300" />
                                                    )}
                                                </div>
                                                <div>
                                                    <div className="font-bold text-gray-900 line-clamp-1 max-w-50 md:max-w-xs mb-1">
                                                        {product.name || product.title}
                                                    </div>
                                                    <div className="text-[10px] text-gray-400 font-black uppercase tracking-widest bg-gray-100 inline-block px-2 py-0.5 rounded">
                                                        SKU: {product.sku || 'N/A'}
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Category */}
                                            <td className="px-6 py-4">
                                                <span className="text-gray-600 font-medium">
                                                    {product.category || 'Uncategorized'}
                                                </span>
                                            </td>

                                            {/* Price in PKR */}
                                            <td className="px-6 py-4 font-black text-gray-900 text-base">
                                                Rs {Number(product.price).toLocaleString()}
                                            </td>

                                            {/* Stock Status Badges */}
                                            <td className="px-6 py-4">
                                                {stockNum === 0 ? (
                                                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider text-red-700 bg-red-50 border border-red-100">
                                                        <AlertCircle size={12} /> Out of Stock
                                                    </span>
                                                ) : stockNum < 10 ? (
                                                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider text-orange-700 bg-orange-50 border border-orange-100">
                                                        <AlertTriangle size={12} /> Low Stock ({stockNum})
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider text-green-700 bg-green-50 border border-green-100">
                                                        <CheckCircle size={12} /> In Stock ({stockNum})
                                                    </span>
                                                )}
                                            </td>

                                            {/* Actions */}
                                            <td className="px-6 py-4 text-center">
                                                <div className="flex justify-center items-center gap-2">
                                                    <button 
                                                        onClick={() => handleOpenEdit(product)}
                                                        className="w-10 h-10 bg-white text-blue-600 rounded-xl flex items-center justify-center hover:bg-blue-50 transition-colors border border-gray-200 shadow-sm"
                                                        title="Quick Edit Stock & Price"
                                                    >
                                                        <Edit size={16} />
                                                    </button>
                                                    <Link 
                                                        to={`/product/${product.id}`}
                                                        className="w-10 h-10 bg-gray-900 text-white rounded-xl flex items-center justify-center hover:bg-red-600 transition-colors shadow-sm"
                                                        title="View Live Product"
                                                    >
                                                        <ExternalLink size={16} />
                                                    </Link>
                                                    <button 
                                                        onClick={() => handleDelete(product.id, product.name || product.title)}
                                                        className="w-10 h-10 bg-white text-red-600 rounded-xl flex items-center justify-center hover:bg-red-50 transition-colors border border-gray-200 shadow-sm"
                                                        title="Delete Listing"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* ================= ADVANCED QUICK EDIT MODAL ================= */}
            {isEditModalOpen && editForm && selectedProduct && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 w-full max-w-xl overflow-hidden animate-in zoom-in-95 duration-200">
                        
                        {/* Modal Header */}
                        <div className="flex justify-between items-center p-6 md:p-8 border-b border-gray-50 bg-gray-50/50">
                            <div>
                                <h3 className="text-2xl font-black text-gray-900 tracking-tight">Quick Edit</h3>
                                <p className="text-xs font-bold text-gray-500 mt-1 uppercase tracking-widest">{selectedProduct.sku}</p>
                            </div>
                            <button onClick={() => setIsEditModalOpen(false)} className="w-10 h-10 flex items-center justify-center bg-white border border-gray-200 rounded-full text-gray-400 hover:text-red-600 hover:border-red-200 transition-colors shadow-sm">
                                <X size={18} />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <form onSubmit={handleEditSubmit} className="p-6 md:p-8 space-y-6">
                            
                            {/* Title */}
                            <div>
                                <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest mb-2">Product Name</label>
                                <input 
                                    type="text" 
                                    required
                                    value={editForm.name}
                                    onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                                    className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-4 text-sm font-bold text-gray-900 focus:outline-none focus:border-gray-900 focus:bg-white transition-all shadow-sm" 
                                />
                            </div>

                            {/* Category & SKU Grid */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="flex items-center gap-1 text-[11px] font-black text-gray-400 uppercase tracking-widest mb-2"><Layers size={14}/> Category</label>
                                    <select 
                                        value={editForm.category}
                                        onChange={(e) => setEditForm({...editForm, category: e.target.value})}
                                        className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-4 text-sm font-bold text-gray-900 focus:outline-none focus:border-gray-900 focus:bg-white cursor-pointer transition-all shadow-sm"
                                    >
                                        <option value="" disabled>Select Category</option>
                                        <option value="Smartphones">Smartphones</option>
                                        <option value="Laptops & PCs">Laptops & PCs</option>
                                        <option value="Smartwatches">Smartwatches</option>
                                        <option value="Audio & Headphones">Audio & Headphones</option>
                                        <option value="LED TVs & Ent.">LED TVs & Ent.</option>
                                        <option value="Home Appliances">Home Appliances</option>
                                        <option value="Accessories">Accessories</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="flex items-center gap-1 text-[11px] font-black text-gray-400 uppercase tracking-widest mb-2"><Tag size={14}/> SKU</label>
                                    <input 
                                        type="text" 
                                        value={editForm.sku}
                                        onChange={(e) => setEditForm({...editForm, sku: e.target.value})}
                                        className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-4 text-sm font-bold text-gray-900 focus:outline-none focus:border-gray-900 focus:bg-white transition-all shadow-sm" 
                                    />
                                </div>
                            </div>

                            {/* Price & Stock Grid */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest mb-2">Price (PKR)</label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-black text-sm">Rs</span>
                                        <input 
                                            type="number" 
                                            required
                                            value={editForm.price}
                                            onChange={(e) => setEditForm({...editForm, price: e.target.value})}
                                            className="w-full bg-gray-50 border border-gray-200 rounded-2xl pl-12 pr-4 py-4 text-sm font-black text-gray-900 focus:outline-none focus:border-red-600 focus:bg-white transition-all shadow-sm" 
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest mb-2">Stock Level</label>
                                    <input 
                                        type="number" 
                                        required
                                        value={editForm.stock}
                                        onChange={(e) => setEditForm({...editForm, stock: e.target.value})}
                                        className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-4 text-sm font-black text-blue-600 focus:outline-none focus:border-blue-600 focus:bg-white transition-all shadow-sm" 
                                    />
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-4 pt-6">
                                <button type="button" onClick={() => setIsEditModalOpen(false)} className="flex-1 bg-white border-2 border-gray-200 text-gray-600 font-black py-4 rounded-2xl hover:border-gray-900 hover:text-gray-900 transition-colors text-xs uppercase tracking-widest">
                                    Cancel
                                </button>
                                <button type="submit" className="flex-1 bg-gray-900 text-white font-black py-4 rounded-2xl hover:bg-red-600 transition-colors shadow-lg flex items-center justify-center gap-2 text-xs uppercase tracking-widest">
                                    <CheckCircle size={18} /> Save Update
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

        </div>
    );
}

export default AllProducts;