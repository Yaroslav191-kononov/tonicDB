import Header from "../../components/Home/Header/Header.jsx";
import {BlogArticlePage} from "../../components/BlogArticle/BlogArticlePage.jsx";
import {Footer} from "../../components/Home/Footer/Footer.jsx";
import React from "react";

export const BlogIdPage = () => {
    return (
        <>
            <Header />
            <main>
                <div>
                    <BlogArticlePage/>
                </div>
            </main>
            <div style={{backgroundColor: '#1e0d0d', borderRadius: ''}}>
                <Footer />
            </div>
        </>
    )
}