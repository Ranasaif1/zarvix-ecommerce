import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { ShoppingCart, Heart, Eye, Grid, List, ChevronDown, Star, LayoutGrid, Loader2 } from 'lucide-react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext'; // Context add kiya

function Shop() {
    const [view, setView] = useState('grid'); 
    const { categoryName } = useParams(); 
    const navigate = useNavigate(); 
    const { addToCart } = useContext(CartContext); // Cart function le liya

    // === REAL DATABASE STATES ===
    const [allProducts, setAllProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [sortBy, setSortBy] = useState('newest'); // Sorting state add kiya

    useEffect(() => {
        window.scrollTo(0, 0);
        fetchProducts();
    }, [categoryName]);

    // === FETCH REAL PRODUCTS FROM BACKEND ===
    const fetchProducts = () => {
        setIsLoading(true);
        axios.get('http://localhost:8000/api/products')
            .then(response => {
                setAllProducts(response.data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error("Error fetching products:", error);
                setIsLoading(false);
            });
    };

    // 1. FILTER LOGIC
    let displayedProducts = categoryName 
        ? allProducts.filter(product => {
            if (!product.category) return false;
            // Decode URI component taake "Laptops & PCs" jaise naam sahi match hon
            const decodedCategory = decodeURIComponent(categoryName).toLowerCase();
            return product.category.toLowerCase() === decodedCategory;
        })
        : [...allProducts];

    // 2. SORTING LOGIC (Naye products oopar)
    displayedProducts.sort((a, b) => {
        if (sortBy === 'newest') return b.id - a.id; 
        if (sortBy === 'price_asc') return Number(a.price) - Number(b.price);
        if (sortBy === 'price_desc') return Number(b.price) - Number(a.price);
        return 0;
    });

    // Dynamic Title Header ke liye
    const pageTitle = categoryName ? decodeURIComponent(categoryName).toUpperCase() : 'SHOP PRODUCTS';

    // Image helper: Pehli image nikalne ke liye
    const getPrimaryImage = (imgString) => {
        if (!imgString) return 'https://via.placeholder.com/500?text=No+Image';
        return imgString.split(',')[0];
    };

    return (
        <div className="bg-[#f4f5f7] min-h-screen pb-24" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            
            {/* --- 1. DARK HERO SECTION (Dynamic Title) --- */}
            <div className="bg-[#050505] pt-32 pb-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(220,38,38,0.12),transparent_70%)] pointer-events-none"></div>
                <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
                    <LayoutGrid className="mx-auto text-red-600 mb-6" size={56} strokeWidth={1.5} />
                    <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">{pageTitle}</h1>
                    <p className="text-red-500 font-bold tracking-[0.2em] uppercase text-xs">Explore Our Premium Tech Collection</p>
                </div>
            </div>

            {/* --- 2. MAIN E-COMMERCE WRAPPER --- */}
            <div className="max-w-350 mx-auto px-6 -mt-12 relative z-20">
                <div className="bg-white rounded-3xl shadow-[0_20px_50px_-10px_rgba(0,0,0,0.08)] p-6 md:p-10 flex flex-col lg:flex-row gap-10">
                    
                    {/* ================= LEFT SIDEBAR (FILTERS) ================= */}
                    <div className="w-full lg:w-1/4 shrink-0 space-y-8">
                        
                        {/* Categories List (Real Categories Added) */}
                        <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                            <h3 className="font-bold text-gray-900 mb-4 tracking-tight uppercase text-sm border-b border-gray-200 pb-3">Categories</h3>
                            <ul className="space-y-3 text-sm text-gray-600">
                                <li onClick={() => navigate('/shop')} className={`cursor-pointer hover:text-red-600 transition-colors ${!categoryName ? 'text-red-600 font-bold' : ''}`}>All Products</li>
                                <li onClick={() => navigate('/shop/Smartphones')} className={`cursor-pointer hover:text-red-600 transition-colors ${categoryName === 'Smartphones' ? 'text-red-600 font-bold' : ''}`}>Smartphones</li>
                                <li onClick={() => navigate('/shop/Laptops & PCs')} className={`cursor-pointer hover:text-red-600 transition-colors ${categoryName === 'Laptops & PCs' ? 'text-red-600 font-bold' : ''}`}>Laptops & PCs</li>
                                <li onClick={() => navigate('/shop/Smart Security')} className={`cursor-pointer hover:text-red-600 transition-colors ${categoryName === 'Smart Security' ? 'text-red-600 font-bold' : ''}`}>Smart Security</li>
                                <li onClick={() => navigate('/shop/LED TVs & Ent.')} className={`cursor-pointer hover:text-red-600 transition-colors ${categoryName === 'LED TVs & Ent.' ? 'text-red-600 font-bold' : ''}`}>LED TVs & Ent.</li>
                                <li onClick={() => navigate('/shop/Home Appliances')} className={`cursor-pointer hover:text-red-600 transition-colors ${categoryName === 'Home Appliances' ? 'text-red-600 font-bold' : ''}`}>Home Appliances</li>
                                <li onClick={() => navigate('/shop/Accessories')} className={`cursor-pointer hover:text-red-600 transition-colors ${categoryName === 'Accessories' ? 'text-red-600 font-bold' : ''}`}>Accessories</li>
                            </ul>
                        </div>

                        {/* Filter by Price (UI Only) */}
                        <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                            <h3 className="font-bold text-gray-900 mb-4 tracking-tight uppercase text-sm border-b border-gray-200 pb-3">Price</h3>
                            <div className="space-y-3 text-sm text-gray-600">
                                <label className="flex items-center gap-3 cursor-pointer hover:text-gray-900">
                                    <input type="checkbox" className="rounded text-red-600 focus:ring-red-500" />
                                    <span>Under Rs 10,000</span>
                                </label>
                                <label className="flex items-center gap-3 cursor-pointer hover:text-gray-900">
                                    <input type="checkbox" className="rounded text-red-600 focus:ring-red-500" />
                                    <span>Rs 10,000 - Rs 50,000</span>
                                </label>
                                <label className="flex items-center gap-3 cursor-pointer hover:text-gray-900">
                                    <input type="checkbox" className="rounded text-red-600 focus:ring-red-500" />
                                    <span>Rs 50,000 - Rs 100,000</span>
                                </label>
                                <label className="flex items-center gap-3 cursor-pointer hover:text-gray-900">
                                    <input type="checkbox" className="rounded text-red-600 focus:ring-red-500" />
                                    <span>Over Rs 100,000</span>
                                </label>
                            </div>
                        </div>

                        {/* Filter by Brand (UI Only) */}
                        <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                            <h3 className="font-bold text-gray-900 mb-4 tracking-tight uppercase text-sm border-b border-gray-200 pb-3">Brands</h3>
                            <div className="space-y-3 text-sm text-gray-600">
                                {['Apple', 'Samsung', 'Sony', 'Dell', 'HP', 'Dawlance'].map((brand, i) => (
                                    <label key={i} className="flex items-center justify-between cursor-pointer group">
                                        <div className="flex items-center gap-3">
                                            <input type="checkbox" className="rounded text-red-600 focus:ring-red-500" />
                                            <span className="group-hover:text-gray-900">{brand}</span>
                                        </div>
                                    </label>
                                ))}
                            </div>
                        </div>
                        
                        {/* Availability */}
                        <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                            <h3 className="font-bold text-gray-900 mb-4 tracking-tight uppercase text-sm border-b border-gray-200 pb-3">Availability</h3>
                            <div className="space-y-3 text-sm text-gray-600">
                                <label className="flex items-center gap-3 cursor-pointer hover:text-gray-900">
                                    <input type="checkbox" className="rounded text-red-600 focus:ring-red-500" defaultChecked />
                                    <span>In Stock</span>
                                </label>
                                <label className="flex items-center gap-3 cursor-pointer hover:text-gray-900">
                                    <input type="checkbox" className="rounded text-red-600 focus:ring-red-500" />
                                    <span>Out of Stock</span>
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* ================= RIGHT MAIN CONTENT ================= */}
                    <div className="w-full lg:w-3/4">
                        
                        {/* Top Category Description */}
                        <div className="mb-10">
                            <h2 className="text-2xl font-black text-gray-900 mb-3 tracking-tight">
                                {categoryName ? `Shop ${decodeURIComponent(categoryName)}` : 'Shop All Electronics'}
                            </h2>
                            <p className="text-gray-500 text-sm leading-relaxed font-light">
                                Discover the latest in technology with our wide range of premium electronics. From cutting-edge smartphones and powerful laptops to immersive audio gear and smart home essentials, Zarvix Digital brings you the best products from top global brands.
                            </p>
                        </div>

                        {/* Toolbar (Sort & View Toggle) */}
                        <div className="flex flex-wrap items-center justify-between bg-gray-50 p-4 rounded-xl border border-gray-100 mb-8 gap-4">
                            <div className="flex items-center gap-3">
                                <button onClick={() => setView('grid')} className={`p-2 rounded ${view === 'grid' ? 'bg-white shadow text-red-600' : 'text-gray-400 hover:text-gray-900'}`}>
                                    <Grid size={18} />
                                </button>
                                <button onClick={() => setView('list')} className={`p-2 rounded ${view === 'list' ? 'bg-white shadow text-red-600' : 'text-gray-400 hover:text-gray-900'}`}>
                                    <List size={18} />
                                </button>
                                <span className="text-sm text-gray-500 font-light hidden sm:block ml-2">Showing {displayedProducts.length} products.</span>
                            </div>
                            
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-500 font-medium">Sort by:</span>
                                <div className="relative">
                                    <select 
                                        value={sortBy}
                                        onChange={(e) => setSortBy(e.target.value)}
                                        className="appearance-none bg-white border border-gray-200 text-gray-700 text-sm rounded-lg pl-4 pr-10 py-2 focus:outline-none focus:border-red-500 shadow-sm cursor-pointer"
                                    >
                                        <option value="newest">Newest Arrivals</option>
                                        <option value="price_asc">Price, low to high</option>
                                        <option value="price_desc">Price, high to low</option>
                                    </select>
                                    <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                </div>
                            </div>
                        </div>

                        {/* PRODUCT GRID (Real Database Render) */}
                        {isLoading ? (
                            <div className="flex flex-col items-center justify-center py-20">
                                <Loader2 size={40} className="text-red-600 animate-spin mb-4" />
                                <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">Loading Live Inventory...</p>
                            </div>
                        ) : displayedProducts.length > 0 ? (
                            <div className={`grid gap-6 ${view === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
                                {displayedProducts.map((product) => (
                                    <div key={product.id} className={`bg-white border border-gray-100 rounded-2xl p-4 transition-all duration-300 hover:shadow-[0_15px_40px_rgba(0,0,0,0.06)] hover:-translate-y-1 group relative ${view === 'list' ? 'flex gap-6 items-center' : ''}`}>
                                        
                                        {/* Image Container */}
                                        <div className={`relative bg-gray-50 rounded-xl overflow-hidden mb-4 ${view === 'list' ? 'w-48 h-48 shrink-0 mb-0' : 'h-60'}`}>
                                            <img 
                                                src={getPrimaryImage(product.image_url)} 
                                                alt={product.name} 
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 mix-blend-multiply cursor-pointer" 
                                                onClick={() => navigate(`/product/${product.id}`)}
                                            />
                                            
                                            {/* Hover Action Buttons */}
                                            <div className={`absolute inset-0 bg-black/5 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none ${view === 'list' ? 'hidden' : ''}`}>
                                                <button className="w-10 h-10 bg-white text-gray-900 rounded-full flex items-center justify-center hover:bg-red-600 hover:text-white transition-colors shadow-lg transform translate-y-4 group-hover:translate-y-0 duration-300 delay-75 pointer-events-auto">
                                                    <Heart size={18} />
                                                </button>
                                                <Link to={`/product/${product.id}`} className="w-10 h-10 bg-white text-gray-900 rounded-full flex items-center justify-center hover:bg-red-600 hover:text-white transition-colors shadow-lg transform translate-y-4 group-hover:translate-y-0 duration-300 delay-100 pointer-events-auto">
                                                    <Eye size={18} />
                                                </Link>
                                            </div>
                                        </div>

                                        {/* Product Details */}
                                        <div className={`${view === 'list' ? 'flex-1' : ''}`}>
                                            <div className="text-xs text-gray-400 font-bold tracking-wider uppercase mb-1">{product.brandName && product.brandName !== 'No Brand' ? product.brandName : product.category}</div>
                                            <Link to={`/product/${product.id}`} className="block">
                                                <h3 className="text-sm font-bold text-gray-900 mb-2 leading-snug group-hover:text-red-600 transition-colors line-clamp-2">
                                                    {product.name}
                                                </h3>
                                            </Link>
                                            
                                            {/* Ratings */}
                                            <div className="flex items-center gap-1 mb-3">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star key={i} size={12} className={i < 5 ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200'} />
                                                ))}
                                                <span className="text-xs text-gray-400 ml-1">(0)</span>
                                            </div>

                                            {/* Price & Cart */}
                                            <div className="flex items-end justify-between mt-auto">
                                                <div>
                                                    {product.oldPrice && <span className="text-xs text-gray-400 line-through mr-2">Rs {Number(product.oldPrice).toLocaleString()}</span>}
                                                    <span className="text-lg font-black text-red-600">Rs {Number(product.price).toLocaleString()}</span>
                                                </div>
                                                <button 
                                                    onClick={(e) => { 
                                                        e.stopPropagation(); 
                                                        addToCart({...product, image: getPrimaryImage(product.image_url), quantity: 1}); 
                                                        alert('Added to cart! 🛒'); 
                                                    }}
                                                    className="w-9 h-9 bg-gray-100 text-gray-700 rounded-lg flex items-center justify-center hover:bg-black hover:text-white transition-colors z-10"
                                                >
                                                    <ShoppingCart size={16} />
                                                </button>
                                            </div>
                                            
                                            {/* Extra Description for List View */}
                                            {view === 'list' && (
                                                <p className="mt-4 text-sm text-gray-500 font-light line-clamp-2">
                                                    {product.description || `High-quality premium product from ${product.brandName || 'Zarvix'}. Designed to deliver the best performance and durability for your everyday tech needs.`}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20 bg-gray-50 rounded-2xl border border-gray-100">
                                <LayoutGrid size={48} className="mx-auto text-gray-300 mb-4" />
                                <h3 className="text-lg font-bold text-gray-900">No products found</h3>
                                <p className="text-sm text-gray-500 mt-2">Try selecting a different category from the sidebar or check back later.</p>
                                <button onClick={() => navigate('/shop')} className="mt-6 text-red-600 font-bold text-sm hover:underline">View All Products</button>
                            </div>
                        )}

                        {/* Bottom SEO / Content Area */}
                        <div className="border-t border-gray-100 pt-12 mt-16">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Enhance Your Digital Lifestyle</h3>
                            <p className="text-gray-500 text-sm font-light leading-relaxed mb-6">
                                In today's fast-paced world, having the right technology is essential. At Zarvix Digital, we provide a comprehensive selection of cutting-edge electronics. From the latest smartphones that keep you connected, to high-performance laptops designed for ultimate productivity. Experience unparalleled audio quality with our noise-canceling headphones, and capture life's moments with professional-grade cameras.
                            </p>
                            
                            <div className="grid md:grid-cols-2 gap-6 mb-6">
                                <div className="h-48 rounded-2xl overflow-hidden">
                                    <img src="https://images.unsplash.com/photo-1613040809024-b4ef7ba99bc3?auto=format&fit=crop&q=80&w=800" alt="Promo 1" className="w-full h-full object-cover" />
                                </div>
                                <div className="h-48 rounded-2xl overflow-hidden">
                                    <img src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=800" alt="Promo 2" className="w-full h-full object-cover" />
                                </div>
                            </div>

                            <p className="text-gray-500 text-sm font-light leading-relaxed mb-4">
                                Our commitment to quality ensures that every product you purchase meets the highest industry standards. 
                            </p>
                            <ul className="list-disc list-inside text-gray-500 text-sm font-light space-y-2 ml-2">
                                <li>All products are 100% genuine and sourced from official distributors.</li>
                                <li>Enjoy competitive pricing and exclusive online discounts.</li>
                                <li>Fast and secure nationwide delivery across Pakistan.</li>
                                <li>Dedicated 24/7 customer support to assist you with your orders.</li>
                            </ul>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Shop;