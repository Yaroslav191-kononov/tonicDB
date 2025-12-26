import Header from "../../components/Home/Header/Header.jsx";
import {Blog} from "../../components/Home/Blog/Blog.jsx";
import {Footer} from "../../components/Home/Footer/Footer.jsx";
import React from "react";

export const BlogPage = () => {
    return (
        <>
            <Header />
            <main>
                <div>
                    <Blog
                        variant="extended"
                        title="Блог"
                        showAllLink={false}
                        showSearchBar={true}
                        categories={[]}
                    />
                </div>
            </main>
            <div style={{backgroundColor: '#1e0d0d', borderRadius: ''}}>
                <Footer />
            </div>
        </>
    )
}