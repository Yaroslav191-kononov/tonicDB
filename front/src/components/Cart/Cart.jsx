import React, { useState, useEffect } from 'react';
import './Cart.css';
import Cookies from 'js-cookie';
const Cart = ({ isOpen, onClose }) => {
    const [cartItems, setCartItems] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        phone: '',
        email: '',
        address: '',
        delivery: 'Способ доставки'
    });
    const [agreedToTerms, setAgreedToTerms] = useState(false);

    useEffect(() => {
        let canceled = false;

        const fetchMockData = async () => {
            const response = await fetch("http://localhost:3000/api/catalog/3");
            const resp = await response.json();
            const cartItemsCookie = Cookies.get("cartItems"); 
            if (canceled) return;
            try {
                if (!cartItemsCookie) {
                    console.log("Cookies is empty, initializing cartItems to []");
                    setCartItems([]);
                    return;
                }
                const ids = JSON.parse(cartItemsCookie);
                console.log(ids)
                let data = resp;
                const filteredProducts = data.products.map(product => {
                const cartItem = ids.find(item => item.id === product.id);

                if (cartItem) {
                    return {
                        ...product,
                        quantity: cartItem.quantity // Добавляем quantity из ids к продукту
                    };
                } else {
                    return null; // Или можно вернуть undefined, если не хотите включать продукт
                                  // Если продукта нет в корзине.  Нужно решить, что делать в этом случае.
                }
                }).filter(product => product !== null);
                console.log(filteredProducts);
                const initialCartItems = filteredProducts.map((product) => ({
                    id: product.id,
                    name: product.name,
                    price: parseFloat(product.price),
                    quantity: product.quantity || 1,
                    image: product.image,
                }));

                console.log("Initial cartItems from API:", initialCartItems);
                setCartItems(initialCartItems);
            } catch (error) {
                console.error(
                    "Ошибка при разборе ProductsID из Cookies или фильтрации:",
                    error
                );
                setCartItems([]);
            }
        };
        fetchMockData();
        return () => {
            canceled = true;
        };
    }, []);


    const handleQuantityChange = (id, delta) => {
        setCartItems(items => {
            const updatedItems = items.map(item =>
                item.id === id
                    ? { ...item, quantity: Math.max(1, item.quantity + delta) }
                    : item
            );
            Cookies.set('cartItems', JSON.stringify(updatedItems), { expires: 7 });
            console.log(Cookies.get('cartItems'));
            return updatedItems;
        });
    };

    const handleRemoveItem = (id) => {
        setCartItems(items => {
            const updatedItems = items.filter(item => item.id !== id);
            Cookies.set('cartItems', JSON.stringify(updatedItems), { expires: 7 });
            console.log(updatedItems)
            return updatedItems
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const getTotalPrice = () => {
        return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!agreedToTerms) {
            alert('Пожалуйста, примите условия обработки персональных данных');
            return;
        }
        console.log('Form submitted:', formData);
        console.log('Cart items:', cartItems);
    };

    if (!isOpen) return null;

    return (
        <>
            <div className={`Cart_overlay ${isOpen ? 'active' : ''}`} onClick={onClose} />

            <div className={`Cart ${isOpen ? 'active' : ''}`}>
                <div className="container">
                    <div className="Cart_wrapper">

                        <div className="Cart_left">
                            <div className="Cart_left_header">
                                <h2 className="Cart_title">Корзина</h2>

                                <button className="Cart_close Cart_close_tablet" onClick={onClose}>
                                    <svg width="23" height="23" viewBox="0 0 23 23" fill="none">
                                        <path d="M1 1L22 22M22 1L1 22" stroke="white" strokeWidth="2"/>
                                    </svg>
                                </button>
                            </div>


                            <div className="Cart_items_wrapper">
                                <div className="Cart_items">
                                    {cartItems.map(item => (
                                        <div key={item.id} className="Cart_item">
                                            <div className="Cart_item_image">
                                                <img src={item.image} alt={item.name} />
                                            </div>

                                            <div className="Cart_item_info">
                                                <h3 className="Cart_item_name">{item.name}</h3>

                                                <div className="Cart_item_controls">
                                                    <div className="Cart_item_quantity">
                                                        <button
                                                            className="Cart_item_quantity_btn"
                                                            onClick={() => handleQuantityChange(item.id, -1)}
                                                        >
                                                            −
                                                        </button>
                                                        <span className="Cart_item_quantity_value">
                                                            {item.quantity}
                                                        </span>
                                                        <button
                                                            className="Cart_item_quantity_btn"
                                                            onClick={() => handleQuantityChange(item.id, 1)}
                                                        >
                                                            +
                                                        </button>
                                                    </div>

                                                    <div className="Cart_item_price">
                                                        {(item.price * item.quantity).toLocaleString('ru-RU')} РУБЛЕЙ
                                                    </div>
                                                </div>
                                            </div>

                                            <button
                                                className="Cart_item_remove"
                                                onClick={() => handleRemoveItem(item.id)}
                                            >
                                                ✕
                                            </button>
                                        </div>
                                    ))}
                                </div>


                                <div className="Cart_scrollbar">
                                    <div className="Cart_scrollbar_track">
                                        <div className="Cart_scrollbar_thumb"></div>
                                    </div>
                                </div>
                            </div>


                            <div className="Cart_total">
                                <span className="Cart_total_label">Итого:</span>
                                <span className="Cart_total_value">
                                    {getTotalPrice().toLocaleString('ru-RU')} рублей
                                </span>
                            </div>
                        </div>


                        <div className="Cart_right">
                            <div className="Cart_form_header">
                                <h2 className="Cart_form_title">Оформление</h2>

                                <button className="Cart_close Cart_close_desktop" onClick={onClose}>
                                    <svg width="23" height="23" viewBox="0 0 23 23" fill="none">
                                        <path d="M1 1L22 22M22 1L1 22" stroke="white" strokeWidth="2"/>
                                    </svg>
                                </button>
                            </div>

                            <form className="Cart_form" onSubmit={handleSubmit}>
                                <div className="Cart_form_row">
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Имя"
                                        className="Cart_form_input"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    <input
                                        type="text"
                                        name="surname"
                                        placeholder="Фамилия"
                                        className="Cart_form_input"
                                        value={formData.surname}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>

                                <div className="Cart_form_row">
                                    <input
                                        type="tel"
                                        name="phone"
                                        placeholder="Телефон"
                                        className="Cart_form_input"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Электронная почта"
                                        className="Cart_form_input"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>

                                <div className="Cart_form_row">
                                    <input
                                        type="text"
                                        name="address"
                                        placeholder="Адрес"
                                        className="Cart_form_input"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>

                                <div className="Cart_form_row">
                                    <select
                                        name="delivery"
                                        className="Cart_form_input"
                                        value={formData.delivery}
                                        onChange={handleInputChange}
                                    >
                                        <option disabled>Способ доставки</option>
                                        <option value="Курьером">Курьером</option>
                                        <option value="Самовывоз">Самовывоз</option>
                                    </select>
                                </div>

                                <div className="Cart_form_agreement">
                                    <label className="Cart_form_agreement_label">
                                        <input
                                            type="checkbox"
                                            checked={agreedToTerms}
                                            onChange={() => setAgreedToTerms(!agreedToTerms)}
                                        />
                                        Согласен на обработку персональных данных
                                    </label>
                                </div>

                                <button type="submit" className="Cart_form_submit">
                                    Подтвердить заказ
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export { Cart };