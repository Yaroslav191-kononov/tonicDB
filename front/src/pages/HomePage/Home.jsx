import React from 'react';
import { Hero } from '../../components/Home/Hero/Hero.jsx';
import { Tonics } from '../../components/Home/Tonics/Tonics.jsx';
import { Catalog } from '../../components/Home/Catalog/Catalog.jsx';
import { About } from '../../components/Home/About/About.jsx';
import { ContactForm } from '../../components/Home/ContactForm/ContactForm.jsx';
import './Home.css';
import Header from "../../components/Home/Header/Header.jsx";
import {Footer} from "../../components/Home/Footer/Footer.jsx";
import {Partners} from "../../components/Home/Partners/Partners.jsx";
import {Blog} from "../../components/Home/Blog/Blog.jsx";
import {SeoText} from "../../components/Home/SeoText/SeoText.jsx";
import '../../index.css'
export const Home = () => {
    return (
        <>
            <Header />
            <main>
                <div className={'First_block'}>
                 <Hero />
                 <Tonics />
                 <Catalog />
                 <About />
                </div>
                 <ContactForm />
                <div className={'Second_block'} >
                 <Partners/>
                 <Blog/>
                </div>
                 <ContactForm formUIQUE="Home"/>
                <div className={'Third_block'} >
                 <SeoText id='1'/>
                </div>
            </main>
            <div style={{backgroundColor: '#1e0d0d', borderRadius: ''}}>
            <Footer />
            </div>
        </>
    );
};
