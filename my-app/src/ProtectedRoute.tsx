import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    console.log("Rendering ProtectedRoute");
    const userCookie = Cookies.get('user');

    if (!userCookie) {
        console.log("No user cookie found, redirecting to login.");
        return <Navigate to="/login" />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
