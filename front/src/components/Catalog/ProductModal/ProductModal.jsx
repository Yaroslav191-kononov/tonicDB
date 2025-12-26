import React, { useState, useEffect, useMemo } from 'react';
import './ProductModal.css';
import ArrowIcon from '../../../assets/Image/galochka.svg';
import ProductPhoto from '../../../assets/Image/ProductPhoto.jpg';
import ProductPhoto2 from '../../../assets/Image/ProductPhoto2.png';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
//
import { mockData, fetchMockData } from '../../../data/data.js';

function getRandomElements(array, count) {
    if (!array) return [];
    const shuffled = [...array].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}
const ProductModal = ({ isOpen, onClose, product, key }) => {
    const handleOverlayClick = (e) => {
        if (e.target.className === 'product-modal-overlay' || e.target.className === 'product-modal-overlay tm-overlay') {
            onClose();
        }
    };
    const navigate = useNavigate();
    let [quantity, setQuantity] = useState(1);
    const [isTabletMobile, setIsTabletMobile] = useState(false);
    const [products, setAbout] = useState([]);
    const [Char, setChar] = useState([]);
    const [CERF,setCERF] = useState([]);
    useEffect(() => {
        let canceled = false;
        fetchMockData()
            .then((resp) => {
                if (canceled) return;
                let data = resp;
                setAbout(data.catalogCatalog);
            });
        return () => {
            canceled = true;
        };
    }, []);

    useEffect(() => {
        let canceled = false;

        fetch('http://localhost:3000/api/characteristic').then((r) => r.json())
            .then((resp) => {
                if (canceled) return;
                let data = resp;
                setChar(data);
            });
        return () => {
            canceled = true;
        };
    }, []);

    useEffect(() => {
        const checkWidth = () => {
            setIsTabletMobile(window.innerWidth <= 1024);
        };

        checkWidth();
        window.addEventListener('resize', checkWidth);
        return () => window.removeEventListener('resize', checkWidth);
    }, []);

    // useEffect для отправки запроса на увеличение просмотров
    useEffect(() => {
        if (isOpen && product?.id) {
            const incrementViews = async () => {
                try {
                    const response = await fetch(`http://localhost:3000/api/views/${product.id}`, {
                        method: 'POST', // Используйте POST для увеличения просмотров
                    });

                    if (!response.ok) {
                        console.error('Ошибка при увеличении просмотров:', response.status);
                    }
                } catch (error) {
                    console.error('Ошибка при отправке запроса на увеличение просмотров:', error);
                }
            };

            incrementViews();
        }
    }, [isOpen, product?.id]); // Зависимости: isOpen и product?.id
        useEffect(() => {
        let canceled = false;

        fetch('http://localhost:3000/api/cerf').then((r) => r.json())
            .then((resp) => {
                if (canceled) return;
                let data = resp;
                setCERF(data);

            });
        return () => {
            canceled = true;
        };
    }, []);
const downloadCertificate = async (cert) => {
  const res = await fetch(`http://localhost:3000/download/${cert.url}`);
  if (!res.ok) throw new Error('Network response was not ok');
  const blob = await res.blob();
  let filename = cert?.header ? `${cert.header}.pdf` : 'certificate.pdf';
  const cd = res.headers.get('Content-Disposition');
  if (cd) {
    const match = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/.exec(cd);
    if (match && match[1]) filename = match[1].replace(/['"]/g, '');
  }
  if (!filename.includes('.')) {
    filename += '.pdf';
  }
  const blobUrl = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = blobUrl;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(blobUrl);
};
    const relatedProducts = useMemo(() => {
        if (!products || !products.products) {
            return [];
        }
        return getRandomElements(products.products, 3);
    }, [products]);


    const handleAddToCart = () => {
        const existingCartItems = Cookies.get('cartItems')
            ? JSON.parse(Cookies.get('cartItems'))
            : [];
        const parsedCartItems = Array.isArray(existingCartItems) ? existingCartItems : [];
        const existingItemIndex = parsedCartItems.findIndex((item) => item.id === product.id);
        if (existingItemIndex > -1) {
            parsedCartItems[existingItemIndex].quantity += parseInt(quantity);
        } else {
            parsedCartItems.push({ id: product.id, quantity: parseInt(quantity) });
        }
        quantity = 1;
        Cookies.set('cartItems', JSON.stringify(parsedCartItems), { expires: 7 });
        navigate('/cart');
    };

    const incrementQuantity = () => setQuantity(prev => prev + 1);
    const decrementQuantity = () => setQuantity(prev => prev > 1 ? prev - 1 : 1);

    // ОПИСЫВАЕМ ФУНКЦИИ ДО ИСПОЛЬЗОВАНИЯ В useMemo

    const renderDesktopView = () => (
        <div className="product-modal-overlay" onClick={handleOverlayClick}>
            <div className="product-modal">
                <button className="modal-close-btn" onClick={onClose} aria-label="Закрыть">
                    <span className="close-icon"></span>
                </button>

                <div className="modal-content">
                    <div className="modal-left">
                        <div className="modal-product-image">
                            <img src={product?.image || ProductPhoto} alt={product?.name} />
                        </div>
                    </div>

                    <div className="modal-right">
                        <h1 className="modal-product-title">{product?.name}</h1>
                        <p className="modal-product-price">{product?.price} рублей</p>

                        <div className="modal-characteristics">
                            {Char
                                .filter(c => c.product_id === product?.id)
                                .map((c, i) => (
                                    <div className="characteristic-row" key={i}>
                                        <span className="characteristic-label">{c?.name}</span>
                                        <span className="characteristic-value">
                                            {c.description}
                                        </span>
                                    </div>
                                ))}
                        </div>

                        <div className="modal-description">
                            <p>
                                {product?.discription}
                            </p>
                        </div>

                        <div className="modal-actions">
                            <div className="quantity-selector">
                                <button onClick={decrementQuantity}>-</button>
                                <span>{quantity}</span>
                                <button onClick={incrementQuantity}>+</button>
                            </div>
                            <button className="add-to-cart-btn" onClick={handleAddToCart}>В корзину</button>
                        </div>
                    </div>
                </div>

                <div className="modal-bottom-sections">
                    <section className="modal-section certificates-section">
                        <h2 className="section-title">Сертификаты</h2>
                        <div className="certificates-grid">
{CERF
                                .filter(c => c.product_id === product?.id)
                                .slice(0, 2)
                                .map((c, i) => (
                            <div className="certificate-card" key={i}>
                                <div className="certificate-content">
                                    <h3>{c.header}</h3>
                                    <p>{c.size ? `Размер файла: ${c.size}` : 'Размер файла'}</p>
                                    <button className="view-btn" onClick={() => downloadCertificate(c)}>Скачать</button>
                                </div>
                            </div>
                                                            ))}
                        </div>
                    </section>

                    <section className="modal-section related-section">
                        <div className="section-header">
                            <h2 className="section-title">Смотрите также</h2>
                            <div className="slider-controls">
                                <button className="slider-btn slider-btn-prev">
                                    <img src={ArrowIcon} alt="Назад" />
                                </button>
                                <button className="slider-btn slider-btn-next">
                                    <img src={ArrowIcon} alt="Вперед" />
                                </button>
                            </div>
                        </div>
                        <div className="related-products">
                            {relatedProducts?.map((rp, index) => (
                                <div key={rp.id} className={`related-product-card ${index === 0 ? 'large' : 'medium'}`}>
                                    <div className="related-product-image">
                                        <img src={rp.image || ProductPhoto} alt="Товар" />
                                    </div>
                                    <div className="related-product-info">
                                        <h3>{rp.name}</h3>
                                        <p className="related-price">{rp.price}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );

    const renderTabletMobileView = () => (
        <div className="product-modal-overlay tm-overlay" onClick={handleOverlayClick}>
            <div className="product-modal tm-modal">
                <button className="modal-close-btn tm-close-btn" onClick={onClose} aria-label="Закрыть">
                    <span className="close-icon"></span>
                </button>

                <div className="tm-product-header">
                    <div className="tm-product-left">
                        <div className="tm-product-image">
                            <img src={product?.image || ProductPhoto} alt={product?.name} />
                        </div>
                    </div>

                    <div className="tm-product-right">
                        <h1 className="tm-product-title">{product?.name}</h1>
                        <p className="tm-product-price">{product?.price} рублей</p>

                        <div className="tm-product-chars">
                            {Char
                                .filter(c => c.product_id === product?.id)
                                .slice(0, 2)
                                .map((c, i) => (
                                    <div className="characteristic-row" key={i}>
                                        <span className="characteristic-label">{c.name}</span>
                                        <span className="characteristic-value">
                                            {c.description}
                                        </span>
                                    </div>
                                ))}
                        </div>

                        <button className="tm-product-more">Большие характеристики</button>
                    </div>
                </div>

                <div className="tm-product-text">
                    <p>
                        {product?.discription}
                    </p>
                </div>

                <div className="tm-product-actions">
                    <div className="tm-quantity">
                        <button onClick={decrementQuantity}>-</button>
                        <span>{quantity}</span>
                        <button onClick={incrementQuantity}>+</button>
                    </div>
                    <button className="tm-cart-btn" onClick={handleAddToCart}>В корзину</button>
                </div>

                <section className="tm-section">
                    <h2 className="tm-section-title">СМОТРИТЕ ТАКЖЕ</h2>
                    <div className="tm-related-grid">
                        {relatedProducts?.map((rp, index) => {
                            const isLarge = index === 0;
                            return (
                                <div key={rp.id} className={`tm-related-card tm-card-${isLarge ? 'large' : 'small'}`}>
                                    <div className="tm-related-image">
                                        <img src={rp.image || ProductPhoto} alt="Товар" />
                                    </div>
                                    <div className="tm-related-info">
                                        <h3>{rp.name}</h3>
                                        <p>{rp.price}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>

                <section className="tm-section">
                    <h2 className="tm-section-title">СЕРТИФИКАТЫ</h2>
                    <div className="tm-certs-grid">
                         {CERF
                                .filter(c => c.product_id === product?.id)
                                .slice(0, 2)
                                .map((c, i) => (
                        <div className="tm-cert-card" key={i}>
                            <h3>{c.header}</h3>
                            <p>{c.size ? `Размер файла: ${c.size}` : 'Размер файла'}</p>
                            <button className="tm-view-btn" onClick={() => downloadCertificate(c)}>Скачать</button>
                        </div>
                                ))}
                    </div>
                </section>
            </div>
        </div>
    );

    const memoizedDesktopView = useMemo(() => renderDesktopView(), [isOpen, relatedProducts, product, Char, quantity, isTabletMobile, products, key]);
    const memoizedTabletMobileView = useMemo(() => renderTabletMobileView(), [isOpen, relatedProducts, product, Char, quantity, isTabletMobile, products, key]);

    return isOpen ? (isTabletMobile ? memoizedTabletMobileView : memoizedDesktopView) : null;
};

export default ProductModal;