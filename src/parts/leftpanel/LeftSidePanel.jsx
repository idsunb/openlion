//左边侧边栏，包含一个竖向的tab，每个tab对应一个页面，tab的切换通过点击tab来实现，tab的宽度很窄

import React, { useContext, lazy, Suspense, useState, useReducer, useMemo, useEffect } from 'react';
//css文件先后顺序，会影响同属性名的覆盖优先级
import styles from './LeftSidePanel.module.css';
import { MyTabs, Tab, TabList, TabPanel,TabPanleList } from '../../tabs/MyTabs';


// import ExtensionPanel from '../extension/ExtensionPanel';
import SettingManagerUI from '../../setting/SettingManagerUI';
import openlion from '../../workspace/lionAPI/openlion';
import TestView from '../../services/testpanel/TestView';
// import math from 'mathjs';

// import { OpenAI } from "langchain/llms/openai";
// const { OpenAI } = require("langchain/llms/openai");

// const model = new OpenAI({
//     openAIApiKey: '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',//你的OpenAI API Key
//     temperature: 0.9
// });





// const res = await model.call(
//   "写一首诗，限制20个字"
// );
// console.log(res);






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
      //如果uid已经存在，就不再打开新的webview
      for (let index = 0; index < state.tabs.length; index++) {
        const tab = state.tabs[index];
        if(tab.type == 'webview'){
          if(tab.pros.id == action.payload.pros.id){
            console.log('webview已经存在，不再打开新的webview');
            return state;
          }
        }
      }

      return {
        ...state,
        tabs: [...state.tabs, { id: state.tabs.length, type: "webview", pros: action.payload.pros,config:action.payload.config }],
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

  const handleOpenNewWebviewTab = ({ url, title, tip,uid,config,preloadpath='D:\\文档\\codes\\openlion\\esbuild\\extensionpreload.js' ,contextIsolation=true}) => {

    if(!url || !title || !uid){
      console.log('url,title,uid 不能为空');
      return;
    }


    dispatch({ type: 'OPEN_NEW_WEBVIEW_TAB', payload: {
      pros:{
            title: title,
            id: uid,
            tip: tip,
            nodeintegration: "true",
            src: url,
            style: { width: '100%',height:'90%' },
            preload: preloadpath,
            // webpreferences: 'nodeIntegration=true, contextIsolation=true'
            webpreferences: 'nodeIntegration=true, contextIsolation='+contextIsolation
      },
      config:config,

    } });
  }

  const handleDeleteWebviewTab = ({title}) => {
    console.log("🚀 ~ file: LeftSidePanel.jsx:101 ~ handleDeleteWebviewTab ~ title:", title)
    
    dispatch({ type: 'DELETE_WEBVIEW_TAB', payload: { title } });
  }

  useEffect(() => {
    handleOpenNewComponentTab({componentName:'Testview', title: '测试工具', tip: 'testtip',component:<TestView />});
    // handleOpenNewComponentTab({componentName:'ExtensionPanel', title: '扩展中心', tip: 'testtip',component:<ExtensionPanel />});
    // handleOpenNewComponentTab({componentName:'SettingManagerUI', title: '设置', tip: 'testtip',component:<SettingManagerUI />});
    handleOpenNewWebviewTab({ url: "D:\\文档\\codes\\openlion\\esbuild\\extensionManager\\extensionManager.html", title: '扩展管理',uid:'extensionManager', tip: 'testtip' ,preloadpath:'D:\\文档\\codes\\openlion\\esbuild\\extensionManager\\managerpreload.js',contextIsolation:false});
    // handleOpenNewWebviewTab({ url: "D:\\文档\\codes\\openlion\\esbuild\\extensionManager\\extensionManager.html", title: '扩展管理',uid:'extensionManager', tip: 'testtip' });
    
    openlion.lionCommand.register({name:'leftpanel.openwebview', action:handleOpenNewWebviewTab});
    openlion.lionCommand.register({name:'leftpanel.deletewebview', action:handleDeleteWebviewTab});




  }, []);






  useEffect(() => {
    console.log('leftpanelState',leftpanelState);
    //给每个webview初始化设置config
    leftpanelState.tabs.forEach((tab,index) => {
      if(tab.type == 'webview'){
        const webview = document.getElementsByName('LeftPanle'+index)[0]
        
        webview.addEventListener('did-finish-load', () => {
          webview.executeJavaScript('console.log("Hello from Webview!")');
          // webview.executeJavaScript(`openlion.lionContext.setConfig(${JSON.stringify(tabPanel.config)})`);
          if(tab.config){
          webview.executeJavaScript(`openlion.lionContext.setConfig(${JSON.stringify(tab.config)})`);
          }
        }
        )



      }
    });



  }, [leftpanelState]);



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
                <div style={{'display':'flex',flexDirection: 'column',height:'100%'}}>
                <webview name={'LeftPanle'+index} {...tab.pros} ></webview>
                <button onClick={() => { document.getElementsByName('LeftPanle'+index)[0].openDevTools(); }}>打开webview 开发者工具</button>
            <button onClick={() => { document.getElementsByName('LeftPanle'+index)[0].closeDevTools(); }}>关闭webview 开发者工具</button>
            </div>
              </TabPanel>
            );
          }
          return null;
        })}
  , [leftpanelState]);



  const handleActiveTab = async (index) => {

    dispatch({ type: 'SET_ACTIVE_TAB', payload: { activeTab: index } });
  }


  const handleSetting = async () => {
    openlion.lionCommand.call('mainpanel.openreact',{title:'设置',tooltip:'设置',uid:'setting',componentName:'SettingManagerUI'});
  }
  



  return (

    <div className={styles.leftsidepanel}>
      <div className={styles.mytabs}>
        <div className={styles.tablist} >
        <TabList className={styles.tablistup} activeIndex={leftpanelState.activeTab} onTabClick={handleActiveTab}>
          {leftpanelState.tabs.map((tab, index) => {
            return (
              <Tab key={index} className={styles.tab} >{tab.pros.title}</Tab>
            );
          })}
        </TabList>
          <div className={styles.tablistdown}>
            <button onClick={handleSetting}>设置</button>

          </div>
          </div>
          <TabPanleList className={styles.tabpanellist} activeIndex={leftpanelState.activeTab} >
        {tabPanelListRender}
        </TabPanleList>
        </div>
    </div>
  );
};

export default LeftSidePanel;
