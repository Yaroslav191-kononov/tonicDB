import React, { useEffect, useState } from 'react';
import './Catalog.css';
import ProductPhoto from '../../../assets/Image/ProductPhoto.jpg';
import ProductPhoto2 from '../../../assets/Image/ProductPhoto2.png';
import Galochka from '../../../assets/Image/galochka.svg';
import GalochkaPrime from '../../../assets/Image/GalochkaPrime.svg';
import SearchIcon from '../../../assets/Image/search.svg';
import FilterIcon from '../../../assets/Image/Filter.svg';
import ProductModal from '../ProductModal/ProductModal';
//
import { mockData, fetchMockData } from '../../../data/data.js';

const Catalog = () => {
    const [filters, setFilters] = useState({
    priceFrom: '',
    priceTo: '',
});
const [modalTrigger, setModalTrigger] = useState(0);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [allProducts, setAllProducts] = useState([]);
    const [products, setProducts] = useState([]);
    const [tonicFilters, setTonicFilters] = useState([]);
    const [benefitFilters, setBenefitFilters] = useState([]);


    useEffect(() => {
        let canceled = false;
        fetchMockData()
            .then((resp) => {
                if (canceled) return;
                let data = resp.catalogCatalog;
                setAllProducts(data.products);
                setProducts(data.products);
            })
            return () => { canceled = true; };
    }, []);



    useEffect(() => {
        applyFilters();
    }, [tonicFilters, filters, benefitFilters, allProducts]); 


    const handleCardClick = (product) => {
        setSelectedProduct(product);
        setModalOpen(true);
    };

    const [dropdownOpen, setDropdownOpen] = useState({
        type: false,
        price: false,
        benefit: false
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

    // Filter functions
    const applyFilters = () => {
        let filteredProducts = [...allProducts];

        // Тип тоника фильтр
        if (tonicFilters.length > 0) {
            filteredProducts = filteredProducts.filter(product =>
                tonicFilters.some(filter => product.name.toLowerCase().includes(filter.toLowerCase()))
            );
        }

        // Цена фильтр
        if (filters.priceFrom !== '') {
            filteredProducts = filteredProducts.filter(product => product.price >= parseInt(filters.priceFrom));
        }
        if (filters.priceTo !== '') {
            filteredProducts = filteredProducts.filter(product => product.price <= parseInt(filters.priceTo));
        }

        // Вид пользы фильтр
        if (benefitFilters.length > 0) {
            filteredProducts = filteredProducts.filter(product =>
                benefitFilters.some(filter => product.discription.toLowerCase().includes(filter.toLowerCase()))
            );
        }

        setProducts(filteredProducts);
    };

    // Handlers for filter changes
    const handleTonicFilterChange = (tonic, isChecked) => {
        if (isChecked) {
            setTonicFilters([...tonicFilters, tonic]);
        } else {
            setTonicFilters(tonicFilters.filter(item => item !== tonic));
        }
    };

    const handleBenefitFilterChange = (benefit, isChecked) => {
        if (isChecked) {
            setBenefitFilters([...benefitFilters, benefit]);
        } else {
            setBenefitFilters(benefitFilters.filter(item => item !== benefit));
        }
    };

    const handlePriceFromChange = (value) => {
        setFilters(prev => ({ ...prev, priceFrom: value }));
    };

    const handlePriceToChange = (value) => {
        setFilters(prev => ({ ...prev, priceTo: value }));
    };

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
                                                <input
                                                    type="checkbox"
                                                    value="Анфельция"
                                                    checked={tonicFilters.includes('Анфельция')}
                                                    onChange={(e) => handleTonicFilterChange('Анфельция', e.target.checked)}
                                                />
                                                <span>Анфельция</span>
                                            </label>
                                            <label>
                                                <input
                                                    type="checkbox"
                                                    value="Ламинария"
                                                    checked={tonicFilters.includes('Ламинария')}
                                                    onChange={(e) => handleTonicFilterChange('Ламинария', e.target.checked)}
                                                />
                                                <span>Ламинария</span>
                                            </label>
                                            <label>
                                                <input
                                                    type="checkbox"
                                                    value="Фукус"
                                                    checked={tonicFilters.includes('Фукус')}
                                                    onChange={(e) => handleTonicFilterChange('Фукус', e.target.checked)}
                                                />
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
                                                    onChange={(e) => handlePriceFromChange(e.target.value)}
                                                    className="price-input"
                                                />
                                            </div>
                                            <div className="price-input-group">
                                                <label className="price-label">До</label>
                                                <input
                                                    type="number"
                                                    value={filters.priceTo}
                                                    onChange={(e) => handlePriceToChange(e.target.value)}
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
                                                <input
                                                    type="checkbox"
                                                    value="Умственная деятельность"
                                                    checked={benefitFilters.includes('Умственная деятельность')}
                                                    onChange={(e) => handleBenefitFilterChange('Умственная деятельность', e.target.checked)}
                                                />
                                                <span>Умственная деятельность</span>
                                            </label>
                                            <label>
                                                <input
                                                    type="checkbox"
                                                    value="Физическое здоровье"
                                                    checked={benefitFilters.includes('Физическое здоровье')}
                                                    onChange={(e) => handleBenefitFilterChange('Физическое здоровье', e.target.checked)}
                                                />
                                                <span>Физическое здоровье</span>
                                            </label>
                                            <label>
                                                <input
                                                    type="checkbox"
                                                    value="Лечение стресса"
                                                    checked={benefitFilters.includes('Лечение стресса')}
                                                    onChange={(e) => handleBenefitFilterChange('Лечение стресса', e.target.checked)}
                                                />
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
                                    <input
                                        type="checkbox"
                                        value="Анфельция"
                                        checked={tonicFilters.includes('Анфельция')}
                                        onChange={(e) => handleTonicFilterChange('Анфельция', e.target.checked)}
                                    />
                                    <span>Анфельция</span>
                                </label>
                                <label>
                                    <input
                                        type="checkbox"
                                        value="Ламинария"
                                        checked={tonicFilters.includes('Ламинария')}
                                        onChange={(e) => handleTonicFilterChange('Ламинария', e.target.checked)}
                                    />
                                    <span>Ламинария</span>
                                </label>
                                <label>
                                    <input
                                        type="checkbox"
                                        value="Фукус"
                                        checked={tonicFilters.includes('Фукус')}
                                        onChange={(e) => handleTonicFilterChange('Фукус', e.target.checked)}
                                    />
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
                                        onChange={(e) => handlePriceFromChange(e.target.value)}
                                        className="price-input"
                                    />
                                </div>
                                <div className="price-input-group">
                                    <label className="price-label">До</label>
                                    <input
                                        type="number"
                                        value={filters.priceTo}
                                        onChange={(e) => handlePriceToChange(e.target.value)}
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
                                    <input
                                        type="checkbox"
                                        value="Умственная деятельность"
                                        checked={benefitFilters.includes('Умственная деятельность')}
                                        onChange={(e) => handleBenefitFilterChange('Умственная деятельность', e.target.checked)}
                                    />
                                    <span>Умственная деятельность</span>
                                </label>
                                <label>
                                    <input
                                        type="checkbox"
                                        value="Физическое здоровье"
                                        checked={benefitFilters.includes('Физическое здоровье')}
                                        onChange={(e) => handleBenefitFilterChange('Физическое здоровье', e.target.checked)}
                                    />
                                    <span>Физическое здоровье</span>
                                </label>
                                <label>
                                    <input
                                        type="checkbox"
                                        value="Лечение стресса"
                                        checked={benefitFilters.includes('Лечение стресса')}
                                        onChange={(e) => handleBenefitFilterChange('Лечение стресса', e.target.checked)}
                                    />
                                    <span>Лечение стресса</span>
                                </label>
                            </div>
                        )}
                    </div>
                </div>

                {/* Сетка товаров */}
                <div className="products-grid">
                    {products?.map((product, key) => (
                        <div
                            key={product.id}
                            className={`product-card product-card-${key + 1}`}
                            data-size={product.size}
                            onClick={() => handleCardClick(product)}
                            style={{ cursor: 'pointer' }}
                        >
                            <div
                                className="product-image"
                                style={{ backgroundImage: `url(${product.image})` }}
                            ></div>
                            <div className="product-info">
                                <h3>{product.name}</h3>
                                <p className="description">
                                    {product.discription}
                                </p>
                                <p className="price">{product.price}</p>
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
