import React, { useEffect, useState, useMemo, useCallback } from 'react';
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
    const [searchQuery, setSearchQuery] = useState('');
    const [filterPanelOpen, setFilterPanelOpen] = useState(false);
    const [isSearching, setIsSearching] = useState(false);
    const [availableTonics, setAvailableTonics] = useState([]); // Новое состояние для уникальных тоников
    const [availableBenefits, setAvailableBenefits] = useState([]); // Новое состояние для уникальных видов пользы

    useEffect(() => {
        let canceled = false;
        fetchMockData()
            .then((resp) => {
                if (canceled) return;
                let data = resp.catalogCatalog;
                setAllProducts(data.products);
                setProducts(data.products);

                // Извлекаем уникальные значения для фильтров
                const tonics = new Set();
                const benefits = new Set();

                data.products.forEach(product => {
                    if (product.name) {
                        // Разделяем строку по запятой и добавляем каждый элемент в Set
                        product.name.split(',').map(item => item.trim()).forEach(tonic => tonics.add(tonic));
                    }
                    if (product.category) {
                        // Разделяем строку по запятой и добавляем каждый элемент в Set
                        product.category.split(',').map(item => item.trim()).forEach(benefit => benefits.add(benefit));
                    }
                });
                setAvailableTonics(Array.from(tonics));
                setAvailableBenefits(Array.from(benefits));
            })
            .catch(error => {
                console.error('Ошибка при загрузке данных:', error);
            });
        return () => { canceled = true; };
    }, []);

    // Функция поиска по товарам
    const searchProducts = useCallback((query, items) => {
        if (!query.trim()) return items;

        const searchTerm = query.toLowerCase().trim();

        return items.filter(product => {
            // Поиск по названию
            if (product.name && product.name.toLowerCase().includes(searchTerm)) {
                return true;
            }
        });
    }, []);

      // Основная функция фильтрации и поиска
      const applyFilters = useCallback(() => {
        setIsSearching(true);

        let filteredProducts = [...allProducts];

        // Применяем поиск
        if (searchQuery.trim()) {
            filteredProducts = searchProducts(searchQuery, filteredProducts);
        }

        // Тип тоника фильтр
        if (tonicFilters.length > 0) {
            filteredProducts = filteredProducts.filter(product =>
                tonicFilters.some(filter => {
                    // Ищем в названии продукта (учитываем, что там может быть несколько значений)
                    if (product.name && product.name.toLowerCase().includes(filter.toLowerCase())) {
                        return true;
                    }
                    // Или в специальном поле type, если оно есть (не уверен, используется ли оно)
                    if (product.type && product.type.toLowerCase().includes(filter.toLowerCase())) {
                        return true;
                    }
                    return false;
                })
            );
        }

        // Цена фильтр
        if (filters.priceFrom !== '' && filters.priceFrom !== null) {
            const priceFrom = parseInt(filters.priceFrom);
            if (!isNaN(priceFrom)) {
                filteredProducts = filteredProducts.filter(product =>
                    product.price && product.price >= priceFrom
                );
            }
        }

        if (filters.priceTo !== '' && filters.priceTo !== null) {
            const priceTo = parseInt(filters.priceTo);
            if (!isNaN(priceTo)) {
                filteredProducts = filteredProducts.filter(product =>
                    product.price && product.price <= priceTo
                );
            }
        }

        // Вид пользы фильтр
        if (benefitFilters.length > 0) {
            filteredProducts = filteredProducts.filter(product =>
                benefitFilters.some(filter => {
                    // Ищем в описании (учитываем, что там может быть несколько значений)
                    if (product.discription && product.discription.toLowerCase().includes(filter.toLowerCase())) {
                        return true;
                    }
                    // Или в специальном поле benefits, если оно есть (не уверен, используется ли оно)
                    if (product.benefits && product.benefits.toLowerCase().includes(filter.toLowerCase())) {
                        return true;
                    }
                    return false;
                })
            );
        }

        setProducts(filteredProducts);
        setIsSearching(false);
    }, [searchQuery, tonicFilters, filters, benefitFilters, allProducts, searchProducts]);

    // Применяем фильтры при изменении условий
    useEffect(() => {
        applyFilters();
    }, [applyFilters]);

    // Дебаунс для поиска (опционально, чтобы не фильтровать при каждом нажатии клавиши)
    useEffect(() => {
        const timer = setTimeout(() => {
            applyFilters();
        }, 300); // Задержка 300мс

        return () => clearTimeout(timer);
    }, [searchQuery]);

    const handleCardClick = (product) => {
        setSelectedProduct(product);
        setModalOpen(true);
    };

    const [dropdownOpen, setDropdownOpen] = useState({
        type: false,
        price: false,
        benefit: false
    });

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

    // Обработчик изменения поискового запроса
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    // Очистка поиска
    const clearSearch = () => {
        setSearchQuery('');
    };

    // Количество найденных товаров
    const foundCount = products.length;
    const totalCount = allProducts.length;

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
                                placeholder="Поиск по названию, описанию..."
                                value={searchQuery}
                                onChange={handleSearchChange}
                                className="search-input"
                            />
                            <img
                                src={SearchIcon}
                                alt="search"
                                className="search-icon"
                            />
                            {searchQuery && (
                                <button 
                                    className="clear-search-btn"
                                    onClick={clearSearch}
                                    aria-label="Очистить поиск"
                                >
                                    ×
                                </button>
                            )}
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
                                            {availableTonics.map(tonic => (
                                                <label key={tonic}>
                                                    <input
                                                        type="checkbox"
                                                        value={tonic}
                                                        checked={tonicFilters.includes(tonic)}
                                                        onChange={(e) => handleTonicFilterChange(tonic, e.target.checked)}
                                                    />
                                                    <span>{tonic}</span>
                                                </label>
                                            ))}
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
                                                    min="0"
                                                />
                                            </div>
                                            <div className="price-input-group">
                                                <label className="price-label">До</label>
                                                <input
                                                    type="number"
                                                    value={filters.priceTo}
                                                    onChange={(e) => handlePriceToChange(e.target.value)}
                                                    className="price-input"
                                                    min="0"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Вид пользы */}
                                    <div className="filter-section">
                                        <h3 className="filter-section-title">Вид пользы</h3>
                                        <div className="filter-options">
                                            {availableBenefits.map(benefit => (
                                                <label key={benefit}>
                                                    <input
                                                        type="checkbox"
                                                        value={benefit}
                                                        checked={benefitFilters.includes(benefit)}
                                                        onChange={(e) => handleBenefitFilterChange(benefit, e.target.checked)}
                                                    />
                                                    <span>{benefit}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

               {/* Статус поиска и фильтрации */}
               <div className="search-status">
                    {searchQuery && (
                        <div className="search-info">
                            <span>По запросу "{searchQuery}" найдено: {foundCount} товаров</span>
                            {foundCount === 0 && (
                                <button
                                    className="reset-filters-btn"
                                    onClick={() => {
                                        clearSearch();
                                        setTonicFilters([]);
                                        setBenefitFilters([]);
                                        setFilters({ priceFrom: '', priceTo: '' });
                                    }}
                                >
                                    Сбросить все фильтры
                                </button>
                            )}
                        </div>
                    )}
                    {isSearching && (
                        <div className="search-loading">
                            Идет поиск...
                        </div>
                    )}
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
                                {availableTonics.map(tonic => (
                                    <label key={tonic}>
                                        <input
                                            type="checkbox"
                                            value={tonic}
                                            checked={tonicFilters.includes(tonic)}
                                            onChange={(e) => handleTonicFilterChange(tonic, e.target.checked)}
                                        />
                                        <span>{tonic}</span>
                                    </label>
                                ))}
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
                                        min="0"
                                    />
                                </div>
                                <div className="price-input-group">
                                    <label className="price-label">До</label>
                                    <input
                                        type="number"
                                        value={filters.priceTo}
                                        onChange={(e) => handlePriceToChange(e.target.value)}
                                        className="price-input"
                                        min="0"
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
                                {availableBenefits.map(benefit => (
                                    <label key={benefit}>
                                        <input
                                            type="checkbox"
                                            value={benefit}
                                            checked={benefitFilters.includes(benefit)}
                                            onChange={(e) => handleBenefitFilterChange(benefit, e.target.checked)}
                                        />
                                        <span>{benefit}</span>
                                    </label>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Сетка товаров */}
                <div className="products-grid">
                    {products.length > 0 ? (
                        products.filter((product)=>product.active).map((product, key) => (

                            <div
                                key={product.id || key}
                                className={`product-card product-card-${key + 1}`}
                                data-size={product.size}
                                onClick={() => handleCardClick(product)}
                                style={{ cursor: 'pointer' }}
                            >
                                <div
                                    className="product-image"
                                    style={{ backgroundImage: `url(${product.image || ProductPhoto})` }}
                                ></div>
                                <div className="product-info">
                                    <h3>{product.name}</h3>
                                    <p className="description">
                                        {product.discription}
                                    </p>
                                    <p className="price">{product.price} ₽</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="no-results">
                            <h3>Товары не найдены</h3>
                            <p>Попробуйте изменить параметры поиска или фильтры</p>
                            <button 
                                className="reset-all-btn"
                                onClick={() => {
                                    clearSearch();
                                    setTonicFilters([]);
                                    setBenefitFilters([]);
                                    setFilters({ priceFrom: '', priceTo: '' });
                                }}
                            >
                                Сбросить все фильтры
                            </button>
                        </div>
                    )}
                </div>
                <ProductModal
                    isOpen={modalOpen}
                    onClose={() => setModalOpen(false)}
                    product={selectedProduct}
                />

                {/* Кнопка "Смотреть больше" показываем только если есть результаты */}
                {products.length > 0 && products.length < allProducts.length && (
                    <button className="Component_38">
                        Смотреть больше
                        <img src={GalochkaPrime} alt="arrow" />
                    </button>
                )}
            </div>
        </div>
    );
};

export default Catalog;
