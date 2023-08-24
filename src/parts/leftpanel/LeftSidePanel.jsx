//左边侧边栏，包含一个竖向的tab，每个tab对应一个页面，tab的切换通过点击tab来实现，tab的宽度很窄

import React, { useContext,lazy,Suspense, useState } from 'react';
//css文件先后顺序，会影响同属性名的覆盖优先级
import styles from './LeftSidePanel.module.css';
import { MyTabs, Tab, TabList, TabPanel } from '../../tabs/MyTabs';

import ExtensionManager from '../extension/ExtensionManager';
import ExtensionManager1 from '../extension/ExtensionManager1';
import SettingManagerUI from '../../setting/SettingManagerUI';
import lionAPI from '../../workspace/lionAPI/lionAPI';
import { set } from 'lodash';


// const {triggerEvent} = window.lionAPI;

// import MyContext from './MyContext';
// import 'react-tabs/style/react-tabs.css';
// import './LeftSidePanel.css';
// import {} from './MyContext';

const LazyExtensionManager1 = lazy(() => import('../extension/ExtensionManager1'));



const LeftSidePanel = () => {
  const [objItem, setObjItem] = useState("");

  
  
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
        // const path = lionAPI.getPreloadFilePath()
        // console.log(path);
      }
      const handleTest = () => {
        console.log(lionAPI.myvalue())

      }
      const handleClickEvent = () => {

        lionAPI.lionCommand.call('system.showNotification',{title:'you are a title',body:'you are a body'});

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
        console.log(lionAPI.lionCommand.getCommands());
        lionAPI.lionCommand.call('hellofrommain');
      }

      const handleInfoPanel = () => {
        console.log('handleInfoPanel');
        lionAPI.lionCommand.call('infopanel.addmessage',{a:4});
      }
      
      const handleInputChange = (event) => {
        setObjItem(event.target.value);
      };

      const handleSendEvent = async () => {
        console.log('objitem',objItem);
        const result = await lionAPI.lionCommand.call('system.getobject',{name:objItem});
        lionAPI.lionCommand.call('infopanel.addmessage',result);
        console.log('result',result);
      };
      const handleGetState = () => {
        console.log('handleGetState');
        console.log(lionAPI.lionContext.getState());
        lionAPI.lionCommand.call('infopanel.addmessage',lionAPI.lionContext.getState());
      }


return (
    
    <div className={styles.leftsidepanel}>
    <MyTabs className={styles.mytabs}>
        <TabList className={styles.tablist}>
        <Tab className={styles.tab}>测试工具</Tab>
        <Tab className={styles.tab}>扩展中心</Tab>
        <Tab className={styles.tab}>扩展中心在设计中</Tab>
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
      <button onClick={handleInfoPanel}>测试信息面板</button>
      <br/>
      <div>
          <input value={objItem} onChange={handleInputChange} />
          <button onClick={handleSendEvent}>发送所需要对象</button>
        </div>

        <br/>
        <button onClick={handleGetState}>得到state</button>

        </TabPanel>
        <TabPanel>
        <h2>扩展中心</h2>
        <ExtensionManager />
        </TabPanel>
        <TabPanel>
        <h2>扩展中心在设计中</h2>
        <Suspense fallback={<div>Loading...</div>}>

        <LazyExtensionManager1 />
        
        </Suspense>
        </TabPanel>
        <TabPanel>
        <h2>快捷键管理</h2>
        <button onClick={()=>{lionAPI.lionCommand.call('mainpanel.keybinding.panel.open')}}>打开快捷键管理</button>
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
