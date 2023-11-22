import '../styles/globals.css'
import Header from './../components/header';
import styles from './index.module.css';

function MyApp({ Component, pageProps }) {
  return(
    <>
      <Header />
      <div className={styles.main}>
        <Component {...pageProps}/>
      </div>
    </>
  ) 
}

export default MyApp
