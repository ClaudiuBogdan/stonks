import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {SearchBar} from "../components/search";
import MarketSuggestions from "../components/suggestions/MarketSuggestions";
import {MarketSuggestionData} from "./api/suggestions/markets";
import fetcher from "../utils/fetcher";
import useSWR from 'swr';
import {useWindowSize} from "../utils/window";

export default function Home({initialSections = [], initialTopSections = []}: any) {

    const windowSize = useWindowSize()

    //FIXME: Handle error
    const {data: results, error} = useSWR<MarketSuggestionData>(`/api/suggestions/markets/`, fetcher)
    const sections = results ? results.data.sections : initialSections
    const topSections = (results && results.data.topSections) ?? initialTopSections;

    return (
        <div className={styles.container}>
            <Head>
                <title>Stock Market</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <SearchBar/>

            <MarketSuggestions {...{sections, topSections, windowSize}}/>
            {/*<Footer/>*/}

        </div>
    )
}

// This gets called at build time
// Problems with ColorThief while generating the page statically
// export async function getStaticProps() {
//
//     let initialSections: MarketSection[] = []
//     let initialTopSections: MarketSection[] = []
//
//     try {
//         const {data} = await fetcher<MarketSuggestionData>(`${Config.baseUrl}/api/suggestions/markets/`)
//         initialSections = data.sections
//         initialTopSections = data.topSections ?? []
//     } catch (e) {
//         console.error(e)
//     }
//
//     // Pass post data to the page via props
//     return {props: {initialSections, initialTopSections}}
// }