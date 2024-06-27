
import styles from './content-index.module.css';
import ActiveLink from './../../../components/active-link';
import dateReadableFormat from '../../../utils/date-formatter';

export const ContentIndex = props => {

    const listOfArticles = [
        {
            key: 'event-emitter',
            title:'Event emitter',
            createdDate:'1719506289147'
        },
        {
            key: 'circles-game',
            title: 'Circles game',
            createdDate:'1718613890134'
        },
        {
            key: 'interactive-velocity-chart',
            title: 'Interactive Velocity chart',
            createdDate:'1718211820229'
        },
        {
            key: 'interactive-shape',
            title: 'Interactive shape',
            createdDate:'1717483387629'
        },
        {
            key: 'f1-race-flood-lights',
            title: 'F1 race flood lights',
            createdDate:'1715016849555'
        },

        {
            key: 'lift-simulation',
            title: 'Create a UI to show simulation of Lifts',
            createdDate: '1706634205924'
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
            title:  'Creating a OTP input Component',
            createdDate: '1698690600000'
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
                    <span className={styles.listItemDate}>{dateReadableFormat(+item.createdDate)}</span>
                   </ActiveLink>
                </li>
                )}
            </ul>
        </div>
    )
}

export default ContentIndex;