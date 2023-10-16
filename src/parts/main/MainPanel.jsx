import React, { memo, useState, useRef, useReducer, useEffect, useContext, useMemo } from 'react';
import { MyTabs, Tab, TabList, TabPanel,TabPanleList } from '../../tabs/MyTabs';
import TabPanelTest1 from '../../TabPanelTest1';
import TabPanelTest2 from '../../TabPanelTest2';
import SettingManagerUI from '../../setting/SettingManagerUI';
import ActionPanel from '../actionpanel/ActionPanel';
import styles from './MainPanel.module.css';
// import Tooltip from '../../workspace/tooltip/Tooltip';
import { Tooltip } from 'react-tooltip';

// import path from 'path';
const path = require('path');
// const { registerEvent } = window.lionAPI;
// const { registerCommand } = window.lionAPI;
import openlion from '../../workspace/lionAPI/openlion';
import KeybindingManager from '../keybindEdit/KeybindingManager';




const { execSync } = require("child_process");

// const a =1;
// const b =2000000000000;
// console.log(execSync(`python -c "print(${a}+${b})"`).toString());






// ipcRenderer.on('message', (event, message) => {
//   console.log(message); // 输出：hello, world
//   ipcRenderer.sendToHost('hello', 'world');
// });
const mainpanelInitialState = {
  activeTab: 0,
  devToolsOpen: false,
  inputVal: '',
  outputVal: '',
  tabPanels: [

    { id: 0, type: 'normaltext',tooltip:"ff", pros: { title: 'Tab 1', content: 'This is the content of Tab 1.' } },
    { id: 1, type: 'component',tooltip:"ff", pros: { title: "TabPanelTest1", tip: "", componentname: "TabPanelTest1", }, },],
};







function mainpanelReducer(state, action) {
  switch (action.type) {
    case 'SET_ACTIVE_TAB':
      return { ...state, activeTab: action.payload };
    case 'OPEN_DEVTOOLS':
      action.ref.openDevTools();
      return { ...state, devToolsOpen: true };
    case 'CLOSE_DEVTOOLS':
      action.ref.closeDevTools();
      return { ...state, devToolsOpen: false };
    case 'SET_INPUT_VALUE':
      return { ...state, inputVal: action.payload };
    case 'SET_OUTPUT_VALUE':
      return { ...state, outputVal: action.payload };
    case 'OPEN_NEW_TABPANEL':
      const newTabPanel = {
        id: state.tabPanels.length,
        type: action.payload.type,
        pros: action.payload.pros,
      };
      return {
        ...state,
        tabPanels: [...state.tabPanels, newTabPanel],
        activeTab: newTabPanel.id,
      };
    case 'OPEN_NEW_REACT_TABPANEL':
      //如果uid已经存在，不再打开新的react组件
      const uidreact = action.payload.pros.uid;
      console.log('uidreact', uidreact);


      if (uidreact != 'test'&&state.tabPanels.some((tabPanel) => tabPanel.pros.uid == uidreact)) {
        console.log('uid已经存在，不再打开新的react组件');
        //设置activeTab为已经存在的tab
        const index = state.tabPanels.findIndex((tabPanel) => tabPanel.pros.uid == uidreact);
        return { ...state, activeTab: index };
        return state;
      }


      const newReactTabPanel = {
        id: state.tabPanels.length,
        tooltip: action.payload.tooltip,
        type: action.payload.type,
        pros: action.payload.pros,
      };
      return {
        ...state,
        tabPanels: [...state.tabPanels, newReactTabPanel],
        activeTab: state.tabPanels.length,
      };
    case 'OPEN_NEW_WEBVIEW_TABPANEL':
      //如果uid已经存在，不再打开新的webview
      const uid = action.payload.pros.uid;
      if (state.tabPanels.some((tabPanel) => tabPanel.pros.uid == uid)) {
        console.log('uid已经存在，不再打开新的webview');
        //设置activeTab为已经存在的tab
        const index = state.tabPanels.findIndex((tabPanel) => tabPanel.pros.uid == uid);
        return { ...state, activeTab: index };

        return state;
      }

      const newWebviewTabPanel = {
        id: state.tabPanels.length,
        type: action.payload.type,
        tooltip: action.payload.tooltip,
        pros: action.payload.pros,
        config: action.payload.config
      };

      return {
        ...state,
        activeTab: state.tabPanels.length,
        tabPanels: [...state.tabPanels, newWebviewTabPanel],
      };
    case 'CLOSE_TAB':
      //用filter 创建一个新的数组，不要直接修改原数组
      const newTabPanels = state.tabPanels.filter((tabPanel, index) => index !== action.payload);
      // state.tabPanels.splice(action.payload, 1)
      return {
        ...state,
        tabPanels: newTabPanels,
      }
    case 'CLOSE_TAB_BY_TITLE':
      //用filter 创建一个新的数组，不要直接修改原数组
      const newTabPanels1 = state.tabPanels.filter((tabPanel, index) => tabPanel.pros.title !== action.payload);

      return {
        ...state,
        tabPanels: newTabPanels1,
      }


    case 'GETSTATE':
      return state;


    case 'CLEAR_TAB_BAR_STATE':

      return { ...mainpanelInitialState };

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}


const MainPanel = () => {
  const savedState = localStorage.getItem('tabBarState');
  const [state, dispatch] = useReducer(mainpanelReducer, savedState ? JSON.parse(savedState) : mainpanelInitialState);
  // const [mainpanelState, mainpanelDispatch] = useReducer(mainpanelReducer, savedState ? JSON.parse(savedState) : mainpanelInitialState);

  // const { mainpanelState:state, mainpanelDispatch:dispatch } = useMyContextState();

  // const [activeTab, setActiveTab] = useState(0);






  const ChatExtensionRef = useRef(null);

  
  useEffect(() => {



    window.addEventListener('message', (event) => {
      switch (event.data.type) {
        case 'mainpanel-add-tab-panel':
          console.log('add-tab-panel');
          handleOpenNewTabPanel();
          break;
        case 'mainpanel-clear':
          console.log('clear');
          handleclear();
          break;
        default:
          break;
      }

    });






    openlion.lionCommand.register({ name: 'mainpanel.openwebview', action: handleOpenWebview });
    openlion.lionCommand.register({ name: 'mainpanel.deletewebview', action: handleDeleteTab });
    openlion.lionCommand.register({ name: 'mainpanel.openreact', action: handleOpenNewRactTabPanel });


    return () => {
      window.removeEventListener('message');
    };
  }, []);

  
  useEffect(() => {
    // const webviews = document.getElementsByTagName('webview');
    // for (let i = 0; i < webviews.length; i++) {
    //   webviews[i].addEventListener('beforeunload', () => {
    //     console.log('webview beforeunload1');
    //   });
    // }

    state.tabPanels.forEach((tabPanel, index) => {
      if (tabPanel.type === 'webview') {
        const webview = document.getElementsByName(`MainPanel-${index}`)[0]
        //加载完成后，设置一些初始化工作
        webview.addEventListener('did-finish-load', () => {
          webview.executeJavaScript('console.log("Hello from Webview!")');
          webview.executeJavaScript(`openlion.lionContext.setConfig(${JSON.stringify(tabPanel.config)})`);
        });
      }
    })
    localStorage.setItem('tabBarState', JSON.stringify(state));

  }, [state]);

  const handleOpenNewTabPanel = () => {
    dispatch({
      type: 'OPEN_NEW_TABPANEL',
      payload: {
        type: 'normaltext',
        pros: {
          title: 'New Tab',
          content: 'This is a new tab.',
        },
      },
    });
  };




  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const res = await model.call(input);
    dispatch({ type: 'SET_OUTPUT_VALUE', payload: res });
  };

  function handleOpenPluginManager() {
    ReactDOM.render(<PluginManager />, document.getElementById('root'));

  }

  //增加一个react组件页面
  const handleOpenNewRactTabPanel = ({ title,tooltip,uid, componentname,componentName }) => {
    console.log("🚀 ~ file: MainPanel.jsx:168 ~ handleOpenReact ~ url, title,uid componet:", title,tooltip, uid,componentname)


    if (!title || !uid) {
      console.log('title,uid 不能为空');
      return;
    }

    dispatch({
      type: 'OPEN_NEW_REACT_TABPANEL',
      payload: {
        type: 'component',
        tooltip:tooltip,
        pros: { uid:uid,title:title, componentname:componentname || componentName, },
      },
    });
  };



  const handleOpenWebview = async ({ url, title, uid, tooltip, config }) => {
    console.log("🚀 ~ file: MainPanel.jsx:168 ~ handleOpenWebview ~ url, title,uid:", url, title, uid,tooltip)
    if (!url || !title || !uid) {
      console.log('url,title,uid 不能为空');
      return;
    }

    
    // const test = 'file:///C:/Users/Administrator/AppData/Roaming/openlion/extensions/chatextension/index.html'
    const preloadpath = 'D:\\文档\\codes\\openlion\\esbuild\\extensionpreload.js';

    // file:///C:/Users/Administrator/AppData/Roaming/openlion/extensions/chat3/chat.html
    await dispatch({
      type: 'OPEN_NEW_WEBVIEW_TABPANEL',
      payload: {
        type: 'webview',
        tooltip: tooltip,
        pros: {
          className: styles.webview,
          title: title,
          uid: uid,
          nodeintegration: "true",

          // src:"http://localhost:3000/chat_extension",
          src: url,
          // src: testpath,
          // style: { width: '100%', height: '100%' },
          preload: `file://${preloadpath}`,

          webpreferences: 'nodeIntegration=true, contextIsolation=true'
        },
        config: config
      },
    });

  };






  const handleclear = async () => {
    console.log('clear state');
    localStorage.removeItem('tabBarState');
    const webviews = document.getElementsByTagName('webview');
    // console.log('webview.length', webviews.length);
    for (let i = 0; i < webviews.length; i++) {
      //   const webid = webviews[i].getWebContentsId();
      webviews[i].closeDevTools();
      //   webviews[i].getWebContents()
    }
    dispatch({ type: 'CLEAR_TAB_BAR_STATE' });
  };








  const handleOpenDevTools = () => {
    document.getElementById("chatextension").openDevTools();
    // dispatch({ type: 'OPEN_DEVTOOLS', ref: ChatExtensionRef.current });
  };





  const tabPanellistRender = useMemo(() => {



    return state.tabPanels.map(({ id, type, pros, config }, index) => {
      console.log('tabPane被渲染了');
      if (type === 'normaltext') {
        return (<TabPanel key={index} >{pros.content}</TabPanel>);
      }
      else if (type === 'component') {
        switch (pros.componentname) {
          case 'TabPanelTest1':
            return (<TabPanel key={index} ><TabPanelTest1 /></TabPanel>);
          case 'TabPanelTest2':
            return (<TabPanel key={index} ><TabPanelTest2 /></TabPanel>);
          case 'KeybindingManager':
            return (<TabPanel key={index} ><KeybindingManager /></TabPanel>);
          case 'SettingManagerUI':
            return (<TabPanel key={index} ><SettingManagerUI /></TabPanel>);
          case 'ActionPanel':
            return (<TabPanel key={index} ><ActionPanel /></TabPanel>);
          default:
            return null;
        }
      }
      else if (type === 'webview') {
        return (
          <TabPanel key={index}>
            <webview name={`MainPanel-${index}`} {...pros} ></webview>

            <button onClick={() => { document.getElementsByName(`MainPanel-${index}`)[0].openDevTools(); }}>打开webview 开发者工具</button>
            <button onClick={() => { document.getElementsByName(`MainPanel-${index}`)[0].closeDevTools(); }}>关闭webview 开发者工具</button>
            <button onClick={() => { document.getElementsByName(`MainPanel-${index}`)[0].reload(); }}>重新载入webview</button>

          </TabPanel>
        );
      }
      else {
        return <TabPanel key={index}>wrong type</TabPanel>;
      }
    });

  }, [state.tabPanels]);


  const handleSetActiveTab = (index) => {

    dispatch({ type: 'SET_ACTIVE_TAB', payload: index });
  };

  const handleDeleteTab = ({ title, index }) => {
    console.log("🚀 ~ file: MainPanel.jsx:364 ~ handleDeleteTabByTitle ~ handleDeleteTab:")
    console.log(title);

    //如果title存在，就根据title删除tab
    if (title) {
      dispatch({ type: 'CLOSE_TAB_BY_TITLE', payload: title });
      return;
    }
    if (index) {
      //如果webview，并且webview的开发者工具打开了，先关闭开发者工具
      if (state.tabPanels[index].type === 'webview') {
        document.getElementsByName(`MainPanel-${index}`)[0].closeDevTools()
      }
      dispatch({ type: 'CLOSE_TAB', payload: index });
      return;
    }



  };

  // const handleDeleteTab = (index) => {
  //   //如果webview，并且webview的开发者工具打开了，先关闭开发者工具

  // };




  return (
    <div className={styles.mainpanel}>
      <div className={styles.tablist}>
        <TabList className={styles.innertablist} activeIndex={state.activeTab} onTabClick={handleSetActiveTab} >
          {state.tabPanels.map((tabPanel, index) => (<Tab className={styles.tab} key={index} data-tooltip-id="my-tooltip" data-tooltip-content={tabPanel.tooltip}>
                <span className={styles.title}>{tabPanel.pros.title}</span>
              
              
              <button className={styles.close} onClick={() => handleDeleteTab({ index })}>X</button>


            {/* {console.log('我被渲染了')} */}


          </Tab>))}
        </TabList>
        </div>
        <Tooltip id="my-tooltip" />
        <TabPanleList className={styles.tabpanellist} activeIndex={state.activeTab} >
        {tabPanellistRender}
        </TabPanleList>


    </div>
  );



};


export default MainPanel;