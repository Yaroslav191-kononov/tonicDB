import React, { useState, useMemo, useEffect, useRef } from 'react';
import './ProductsTable.css';
import Pagination from '../Pagination/Pagination';
import PointerIcon from '../../assets/icons/pointer.png';
import GalochkaIcon from '../../assets/icons/WhiteGalochka.png';

const ProductsTable = ({
                           searchValue = '',
                           category = 'all',
                           status = 'all',
                           dateFrom = '',
                           dateTo = '',
                           priceMin = 0,
                           priceMax = 100000,
                           onProductPreview,
                           allProducts = [],
                           setAllProducts,
                           onProductEdit
                       }) => {
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [openMenuId, setOpenMenuId] = useState(null);
    // Сортировка
    const [sortField, setSortField] = useState(null);
    const [sortDirection, setSortDirection] = useState('asc'); // 'asc' или 'desc'

    // Следим за изменением category и сортируем по имени
    const prevCategoryRef = useRef(category);
    useEffect(() => {
        if (prevCategoryRef.current !== category) {
            prevCategoryRef.current = category;
            // Автоматически сортируем по имени, когда меняется категория
            setSortField('name');
            setSortDirection('asc');
        }
    }, [category]);

    const normalize = (str) => str.toLowerCase().trim();

    // Фильтрация товаров
    const filteredProducts = useMemo(() => {
        return allProducts.filter((p) => {
            if (searchValue) {
                console.log()
                const search = normalize(searchValue).toString();
                const matchName = normalize(p.name).toString().includes(search);
                const matchId = p.id.toString().includes(search);
                if (!matchName && !matchId) return false;
            }

            // Фильтр по категории
            if (category !== 'all' && p.category !== category) return false;

            // Фильтр по статусу
            if (status !== 'all' && p.status !== status) return false;
            // Фильтр по дате
            if (dateFrom && p.date <= dateFrom) return false;
            if (dateTo && p.date >= dateTo) return false;
            // Фильтр по цене
            if (p.price < priceMin || p.price > priceMax) return false;

            return true;
        });
    }, [allProducts, searchValue, category, status, dateFrom, dateTo, priceMin, priceMax]);

    // Сортировка отфильтрованных товаров
    const sortedProducts = useMemo(() => {
        if (!sortField) return filteredProducts;
        console.log()
        const sorted = [...filteredProducts].sort((a, b) => {
            let aValue = a[sortField];
            let bValue = b[sortField];

            // Для строк используем localeCompare
            if (typeof aValue === 'string') {
                aValue = aValue.toLowerCase();
                bValue = bValue.toLowerCase();
                return sortDirection === 'asc'
                    ? aValue.localeCompare(bValue)
                    : bValue.localeCompare(aValue);
            }

            // Для чисел
            return sortDirection === 'asc'
                ? aValue - bValue
                : bValue - aValue;
        });

        return sorted;
    }, [filteredProducts, sortField, sortDirection]);

    // Обработчик клика на заголовок колонки
    const handleSort = (field) => {
        if (sortField === field) {
            // Если кликнули на ту же колонку - меняем направление
            setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
        } else {
            // Новая колонка - сортируем по возрастанию
            setSortField(field);
            setSortDirection('asc');
        }
    };

    const handleSelectAll = (e) => {
        if (e.target.checked) {
            setSelectedProducts(sortedProducts.map(p => p.id));
        } else {
            setSelectedProducts([]);
        }
    };
    const handleSelectProduct = (id) => {
        if (selectedProducts.includes(id)) {
            setSelectedProducts(selectedProducts.filter(pId => pId !== id));
        } else {
            setSelectedProducts([...selectedProducts, id]);
        }
    };

const handleToggleActive = async (id) => {
    const productToUpdate = allProducts.find(product => product.id === id);
    if (!productToUpdate) return;

    try {
        const response = await fetch(`http://localhost:3000/api/products/${id}/toggle`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ active: !productToUpdate.active }),
            credentials: 'include',
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        setAllProducts(allProducts.map(product =>
            product.id === id ? { ...product, active: !product.active } : product
        ));
    } catch (e) {
        setError(e);  
        console.error("Could not toggle active status:", e);
    }
};

    const toggleRowMenu = (id) => {
        setOpenMenuId(prev => (prev === id ? null : id));
    };

    const handleProductClick = (productId) => {
        if (onProductPreview) {
            onProductPreview(productId);
        }
    };

    const handlePreviewClick = (productId) => {
        setOpenMenuId(null);
        if (onProductPreview) {
            onProductPreview(productId);
        }
    };

    const formatPrice = (price) => {
        return `${price.toLocaleString('ru-RU')} ₽`;
    };

    const formatCategory = (cat) => {
        const map = {
            'tonics': 'Тоники',
            'creams': 'Кремы',
            'serums': 'Сыворотки'
        };
        return map[cat] || cat;
    };
      const handleDelete = async (id) => {
    if (!window.confirm('Удалить продукт?')) return;
    try {
        const res = await fetch("http://localhost:3000/api/delete/"+id, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            }
        });
        const data = await res.json();
      setAllProducts((p) => p.filter((it) => it.id !== id));
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  };
    // Индикатор направления сортировки
    const getSortIcon = (field) => {
        if (sortField !== field) {
            return <img src={GalochkaIcon} alt="" className="ProductsTable_sort-icon" />;
        }
        return (
            <img
                src={GalochkaIcon}
                alt=""
                className="ProductsTable_sort-icon ProductsTable_sort-icon--active"
                style={{
                    transform: sortDirection === 'desc' ? 'rotate(180deg)' : 'rotate(0deg)',
                    opacity: 1
                }}
            />
        );
    };

    // ПАГИНАЦИЯ
    const PAGE_SIZE = 10;

    // текущая отсортированная/отфильтрованная последовательность
    // 4. пагинация: вычисляем текущую страницу
    const paginatedProducts = useMemo(() => {
        const start = (currentPage - 1) * PAGE_SIZE;
        return sortedProducts.slice(start, start + PAGE_SIZE);
    }, [sortedProducts, currentPage]);

    // общее количество страниц
    const totalPages = Math.max(1, Math.ceil(sortedProducts.length / PAGE_SIZE));

    // обработчик смены страницы
    const handlePageChange = (page) => {
        const maxPage = totalPages;
        const next = Math.max(1, Math.min(page, maxPage));
        setCurrentPage(next);
    };


    // Индикатор направления сортировки
    const getSortIcon2 = (field) => getSortIcon(field);
    const handleEditClick = (productId) => {
        setOpenMenuId(null);
        if (onProductEdit) {
            onProductEdit(productId);
        }
    };
    // Теперь сброс страницы при изменении фильтров (минимальные изменения)
    useEffect(() => {
        setCurrentPage(1);
    }, [searchValue, category, status, dateFrom, dateTo, priceMin, priceMax]);

    return (
        <div className="ProductsTable">
            <div className="ProductsTable_wrapper">
                <table className="ProductsTable_table">
                    <thead className="ProductsTable_thead">
                    <tr>
                        <th className="ProductsTable_th ProductsTable_th_checkbox">
                            <input
                                type="checkbox"
                                checked={sortedProducts.length > 0 && selectedProducts.length === sortedProducts.length}
                                onChange={handleSelectAll}
                                className="ProductsTable_checkbox"
                            />
                        </th>

                        <th className="ProductsTable_th" onClick={() => handleSort('name')}>
                            <div className="ProductsTable_th_inner">
                                НАЗВАНИЕ ТОВАРА
                                {getSortIcon2('name')}
                            </div>
                        </th>

                        <th className="ProductsTable_th" onClick={() => handleSort('productId')}>
                            <div className="ProductsTable_th_inner">
                                ID ТОВАРА
                                {getSortIcon2('productId')}
                            </div>
                        </th>

                        <th className="ProductsTable_th" onClick={() => handleSort('category')}>
                            <div className="ProductsTable_th_inner">
                                КАТЕГОРИЯ
                                {getSortIcon2('category')}
                            </div>
                        </th>

                        <th className="ProductsTable_th" onClick={() => handleSort('views')}>
                            <div className="ProductsTable_th_inner">
                                ПРОСМОТРЫ
                                {getSortIcon2('views')}
                            </div>
                        </th>

                        <th className="ProductsTable_th" onClick={() => handleSort('price')}>
                            <div className="ProductsTable_th_inner">
                                ЦЕНА
                                {getSortIcon2('price')}
                            </div>
                        </th>

                        <th className="ProductsTable_th" onClick={() => handleSort('quantity')}>
                            <div className="ProductsTable_th_inner">
                                КОЛИЧЕСТВО
                                {getSortIcon2('quantity')}
                            </div>
                        </th>

                        <th className="ProductsTable_th" onClick={() => handleSort('active')}>
                            <div className="ProductsTable_th_inner">
                                СОСТОЯНИЕ
                                {getSortIcon2('active')}
                            </div>
                        </th>
                    </tr>
                    </thead>

                    <tbody className="ProductsTable_tbody">
                    {paginatedProducts.length === 0 ? (
                        <tr>
                            <td colSpan="8" style={{ textAlign: 'center', padding: '2vw', color: 'rgba(255,255,255,0.4)' }}>
                                Товары не найдены
                            </td>
                        </tr>
                    ) : (
                        paginatedProducts.map((product) => (
                            <tr
                                key={product.id}
                                className={`ProductsTable_row ${product.active ? 'ProductsTable_row_active' : ''}`}
                            >
                                <td className="ProductsTable_td ProductsTable_td_checkbox">
                                    <input
                                        type="checkbox"
                                        checked={selectedProducts.includes(product.id)}
                                        onChange={() => handleSelectProduct(product.id)}
                                        className="ProductsTable_checkbox"
                                    />
                                </td>

                                <td className="ProductsTable_td">
                                    <div className="ProductsTable_name-wrap">
                                        <span
                                            className="ProductsTable_name ProductsTable_name--clickable"
                                            onClick={() => handleProductClick(product.id)}
                                        >
                                            {product.name}
                                        </span>

                                        <button
                                            type="button"
                                            className="ProductsTable_more-btn"
                                            onClick={() => toggleRowMenu(product.id)}
                                        >
                                            <img src={PointerIcon} alt="Еще" />
                                        </button>

                                        {openMenuId === product.id && (
                                            <div className="ProductsTable_context">
                                                <button
                                                    type="button"
                                                    onClick={() => handlePreviewClick(product.id)}
                                                >
                                                    Предпросмотр
                                                </button>
                                                <button type="button" onClick={() => handleEditClick(product.id)}>Редактировать</button>
                                                <button type="button" onClick={() => handleDelete(product.id)}>Удалить</button>
                                            </div>
                                        )}
                                    </div>
                                </td>

                                <td className="ProductsTable_td ProductsTable_td_secondary">
                                    {product.productId}
                                </td>
                                <td className="ProductsTable_td">{formatCategory(product.category)}</td>
                                <td className="ProductsTable_td">{product.views}</td>
                                <td className="ProductsTable_td">{formatPrice(product.price)}</td>
                                <td className="ProductsTable_td">{product.quantity}</td>

                                <td className="ProductsTable_td">
                                    <label className="ProductsTable_toggle">
                                        <input
                                            type="checkbox"
                                            checked={product.active}
                                            onChange={() => handleToggleActive(product.id)}
                                            className="ProductsTable_toggle_input"
                                        />
                                        <span className="ProductsTable_toggle_slider"></span>
                                        <span className="ProductsTable_toggle_label">
                                            {product.active ? 'Активный' : 'Не активный'}
                                        </span>
                                    </label>
                                </td>
                            </tr>
                        ))
                    )}
                    </tbody>
                </table>
            </div>

            <div className="ProductsTable_footer">
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />
            </div>
        </div>
    );
};

export default ProductsTable;
