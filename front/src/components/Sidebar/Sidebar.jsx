// src/components/Sidebar/Sidebar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';
import dashboardIcon from '../../assets/icons/dashboard.svg';
import saleIcon from '../../assets/icons/sale.svg';
import promotionIcon from '../../assets/icons/promotion.svg';
import contentIcon from '../../assets/icons/content.svg';

const Sidebar = () => {
    const menuItems = [
        { id: 'dashboard', label: 'Дашборд', icon: dashboardIcon, path: '/dashboard' },
        { id: 'sales', label: 'Продажи', icon: saleIcon, path: '/products' },
        { id: 'promotion', label: 'Продвижение', icon: promotionIcon, path: '/promotion' },
        { id: 'content', label: 'Наполнение', icon: contentIcon, path: '/content' }
    ];

    return (
        <aside className="Sidebar">
            <nav className="Sidebar_nav">
                {menuItems.map((item) => (
                    <NavLink
                        key={item.id}
                        to={item.path}
                        className={({ isActive }) =>
                            `Sidebar_item ${isActive ? 'active' : ''}`
                        }
                    >
                        <span className="Sidebar_item_icon">
                            <img src={item.icon} alt={item.label} />
                        </span>
                        <span className="Sidebar_item_label">{item.label}</span>
                    </NavLink>
                ))}
            </nav>
        </aside>
    );
};

export default Sidebar;
