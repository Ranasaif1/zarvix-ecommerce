import React, { useState, useEffect, useContext, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ShoppingCart, Heart, Share2, Star, Minus, Plus, Truck, ShieldCheck, RotateCcw, Zap, Loader2 } from 'lucide-react';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';

function ProductDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useContext(CartContext);
    const { user } = useContext(AuthContext);
    const reviewsRef = useRef(null);

    // === STATES ===
    const [product, setProduct] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('description');
    const [quantity, setQuantity] = useState(1);
    
    // Variants
    const [selectedColor, setSelectedColor] = useState('');
    const [selectedSize, setSelectedSize] = useState('');
    const [mainImage, setMainImage] = useState('');

    // Zoom
    const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
    const [isZoomed, setIsZoomed] = useState(false);

    // Wishlist
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [isWishlistLoading, setIsWishlistLoading] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
        fetchProductDetails();
        if (user) {
            checkWishlistStatus();
        }
    }, [id, user]);

    // === FETCH PRODUCT DETAILS ===
    const fetchProductDetails = () => {
        setIsLoading(true);
        axios.get(`http://localhost:8000/api/products/${id}`)
            .then(response => {
                const data = response.data;
                setProduct(data);
                
                const imagesArray = data.image_url ? data.image_url.split(',') : [];
                setMainImage(imagesArray.length > 0 ? imagesArray[0] : 'https://via.placeholder.com/600?text=No+Image');
                
                if (data.color) setSelectedColor(data.color.split(',')[0].trim()); 
                if (data.storage_ram) setSelectedSize(data.storage_ram.split(',')[0].trim()); 
                
                // Fetch Related Products
                axios.get(`http://localhost:8000/api/products`)
                    .then(res => {
                        const allProds = res.data;
                        const related = allProds.filter(p => p.category === data.category && p.id !== data.id).slice(0, 4);
                        setRelatedProducts(related);
                        setIsLoading(false);
                    });
            })
            .catch(error => {
                console.error("Error fetching product:", error);
                setIsLoading(false);
            });
    };

    // === WISHLIST LOGIC ===
    const checkWishlistStatus = () => {
        axios.get(`http://localhost:8000/api/users/${user.id}/wishlist`)
            .then(response => {
                const inWishlist = response.data.some(item => item.product_id === parseInt(id));
                setIsWishlisted(inWishlist);
            })
            .catch(err => console.error("Error checking wishlist:", err));
    };

    const handleWishlistToggle = () => {
        if (!user) {
            alert("Please sign in to add items to your wishlist.");
            navigate('/signin');
            return;
        }

        setIsWishlistLoading(true);

        if (isWishlisted) {
            axios.delete(`http://localhost:8000/api/users/${user.id}/wishlist/${id}`)
                .then(() => {
                    setIsWishlisted(false);
                    setIsWishlistLoading(false);
                })
                .catch(err => {
                    console.error("Error removing from wishlist:", err);
                    setIsWishlistLoading(false);
                });
        } else {
            axios.post(`http://localhost:8000/api/users/${user.id}/wishlist`, { product_id: parseInt(id) })
                .then(() => {
                    setIsWishlisted(true);
                    setIsWishlistLoading(false);
                })
                .catch(err => {
                    console.error("Error adding to wishlist:", err);
                    setIsWishlistLoading(false);
                });
        }
    };

    // === ACTIONS ===
    const handleAddToCart = () => {
        if (!product) return;
        const cartItem = {
            id: product.id,
            name: product.name || product.title,
            price: Number(product.price),
            image: mainImage,
            quantity: quantity,
            color: selectedColor,
            size: selectedSize
        };
        addToCart(cartItem);
        alert(`${quantity}x ${product.name} added to cart! 🛒`);
    };

    const handleBuyNow = () => {
        handleAddToCart();
        navigate('/cart');
    };

    const scrollToReviews = () => {
        setActiveTab('reviews');
        reviewsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    const handleMouseMove = (e) => {
        const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - left) / width) * 100;
        const y = ((e.clientY - top) / height) * 100;
        setZoomPos({ x, y });
    };

    const getBulletPoints = () => {
        if (!product?.bulletPoints) return [];
        try {
            const parsed = JSON.parse(product.bulletPoints);
            return Array.isArray(parsed) ? parsed : [product.bulletPoints];
        } catch {
            return product.bulletPoints.split(',').filter(b => b.trim() !== '');
        }
    };

    const bulletPointsList = getBulletPoints();
    const imagesList = product?.image_url ? product.image_url.split(',') : [];

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] bg-[#fcfcfc]">
                <Loader2 size={40} className="text-gray-900 animate-spin mb-4" />
                <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">Loading Product Details...</p>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] bg-[#fcfcfc] text-center px-4">
                <h2 className="text-2xl font-black text-gray-900 mb-2">Product Not Found</h2>
                <p className="text-gray-500 mb-6">The product you are looking for does not exist or has been removed.</p>
                <Link to="/shop" className="bg-gray-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-red-600 transition-colors">Go Back to Shop</Link>
            </div>
        );
    }

    return (
        <div className="bg-[#fcfcfc] min-h-screen pt-6 pb-16" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            <div className="max-w-350 mx-auto px-4 md:px-6">
                
                {/* 1. BREADCRUMBS */}
                <div className="pb-8 flex flex-wrap items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-gray-400">
                    <Link to="/" className="hover:text-gray-900 transition-colors">Home</Link>
                    <span>/</span>
                    <Link to="/shop" className="hover:text-gray-900 transition-colors">Shop</Link>
                    {product.category && (
                        <>
                            <span>/</span>
                            <Link to={`/shop/${product.category}`} className="hover:text-gray-900 transition-colors">{product.category}</Link>
                        </>
                    )}
                    <span>/</span>
                    <span className="text-gray-900 line-clamp-1">{product.name || product.title}</span>
                </div>

                {/* 2. TOP SECTION: Image & Details */}
                <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.02)] border border-gray-100 p-6 md:p-10 mb-8">
                    
                    <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
                        
                        {/* LEFT: Image Gallery (Sticky on scroll) */}
                        <div className="flex flex-col gap-4 lg:sticky lg:top-8">
                            
                            {/* Main Image with Zoom Container */}
                            <div 
                                className="w-full h-87.5 md:h-137.5 bg-gray-50/80 rounded-3xl p-6 border border-gray-100 flex items-center justify-center relative overflow-hidden cursor-crosshair group"
                                onMouseEnter={() => setIsZoomed(true)}
                                onMouseLeave={() => setIsZoomed(false)}
                                onMouseMove={handleMouseMove}
                            >
                                {/* Floating Actions Inside Image */}
                                <div className="absolute top-4 right-4 flex flex-col gap-3 z-10">
                                    <button 
                                        onClick={handleWishlistToggle}
                                        disabled={isWishlistLoading}
                                        className={`w-12 h-12 rounded-full flex items-center justify-center shadow-md border border-gray-100 transition-transform hover:scale-110 ${isWishlisted ? 'bg-red-50 text-red-600 border-red-100' : 'bg-white text-gray-400 hover:text-red-600'}`}
                                        title="Add to Wishlist"
                                    >
                                        {isWishlistLoading ? <Loader2 size={18} className="animate-spin" /> : <Heart size={18} fill={isWishlisted ? "currentColor" : "none"} className={isWishlisted ? "text-red-600" : ""} />}
                                    </button>
                                    <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-gray-400 hover:text-gray-900 shadow-md border border-gray-100 transition-transform hover:scale-110" title="Share Product">
                                        <Share2 size={18} />
                                    </button>
                                </div>

                                <img 
                                    src={mainImage} 
                                    alt={product.name} 
                                    className={`max-w-full max-h-full object-contain mix-blend-multiply transition-opacity duration-200 ${isZoomed ? 'opacity-0' : 'opacity-100'}`} 
                                />
                                
                                {/* Zoom Lens Layer */}
                                {isZoomed && (
                                    <div 
                                        className="absolute inset-0 bg-white pointer-events-none rounded-3xl hidden md:block"
                                        style={{
                                            backgroundImage: `url(${mainImage})`,
                                            backgroundPosition: `${zoomPos.x}% ${zoomPos.y}%`,
                                            backgroundSize: '250%',
                                            backgroundRepeat: 'no-repeat'
                                        }}
                                    />
                                )}
                            </div>

                            {/* Thumbnails */}
                            {imagesList.length > 1 && (
                                <div className="flex gap-4 overflow-x-auto py-2 hide-scrollbar">
                                    {imagesList.map((img, idx) => (
                                        <div 
                                            key={idx} 
                                            onMouseEnter={() => setMainImage(img)}
                                            onClick={() => setMainImage(img)}
                                            className={`w-20 h-20 rounded-2xl border-2 shrink-0 cursor-pointer overflow-hidden transition-all duration-300 ${mainImage === img ? 'border-gray-900 shadow-md scale-105' : 'border-gray-100 hover:border-gray-400'}`}
                                        >
                                            <img src={img} alt={`Thumb ${idx}`} className="w-full h-full object-cover mix-blend-multiply" />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* RIGHT: Product Info */}
                        <div className="flex flex-col">
                            {product.brandName && product.brandName !== 'No Brand' && (
                                <div className="inline-block bg-gray-100 text-gray-600 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg mb-4 w-max">
                                    {product.brandName}
                                </div>
                            )}
                            <h1 className="text-3xl md:text-4xl font-black text-gray-900 leading-tight mb-4">{product.name || product.title}</h1>
                            
                            <div className="flex items-center gap-4 mb-6">
                                <div className="flex items-center gap-1">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
                                    ))}
                                </div>
                                <button onClick={scrollToReviews} className="text-sm text-gray-400 hover:text-gray-900 font-bold border-l border-gray-200 pl-4 transition-colors">
                                    Write the first review
                                </button>
                            </div>

                            {/* Price & Stock */}
                            <div className="flex flex-wrap items-end justify-between gap-4 mb-8 bg-gray-50/50 p-6 rounded-2xl border border-gray-100">
                                <div>
                                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-2">Total Price</p>
                                    <div className="flex items-end gap-3">
                                        <span className="text-4xl font-black text-gray-900 leading-none">Rs {Number(product.price).toLocaleString()}</span>
                                        {product.oldPrice && <span className="text-lg text-gray-400 line-through mb-1">Rs {Number(product.oldPrice).toLocaleString()}</span>}
                                    </div>
                                </div>
                                <div className={`flex items-center gap-2 px-4 py-2 rounded-xl border ${Number(product.stock) > 0 ? 'bg-green-50/50 border-green-100 text-green-700' : 'bg-red-50/50 border-red-100 text-red-700'}`}>
                                    <span className="relative flex h-2 w-2">
                                      <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${Number(product.stock) > 0 ? 'bg-green-400' : 'bg-red-400'}`}></span>
                                      <span className={`relative inline-flex rounded-full h-2 w-2 ${Number(product.stock) > 0 ? 'bg-green-500' : 'bg-red-500'}`}></span>
                                    </span>
                                    <span className="text-xs font-black uppercase tracking-wider">
                                        {Number(product.stock) > 0 ? `${product.stock} In Stock` : 'Out of Stock'}
                                    </span>
                                </div>
                            </div>

                            {/* Bullet Points */}
                            {bulletPointsList.length > 0 && (
                                <div className="mb-10 pb-8">
                                    <h4 className="text-[11px] font-black text-gray-400 mb-4 uppercase tracking-widest">Key Features</h4>
                                    <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-4 text-sm text-gray-700 font-medium">
                                        {bulletPointsList.map((point, index) => (
                                            <li key={index} className="flex items-start gap-3">
                                                <div className="mt-0.5 bg-gray-100 rounded-full p-1"><ShieldCheck size={14} className="text-gray-900" /></div>
                                                <span className="leading-relaxed">{point}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* --- PREMIUM ACTIONS --- */}
                            <div className="flex flex-col sm:flex-row gap-4 mb-8">
                                
                                {/* Quantity Selector */}
                                <div className="flex items-center justify-between bg-white border border-gray-200 rounded-xl px-4 h-14 w-full sm:w-36 shrink-0 transition-all hover:border-gray-900 focus-within:border-gray-900 shadow-sm">
                                    <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="text-gray-400 hover:text-gray-900 transition-colors p-1"><Minus size={18} /></button>
                                    <input type="number" value={quantity} readOnly className="w-12 text-center bg-transparent font-black text-gray-900 outline-none text-lg" />
                                    <button onClick={() => setQuantity(q => Math.min(product.stock, q + 1))} className="text-gray-400 hover:text-gray-900 transition-colors p-1"><Plus size={18} /></button>
                                </div>
                                
                                {/* Add to Cart */}
                                <button 
                                    onClick={handleAddToCart}
                                    disabled={Number(product.stock) === 0}
                                    className="flex-1 bg-white border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white h-14 rounded-xl font-black uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 text-xs disabled:opacity-50 disabled:cursor-not-allowed group shadow-sm"
                                >
                                    <ShoppingCart size={18} className="group-hover:-translate-y-0.5 transition-transform" /> Add to Cart
                                </button>
                                
                                {/* Buy Now - Ultra Premium Solid Color */}
                                <button 
                                    onClick={handleBuyNow}
                                    disabled={Number(product.stock) === 0}
                                    className="flex-1 bg-red-600 hover:bg-black text-white h-14 rounded-xl font-black uppercase tracking-widest transition-all duration-300 shadow-[0_8px_20px_-6px_rgba(220,38,38,0.5)] hover:shadow-[0_8px_20px_-6px_rgba(0,0,0,0.5)] flex items-center justify-center gap-2 text-xs disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <Zap size={18} /> Buy Now
                                </button>
                            </div>

                            {/* Trust Badges */}
                            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-gray-100">
                                <div className="flex items-center gap-4 text-gray-700 p-4 rounded-2xl bg-gray-50/50 border border-gray-100">
                                    <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center shrink-0 border border-gray-100">
                                        <Truck size={18} className="text-gray-900" />
                                    </div>
                                    <span className="text-xs font-black uppercase tracking-wider leading-tight">Fast<br/>Delivery</span>
                                </div>
                                <div className="flex items-center gap-4 text-gray-700 p-4 rounded-2xl bg-gray-50/50 border border-gray-100">
                                    <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center shrink-0 border border-gray-100">
                                        <RotateCcw size={18} className="text-gray-900" />
                                    </div>
                                    <span className="text-xs font-black uppercase tracking-wider leading-tight">7 Days<br/>Return</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 3. MIDDLE SECTION: Tabs (Anchored with reviewsRef) */}
                <div ref={reviewsRef} className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden mb-12 scroll-mt-32">
                    <div className="flex flex-wrap border-b border-gray-100 bg-gray-50/30">
                        {['description', 'specifications', 'reviews'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`flex-1 min-w-30 py-5 text-xs font-black uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-white text-red-600 shadow-sm border border-gray-100' : 'text-gray-400 hover:text-gray-900 hover:bg-white/60'}`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    <div className="p-6 md:p-12 min-h-75">
                        {/* Premium Description Formatting */}
                        {activeTab === 'description' && (
                            <div className="max-w-4xl mx-auto">
                                <h3 className="text-2xl font-black text-gray-900 mb-8 text-center">Product Overview</h3>
                                <div className="prose prose-gray max-w-none text-gray-600 leading-loose text-justify text-sm md:text-base">
                                    {product.description ? (
                                        product.description.split('\n').map((paragraph, idx) => (
                                            <p key={idx} className="mb-6">{paragraph}</p>
                                        ))
                                    ) : (
                                        <p className="italic text-gray-400 text-center">No detailed description available for this product yet.</p>
                                    )}
                                </div>
                            </div>
                        )}

                        {activeTab === 'specifications' && (
                            <div className="max-w-4xl mx-auto">
                                <h3 className="text-2xl font-black text-gray-900 mb-8 text-center">Technical Specifications</h3>
                                <div className="border border-gray-100 rounded-3xl overflow-hidden shadow-sm">
                                    <table className="w-full text-sm text-left">
                                        <tbody className="divide-y divide-gray-100">
                                            {product.brandName && product.brandName !== "No Brand" && (
                                                <tr className="hover:bg-gray-50 transition-colors">
                                                    <th className="py-5 px-8 font-black text-gray-900 bg-gray-50/80 w-1/3 border-r border-gray-100">Brand</th>
                                                    <td className="py-5 px-8 text-gray-700 font-medium">{product.brandName}</td>
                                                </tr>
                                            )}
                                            {product.sku && (
                                                <tr className="hover:bg-gray-50 transition-colors">
                                                    <th className="py-5 px-8 font-black text-gray-900 bg-gray-50/80 border-r border-gray-100">SKU / Model</th>
                                                    <td className="py-5 px-8 text-gray-700 font-medium">{product.sku}</td>
                                                </tr>
                                            )}
                                            {product.condition && (
                                                <tr className="hover:bg-gray-50 transition-colors">
                                                    <th className="py-5 px-8 font-black text-gray-900 bg-gray-50/80 border-r border-gray-100">Condition</th>
                                                    <td className="py-5 px-8 text-gray-700 font-medium">{product.condition}</td>
                                                </tr>
                                            )}
                                            
                                            {/* Moved Color and Specs here as per your requirement */}
                                            {product.color && (
                                                <tr className="hover:bg-gray-50 transition-colors border-t border-gray-100">
                                                    <th className="py-5 px-8 font-black text-gray-900 bg-gray-50/80 border-r border-gray-100">Color</th>
                                                    <td className="py-5 px-8">
                                                        <div className="flex flex-wrap gap-2">
                                                            {product.color.split(',').map((c, i) => {
                                                                const colorName = c.trim();
                                                                return (
                                                                    <button 
                                                                        key={i} 
                                                                        onClick={() => setSelectedColor(colorName)}
                                                                        className={`px-4 py-2 text-xs font-bold rounded-xl border-2 transition-all duration-300 ${selectedColor === colorName ? 'bg-gray-900 text-white border-gray-900 shadow-md' : 'bg-white text-gray-600 border-gray-200 hover:border-gray-900'}`}
                                                                    >
                                                                        {colorName}
                                                                    </button>
                                                                )
                                                            })}
                                                        </div>
                                                    </td>
                                                </tr>
                                            )}
                                            {product.storage_ram && (
                                                <tr className="hover:bg-gray-50 transition-colors border-t border-gray-100">
                                                    <th className="py-5 px-8 font-black text-gray-900 bg-gray-50/80 border-r border-gray-100">Specification</th>
                                                    <td className="py-5 px-8">
                                                        <div className="flex flex-wrap gap-2">
                                                            {product.storage_ram.split(',').map((size, i) => {
                                                                const sizeVal = size.trim();
                                                                return (
                                                                    <button 
                                                                        key={i}
                                                                        onClick={() => setSelectedSize(sizeVal)}
                                                                        className={`px-4 py-2 text-xs font-bold rounded-xl border-2 transition-all duration-300 ${selectedSize === sizeVal ? 'bg-gray-900 text-white border-gray-900 shadow-md' : 'bg-white text-gray-600 border-gray-200 hover:border-gray-900'}`}
                                                                    >
                                                                        {sizeVal}
                                                                    </button>
                                                                )
                                                            })}
                                                        </div>
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}

                        {activeTab === 'reviews' && (
                            <div className="text-center py-12 max-w-lg mx-auto">
                                <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 border border-gray-100">
                                    <Star size={40} className="text-gray-300 fill-gray-100" />
                                </div>
                                <h3 className="text-2xl text-gray-900 font-black mb-3">No Reviews Yet</h3>
                                <p className="text-gray-500 mb-8 leading-relaxed text-sm">Be the first to review this product after purchase. Your feedback helps other shoppers make better decisions.</p>
                                <button className="bg-white border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white px-8 py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all">Write a Review</button>
                            </div>
                        )}
                    </div>
                </div>

                {/* 4. REAL RELATED PRODUCTS SECTION */}
                {relatedProducts.length > 0 && (
                    <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.02)] p-6 md:p-10 border border-gray-100">
                        <div className="mb-8 flex items-center justify-between">
                            <h2 className="text-2xl font-black text-gray-900 tracking-tight">You might also like</h2>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {relatedProducts.map((item) => {
                                const itemImg = item.image_url ? item.image_url.split(',')[0] : 'https://via.placeholder.com/600?text=No+Image';
                                return (
                                    <Link to={`/product/${item.id}`} key={item.id} className="bg-white border border-gray-100 rounded-3xl p-5 transition-all duration-300 hover:shadow-xl hover:border-gray-200 group block">
                                        <div className="relative bg-gray-50/80 rounded-2xl overflow-hidden mb-5 aspect-square flex items-center justify-center border border-gray-100">
                                            <img src={itemImg} alt={item.name} className="w-4/5 h-4/5 object-contain group-hover:scale-110 transition-transform duration-500 mix-blend-multiply" />
                                        </div>
                                        <div>
                                            <div className="text-[10px] text-gray-400 uppercase tracking-widest mb-2 font-black">{item.brandName || 'Zarvix'}</div>
                                            <h3 className="text-sm font-bold text-gray-900 group-hover:text-red-600 line-clamp-2 leading-snug mb-3 transition-colors">{item.name}</h3>
                                            <div className="flex items-center gap-1 mb-4">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star key={i} size={12} className={i < 5 ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200'} />
                                                ))}
                                            </div>
                                            <div className="flex items-end justify-between">
                                                <span className="text-lg font-black text-gray-900">Rs {Number(item.price).toLocaleString()}</span>
                                            </div>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}

export default ProductDetail;