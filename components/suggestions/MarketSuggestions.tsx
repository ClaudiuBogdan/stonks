import {MarketSection} from "../../pages/api/suggestions/markets";
import {Swiper, SwiperSlide} from "swiper/react";
import DetailedMarketSummary from "./DetailedMarketSummary";
import MarketSummary from "./MarketSummary";
import styles from './styles/Suggestions.module.scss'
import {getDetailedCardsPerView, getSecondaryCardsPerView} from "./utils";

interface MarketSuggestionsProps {
    sections: MarketSection[]
    topSections: MarketSection[]
    windowSize: {
        width: number
        height: number
    }
}

export default function MarketSuggestions({sections, topSections, windowSize}: MarketSuggestionsProps) {

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