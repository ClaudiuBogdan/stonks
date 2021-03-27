import Link from "next/link";
import useSWR from "swr";
import fetcher from "../../utils/fetcher";
import {MarketSuggestionData} from "../../pages/api/suggestions/markets";
import MarketSparkline from "./MarketSparkline";
import styles from './Suggestions.module.scss'
import {Swiper, SwiperSlide} from "swiper/react";

export default function MarketSuggestions() {

    const {data: results, error} = useSWR<MarketSuggestionData>(`/api/suggestions/markets/`, fetcher)
    const sections = results ? results.data.sections : []
    return (<div>
        <div>
            {sections.map((section, sectionIndex) => (
                <div key={section.name}>
                    <h2>{section.name}</h2>
                    <Swiper
                        className={styles['container']}
                        slidesPerView={3}
                        centeredSlides={true}
                        loop={true}
                        {...(sectionIndex === 0 && {
                            slidesPerView: 3,
                            spaceBetween: 50,
                            autoplay: {delay: 3000, disableOnInteraction: false},
                        })}>
                        {section.markets.map(e => (
                            <SwiperSlide
                                key={e.symbol}
                                className={styles['market-container']}>
                                <Link href={`/markets/${encodeURIComponent(e.symbol)}`}>
                                    <div style={{cursor: "pointer"}}>
                                        {e.name}
                                        <MarketSparkline sparklines={e.sparklines}/>
                                    </div>
                                </Link>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            ))}
        </div>

    </div>)
}
