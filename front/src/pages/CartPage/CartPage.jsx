import Header from "../../components/Home/Header/Header.jsx";
import {Cart} from "../../components/Cart/Cart.jsx";
import {Footer} from "../../components/Home/Footer/Footer.jsx";
import React from "react";
import { useNavigate } from 'react-router-dom';
export const CartPage = () => {
  const navigate = useNavigate();

    return (
        <>
            <Header />
            <main>
                <div>
                    <Cart isOpen={true} onClose={() => navigate('/catalog')} />
                </div>
            </main>
            <div style={{backgroundColor: '#1e0d0d', borderRadius: ''}}>
                <Footer />
            </div>
        </>
    )
}
