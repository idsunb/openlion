//左边侧边栏，包含一个竖向的tab，每个tab对应一个页面，tab的切换通过点击tab来实现，tab的宽度很窄

import React, { useContext, lazy, Suspense, useState, useReducer, useMemo, useEffect } from 'react';
//css文件先后顺序，会影响同属性名的覆盖优先级
import styles from './LeftSidePanel.module.css';
import { MyTabs, Tab, TabList, TabPanel } from '../../tabs/MyTabs';

import ExtensionPanel from '../extension/ExtensionPanel';
import SettingManagerUI from '../../setting/SettingManagerUI';
import openlion from '../../workspace/lionAPI/openlion';
import { set } from 'lodash';
import TestView from '../../services/testpanel/TestView';


// const {triggerEvent} = window.lionAPI;

// import MyContext from './MyContext';
// import 'react-tabs/style/react-tabs.css';
// import './LeftSidePanel.css';
// import {} from './MyContext';


const leftpanelInitialStates = {
  activeTab: 0,
  tabs: [
  //   { id: 0, type: "component", pros: { title: '测试工具', tip: 'testtip', componentName: 'Testview', component: <TestView /> } },
  // { id: 1, type: "component", pros: { title: '扩展中心', tip: 'testtip', componentName: 'ExtensionPanel', component: <ExtensionPanel /> } },
  // { id: 3, type: "component", pros: { title: '设置', tip: 'testtip', componentName: 'SettingManagerUI', component: <SettingManagerUI /> } },
  ],
}

const leftpanelReducer = (state, action) => {
  switch (action.type) {
    case 'OPEN_NEW_COMPONENT_TAB':
      return {
        ...state,
        tabs: [...state.tabs, { id: state.tabs.length, type: "component", pros: { title: action.payload.title, tip: action.payload.tip, componentName: action.payload.componentName, component: action.payload.component } }],
      }
    case 'OPEN_NEW_WEBVIEW_TAB':
      return {
        ...state,
        tabs: [...state.tabs, { id: state.tabs.length, type: "webview", pros: action.payload.pros }],
      }

    case 'SET_ACTIVE_TAB':
      return {
        ...state,
        activeTab: action.payload.activeTab,
      }
    case 'DELETE_WEBVIEW_TAB':
      return {
        ...state,
        tabs: state.tabs.filter((tab) => tab.pros.title !== action.payload.title),
      }


    default:
      return state;

  }
}




const LazyExtensionManager1 = lazy(() => import('../extension/ExtensionPanel'));







const LeftSidePanel = () => {
  const [leftpanelState, dispatch] = useReducer(leftpanelReducer, leftpanelInitialStates);

  const handleOpenNewComponentTab = ({componentName, title, tip,component}) => {
    dispatch({ type: 'OPEN_NEW_COMPONENT_TAB', payload: { componentName, title, tip,component } });
  }

  const handleOpenNewWebviewTab = ({ url, title, tip }) => {

    console.log('handleOpenNewWebviewTab herellllll',url);
    const preloadpath = 'D:\\文档\\codes\\openlion\\esbuild\\extensionpreload.js';

    dispatch({ type: 'OPEN_NEW_WEBVIEW_TAB', payload: {
      pros:{
            title: title,
            id: 'LeftSidePanel-'+title,
            tip: tip,
            nodeintegration: "true",
            src: url,
            style: { width: '100%', height: '100%' },
            preload: preloadpath,
            webpreferences: 'nodeIntegration=true, contextIsolation=false'
      }
    } });
  }

  const handleDeleteWebviewTab = ({title}) => {
    console.log("🚀 ~ file: LeftSidePanel.jsx:101 ~ handleDeleteWebviewTab ~ title:", title)
    
    dispatch({ type: 'DELETE_WEBVIEW_TAB', payload: { title } });
  }


  useEffect(() => {
    handleOpenNewComponentTab({componentName:'Testview', title: '测试工具', tip: 'testtip',component:<TestView />});
    handleOpenNewComponentTab({componentName:'ExtensionPanel', title: '扩展中心', tip: 'testtip',component:<ExtensionPanel />});
    handleOpenNewComponentTab({componentName:'SettingManagerUI', title: '设置', tip: 'testtip',component:<SettingManagerUI />});
    // handleOpenNewWebviewTab({ url: 'C:/Users/Administrator/AppData/Roaming/openlion/extensions/chatextension/index.html', title: 'webview', tip: 'testtip' });
    
    openlion.lionCommand.register({name:'leftpanel.openwebview', action:handleOpenNewWebviewTab});
    openlion.lionCommand.register({name:'leftpanel.deletewebview', action:handleDeleteWebviewTab});



  }, []);





  const tabPanelListRender = useMemo(() => {
    return leftpanelState.tabs.map((tab, index) => {
          if (tab.type == "component") {
            return (
              <TabPanel key={index} className={styles.tabpanel} mykey={tab.id}>
                {tab.pros.component}
              </TabPanel>
            );
          }
          if (tab.type == "webview") {
            return (
              <TabPanel key={index} className={styles.tabpanel} mykey={tab.id}>
                <webview name={'LeftPanle'+index} {...tab.pros} ></webview>
              </TabPanel>
            );
          }
          return null;
        })}
  , [leftpanelState]);



  const handleActiveTab = (index) => {
    dispatch({ type: 'SET_ACTIVE_TAB', payload: { activeTab: index } });
  }



  return (

    <div className={styles.leftsidepanel}>
      <MyTabs className={styles.mytabs} activeIndex={leftpanelState.activeTab} onTabClick={handleActiveTab}  >
        <TabList className={styles.tablist}>
          {leftpanelState.tabs.map((tab, index) => {
            return (
              <Tab key={index} className={styles.tab}>{tab.pros.title}</Tab>
            );
          })}
        </TabList>
        {tabPanelListRender}
      </MyTabs>
    </div>
  );
};

export default LeftSidePanel;
