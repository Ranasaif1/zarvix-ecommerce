import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import { Heart, ArrowLeft, ShoppingCart, Trash2, HeartCrack, Star, Loader2 } from 'lucide-react';

function Wishlist() {
    const { user } = useContext(AuthContext);
    const { addToCart } = useContext(CartContext);
    const navigate = useNavigate();

    // === REAL DATABASE STATE ===
    const [wishlist, setWishlist] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);
        if (!user) {
            navigate('/signin');
            return;
        }

        fetchWishlist();
    }, [user, navigate]);

    // Backend se Wishlist Data Mangwana
    const fetchWishlist = () => {
        setIsLoading(true);
        axios.get(`https://backend-phi-three-82.vercel.app/api/users/${user.id}/wishlist`)
            .then(response => {
                setWishlist(response.data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error("Error fetching wishlist:", error);
                setIsLoading(false);
            });
    };

    // Database se item delete karna
    const removeFromWishlist = (productId) => {
        // UI se fauran hatane ke liye (Optimistic Update)
        setWishlist(wishlist.filter(item => item.id !== productId));

        // Backend API call delete karne ke liye
        axios.delete(`https://backend-phi-three-82.vercel.app/api/users/${user.id}/wishlist/${productId}`)
            .catch(error => {
                console.error("Error removing from wishlist:", error);
                fetchWishlist(); // Agar error aaye tou wapas purana data load karlo
            });
    };

    // Item ko Cart mein bhejna
    const handleMoveToCart = (item) => {
        const primaryImage = item.image_url ? item.image_url.split(',')[0] : 'https://via.placeholder.com/500?text=No+Image';
        
        addToCart({ ...item, image: primaryImage, quantity: 1 });
        removeFromWishlist(item.id); // Cart mein gaya tou Wishlist se delete kardo
        alert('Item moved to Cart! 🛒');
    };

    // Image helper function
    const getPrimaryImage = (imgString) => {
        if (!imgString) return 'https://via.placeholder.com/500?text=No+Image';
        return imgString.split(',')[0];
    };

    if (isLoading) {
        return <div className="min-h-screen flex justify-center items-center bg-[#f4f5f7]"><Loader2 className="animate-spin text-red-600" size={40} /></div>;
    }

    return (
        <div className="bg-[#f4f5f7] min-h-screen py-16 px-4 font-sans text-gray-900">
            <div className="max-w-6xl mx-auto">
                
                {/* Header Section */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
                    <div className="flex items-center gap-4">
                        <Link to="/profile" className="w-10 h-10 bg-white border border-gray-200 rounded-xl flex items-center justify-center text-gray-400 hover:text-red-600 hover:border-red-600 transition-colors shrink-0">
                            <ArrowLeft size={18} />
                        </Link>
                        <div>
                            <h1 className="text-3xl font-black tracking-tight flex items-center gap-3">
                                My Wishlist
                                {wishlist.length > 0 && (
                                    <span className="bg-gray-900 text-white text-[10px] px-2.5 py-0.5 rounded-full flex items-center justify-center -translate-y-0.5">
                                        {wishlist.length} Items
                                    </span>
                                )}
                            </h1>
                            <p className="text-gray-500 text-sm mt-1">
                                Save your favorite products and buy them later.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Wishlist Content */}
                {wishlist.length === 0 ? (
                    <div className="bg-white rounded-3xl p-16 text-center border border-gray-100 shadow-[0_15px_40px_-15px_rgba(0,0,0,0.05)]">
                        <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
                            <HeartCrack size={40} className="text-red-300" />
                        </div>
                        <h2 className="text-2xl font-black text-gray-900 mb-2">Your Wishlist is Empty</h2>
                        <p className="text-gray-500 mb-8 max-w-md mx-auto font-light">You haven't added any products to your wishlist yet. Explore our shop and find something you love!</p>
                        <Link to="/shop" className="bg-red-600 hover:bg-black text-white px-8 py-4 rounded-xl font-bold uppercase tracking-widest text-[11px] transition-colors inline-block shadow-lg shadow-red-600/20">
                            Explore Products
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {wishlist.map((product) => (
                            <div key={product.id} className="bg-white rounded-2xl shadow-[0_10px_30px_-15px_rgba(0,0,0,0.08)] border border-gray-100/50 overflow-hidden group hover:shadow-[0_20px_40px_-10px_rgba(220,38,38,0.15)] hover:-translate-y-1 transition-all duration-300 flex flex-col h-full relative">
                                
                                {/* Remove Button */}
                                <button 
                                    onClick={() => removeFromWishlist(product.id)}
                                    className="absolute top-4 right-4 z-10 w-8 h-8 bg-white/80 backdrop-blur-sm text-gray-400 hover:text-red-600 hover:bg-white rounded-full flex items-center justify-center shadow-sm transition-all"
                                    title="Remove from Wishlist"
                                >
                                    <Trash2 size={14} />
                                </button>

                                {/* Image */}
                                <div className="relative bg-gray-50 aspect-square flex items-center justify-center p-6 border-b border-gray-50 cursor-pointer" onClick={() => navigate(`/product/${product.id}`)}>
                                    <img 
                                        src={getPrimaryImage(product.image_url)} 
                                        alt={product.name} 
                                        className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500" 
                                    />
                                </div>

                                {/* Details */}
                                <div className="p-6 grow flex flex-col justify-between">
                                    <div>
                                        <p className="text-[10px] text-gray-400 mb-1 uppercase tracking-widest">{product.brandName && product.brandName !== 'No Brand' ? product.brandName : product.category}</p>
                                        <Link to={`/product/${product.id}`}>
                                            <h3 className="text-sm font-bold text-gray-900 mb-2 hover:text-red-600 transition-colors line-clamp-2">{product.name}</h3>
                                        </Link>
                                    </div>
                                    <div className="mt-3">
                                        <div className="flex text-yellow-400 mb-2 space-x-1">
                                            {[...Array(5)].map((_, i) => <Star key={i} size={12} fill="currentColor" color="currentColor" />)}
                                        </div>
                                        <span className="text-red-600 font-black text-lg">Rs {Number(product.price).toLocaleString()}</span>
                                    </div>
                                    
                                    {/* Move to Cart Button */}
                                    <button 
                                        onClick={() => handleMoveToCart(product)} 
                                        className="mt-6 w-full bg-[#111111] text-white font-bold uppercase text-[10px] tracking-[0.15em] py-3.5 rounded-xl shadow-lg hover:bg-red-600 transition-colors flex items-center justify-center gap-2"
                                    >
                                        <ShoppingCart size={14} /> Move to Cart
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Wishlist;