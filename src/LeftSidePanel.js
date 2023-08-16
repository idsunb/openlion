//左边侧边栏，包含一个竖向的tab，每个tab对应一个页面，tab的切换通过点击tab来实现，tab的宽度很窄

import React, { useContext } from 'react';
//css文件先后顺序，会影响同属性名的覆盖优先级
import styles from './LeftSidePanel.module.css';
import { MyTabs, Tab, TabList, TabPanel } from './tabs/MyTabs';

import ExtensionManager from './extensionmd/ExtensionManager';
import SettingManagerUI from './setting/SettingManagerUI';
import lionAPI from './workspace/lionAPI/lionAPI';


// const {triggerEvent} = window.lionAPI;

// import MyContext from './MyContext';
// import 'react-tabs/style/react-tabs.css';
// import './LeftSidePanel.css';
// import {} from './MyContext';

const LeftSidePanel = () => {
    // const data = useContext(MyContext);
    // console.log(data);
    console.log('LeftSidePanel');
    // const handleAddTab = () => {
    //     // window.handleAddTab2();
    //     // window.postMessage({ type: 'add-tab-panel' }, '*');
    //     window.lionAPI.useContexttest1();
    //     // onAddTab('New Tab');
    //     // setTabIndex(tabIndex + 1);
    //   };

      const handleAddTab = () => {
         const path = lionAPI.getfilepath()
         console.log(path);
        // onAddTab('New Tab');
        // setTabIndex(tabIndex + 1);
      };
      const handleAddTab1 = () => {
        window.lionAPI.useContexttest1();
        // onAddTab('New Tab');
        // setTabIndex(tabIndex + 1);
      };
      const handleOpenNewTabPanel = () => {
        window.postMessage({ type: 'mainpanel-add-tab-panel' }, '*');
      }
      const handleOpenNewRactTabPanel = () => {
        window.postMessage({ type: 'mainpanel-add-react-tab-panel' }, '*');
      }
      const handleOpenWebview = () => {
        window.postMessage({ type: 'mainpanel-open-webview' }, '*');
      }
      const handleclear = () => {
        window.postMessage({ type: 'mainpanel-clear' }, '*');
      }
      const handlePath = () => {
        const path = lionAPI.getPreloadFilePath()
        console.log(path);
      }
      const handleTest = () => {
        console.log(lionAPI.myvalue())

      }
      const handleClickEvent = () => {

        lionAPI.callCommand('system.showNotification',{title:'you are a title',body:'you are a body'});

        // console.log('handleClickEvent');
        // lionAPI.lionEvent.register('lefttest1', (data) => {
        //   console.log('system.eventtest1 result');
        //   console.log(data);
        // });
        // lionAPI.lionEvent.trigger('lefttest1', { name: 'lion' });


        // window.lionAPI.lionEvent.trigger('somethingHappened', { name: 'lion' })
        // window.lionAPI.lionEvent.trigger('system.eventtest1', { name: 'lion' });
      }

      const handleEventregister = () => {
        console.log('handleEventregister')
        lionAPI.lionEvent.register('system.eventtest1', (data) => {
          console.log('system.eventtest1', data);
        });
      }
      const handleEventtrigger = () => {
        console.log('handleEventtrigger');
        console.log('alittltetest');
        lionAPI.lionEvent.trigger('system.eventtest1',9999);
      }
      const handleEventlook = () => {
        console.log('handleEventlook');
        console.log(lionAPI.lionEvent.getLionEvents());
      }

      const hellomain = () => {
        console.log('hellomain');
        console.log(lionAPI.getCommands());
        lionAPI.callCommand('hellofrommain');
      }


return (
    
    <div className={styles.leftsidepanel}>
    <MyTabs className={styles.mytabs}>
        <TabList className={styles.tablist}>
        <Tab className={styles.tab}>测试工具</Tab>
        <Tab className={styles.tab}>扩展中心</Tab>
        <Tab className={styles.tab}>快捷键管理</Tab>
        <Tab className={styles.tab}>设置</Tab>
        </TabList>

        <TabPanel>
        <h2>内部测试工具</h2>
        <button onClick={handleAddTab}>Add Tab</button>
            
        <button onClick={handleOpenNewTabPanel}>增加普通页面</button>
        
        
      <br/>
      <button onClick={handleOpenNewRactTabPanel}>Add New 组件</button>
      <br/>
      <button onClick={handleOpenWebview}>Open Webview</button>
      <br/>
      <button onClick={  handleclear }>Clear State</button>
      <button onClick={handlePath}>路径</button>
      <button onClick={handleTest}>测试</button>
      <button onClick={handleEventregister}>注册事件</button>
      <button onClick={handleEventtrigger}>触发事件</button>
      <button onClick={handleEventlook}>查看事件</button>
      <button onClick={handleClickEvent}>点击事件</button>
      <button onClick={hellomain}>测试是否获得main的command</button>
        </TabPanel>
        <TabPanel>
        <h2>扩展中心</h2>
        <ExtensionManager />
        </TabPanel>
        <TabPanel>
        <h2>快捷键管理</h2>
        <button onClick={()=>{lionAPI.callCommand('mainpanel.keybinding.panel.open')}}>打开快捷键管理</button>
        </TabPanel>
        <TabPanel>
        <h2>设置</h2>
        <SettingManagerUI />
        </TabPanel>


    </MyTabs>
    </div>
);
};

export default LeftSidePanel;
