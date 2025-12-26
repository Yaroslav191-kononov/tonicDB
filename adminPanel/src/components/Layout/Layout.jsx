// src/components/Layout/Layout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import './Layout.css';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';

const Layout = () => {
    return (
        <div className="Layout">
            <Header />
            <div className="Layout_container">
                <Sidebar />
                <main className="Layout_main">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default Layout;
