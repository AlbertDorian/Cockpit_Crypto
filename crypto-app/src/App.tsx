import React, { useEffect, useState } from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import HomePage from './component/Pages/HomePage';
import LoginPage from './component/Pages/LoginPage';
import RegisterPage from './component/Pages/RegisterPage';
import { CryptoProvider} from "./component/Hooks/CryptoContext";
import ProtectedRoute from "./ProtectedRoute";
import {CryptoListProvider} from "./component/Hooks/CryptoListContext";

const App: React.FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    useEffect(() => {
        const userCookie = Cookies.get('user');
        setIsAuthenticated(!!userCookie);
    }, []);

    const router = createBrowserRouter([
        {
            path: '/home',
            element: (
                <ProtectedRoute>
                    <HomePage />
                </ProtectedRoute>
            ),
        },
        {
            path: '/register',
            element: <RegisterPage />,
        },
        {
            path: '/login',
            element: <LoginPage />,
        },
        {
            path: '/',
            element: <Navigate to={isAuthenticated ? '/home' : '/login'} />,
        },
    ]);

    return (
        <CryptoListProvider>
            <CryptoProvider>
                <RouterProvider router={router} />
            </CryptoProvider>
        </CryptoListProvider>
    );
};

export default App;
