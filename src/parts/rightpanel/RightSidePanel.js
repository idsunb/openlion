//左边侧边栏，包含一个竖向的tab，每个tab对应一个页面，tab的切换通过点击tab来实现，tab的宽度很窄

import React from 'react';
import styles from './RightSidePanel.module.css';
import { Tab, MyTabs, TabList, TabPanel } from '../../tabs/MyTabs';

// import 'react-tabs/style/react-tabs.css';

const RightSidePanel = () => {
return (
    <div className={styles.rightsidepanel}>
    <MyTabs className={styles.mytabs}>
        <TabList className={styles.tablist}>
        <Tab className={styles.tab}>输出</Tab>
        <Tab className={styles.tab}>Command</Tab>
        <Tab className={styles.tab}>Settings</Tab>
        </TabList>

        <TabPanel>
        <h2>输出</h2>
        </TabPanel>
        <TabPanel>
        <h2>Command</h2>
        </TabPanel>
        <TabPanel>
        <h2>Settings</h2>
        </TabPanel>
    </MyTabs>
    </div>
);
};

export default RightSidePanel;
