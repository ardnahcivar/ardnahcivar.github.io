import styles from './blog-header.module.css';

import dateReadableFormat from '../../utils/date-formatter';

const BlogHeader = props => {
    const {title, date} = props;

    return(
        <div className={styles.blogHeader}>
            <h1 className={styles.blogTitle}>
                {title}
            </h1>
            <div className={styles.dateContainer}>
                <span className={styles.dateValue}>{`Created on ${dateReadableFormat(+date)}`}</span>
            </div>
        </div>
    )
}

export default BlogHeader;