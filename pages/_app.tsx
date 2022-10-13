import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/App.module.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Product Checkout</title>
        <meta name="description" content="Product checkout app" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <main className={styles.main}>
        <Component {...pageProps} />
      </main>

      <footer className={styles.footer}>
        <a
          href="https://oolio.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/icon.png" alt="oolio Logo" width={52} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}

export default MyApp
