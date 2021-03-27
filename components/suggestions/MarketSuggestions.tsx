import useSWR from "swr";
import fetcher from "../../utils/fetcher";
import {MarketSuggestionData} from "../../pages/api/suggestions/markets";
import {Swiper, SwiperSlide} from "swiper/react";
import DetailedMarketSummary from "./DetailedMarketSummary";
import MarketSummary from "./MarketSummary";
import styles from './Suggestions.module.scss'

export default function MarketSuggestions() {

    const {data: results, error} = useSWR<MarketSuggestionData>(`/api/suggestions/markets/`, fetcher)
    const sections = results ? results.data.sections : []
    const topSections = (results && results.data.topSections) ?? [];


    return (<div>
        <div>
            {topSections.map((section) => (
                <div key={section.name}>
                    <h2>{section.name}</h2>
                    <Swiper
                        className={styles['container']}
                        //FIXME: Change value base on screen width
                        slidesPerView={4}
                        centeredSlides={true}
                        loop={true}
                        autoplay={{delay: 3000, disableOnInteraction: false}}
                        spaceBetween={50}>
                        {section.markets.map(e => (
                            <SwiperSlide
                                key={e.symbol}
                                className={styles['market-container']}>
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
                    <h2>{section.name}</h2>
                    <Swiper
                        className={styles['container']}
                        slidesPerView={3}
                        centeredSlides={true}
                        loop={true}>
                        {section.markets.map(e => (
                            <SwiperSlide
                                key={e.symbol}
                                className={styles['market-container']}>
                                <MarketSummary market={e}/>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            ))}
        </div>

    </div>)
}
