import Header from "../../components/Home/Header/Header.jsx";
import Catalog from "../../components/Catalog/Catalog/Catalog.jsx";
import '../../index.css'
import FAQ from "../../components/Catalog/FAQ/FAQ.jsx";
import {ContactForm} from "../../components/Home/ContactForm/ContactForm.jsx";
import {SeoText} from "../../components/Home/SeoText/SeoText.jsx";
import {Footer} from "../../components/Home/Footer/Footer.jsx";
import React from "react";

export const CatalogPage = () => {
    return (
        <>
            <Header />
            <main>
                <div>
                    <Catalog/>
                    <FAQ/>
                </div>
                    <ContactForm/>
                <div>
                    <SeoText/>
                </div>
            </main>
            <div style={{backgroundColor: '#1e0d0d', borderRadius: ''}}>
                <Footer />
            </div>
        </>

    )
}