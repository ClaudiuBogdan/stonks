// import Swiper core and required modules
import SwiperCore, {Autoplay} from 'swiper';
import '../styles/globals.scss'
import 'swiper/swiper.scss';


// install Swiper modules
SwiperCore.use([Autoplay]);


import type {AppProps /*, AppContext */} from 'next/app'

function MyApp({Component, pageProps}: AppProps) {
    return <Component {...pageProps} />
}

export default MyApp
