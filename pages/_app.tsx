// import Swiper core and required modules
import SwiperCore, {Navigation, Autoplay} from 'swiper';

import '../styles/globals.scss'
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';

// install Swiper modules
SwiperCore.use([Navigation, Autoplay]);


import type {AppProps /*, AppContext */} from 'next/app'

function MyApp({Component, pageProps}: AppProps) {
    return <Component {...pageProps} />
}

export default MyApp
