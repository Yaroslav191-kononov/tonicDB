// src/components/Header/Header.jsx
import React, { useState, useRef, useEffect } from 'react';
import './Header.css';
import logo from '../../assets/icons/logo.svg';
import searchIcon from '../../assets/icons/search.svg';
import dateIcon from '../../assets/icons/date.svg';
import galochkaIcon from '../../assets/icons/galochka.svg';
import settingIcon from '../../assets/icons/setting.svg';
import notificationIcon from '../../assets/icons/notification.svg';
import leaveIcon from '../../assets/icons/leave.svg';

const Header = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedDate, setSelectedDate] = useState('25 Сентября, 2025');
    const [isDateOpen, setIsDateOpen] = useState(false);
    const [isBurgerOpen, setIsBurgerOpen] = useState(false);
    const dateRef = useRef(null);
    const burgerRef = useRef(null);

    const dateOptions = [
        '25 Сентября, 2025',
        '24 Сентября, 2025',
        '23 Сентября, 2025',
        '22 Сентября, 2025',
        '21 Сентября, 2025',
        '20 Сентября, 2025',
    ];

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dateRef.current && !dateRef.current.contains(event.target)) {
                setIsDateOpen(false);
            }
            if (burgerRef.current && !burgerRef.current.contains(event.target)) {
                setIsBurgerOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleDateSelect = (date) => {
        setSelectedDate(date);
        setIsDateOpen(false);
    };

    return (
        <header className="Header">
            <div className="Header_container">
                <div className="Header_logo">
                    <img src={logo} alt="Точик Жизни" className="Header_logo_img" />
                </div>

                <div className="Header_search">
                    <img src={searchIcon} alt="Search" className="Header_search_icon" />
                    <input
                        type="text"
                        className="Header_search_input"
                        placeholder="Поиск по всему сервису"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                <div className="Header_date" ref={dateRef}>
                    <div
                        className="Header_date_trigger"
                        onClick={() => setIsDateOpen(!isDateOpen)}
                    >
                        <img src={dateIcon} alt="Calendar" className="Header_date_icon" />
                        <span className="Header_date_text">{selectedDate}</span>
                        <img
                            src={galochkaIcon}
                            alt="Arrow"
                            className={`Header_date_arrow ${isDateOpen ? 'Header_date_arrow_open' : ''}`}
                        />
                    </div>

                    {isDateOpen && (
                        <div className="Header_date_dropdown">
                            {dateOptions.map((date, index) => (
                                <div
                                    key={index}
                                    className={`Header_date_option ${selectedDate === date ? 'Header_date_option_selected' : ''}`}
                                    onClick={() => handleDateSelect(date)}
                                >
                                    {date}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="Header_user">
                    <div className="Header_user_avatar">
                        <span className="Header_user_initial">И</span>
                    </div>
                    <span className="Header_user_name">Иванов Иван Иванович</span>
                </div>

                <button className="Header_settings">
                    <img src={settingIcon} alt="Settings" className="Header_icon" />
                </button>

                <button className="Header_notifications">
                    <img src={notificationIcon} alt="Notifications" className="Header_icon" />

                </button>

                <button className="Header_logout">
                    <img src={leaveIcon} alt="Logout" className="Header_icon" />
                </button>

                {/* БУРГЕР-МЕНЮ (только на мобилке) */}
                <div className="Header_burger" ref={burgerRef}>
                    <button
                        className={`Header_burger_btn ${isBurgerOpen ? 'Header_burger_btn_open' : ''}`}
                        onClick={() => setIsBurgerOpen(!isBurgerOpen)}
                    >
                        <span className="Header_burger_line"></span>
                        <span className="Header_burger_line"></span>
                        <span className="Header_burger_line"></span>
                    </button>

                    {isBurgerOpen && (
                        <div className="Header_burger_menu">
                            {/* ПРОФИЛЬ ПОЛЬЗОВАТЕЛЯ */}
                            <div className="Header_burger_profile">
                                <div className="Header_burger_avatar">
                                    <span className="Header_burger_avatar_initial">И</span>
                                </div>
                                <span className="Header_burger_username">Иванов Иван Иванович</span>
                            </div>

                            {/* МЕНЮ */}
                            <div className="Header_burger_item">
                                <img src={settingIcon} alt="Settings" className="Header_burger_icon" />
                                <span className="Header_burger_label">Настройки</span>
                            </div>
                            <div className="Header_burger_item">
                                <img src={notificationIcon} alt="Notifications" className="Header_burger_icon" />
                                <span className="Header_burger_label">Уведомления</span>
                                <span className="Header_burger_badge">3</span>
                            </div>
                            <div className="Header_burger_item">
                                <img src={leaveIcon} alt="Logout" className="Header_burger_icon" />
                                <span className="Header_burger_label">Выйти</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
