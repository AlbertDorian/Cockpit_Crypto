import React, { useState, useEffect } from 'react';
import './Layout.css';
import { Link, NavLink } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
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

                <div className="title">
                    <h2>COCKPIT CRYPTO</h2>
                </div>
                <div className="menu-search">
                        <SearchBar/>
                </div>
                <div className="menu-profil">
                            <NavLink to="/login">
                                <CgProfile size={40} className="icons" />
                            </NavLink>
                </div>

            </header>
            {children}
        </div>
    );
};

export default Layout;
