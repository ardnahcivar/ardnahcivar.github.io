
import styles from './about-me.module.css';

const About = () => {
    return(
        <div className={styles.aboutMeContainer}>
            <div>
                <h2>Who am I?</h2>

                <div>
                    <p>Hello I am ravichandra. I'm from Pune, India, and have completed my graduation in Computer Science. </p>
                    <p>by profession I am Sofware Engineer and have specialized in Frontend.</p>
                    <p>I always strive for excellence in what I do, and love to explore and try new things and believe in  leaving  things better than you found them.</p>
                </div>
            </div>
            <div>
                <h2>Technical Skills</h2>
                <div>
                    <p>Javascript, React, GraphQL, REST APIs, TypeScript, NodeJS, Redux, CSS, SASS, Styled-Components,
                        Webpack, Jest, Web Accessibility, Internationalization(i18n) and more... 
                    </p>
                </div>
                
            </div>
            <div>
                <h2>My Interests</h2>
                <div>
                    <p>My interests span a wide range from films, music, tech, fitness, books and sports.</p>
                </div>
            </div>
        </div>
    )
};

export default About;