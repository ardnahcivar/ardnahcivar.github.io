import WorkExperiences  from './work-exp/work-exp.js';

const descr = `I have been working as a Frontend Engineer throughout my career, 
worked in multiple companies and developed core competencies in Frontend technologies like JavaScript, React, NodeJS, HTML, 
CSS and various other technologies.`

const AboutWork = props => {
    return(
        <div>
            <p>{descr}</p>
            <WorkExperiences />
        </div>
    )
};


export default AboutWork;