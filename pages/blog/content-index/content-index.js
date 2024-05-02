
import styles from './content-index.module.css';
import ActiveLink from './../../../components/active-link';

export const ContentIndex = props => {

    const listOfArticles = [
        {
            key: 'lift-simulation',
            title: 'Create a UI to show simulation of Lifts'
        },
        // {
        //     key: 'for-loops',
        //     title: 'Different for loops, which to use when ?',
        // },

        {
            key: 'create-your-own-dom',
            title: 'Create your own DOM API implementation',
            createdDate: '1701585924844'
        },
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
                    <span className={styles.listItemId}>{`${index+1}. `}</span>
                    <span className={styles.listItemTitle}>{item.title}</span>
                   </ActiveLink>
                </li>
                )}
            </ul>
        </div>
    )
}

export default ContentIndex;