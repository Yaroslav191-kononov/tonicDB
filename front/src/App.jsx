import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'

import { Home } from "./pages/HomePage/Home.jsx"
import {TonicsPage} from "./pages/TonicsPage/TonicsPage.jsx"
import {CartPage} from "./pages/CartPage/CartPage.jsx"
import {ProductPage} from "./pages/ProductPage/ProductPage.jsx";
import {CatalogPage} from "./pages/CatalogPage/CatalogPage.jsx";
import {AboutCompanyPage} from "./pages/AboutCompanyPage/AboutCompanyPage.jsx";
import {PartnersPage} from "./pages/PartnersPage/PartnersPage.jsx";
import {BlogPage} from "./pages/BlogPage/BlogPage.jsx";
import {BlogArticlePage} from "./components/BlogArticle/BlogArticlePage.jsx";
import {BlogIdPage} from "./pages/BlogIdPage/BlogIdPage.jsx";

function App() {
    const [count, setCount] = useState(0)

    return (
        <>
            <Routes>

                <Route path="/" element={<Home />} />
                <Route path="/product" element={<ProductPage />} />
                <Route path="/tonics" element={<TonicsPage />} />
                <Route path="/catalog" element={<CatalogPage />} />
                <Route path="/about" element={<AboutCompanyPage />} />
                <Route path="/partners" element={<PartnersPage />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/blog/:id" element={<BlogIdPage />} />
                <Route path="/cart" element={<CartPage />} />
            </Routes>
        </>
    )
}

export default App
