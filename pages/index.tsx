import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {SearchBar} from "../components/search";

export default function Home() {
    return (
        <div className={styles.container}>
            <Head>
                <title>Create Next App</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <SearchBar/>

            <footer className={styles.footer}>
                <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Footer
                </a>
            </footer>
        </div>
    )
}
