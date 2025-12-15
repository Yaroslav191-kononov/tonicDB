import React, { useState, useEffect } from 'react';
import './ProductModal.css';
import ArrowIcon from '../../../assets/Image/galochka.svg';
import ProductPhoto from '../../../assets/Image/ProductPhoto.jpg';

const ProductModal = ({ isOpen, onClose, product }) => {
    const [quantity, setQuantity] = useState(1);
    const [isTabletMobile, setIsTabletMobile] = useState(false);

    useEffect(() => {
        const checkWidth = () => {
            setIsTabletMobile(window.innerWidth <= 1024);
        };

        checkWidth();
        window.addEventListener('resize', checkWidth);
        return () => window.removeEventListener('resize', checkWidth);
    }, []);

    if (!isOpen) return null;

    const handleOverlayClick = (e) => {
        if (e.target.className === 'product-modal-overlay') {
            onClose();
        }
    };

    const incrementQuantity = () => setQuantity(prev => prev + 1);
    const decrementQuantity = () => setQuantity(prev => prev > 1 ? prev - 1 : 1);

    // ========== DESKTOP VIEW (БЕЗ ИЗМЕНЕНИЙ) ==========
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
                        <h1 className="modal-product-title">Название товара</h1>
                        <p className="modal-product-price">5 000 рублей</p>

                        <div className="modal-characteristics">
                            <div className="characteristic-row">
                                <span className="characteristic-label">Характеристика</span>
                                <span className="characteristic-value">
                                    Текст описания текст описания текст описания текст описания текст описания
                                </span>
                            </div>
                            <div className="characteristic-row">
                                <span className="characteristic-label">Характеристика</span>
                                <span className="characteristic-value">
                                    Текст описания текст описания текст описания текст описания текст описания
                                </span>
                            </div>
                            <div className="characteristic-row">
                                <span className="characteristic-label">Характеристика</span>
                                <span className="characteristic-value">
                                    Текст описания текст описания текст описания текст описания текст описания
                                </span>
                            </div>
                            <div className="characteristic-row">
                                <span className="characteristic-label">Характеристика</span>
                                <span className="characteristic-value">
                                    Текст описания текст описания текст описания текст описания текст описания
                                </span>
                            </div>
                            <div className="characteristic-row">
                                <span className="characteristic-label">Характеристика</span>
                                <span className="characteristic-value">
                                    Текст описания текст описания текст описания текст описания текст описания
                                </span>
                            </div>
                            <div className="characteristic-row">
                                <span className="characteristic-label">Характеристика</span>
                                <span className="characteristic-value">
                                    Текст описания текст описания текст описания текст описания текст описания
                                </span>
                            </div>
                        </div>

                        <div className="modal-description">
                            <p>
                                Текст описания текст описания текст описания текст описания текст описания
                                текст описания текст описания текст описания текст описания текст описания
                                текст описания текст описания текст описания текст описания текст описания
                                текст описания текст описания текст описания текст описания текст описания текст описания
                            </p>
                        </div>

                        <div className="modal-actions">
                            <div className="quantity-selector">
                                <button onClick={decrementQuantity}>-</button>
                                <span>{quantity}</span>
                                <button onClick={incrementQuantity}>+</button>
                            </div>
                            <button className="add-to-cart-btn">В корзину</button>
                        </div>
                    </div>
                </div>

                <div className="modal-bottom-sections">
                    <section className="modal-section certificates-section">
                        <h2 className="section-title">Сертификаты</h2>
                        <div className="certificates-grid">
                            <div className="certificate-card">
                                <div className="certificate-content">
                                    <h3>Название сертификата название сертификата название сертификата</h3>
                                    <p>Размер файла</p>
                                    <button className="view-btn">СМОТРЕТЬ</button>
                                </div>
                            </div>
                            <div className="certificate-card">
                                <div className="certificate-content">
                                    <h3>Название сертификата название сертификата название сертификата</h3>
                                    <p>Размер файла</p>
                                    <button className="view-btn">СМОТРЕТЬ</button>
                                </div>
                            </div>
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
                            <div className="related-product-card large">
                                <div className="related-product-image">
                                    <img src={ProductPhoto} alt="Товар" />
                                </div>
                                <div className="related-product-info">
                                    <h3>НАЗВАНИЕ</h3>
                                    <p className="related-price">ЦЕНА</p>
                                </div>
                            </div>
                            <div className="related-product-card medium">
                                <div className="related-product-image">
                                    <img src={ProductPhoto} alt="Товар" />
                                </div>
                                <div className="related-product-info">
                                    <h3>НАЗВАНИЕ</h3>
                                    <p className="related-price">ЦЕНА</p>
                                </div>
                            </div>
                            <div className="related-product-card medium">
                                <div className="related-product-image">
                                    <img src={ProductPhoto} alt="Товар" />
                                </div>
                                <div className="related-product-info">
                                    <h3>НАЗВАНИЕ</h3>
                                    <p className="related-price">ЦЕНА</p>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );

    // ========== TABLET / MOBILE VIEW ==========
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
                        <h1 className="tm-product-title">НАЗВАНИЕ ТОВАРА</h1>
                        <p className="tm-product-price">5 000 рублей</p>

                        <div className="tm-product-chars">
                            <div className="tm-product-char-row">
                                <span className="tm-product-char-label">Характеристика</span>
                                <span className="tm-product-char-value">
                    Текст описания текст описания текст описания текст описания текст описания
                </span>
                            </div>
                            <div className="tm-product-char-row">
                                <span className="tm-product-char-label">Характеристика</span>
                                <span className="tm-product-char-value">
                    Текст описания текст описания текст описания текст описания текст описания
                </span>
                            </div>
                        </div>

                        <button className="tm-product-more">Большие характеристики</button>
                    </div>
                </div>

                <div className="tm-product-text">
                    <p>
                        Текст описания текст описания текст описания текст описания текст описания
                        текст описания текст описания текст описания текст описания текст описания
                        текст описания текст описания текст описания текст описания текст описания
                    </p>
                </div>

                <div className="tm-product-actions">
                    <div className="tm-quantity">
                        <button onClick={decrementQuantity}>-</button>
                        <span>{quantity}</span>
                        <button onClick={incrementQuantity}>+</button>
                    </div>
                    <button className="tm-cart-btn">В корзину</button>
                </div>


                <section className="tm-section">
                    <h2 className="tm-section-title">СМОТРИТЕ ТАКЖЕ</h2>
                    <div className="tm-related-grid">
                        <div className="tm-related-card tm-card-large">
                            <div className="tm-related-image">
                                <img src={ProductPhoto} alt="Товар" />
                            </div>
                            <div className="tm-related-info">
                                <h3>НАЗВАНИЕ</h3>
                                <p>ЦЕНА</p>
                            </div>
                        </div>
                        <div className="tm-related-small-group">
                            <div className="tm-related-card tm-card-small">
                                <div className="tm-related-image">
                                    <img src={ProductPhoto} alt="Товар" />
                                </div>
                                <div className="tm-related-info">
                                    <h3>НАЗВАНИЕ</h3>
                                    <p>ЦЕНА</p>
                                </div>
                            </div>
                            <div className="tm-related-card tm-card-small">
                                <div className="tm-related-image">
                                    <img src={ProductPhoto} alt="Товар" />
                                </div>
                                <div className="tm-related-info">
                                    <h3>НАЗВАНИЕ</h3>
                                    <p>ЦЕНА</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="tm-section">
                    <h2 className="tm-section-title">СЕРТИФИКАТЫ</h2>
                    <div className="tm-certs-grid">
                        <div className="tm-cert-card">
                            <h3>Название сертификата название сертификата название сертификата</h3>
                            <p>Размер файла</p>
                            <button className="tm-view-btn">СМОТРЕТЬ</button>
                        </div>
                        <div className="tm-cert-card">
                            <h3>Название сертификата название сертификата название сертификата</h3>
                            <p>Размер файла</p>
                            <button className="tm-view-btn">СМОТРЕТЬ</button>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );

    return isTabletMobile ? renderTabletMobileView() : renderDesktopView();
};

export default ProductModal;
