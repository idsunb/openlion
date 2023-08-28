import React, { memo, useState, useRef, useReducer, useEffect, useContext, useMemo } from 'react';
import { MyTabs, Tab, TabList, TabPanel } from '../../tabs/MyTabs';
import TabPanelTest1 from '../../TabPanelTest1';
import TabPanelTest2 from '../../TabPanelTest2';
import styles from './MainPanel.module.css';
import path from 'path';
// const { registerEvent } = window.lionAPI;
// const { registerCommand } = window.lionAPI;
import openlion from '../../workspace/lionAPI/openlion';
import KeybindingManager from '../keybindEdit/KeybindingManager';
import { ipcRenderer } from 'electron';

// ipcRenderer.on('message', (event, message) => {
//   console.log(message); // 输出：hello, world
//   ipcRenderer.sendToHost('hello', 'world');
// });
const mainpanelInitialState = {
  activeTab: 0,
  devToolsOpen: false,
  inputVal: '',
  outputVal: '',
  tabPanels: [{ id: 0, type: 'normaltext', pros: { title: 'Tab 1', content: 'This is the content of Tab 1.' } },
  { id: 1, type: 'reactcomponent', pros: { title: "TabPanelTest1", componentname: "TabPanelTest1", }, },],
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
        tabPanels: [...state.tabPanels, newWebviewTabPanel],
        activeTab: newWebviewTabPanel.id,
      };


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
        type: 'reactcomponent',
        pros: { title, componentname }
      },
    });
  };

  //打开一个webview
  const handleOpenWebview = () => {
    console.log('handleOpenWebview');
    const preloadpath = 'D:\\文档\\codes\\openlion\\esbuild\\extensionpreload.js';
    // const preloadpath = 'D:\\文档\\codes\\openlion\\.vite\\build\\extensionpreload.js';

    console.log('preloadpath', preloadpath);

    // const testpath = 'file:///C:/Users/Administrator/AppData/Roaming/openlion/extensions/chat3/chat.html';
    //直接使用本地文件路径
    // const anotherpath = 'D:\\文档\\codes\\openlion\\src\\extensionpreload.js';
    // const preload = `file://${__dirname}/preload.js`;
    // console.log(preload);

    const url = 'http://localhost:5181';
    console.log('url', url);
    dispatch({
      type: 'OPEN_NEW_WEBVIEW_TABPANEL',
      payload: {
        type: 'webview',
        pros: {
          title: 'Tab 2',
          id: "chatextension",
          nodeintegration: "true",

          // src:"http://localhost:3000/chat_extension",
          src: url,
          // src: testpath,
          style: { width: '400px', height: '300px' },
          webpreferences: {
            devTools: true,
            nodeIntegration: true,
            // nodeIntegrationInWorker: true,
            // nodeIntegrationInSubFrames: true,
            // webviewTag: true,
            // enableRemoteModule: true,
            // contextIsolation: false,


          },
          // preload:preloadpath,
          preload: `file://${preloadpath}`,
          // preload:anotherpath,
          // preload: path.join(__dirname, 'preload.js'),

          // preload:{'file://${__dirname}/preload.js'},
        },
      },
    });
  };

  const handleclear = async () => {
    console.log('clear state');
    localStorage.removeItem('tabBarState');
    // const webviews = document.getElementsByTagName('webview');
    // console.log('webview.length', webviews.length);
    // for (let i = 0; i < webviews.length; i++) {
    //   const webid = webviews[i].getWebContentsId();
    //   webviews[i].closeDevTools();
    //   webviews[i].getWebContents()

    // //   await new Promise((resolve) => {
    // //     console.log('webid', webid);
               

    // //     resolve();

    // //   }).then(() => {          console.log('webview removed...')
    // // })
    // // setTimeout(() => {
    // //   webviews[i].remove(); 
    // // }, 1000);

    //   // webviews[i].send('beforeunload',webid);
    //   // 关闭webview 


    // }
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

  // useEffect(() => {
  //   const webviews = document.getElementsByTagName('webview');
  //   for (let i = 0; i < webviews.length; i++) {
  //     webviews[i].addEventListener('DOMNodeRemoved', () => {
  //       console.log('webview removed');
  //       const webContentsId = webviews[i].getWebContentsId();
  //       ipcRenderer.send('remove-state-by-id', webContentsId);
  //     });
  //   }


  // }, [state.tabPanels]);

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
        case 'mainpanel-open-webview':
          console.log('open-webview');
          handleOpenWebview();
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

    openlion.lionCommand.register({
      name: 'mainpanel.keybinding.panel.open', action:
        //测试用，以后可删




        () => { handleOpenNewRactTabPanel({ title: '快捷键管理', componentname: 'KeybindingManager', })() }
    });
    console.log('lionAPI', openlion.lionCommand.getCommands())

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

    return state.tabPanels.map(({ id, type, pros }) => {
      if (type === 'normaltext') {
        return (<TabPanel key={id} >{pros.content}</TabPanel>);
      }
      else if (type === 'reactcomponent') {
        switch (pros.componentname) {
          case 'TabPanelTest1':
            return (<TabPanel key={id} ><TabPanelTest1 /></TabPanel>);
          case 'TabPanelTest2':
            return (<TabPanel key={id} ><TabPanelTest2 /></TabPanel>);
          case 'KeybindingManager':
            return (<TabPanel key={id} ><KeybindingManager /></TabPanel>);
          default:
            return null;
        }
      }
      else if (type === 'webview') {
        return (
          <TabPanel key={id}>
            <webview name={`webview-${id}`} {...pros} ></webview>

            <button onClick={() => { document.getElementsByName(`webview-${id}`)[0].openDevTools(); }}>打开webview 开发者工具</button>
            <button onClick={() => { document.getElementsByName(`webview-${id}`)[0].closeDevTools(); }}>关闭webview 开发者工具</button>

          </TabPanel>
        );
      }
      else {
        return <TabPanel key={id}>wrong type</TabPanel>;
      }
    });

  }, [state.tabPanels]);


  const handleSetActiveTab = (index) => {
    dispatch({ type: 'SET_ACTIVE_TAB', payload: index });
  };



  return (
    <div className={styles.mainpanel}>

      <MyTabs activeIndex={state.activeTab} onTabClick={handleSetActiveTab}>
        <TabList >
          {state.tabPanels.map((tabPanel) => (<Tab key={tabPanel.id}>{tabPanel.pros.title}{console.log('我被渲染了')}</Tab>))}
        </TabList>
        {tabPanellistRender}

      </MyTabs>
      {/*       
    <button onClick={handleOpenNewRactTabPanel({
            title: 'Tab 2',
            componentname: 'TabPanelTest1',
          })}>Add New 组件</button>
      <br/>
      <button onClick={handleOpenWebview}>Open Webview</button>
      <br/>
      <button onClick={  handleclear }>Clear State</button> */}
      {/* <button onClick={handleAddTab}>Add Tab</button> */}
      {/* <button onClick={handleAddTab1}>Add Tab</button> */}
      {/* <button onClick={handleOpenDevTools}>Open DevTools</button> */}

    </div>
  );



};
// const TabBar = () => {
//   return (
//     <div>
//       <h1>TabBar</h1>
//     </div>
//   );
// };

//map方法来渲染tabPanel
// const componentMap = {
//   TabPanelTest2: TabPanelTest2,
//   // add more components here
// };

// {state.tabPanels.map(({ id, type, pros }) => {
//   const Component = componentMap[type];
//   if (Component) {
//     return (<TabPanel key={id} forceRender={false}><Component {...pros} /></TabPanel>);
//   } else {
//     return null;
//   }
// })}

export default MainPanel;