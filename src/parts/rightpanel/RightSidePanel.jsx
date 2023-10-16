//左边侧边栏，包含一个竖向的tab，每个tab对应一个页面，tab的切换通过点击tab来实现，tab的宽度很窄

import React from 'react';
import styles from './RightSidePanel.module.css';
import { Tab, MyTabs, TabList, TabPanel, TabPanleList } from '../../tabs/MyTabs';
import InfoPanel from '../information/InfoPanel';


// import 'react-tabs/style/react-tabs.css';

const RightSidePanel = () => {
    return (
        <div className={styles.rightsidepanel}>
            <div className={styles.mytabs}>


                <TabList className={styles.tablist}>
                    <Tab className={styles.tab}>信息输出</Tab>
                    <Tab className={styles.tab}>Command</Tab>
                    <Tab className={styles.tab}>Settings</Tab>
                </TabList>
                <TabPanleList className={styles.tabpanellist}>
                    <TabPanel>
                        <h2>输出</h2>
                        <InfoPanel />
                    </TabPanel>
                    <TabPanel>
                        <h2>Command</h2>
                    </TabPanel>
                    <TabPanel>
                        <h2>Settings</h2>
                    </TabPanel>
                </TabPanleList>
            </div>
        </div>
    );
};

export default RightSidePanel;
