import Header from "../../components/Home/Header/Header.jsx";
import {Partners} from "../../components/Home/Partners/Partners.jsx";
import partnerLogo from '../../assets/Image/partner-logo.svg';
import {ContactForm} from "../../components/Home/ContactForm/ContactForm.jsx";
import {SeoText} from "../../components/Home/SeoText/SeoText.jsx";
import {Footer} from "../../components/Home/Footer/Footer.jsx";
import React from "react";
export const PartnersPage = () => {
    return (
        <>
            <Header />
            <main>
                <div className='partner_container'>
                    <Partners

                        variant="featured-double"
                        title="Партнеры"
                        titleShort="Партнеры"
                        showAllLink={false}
                        style={{borderRadius: '0'}}
                        featuredItems={[
                            {
                                title: 'Институт\nчеловека',
                                link: '#',

                            },
                            {
                                title: 'Суверенный\nкурс',
                                link: '#',
                                content: <img src={partnerLogo} alt="" />
                            }
                        ]}
                    />

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