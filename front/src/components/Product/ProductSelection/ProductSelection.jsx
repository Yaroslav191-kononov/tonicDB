import './ProductSelection.css';
import productPhoto from '../../../assets/Image/ProductPhoto.jpg';
import React, { useEffect, useState } from 'react';
import { mockData, fetchMockData } from '../../../data/data.js';
export const ProductSelection = () => {
      const [products, setProducts] = useState([]);
      const [loading, setLoading] = useState(true);

      useEffect(() => {
        let canceled = false;
        setLoading(true);
        fetchMockData()
          .then((data) => {
            if (canceled) return;
            console.log(data.catalogProduct);
            setProducts(data.catalogProduct);
            setLoading(false);
          })
          .catch(() => {
            if (!canceled) {
              setLoading(false);
            }
          });
        return () => {
          canceled = true;
        };
      }, []);
    if (loading) {
        return (
          <section className="ProductInfo">
            <div className="ProductInfo_container container">
              Загрузка...
            </div>
          </section>
        );
    }
    else{
    return (
        <section className="ProductSelection">
            <div className="ProductSelection_container container">
                <h2 className="ProductSelection_title">{products?.title}</h2>

                <div className="ProductSelection_grid">
                    {products?.products.map((product) => (
                        <div key={product.id} className="ProductSelection_card">
                            <div className="ProductSelection_card_image">
                                {console.log(product)}
                                <img src={product.image} alt={product.name} />
                            </div>
                            <div className="ProductSelection_card_info">
                                <p className="ProductSelection_card_name">{product.name}</p>
                                <p className="ProductSelection_card_price">{product.price}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <button className="ProductSelection_button">показать еще</button>
            </div>
        </section>
    );
    }
};
