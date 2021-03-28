import useSWR from "swr";
import fetcher from "../../utils/fetcher";
import {MarketSuggestionData} from "../../pages/api/suggestions/markets";
import {Swiper, SwiperSlide} from "swiper/react";
import DetailedMarketSummary from "./DetailedMarketSummary";
import MarketSummary from "./MarketSummary";
import styles from './styles/Suggestions.module.scss'
import {breakpoints, useWindowSize} from "../../utils/window";

export default function MarketSuggestions() {

    const windowSize = useWindowSize()
    const {data: results, error} = useSWR<MarketSuggestionData>(`/api/suggestions/markets/`, fetcher)

    const sections = results ? results.data.sections : []
    const topSections = (results && results.data.topSections) ?? [];

    const detailedCardsPerView = getDetailedCardsPerView(windowSize.width)
    const secondaryCardsPerView = getSecondaryCardsPerView(windowSize.width)

    return (<div>
        <div>
            {topSections.map((section) => (
                <div key={section.name}>
                    <h2 className={styles['section-title']}>
                        {section.name}
                    </h2>
                    <Swiper
                        className={styles['container']}
                        //FIXME: Change value base on screen width
                        slidesPerView={detailedCardsPerView}
                        centeredSlides={true}
                        loop={true}
                        autoplay={{delay: 3000, disableOnInteraction: false}}
                        spaceBetween={50}>
                        {section.markets.map(e => (
                            <SwiperSlide
                                key={e.symbol}
                                className={styles['card-container']}>
                                <DetailedMarketSummary market={e}/>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            ))}
        </div>
        <div>
            {sections.map((section, sectionIndex) => (
                <div key={section.name}>
                    <h2 className={styles['section-title']}>
                        {section.name}
                    </h2>
                    <Swiper
                        className={styles['container']}
                        slidesPerView={secondaryCardsPerView}
                        spaceBetween={25}
                        centeredSlides={true}
                        loop={true}>
                        {section.markets.map(e => (
                            <SwiperSlide
                                key={e.symbol}
                                className={styles['card-container']}>
                                <MarketSummary market={e}/>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            ))}
        </div>

    </div>)
}

function getDetailedCardsPerView(size: number) {

    const defaultViews = 1

    if (size > breakpoints.screenXXl) {
        return 4
    }

    if (size > breakpoints.screenXl) {
        return 3.5
    }

    if (size > breakpoints.screenLd) {
        return 2.5
    }

    if (size > breakpoints.screenMd) {
        return 2
    }

    if (size > breakpoints.screenSm) {
        return 1.5
    }

    return defaultViews
}


function getSecondaryCardsPerView(size: number) {

    const defaultViews = 2

    if (size > breakpoints.screenXXl) {
        return 8
    }

    if (size > breakpoints.screenXl) {
        return 6.5
    }

    if (size > breakpoints.screenLd) {
        return 4.5
    }

    if (size > breakpoints.screenMd) {
        return 4
    }

    if (size > breakpoints.screenSm) {
        return 3
    }

    return defaultViews
}