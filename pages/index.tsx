import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {SearchBar} from "../components/search";
import MarketSuggestions from "../components/suggestions/MarketSuggestions";
import {Footer} from "../components/footer";

export default function Home() {
    return (
        <div className={styles.container}>
            <Head>
                <title>Stock Market</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <SearchBar/>

            <MarketSuggestions/>
            {/*<Footer/>*/}

        </div>
    )
}
