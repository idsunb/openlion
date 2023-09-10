import React, { memo, useState, useRef, useReducer, useEffect, useContext, useMemo } from 'react';
import { MyTabs, Tab, TabList, TabPanel } from '../../tabs/MyTabs';
import TabPanelTest1 from '../../TabPanelTest1';
import TabPanelTest2 from '../../TabPanelTest2';
import styles from './MainPanel.module.css';
// import path from 'path';
const path = require('path');
// const { registerEvent } = window.lionAPI;
// const { registerCommand } = window.lionAPI;
import openlion from '../../workspace/lionAPI/openlion';
import KeybindingManager from '../keybindEdit/KeybindingManager';

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
    
    { id: 0, type: 'normaltext', pros: { title: 'Tab 1', content: 'This is the content of Tab 1.' } },
  { id: 1, type: 'component', pros: { title: "TabPanelTest1", tip:"", componentname: "TabPanelTest1", }, },],
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
      const newReactTabPanel = {
        id: state.tabPanels.length,
        type: action.payload.type,
        pros: action.payload.pros,
      };
      return {
        ...state,
        tabPanels: [...state.tabPanels, newReactTabPanel],
        activeTab: newReactTabPanel.id,
      };
    case 'OPEN_NEW_WEBVIEW_TABPANEL':
      const newWebviewTabPanel = {
        id: state.tabPanels.length,
        type: action.payload.type,
        pros: action.payload.pros,
      };
      return {
        ...state,
        activeTab: newWebviewTabPanel.id,
        tabPanels: [...state.tabPanels, newWebviewTabPanel],
      };
    case 'CLOSE_TAB':
      //用filter 创建一个新的数组，不要直接修改原数组
      const newTabPanels = state.tabPanels.filter((tabPanel,index) => index !== action.payload);
      // state.tabPanels.splice(action.payload, 1)
      return {
        ...state,
        tabPanels: newTabPanels,
      }
    case 'CLOSE_TAB_BY_TITLE':
      //用filter 创建一个新的数组，不要直接修改原数组
      const newTabPanels1 = state.tabPanels.filter((tabPanel,index) => tabPanel.pros.title !== action.payload);

      return {
        ...state,
        tabPanels: newTabPanels1,
      }


    case 'GETSTATE':
      return state;


    case 'CLEAR_TAB_BAR_STATE':

      return {...mainpanelInitialState};

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
  // const [input, setInput] = useState('');
  // const [output, setOutput] = useState('');



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
  const handleOpenNewRactTabPanel = ({ title, componentname }) => () => {
    dispatch({
      type: 'OPEN_NEW_REACT_TABPANEL',
      payload: {
        type: 'component',
        pros: { title, componentname }
      },
    });
  };



  const handleOpenWebview = ({url, title,tip}) => {
  console.log("🚀 ~ file: MainPanel.jsx:143 ~ handleOpenWebview ~ url:", url)

    // const test = 'file:///C:/Users/Administrator/AppData/Roaming/openlion/extensions/chatextension/index.html'
    const preloadpath = 'D:\\文档\\codes\\openlion\\esbuild\\extensionpreload.js';

    // file:///C:/Users/Administrator/AppData/Roaming/openlion/extensions/chat3/chat.html
    dispatch({
      type: 'OPEN_NEW_WEBVIEW_TABPANEL',
      payload: {
        type: 'webview',
        pros: {
          title: title,
          id: "MainPanel-" + title,
          nodeintegration: "true",

          // src:"http://localhost:3000/chat_extension",
          src: url,
          // src: testpath,
          style: { width: '400px', height: '300px' },
          preload: `file://${preloadpath}`,

          webpreferences: 'nodeIntegration=true, contextIsolation=false'
        },
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

  const handleOpenNewTabPanelTest = (data) => {
    console.log('handleOpenNewTabPanelTest');
    const { name, path: windowsPath } = data;
    // 将 Windows 路径转换为 Unix 路径
    const fileUrl = 'file:///' + windowsPath;

    const unixPath = path.join('/', windowsPath.replace(/\\/g, '/')).normalize();
    dispatch({
      type: 'OPEN_NEW_WEBVIEW_TABPANEL',
      payload: {
        type: 'webview',
        pros: {
          title: name,
          id: "chatextension",
          nodeintegration: "true",
          src: fileUrl,
          style: { width: '400px', height: '300px' },
          webpreferences: {
            devTools: true,
            nodeIntegration: true,
            // nodeIntegrationInWorker: true,
            // nodeIntegrationInSubFrames: true,
            // webviewTag: true,
            // enableRemoteModule: true,
            // contextIsolation: false,

          }
        },
      },
    });
  };



  useEffect(() => {



    window.addEventListener('message', (event) => {
      switch (event.data.type) {
        case 'mainpanel-add-tab-panel':
          console.log('add-tab-panel');
          handleOpenNewTabPanel();
          break;
        case 'mainpanel-add-react-tab-panel':
          console.log('add-react-tab-panel');
          handleOpenNewRactTabPanel({
            title: 'Tab 2',
            componentname: 'TabPanelTest1',
          })();
          break;
        case 'mainpanel-clear':
          console.log('clear');
          handleclear();
          break;
        default:
          break;
      }

    });







    // registerEvent('open-main-panel-tab', handleOpenNewTabPanelTest);
    openlion.lionEvent.register('open-main-panel-tab', handleOpenNewTabPanelTest);
    openlion.lionCommand.register({name:'mainpanel.openwebview',action:handleOpenWebview});
    openlion.lionCommand.register({name:'mainpanel.deletewebview',action:handleDeleteTabByTitle});


    openlion.lionCommand.register({
      name: 'mainpanel.keybinding.panel.open', action:
        //测试用，以后可删

        () => { handleOpenNewRactTabPanel({ title: '快捷键管理', componentname: 'KeybindingManager', })() }
    });

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
    localStorage.setItem('tabBarState', JSON.stringify(state));

  }, [state]);




  // const handleTabChange = (index) => {
  //   dispatch({ type: 'SET_ACTIVE_TAB', payload: index });
  // };

  const handleOpenDevTools = () => {
    document.getElementById("chatextension").openDevTools();
    // dispatch({ type: 'OPEN_DEVTOOLS', ref: ChatExtensionRef.current });
  };

  const tabPanellistRender = useMemo(() => {

    return state.tabPanels.map(({ id, type, pros },index) => {
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

  const handleDeleteTabByTitle = ({title}) => {
    console.log("🚀 ~ file: MainPanel.jsx:364 ~ handleDeleteTabByTitle ~ handleDeleteTab:")
    console.log(title);
    
    //为何此处捕获了闭包，不要闭包
    dispatch({ type: 'CLOSE_TAB_BY_TITLE', payload: title });
    
  


  };

  const handleDeleteTab = (index) => {
    //如果webview，并且webview的开发者工具打开了，先关闭开发者工具
    if(state.tabPanels[index].type === 'webview' ){
    document.getElementsByName(`MainPanel-${index}`)[0].closeDevTools()
    }
    dispatch({ type: 'CLOSE_TAB', payload: index });
  };

  


  return (
    <div className={styles.mainpanel}>

      <MyTabs activeIndex={state.activeTab} onTabClick={handleSetActiveTab}>
        <TabList >
          {state.tabPanels.map((tabPanel,index) => (<Tab key={index}>{tabPanel.pros.title}{console.log('我被渲染了')}
          <button onClick={() => handleDeleteTab(index)}>X</button>


          </Tab>))}
        </TabList>
        {tabPanellistRender}

      </MyTabs>


    </div>
  );



};


export default MainPanel;