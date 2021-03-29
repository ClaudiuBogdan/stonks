// import Swiper core and required modules
import SwiperCore, {Autoplay} from 'swiper';
import '../styles/globals.scss'
import 'swiper/swiper.scss';


// install Swiper modules
SwiperCore.use([Autoplay]);


import type {AppProps /*, AppContext */} from 'next/app'
import styles from "../styles/Home.module.css";
import {Footer} from "../components/footer";

function MyApp({Component, pageProps}: AppProps) {
    return (<div className={'page-container'}>

        <div className={'content-wrap'}>
            <Component {...pageProps} />
        </div>

        <div className={'footer'}>
            <Footer/>
        </div>
    </div>)
}

export default MyApp
