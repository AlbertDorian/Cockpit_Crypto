import React, { useState, useEffect } from 'react';
import './Layout.css';
import { Link, NavLink } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import Cookies from 'js-cookie';
import SearchBar from "../SearchBar";
import { SiMicrostrategy } from "react-icons/si";


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
                    <NavLink to="/strategy">
                        <div className="icons">
                            <SiMicrostrategy size={40} />
                        </div>
                    </NavLink>
                    <NavLink to="/login">
                        <div className="icons">
                            <CgProfile size={40} />
                        </div>
                    </NavLink>

                </div>

            </header>
            {children}
        </div>
    );
};

export default Layout;
