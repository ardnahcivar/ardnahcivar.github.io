import Head from 'next/head';

import styles from './header.module.css';
import ActiveLink from './active-link';

const title = `Ravichandra Bhanage`;

const Header = () => (
    <>
        <Head>
            <title>{title}</title>
            <meta name="viewport" content="initial-scale=1.0, width=device-width"></meta>
            <meta name="author" content="ravichandra bhanage, ravi, ravii.xyz, ravii"></meta>
            <meta name="keywords" content="Tech, Frontend Engineer, UI, Javascript, Web, Software Engineer, ravi, ravii, ravii.xyz"></meta>
            <meta name="description" content="Frontend Engineer with expertise in building web based applications"></meta>
        </Head>
        <header className={styles.header}>
            <ul>
                <li>
                    <ActiveLink href="/">Home</ActiveLink>
                </li>
                {/* <li>
                    <ActiveLink href="/work">work</ActiveLink>
                </li> */}
                <li>
                    <ActiveLink href="/about-me">About-me</ActiveLink>
                </li>
                <li>
                    <ActiveLink href="/blog">Blog</ActiveLink>
                </li>
            </ul>
        </header>
    </>
);

export default Header;