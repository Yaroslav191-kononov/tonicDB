import React, { useState } from 'react';
import './Catalog.css';
import ProductPhoto from '../../../assets/Image/ProductPhoto.jpg';
import ProductPhoto2 from '../../../assets/Image/ProductPhoto2.png';
import Galochka from '../../../assets/Image/galochka.svg';
import GalochkaPrime from '../../../assets/Image/GalochkaPrime.svg';
import SearchIcon from '../../../assets/Image/search.svg';
import FilterIcon from '../../../assets/Image/Filter.svg';
import ProductModal from '../ProductModal/ProductModal';
const Catalog = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const handleCardClick = (product) => {
        setSelectedProduct(product);
        setModalOpen(true);
    };
    const [dropdownOpen, setDropdownOpen] = useState({
        type: false,
        price: false,
        benefit: false
    });

    const [filters, setFilters] = useState({
        priceFrom: '',
        priceTo: ''
    });

    const [searchQuery, setSearchQuery] = useState('');
    const [filterPanelOpen, setFilterPanelOpen] = useState(false);

    const toggleDropdown = (name) => {
        setDropdownOpen(prev => {
            const newState = { type: false, price: false, benefit: false };
            newState[name] = !prev[name];
            return newState;
        });
    };

    const toggleFilterPanel = () => {
        setFilterPanelOpen(!filterPanelOpen);
    };

    const products = [
        { id: 1, size: 'medium', image: ProductPhoto, cardClass: 'product-card-1' },
        { id: 2, size: 'small', image: ProductPhoto2, cardClass: 'product-card-2' },
        { id: 3, size: 'large', image: ProductPhoto, cardClass: 'product-card-3' },
        { id: 4, size: 'large', image: ProductPhoto2, cardClass: 'product-card-4' },
        { id: 5, size: 'small', image: ProductPhoto, cardClass: 'product-card-5' },
        { id: 6, size: 'medium', image: ProductPhoto2, cardClass: 'product-card-6' },
        { id: 7, size: 'small', image: ProductPhoto, cardClass: 'product-card-7' },
        { id: 8, size: 'medium', image: ProductPhoto2, cardClass: 'product-card-8' },
        { id: 9, size: 'medium', image: ProductPhoto, cardClass: 'product-card-9' },
        { id: 10, size: 'large', image: ProductPhoto2, cardClass: 'product-card-10' }
    ];

    return (
        <div className="catalog">
            <div className="container">
                {/* Хедер: Заголовок, поиск и кнопка фильтров */}
                <div className="catalog__header">
                    <h1 className="Katalog">Каталог</h1>
                    <div className="header-right">
                        <div className="search-container">
                            <input
                                type="text"
                                placeholder="Поиск"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="search-input"
                            />
                            <img
                                src={SearchIcon}
                                alt="search"
                                className="search-icon"
                            />
                        </div>
                        {/* Кнопка фильтров для мобильных/планшетов */}
                        <div className="filter-toggle-wrapper">
                            <button
                                className="filter-toggle-btn"
                                onClick={toggleFilterPanel}
                            >
                                <img src={FilterIcon} alt="Фильтры" />
                            </button>

                            {/* Выпадающая панель с фильтрами */}
                            {filterPanelOpen && (
                                <div className="filter-dropdown-panel">
                                    {/* Тип тоника */}
                                    <div className="filter-section">
                                        <h3 className="filter-section-title">Тип тоника</h3>
                                        <div className="filter-options">
                                            <label>
                                                <input type="checkbox" />
                                                <span>Анфельция</span>
                                            </label>
                                            <label>
                                                <input type="checkbox" />
                                                <span>Ламинария</span>
                                            </label>
                                            <label>
                                                <input type="checkbox" />
                                                <span>Фукус</span>
                                            </label>
                                        </div>
                                    </div>

                                    {/* Цена */}
                                    <div className="filter-section">
                                        <h3 className="filter-section-title">Цена</h3>
                                        <div className="filter-price-inputs">
                                            <div className="price-input-group">
                                                <label className="price-label">От</label>
                                                <input
                                                    type="number"
                                                    value={filters.priceFrom}
                                                    onChange={(e) => setFilters(prev => ({...prev, priceFrom: e.target.value}))}
                                                    className="price-input"
                                                />
                                            </div>
                                            <div className="price-input-group">
                                                <label className="price-label">До</label>
                                                <input
                                                    type="number"
                                                    value={filters.priceTo}
                                                    onChange={(e) => setFilters(prev => ({...prev, priceTo: e.target.value}))}
                                                    className="price-input"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Вид пользы */}
                                    <div className="filter-section">
                                        <h3 className="filter-section-title">Вид пользы</h3>
                                        <div className="filter-options">
                                            <label>
                                                <input type="checkbox" />
                                                <span>Умственная деятельность</span>
                                            </label>
                                            <label>
                                                <input type="checkbox" />
                                                <span>Физическое здоровье</span>
                                            </label>
                                            <label>
                                                <input type="checkbox" />
                                                <span>Лечение стресса</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Кнопки фильтров (десктоп) */}
                <div className="filter-buttons desktop-filters">
                    <div className="filter-dropdown">
                        <button
                            className={`Knopka_filtry_katalog ${dropdownOpen.type ? 'active' : ''}`}
                            onClick={() => toggleDropdown('type')}
                        >
                            Тип тоника
                            <img src={Galochka} alt="arrow" />
                        </button>
                        {dropdownOpen.type && (
                            <div className="Component_54">
                                <label>
                                    <input type="checkbox" />
                                    <span>Анфельция</span>
                                </label>
                                <label>
                                    <input type="checkbox" />
                                    <span>Ламинария</span>
                                </label>
                                <label>
                                    <input type="checkbox" />
                                    <span>Фукус</span>
                                </label>
                            </div>
                        )}
                    </div>

                    <div className="filter-dropdown">
                        <button
                            className={`Knopka_filtry_katalog ${dropdownOpen.price ? 'active' : ''}`}
                            onClick={() => toggleDropdown('price')}
                        >
                            Цена
                            <img src={Galochka} alt="arrow" />
                        </button>
                        {dropdownOpen.price && (
                            <div className="Component_53">
                                <div className="price-input-group">
                                    <label className="price-label">От</label>
                                    <input
                                        type="number"
                                        value={filters.priceFrom}
                                        onChange={(e) => setFilters(prev => ({...prev, priceFrom: e.target.value}))}
                                        className="price-input"
                                    />
                                </div>
                                <div className="price-input-group">
                                    <label className="price-label">До</label>
                                    <input
                                        type="number"
                                        value={filters.priceTo}
                                        onChange={(e) => setFilters(prev => ({...prev, priceTo: e.target.value}))}
                                        className="price-input"
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="filter-dropdown">
                        <button
                            className={`Knopka_filtry_katalog ${dropdownOpen.benefit ? 'active' : ''}`}
                            onClick={() => toggleDropdown('benefit')}
                        >
                            Вид пользы
                            <img src={Galochka} alt="arrow" />
                        </button>
                        {dropdownOpen.benefit && (
                            <div className="Component_51">
                                <label>
                                    <input type="checkbox" />
                                    <span>Умственная деятельность</span>
                                </label>
                                <label>
                                    <input type="checkbox" />
                                    <span>Физическое здоровье</span>
                                </label>
                                <label>
                                    <input type="checkbox" />
                                    <span>Лечение стресса</span>
                                </label>
                            </div>
                        )}
                    </div>
                </div>

                {/* Сетка товаров */}
                <div className="products-grid">
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className={`product-card ${product.cardClass}`}
                            data-size={product.size}
                            onClick={() => handleCardClick(product)}
                            style={{ cursor: 'pointer' }}
                        >
                            <div
                                className="product-image"
                                style={{ backgroundImage: `url(${product.image})` }}
                            ></div>
                            <div className="product-info">
                                <h3>НАЗВАНИЕ ТОВАРА</h3>
                                <p className="description">
                                    Текст описания текст описания текст описания текст описания
                                    текст описания текст описания текст описания текст описания
                                </p>
                                <p className="price">ЦЕНА</p>
                            </div>
                        </div>
                    ))}
                </div>
                <ProductModal
                    isOpen={modalOpen}
                    onClose={() => setModalOpen(false)}
                    product={selectedProduct}
                />
                {/* Кнопка "Смотреть больше" */}
                <button className="Component_38">
                    Смотреть больше
                    <img src={GalochkaPrime} alt="arrow" />
                </button>
            </div>
        </div>
    );
};

export default Catalog;
