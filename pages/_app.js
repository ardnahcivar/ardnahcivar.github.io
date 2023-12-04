import '../styles/globals.css'
import Header from './../components/header';
import styles from './index.module.css';

function MyApp({ Component, pageProps }) {
  return(
    <>
      <Header />
      <main className={styles.main}>
          <Component {...pageProps}/>
      </main>
    </>
  ) 
}

export default MyApp
