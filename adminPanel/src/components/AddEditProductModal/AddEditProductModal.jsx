// src/components/AddEditProductModal/AddEditProductModal.jsx
import React, { useState, useEffect, useRef } from 'react';
import DownloadIcon from '../../assets/icons/download.png';
import PointerIcon from '../../assets/icons/pointer.svg';
import DeleteIcon from '../../assets/icons/delete.png';
import './AddEditProductModal.css';


const AddEditProductModal = ({ isOpen, onClose, product = null, onSave,allProducts }) => {
    const isEditMode = !!product;


// Основные данные
const [formData, setFormData] = useState({
    name: '',
    description: '',
    quantity: '',
    costPrice: '',
    price: '',
    category:'',
    type:'',
    catalogSection: ''
});

const [Char, setChar] = useState([]);
const [CERF,setCERF] = useState([]);
    const [cerf, setCERFIMG] = useState([]);
const [images, setImages] = useState([]);
const [tonicTypes, setTonicTypes] = useState([{ id: 1, value: '' }]);
const [benefitTypes, setBenefitTypes] = useState([{ id: 1, value: '' }]);
const [features, setFeatures] = useState([{ id: 1, title: '', description: '' }]);
const [certs, setCerts] = useState([{ id: 1, title: '', file: null }]);
const [extraProducts, setExtraProducts] = useState([{ id: 1, productId: null }]);

// Категории - динамические опции, включая текущее значение при редактировании
const categoryOptions = React.useMemo(() => {
    const base = [
        { value: 'Главная', label: 'Главная' },
        { value: 'О нас', label: 'О нас' },
        { value: 'Каталог', label: 'Каталог' },
    ];
    if (isEditMode && product?.category && !base.find(b => b.value === product.category)) {
        base.unshift({ value: product.category, label: product.category });
    }
    return base;
}, [isEditMode, product?.category]);

// Загрузка данных товара при редактировании
useEffect(() => {
    if (isEditMode && product) {
        setFormData({
            name: product.name || '',
            description: product.description || '',
            quantity: product.quantity || '',
            costPrice: product.costPrice || '',
            price: product.price || '',
            category: product.category || ''
        });

        // Загрузка изображений если они есть
        if (product.images) {
            setImages(product.images);
        }

        console.log('Editing product:', product);
    } else {
        // Сброс всех полей при создании нового товара
        setFormData({
            name: '',
            description: '',
            quantity: '',
            costPrice: '',
            price: '',
            category: ''
        });
        setImages([]);
        setTonicTypes([{ id: 1, value: '' }]);
        setBenefitTypes([{ id: 1, value: '' }]);
        setFeatures([{ id: 1, title: '', description: '' }]);
        setCerts([{ id: 1, title: '', file: null }]);
        setExtraProducts([{ id: 1, productId: null }]);
    }
}, [isEditMode, product]);
useEffect(() => {
        let canceled = false;

        fetch('http://localhost:3000/api/characteristic/').then((r) => r.json())
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
// Обработчики изменения основных полей
const handleInputChange = (field, value) => {
    setFormData(prev => ({
        ...prev,
        [field]: value
    }));
};

// Обработчики для features
const handleFeatureChange = (id, field, value) => {
    setFeatures(prev => prev.map(feat =>
        feat.id === id ? { ...feat, [field]: value } : feat
    ));
};

const addFeature = () => {
    setFeatures((prev) => [...prev, { id: crypto.randomUUID(), title: '', description: '' }]);
};

// Обработчики для tonicTypes
const handleTonicTypeChange = (id, value) => {
    setTonicTypes(prev => prev.map(item =>
        item.id === id ? { ...item, value } : item
    ));
};

const addTonicType = () => {
    setTonicTypes((prev) => [...prev, { id: crypto.randomUUID(), value: '' }]);
};

// Обработчики для benefitTypes
const handleBenefitTypeChange = (id, value) => {
    setBenefitTypes(prev => prev.map(item =>
        item.id === id ? { ...item, value } : item
    ));
};

const addBenefitType = () => {
    setBenefitTypes((prev) => [...prev, { id: crypto.randomUUID(), value: '' }]);
};

// Обработчики для сертификатов
const handleCertChange = (id, field, value) => {
    setCerts(prev => prev.map(cert =>
        cert.id === id ? { ...cert, [field]: value } : cert
    ));
};

const addCert = () => {
    setCerts((prev) => [...prev, { id: crypto.randomUUID(), title: '', file: null }]);
};

// Обработчики для дополнительных товаров
const addExtraProduct = () => {
    setExtraProducts((prev) => [...prev, { id: crypto.randomUUID(), productId: null }]);
};

useEffect(() => {
    if (!isEditMode || !product) return;
    // Ожидаем загрузки двух источников
    if (Char.length && CERF.length) {
    const feats = Char.filter(c => c.product_id === product.id).map(c => ({
      id: c.id,
      name: c.name || '',
      description: c.description || ''
    }));
    const certsList = CERF.filter(c => c.product_id === product.id).map(c => ({
      id: c.id,
      header: c.header || '',
      file: c.file || null
    }));
    setFeatures(feats.length ? feats : [{ name: '', description: '' }]);
    setCerts(certsList.length ? certsList : [{ header: '', file: null }]);

    }
}, [Char, CERF, isEditMode, product]);
useEffect(() => {
if (isEditMode && product) {
  setFormData({
    name: product.name || '',
    description: product.description || '',
    quantity: product.quantity || '',
    costPrice: product.costPrice || '',
    price: product.price || '',
    category: product.category || '',
    type:product.type,
    catalogSection: 3
  }); 
if (product.images && product.images.length) {
  setImages(product.images.map((src) => ({
    id: crypto.randomUUID(),
    url: src,
    file: null
  })));
} else if (product.image) {
  setImages([{ id: crypto.randomUUID(), url: product.image, file: null }]);
}

console.log('Editing product:', product);

} else {
    // Сброс при создании
    setFormData({
      name: '',
      description: '',
      quantity: '',
      costPrice: '',
      price: '',
      category: ''
    });
    setImages([]);
    setTonicTypes([{ id: 1, value: '' }]);
    setBenefitTypes([{ id: 1, value: '' }]);
    setFeatures([{ id: 1, title: '', description: '' }]);
    setCerts([{ id: 1, title: '', file: null }]);
    setExtraProducts([{ id: 1, productId: null }]);
}
}, [isEditMode, product]);

// Обработчики изображений
const handleImagesUpload = (event) => {
    const files = Array.from(event.target.files);
    if (!files.length) return;

    const newImages = files.map((file) => ({
        id: crypto.randomUUID(),
        url: URL.createObjectURL(file),
        file,
    }));

    setImages((prev) => [...prev, ...newImages].slice(0, 4));
};

const handleRemoveImage = (id) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
};

// Валидация формы
const validateForm = () => {
    if (!formData.name.trim()) {
        alert('Введите название товара');
        return false;
    }
    if (!formData.price) {
        alert('Введите цену товара');
        return false;
    }
    return true;
};
    const handleCERFUpload = async(event) => {
        const files = Array.from(event.target.files || []);
        if (!files.length) return;
        const newImages = files.map((file) => ({
            id: crypto.randomUUID(),
            url: URL.createObjectURL(file),
            file,
        }));

        setCERFIMG((prev) => [...prev, ...newImages].slice(0, 4));
    };
// Сохранение товара
const handleSave = async() => {
    if (!validateForm()) return;
console.log(formData);
    const productData = {
        id: isEditMode ? product.id : crypto.randomUUID(),
        ...formData,
        cerf:cerf,
        images: images,
        features: features.filter(f => f.name || f.description),
        tonicTypes: tonicTypes.filter(t => t.value),
        benefitTypes: benefitTypes.filter(b => b.value),
        certs: certs.filter(c => c.header || c.file.name || c.file.name),
    };
    console.log(productData);

        const res = await fetch('http://localhost:3000/api/addProduct/update', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(productData),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || 'Ошибка отправки');
    }
    const data = await res.json();
    console.log('Успешно:', data);
    //window.location.reload()
};

// Опции для Типа тоника и Вида пользы - с учётом текущего товара
const tonicTypeOptions = React.useMemo(() => {
    const values = allProducts.map(p => p.category);
    const unique = Array.from(new Set(values.filter(v => typeof v === 'string' && v.trim() !== '')));
    // Добавляем текущее значение категории товара, если редактирование и оно отсутствует
    if (isEditMode && product?.category && !unique.includes(product.category)) {
        unique.unshift(product.category);
    }
    return unique;
}, [allProducts, isEditMode, product?.category]);

const benefitOptions = React.useMemo(() => {
    const values = (allProducts || []).map(p => p.usefull);
    const unique = Array.from(new Set(values.filter(v => typeof v === 'string' && v.trim() !== '')));
    if (isEditMode && product?.usefull && !unique.includes(product.usefull)) {
        unique.unshift(product.usefull);
    }
    return unique;
}, [allProducts, isEditMode, product?.usefull]);

if (!isOpen) return null;

return (
    <>
        <div className="AddProductOverlay" onClick={onClose}></div>
        <aside className="AddProductPanel" onClick={(e) => e.stopPropagation()}>
            <div className="AddProductPanel_header">
                <h2>{isEditMode ? 'Редактирование товара' : 'Создание товара'}</h2>
                <button className="AddProductPanel_close" onClick={onClose}>
                    ✕
                </button>
            </div>

            <div className="AddProductPanel_body">
                <div className="AddProductPanel_grid">
                    {/* ЛЕВАЯ КОЛОНКА */}
                    <div className="AddProductPanel_col">
                        <div className="AddProductPanel_group">
                            <label>Название товара</label>
                            <input
                                type="text"
                                placeholder="Название товара"
                                className="field-input"
                                value={formData.name}
                                onChange={(e) => handleInputChange('name', e.target.value)}
                            />
                        </div>

                        <div className="AddProductPanel_group">
                            <label>Описание</label>
                            <textarea
                                placeholder="Описание"
                                className="field-textarea field-textarea--description"
                                value={formData.description}
                                onChange={(e) => handleInputChange('description', e.target.value)}
                            ></textarea>
                        </div>

                        <div className="AddProductPanel_block">
                            <p className="AddProductPanel_block_title">Характеристики товара</p>
                            {features.map((feat, index) => (
                                <React.Fragment key={feat.id}>
                                    <p className="AddProductPanel_subtitle">Раздел №{index + 1}</p>
                                    <div className="AddProductPanel_group">
                                        <input
                                            type="text"
                                            placeholder="Заголовок"
                                            className="field-input"
                                            value={feat.name}
                                            onChange={(e) => handleFeatureChange(feat.id, 'name', e.target.value)}
                                        />
                                    </div>
                                    <div className="AddProductPanel_group">
                                        <input
                                            type="text"
                                            placeholder="Описание"
                                            className="field-input"
                                            value={feat.description}
                                            onChange={(e) => handleFeatureChange(feat.id, 'description', e.target.value)}
                                        />
                                    </div>
                                </React.Fragment>
                            ))}
                            <button type="button" className="AddProductPanel_link" onClick={addFeature}>
                                Добавить характеристику
                            </button>
                        </div>
                    </div>

                    {/* ПРАВАЯ КОЛОНКА */}
                    <div className="AddProductPanel_col">
                        <div className="AddProductPanel_block">
                            <p className="AddProductPanel_block_title">Фото товара</p>
                            <div className="AddProductPanel_group">
                                <label className="AddProductPanel_upload AddProductPanel_upload--main">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        multiple
                                        onChange={handleImagesUpload}
                                        className="AddProductPanel_upload_input"
                                    />
                                    <div className="AddProductPanel_upload_content">
                                        <img src={DownloadIcon} alt="" />
                                        <span>
                                            Перетащите фото или <button type="button">Загрузить</button>
                                        </span>
                                    </div>
                                </label>
                            </div>

                            <div className="AddProductPanel_photos_row">
                                {images.map((img) => (
                                    <div key={img.id} className="AddProductPanel_photo_small">
                                        <img src={img.url} alt="" className="AddProductPanel_photo_img" />
                                        <div className="AddProductPanel_photo_actions">
                                            <button
                                                type="button"
                                                className="AddProductPanel_icon-btn"
                                                onClick={() => handleRemoveImage(img.id)}
                                            >
                                                <img src={DeleteIcon} alt="" />
                                            </button>
                                            <button type="button" className="AddProductPanel_icon-btn">
                                                <img src={PointerIcon} alt="" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="AddProductPanel_inline">
                            <div className="AddProductPanel_group">
                                <label>Количество</label>
                                <input
                                    type="text"
                                    placeholder="1 шт."
                                    className="field-input"
                                    value={formData.quantity}
                                    onChange={(e) => handleInputChange('quantity', e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="AddProductPanel_inline AddProductPanel_inline--2">
                            <div className="AddProductPanel_group">
                                <label>Себестоимость</label>
                                <input
                                    type="text"
                                    placeholder="10 000"
                                    className="field-input"
                                    value={formData.costPrice}
                                    onChange={(e) => handleInputChange('costPrice', e.target.value)}
                                />
                            </div>
                            <div className="AddProductPanel_group">
                                <label>Цена</label>
                                <input
                                    type="text"
                                    placeholder="20 000"
                                    className="field-input"
                                    value={formData.price}
                                    onChange={(e) => handleInputChange('price', e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="AddProductPanel_group">
                            <label>Раздел каталога</label>
                            <select
                                className="field-input"
                                onChange={(e) => setFormData({ ...formData, catalogSection: e.target.value })}
                            >
                                            <option value={1}>Главная</option>
                                            <option value={2}>О нас</option>
                                            <option value={3}>Каталог</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* ДОПОЛНИТЕЛЬНЫЕ БЛОКИ */}
                <div className="AddProductPanel_row">
                    <div className="AddProductPanel_block">
                        <p className="AddProductPanel_block_title AddProductPanel_block_title--accent">
                            Сертификаты
                        </p>
                        {certs.map((cert) => (
                            <div className="AddProductPanel_group" key={cert.id}>
                                <label>Заголовок</label>
                                <input
                                    type="text"
                                    placeholder="Заголовок"
                                    className="field-input"
                                    value={cert.header}
                                    onChange={(e) => handleCertChange(cert.id, 'header', e.target.value)}
                                />
                                <label>Файл документа</label>
                                <label className="AddProductPanel_upload AddProductPanel_upload--main">
                                    <input
                                        type="file"
                                        accept=".pdf,.jpg,.png,.doc,.docx"
                                        className="AddProductPanel_upload_input"
                                        onChange={handleCERFUpload}
                                    />
                                    <div className="AddProductPanel_upload_content">
                                        <img src={DownloadIcon} alt="" />
                                        <span>
                                            {cert.file ? cert.file.name : <button type="button">Загрузить</button>}
                                        </span>
                                    </div>
                                </label>
                            </div>
                        ))}
                        <button type="button" className="AddProductPanel_link" onClick={addCert}>
                            Добавить еще
                        </button>
                    </div>

                    <div className="AddProductPanel_block">
                        <p className="AddProductPanel_block_title AddProductPanel_block_title--accent">
                            Дополнительные товары
                        </p>
                        {extraProducts.map((ep) => (
                            <div className="AddProductPanel_group" key={ep.id}>
                                <label>Выбрать Товар</label>
                                <button type="button" className="AddProductPanel_select-btn">
                                    Выбрать из каталога
                                </button>
                            </div>
                        ))}
                        <button type="button" className="AddProductPanel_link" onClick={addExtraProduct}>
                            Добавить товар
                        </button>
                    </div>
                </div>

                {/* НИЖНИЙ РЯД */}
                <div className="AddProductPanel_bottom-row">
                    <div className="AddProductPanel_group">
                        <p className="AddProductPanel_block_title AddProductPanel_block_title--accent">
                            Тип тоника
                        </p>
                        <label>Тип</label>
                        {tonicTypes.map((item) => (
                            <select
                                key={item.id}
                                className="field-input"
                                value={product?.category}
                                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                            >
                                <option value="">Тип тоника</option>
                                  {tonicTypeOptions.map(opt => (
                                    <option key={opt} value={opt}>{opt}</option>
                                  ))}
                            </select>
                        ))}
                        <button type="button" className="AddProductPanel_link" onClick={addTonicType}>
                            Добавить еще
                        </button>
                    </div>

                    <div className="AddProductPanel_group">
                        <p className="AddProductPanel_block_title AddProductPanel_block_title--accent">
                            Вид пользы
                        </p>
                        <label>Вид пользы</label>
                        {benefitTypes.map((item) => (
                            <select
                                key={item.id}
                                className="field-input"
                                value={product?.usefull}
                                 onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            >
                                <option value="">Вид пользы</option>
                                  {benefitOptions.map(opt => (
                                    <option key={opt} value={opt}>{opt}</option>
                                  ))}
                            </select>
                        ))}
                        <button type="button" className="AddProductPanel_link" onClick={addBenefitType}>
                            Добавить еще
                        </button>
                    </div>
                </div>
            </div>

            <div className="AddProductPanel_footer">
                <button className="AddProductPanel_save" onClick={handleSave}>
                    {isEditMode ? 'Сохранить' : 'Создать'}
                </button>
                <button className="AddProductPanel_cancel" onClick={onClose}>
                    Отменить
                </button>
            </div>
        </aside>
    </>
);

};


export default AddEditProductModal;