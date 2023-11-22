
import styles from './content-index.module.css';
import ActiveLink from './../../../components/active-link';

export const ContentIndex = props => {

    const listOfArticles = [
       {

        key:'otp-input',
        title:  'Creating a OTP input Component'
       }
    ];

    return(
        <div className={styles.container}>
            <h1>List of contents</h1>
            <ul className={styles.listContainer}>
                {listOfArticles.map((item, index) => 
                
                <li className={styles.listItem} key={item.key}>
                   <ActiveLink href={`/blog/${item.key}`}>
                    <span>{`${index+1}. `}</span>
                    <span className={styles.listItemTitle}>{item.title}</span>
                   </ActiveLink>
                </li>
                )}
            </ul>
        </div>
    )
}