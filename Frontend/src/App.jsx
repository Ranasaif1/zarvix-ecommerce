import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import axios from 'axios';
import { Power } from 'lucide-react';

// === COMPONENTS ===
import Header from './Components/Header.jsx';
import Footer from './components/Footer.jsx';
import PageBanner from './components/PageBanner.jsx'; 

// === PAGES ===
import Home from './pages/Home.jsx';
import Cart from './pages/Cart.jsx'; 
import Contact from './pages/Contact.jsx'; 
import About from './pages/About.jsx'; 
import Terms from './pages/Terms.jsx'; 
import PrivacyPolicy from './Pages/PrivacyPolicy.jsx';
import ReturnPolicy from './pages/ReturnPolicy.jsx';
import ShippingPolicy from './pages/ShippingPolicy.jsx';
import Shop from './pages/Shop.jsx'; 
import ProductDetail from './pages/ProductDetail.jsx';
import Checkout from './pages/Checkout.jsx';
import SignIn from './pages/SignIn.jsx';
import SignUp from './pages/SignUp.jsx';
import Profile from './pages/Profile.jsx';
import ManageOrders from './pages/Manageorder.jsx';
import Notifications from './pages/Notifications.jsx';
import Wishlist from './pages/Wishlist.jsx';
import OrderHistory from './pages/OrderHistory.jsx';

// === ADMIN PAGES ===
import AdminLogin from './pages/AdminLogin.jsx';
import Admin from './pages/Admin.jsx';

// === CONTEXT PROVIDERS ===
import { CartProvider } from './context/CartContext.jsx';
import { AuthProvider } from './context/AuthContext.jsx';



// 🛡️ 1. MAINTENANCE WRAPPER (Customer ko block karega agar maintenance ON ho)
const StoreFront = ({ children, isMaintenance }) => {
    const location = useLocation();
    
    // Agar maintenance mode ON hai aur user Admin panel par nahi hai, tou block kar do!
    if (isMaintenance && !location.pathname.startsWith('/admin')) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-[#050505] text-white text-center p-6">
                <Power size={64} className="text-red-600 mb-6 animate-pulse" />
                <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">We're Upgrading!</h1>
                <p className="text-gray-400 max-w-md mx-auto leading-relaxed">
                    Zarvix Digital is currently down for scheduled maintenance. We are making our systems better for you. Please check back in a little while.
                </p>
            </div>
        );
    }
    
    // Agar sab theek hai, tou normal website dikhao
    return children;
};


// 🎨 2. APP LAYOUT (Header, Footer aur saare Routes yahan hain)
function AppLayout() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {!isAdminRoute && <Header />}
      {!isAdminRoute && <PageBanner />} 

      <main className={isAdminRoute ? "grow w-full" : "grow w-full max-w-7xl mx-auto p-4 sm:p-8"}>
        <Routes>
          {/* --- USER ROUTES --- */}
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} /> 
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} /> 
          <Route path="/terms" element={<Terms />} /> 
          <Route path="/privacy-policy" element={<PrivacyPolicy />} /> 
          <Route path="/return-policy" element={<ReturnPolicy />} /> 
          <Route path="/shipping-policy" element={<ShippingPolicy />} /> 
          <Route path="/shop" element={<Shop />} /> 
          <Route path="/shop/:categoryName" element={<Shop />} /> 
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/dashboard/orders" element={<ManageOrders />} />
          <Route path="/dashboard/notifications" element={<Notifications />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/dashboard/history" element={<OrderHistory />} />  

          {/* --- ADMIN ROUTES --- */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>

      {!isAdminRoute && <Footer />}
    </div>
  );
}


// 🚀 3. MAIN APP (Providers + Settings Data + Router)
function App() {
    const [settings, setSettings] = useState(null);

    // App start hotay hi settings mangwayen
    useEffect(() => {
        axios.get('http://localhost:8000/api/settings')
            .then(response => {
                setSettings(response.data);
            })
            .catch(error => console.error("Settings load nahi huin:", error));
    }, []);

    return (
        <AuthProvider>
            <CartProvider>
                <BrowserRouter>
                    {/* StoreFront wrapper lagayen aur backend ki settings pass karein */}
                    <StoreFront isMaintenance={settings?.maintenanceMode}>
                        <AppLayout />
                    </StoreFront>
                </BrowserRouter>
            </CartProvider>
        </AuthProvider>
    );
}

export default App;