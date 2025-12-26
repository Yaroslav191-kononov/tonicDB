import Header from "../../components/Home/Header/Header.jsx";
import TonicsHero from "../../components/Tonics/TonicsHero/TonicsHero.jsx";
import {Tonics} from "../../components/Home/Tonics/Tonics.jsx";
import TonicsSeoText from "../../components/Tonics/TonicsSeoText/TonicsSeoText.jsx";
import TonicsIndustries from "../../components/Tonics/TonicsIndustries/TonicsIndustries.jsx";
import {ContactForm} from "../../components/Home/ContactForm/ContactForm.jsx";
import {SeoText} from "../../components/Home/SeoText/SeoText.jsx";
import {Footer} from "../../components/Home/Footer/Footer.jsx";
import './TonicsPage.css';


export const TonicsPage = () => {
    return(
        <>
            <Header />
            <div>
                <div className={'First_block'}>


                <TonicsHero/>
                <Tonics/>
                <TonicsSeoText/>
                <TonicsIndustries/>
                </div>
                <ContactForm formUIQUE="Tonic"/>
                <div className={'Second_block'}>
                <SeoText id='1'/>
                </div>
            </div>
            <div style={{backgroundColor: '#1e0d0d'}}>
            <Footer/>
            </div>


        </>

    )


}