import React, { useEffect, useState } from 'react';
import './Catalog.css';
import card1 from '../../../assets/Image/card1.svg';
import card2 from '../../../assets/Image/card2.svg';
import card3 from '../../../assets/Image/card3.svg';
import card4 from '../../../assets/Image/card4.svg';
import Pointer from "../../../assets/Image/Pointer.svg";

// Импортируем общий загрузчик данных
import { mockData,fetchMockData } from '../../../data/data.js';
export const Catalog = () => {
  // Базовые значения на случай отсутствия ответа
  const [products, setProducts] = useState([

  ]);
  

  // Подгрузка данных из БД при монтировании
  useEffect(() => {
    let isMounted = true;
        fetchMockData()
          .then((data) => {
            if (!data || !isMounted) return;
            const productsData = data?.catalog;
            setProducts({
              title:productsData.title,
              productsData:productsData.products
            });
          })
          .catch((err) => {
            console.error('Failed to fetch about via mock data', err);
            // можно оставить дефолтные значения
          });
    
        return () => {
          isMounted = false;
        };
  }, []);

  return (
    <section className="Catalog_section container">
      <div className="Catalog_header">
        <h2 className="Catalog_title">{products.title}</h2>
        <a href="#all" className="Catalog_link_all">ВСЕ ТОВАРЫ
          <img src={Pointer} alt="pointer" />
        </a>
      </div>

      <div className="Catalog_row">
        {products?.productsData?.map((product) => (
          <div
            key={product.id}
            className={`Catalog_card Catalog_card--${product.size}`}
          >
            <div className="Catalog_card_image">
              <img src={product.image ?? card1} alt={product.name} />
            </div>
            <div className="Catalog_card_info">
              <h3 className="Catalog_card_name">{product.name}</h3>
              <p className="Catalog_card_price">{product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
