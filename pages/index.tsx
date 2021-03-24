import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>


      <footer className={styles.footer}>
        <a
          href="#"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '} Claudiu's skills
        </a>
      </footer>
    </div>
  )
}
