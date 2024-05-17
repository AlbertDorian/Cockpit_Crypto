import React, { useState, useEffect } from 'react';
import './Layout.css';
import { Link, NavLink } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { FaBasketShopping } from "react-icons/fa6";
import Cookies from 'js-cookie';
import SearchBar from "../SearchBar";


interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {


    const user = Cookies.get('user');
    if (user) {
        const userInfo = JSON.parse(user);
        console.log('User info from cookie:', userInfo);
    }


    return (
        <div>
            <header>
                
                <div className="Nom">
                    <p className="Nexusnode">COCKPIT CRYPTO</p>
                </div>
                <div className="Right">
                    <SearchBar/>
                    <div className="ProfilN">
                            <NavLink to="/login">
                                <CgProfile size={40} className="Icons" />
                            </NavLink>
                    </div>
                </div>
            </header>
            {children}
        </div>
    );
};

export default Layout;
