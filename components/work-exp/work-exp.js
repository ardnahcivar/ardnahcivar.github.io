import { useState } from 'react';

import Tabs from './../tabs/tabs';
import styles from './work-exp.module.css';

const data = [
    {
        id: 1,
        name: 'Nagarro',
        title: '',
        desc: 'lProin sagittis rhoncus ante eu malesuada. Donec vel hendrerit sem, ut porta arcu. Etiam nisl est, iaculis nec rhoncus quis, fermentum ac tellus. Nunc tincidunt elit id sollicitudin efficitur. Sed facilisis luctus lorem vitae volutpat. Fusce eleifend nisl eu sapien aliquet, vitae dictum dolor pellentesque. Donec pharetra rutrum fringilla. Nulla hendrerit urna eget augue fringilla, vel mattis turpis molestie. Sed libero mi, scelerisque eget luctus id, imperdiet id elit. Nullam lobortis felis vel dolor aliquet, ut luctus odio sollicitudin.',
        duration:''
    },
    {
        id: 2,
        name: 'Connectwise',
        title: '',
        desc: 'Aenean vel semper turpis. Praesent molestie sagittis justo eget iaculis. Ut dapibus dignissim vestibulum. Nulla pulvinar risus est, in varius metus volutpat pulvinar. Sed faucibus nulla et fermentum laoreet. Maecenas posuere lectus id scelerisque semper. Maecenas varius mi luctus porttitor egestas. Fusce posuere leo nibh, eu tempus mauris tempus sed. In imperdiet ex a mi molestie feugiat. Vestibulum vel sem magna. Etiam et gravida nulla, vel malesuada dui. ',
        duration:''
    },
    {
        id: 3,
        name: 'Infosys',
        title: '',
        desc: 'Praesent nunc dolor, aliquam ac nibh quis, dictum pellentesque enim. Nulla interdum, felis eget semper pellentesque, lorem mauris tempus ante, ac bibendum leo dolor vulputate dolor. Nam volutpat arcu libero, sit amet cursus magna fringilla in. Etiam malesuada dui ut ipsum faucibus auctor. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent lectus lorem, interdum in ultrices non, congue vel nunc. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Pellentesque suscipit ligula eget eros fringilla lobortis. Mauris et quam libero. Praesent sem eros, dapibus eget libero quis, lobortis volutpat elit. Aliquam molestie viverra risus, vitae accumsan risus lobortis et. Nunc semper ligula eu elit dictum, ut ullamcorper magna rutrum. Quisque efficitur eget ante et rhoncus.',
        duration:''
    },
    {
        id: 4,
        name: 'Xoriant Solutions',
        title: '',
        desc: '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."',
        duration:''
    }
]

const WorkExperiences = props => {

    return(
        <div className={styles.workexpContainer}>
            <h3>My work experience so far..</h3>
            <div className={styles.workInfo}>
            <Tabs data={data}/>
            </div>
        </div>
    )
};

export default WorkExperiences;