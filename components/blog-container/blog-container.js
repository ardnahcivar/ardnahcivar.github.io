
import styles from './blog-container.module.css';

const BlogContainer = props => {
    const {children} = props;
    return (
        <div className={styles.blogContainer}>
            {children}
        </div>
    )    
};


export default BlogContainer;