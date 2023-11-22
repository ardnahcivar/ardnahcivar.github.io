
import styles from './blog-content.module.css';

const BlogContent = props => {
    const { children } = props;

    return(
        <div className={styles.blogContentContainer}>
            {children}
        </div>
    )
}


export default BlogContent;