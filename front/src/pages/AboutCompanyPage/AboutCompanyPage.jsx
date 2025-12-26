import Header from "../../components/Home/Header/Header.jsx";
import AboutCompany from "../../components/About/AboutCompany/AboutCompany.jsx";
import OurGoals from "../../components/About/OurGoals/OurGoals.jsx";
import Invitation from "../../components/About/Invitation/Invitation.jsx";
import {ContactForm} from "../../components/Home/ContactForm/ContactForm.jsx";
import {SeoText} from "../../components/Home/SeoText/SeoText.jsx";
import {Footer} from "../../components/Home/Footer/Footer.jsx";
import React from "react";

export const AboutCompanyPage = () => {
    return (
        <>
            <Header/>
            <main>
                <div style={{backgroundColor: '#1e0d0d'}}>
                    <AboutCompany/>
                    <OurGoals/>
                    <Invitation/>

                </div>
                <ContactForm formUIQUE="About"/>
                <div>
                    <SeoText id='1'/>
                </div>
            </main>
            <div style={{backgroundColor: '#1e0d0d', borderRadius: ''}}>
                <Footer />
            </div>
        </>
    )
}