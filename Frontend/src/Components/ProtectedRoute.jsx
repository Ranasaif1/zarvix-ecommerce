import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    // Check karein ke localStorage mein 'isAdminLoggedIn' hai ya nahi
    const isAuthenticated = localStorage.getItem('isAdminLoggedIn');

    if (!isAuthenticated) {
        // Agar login nahi hai, toh wapis login page par bhej do
        return <Navigate to="/admin-login" />;
    }

    return children;
};

export default ProtectedRoute;