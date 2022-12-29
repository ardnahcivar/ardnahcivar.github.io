import { useState } from 'react';

import styles from './tabs.module.css';

const TabItem = props => {
    const {data, label, onClick} = props;

    const handleClick = () => {
        onClick && onClick(data);
    }

    return(
        <div className={styles.tabItem} onClick={handleClick}>
            <div>{label}</div>
        </div>
    );
}


const Tabs = props => {
    const { data } = props;
    const [selectedTab, setSelectedTab] = useState(data[0]);

    const handleSelect = (tab) => {
        setSelectedTab(tab);
    }


    return(
        <div className={styles.tabsContainer}>
                <div className={styles.tabsNameList}>
                    {
                        data.map((company) => (
                            <TabItem 
                                data={company}
                                label={company.name}
                                key={company.name} 
                                onClick={() => handleSelect(company)}>
                            </TabItem>
                        ))
                    }
                </div>
                <div className={styles.tabDesc}>
                   <div>
                    <p>{selectedTab.desc}</p>
                    </div>     
                </div>
        </div>
    )

};

export default Tabs;