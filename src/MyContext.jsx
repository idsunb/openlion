import React,{createContext,useContext,useReducer} from 'react';

// 创建一个上下文对象
const MyContext = React.createContext();
export default MyContext;

const mainpanelInitialState = {
    activeTab: 0,
    devToolsOpen: false,
    inputVal: '',
    outputVal: '',
    tabPanels: [{id: 0,type:'normaltext' ,pros:{title: 'Tab 1', content: 'This is the content of Tab 1.'}},
    {id: 1, type: 'reactcomponent',pros: {title: "TabPanelTest2",componentname: "TabPanelTest1",},},],
  };
  
  const commandInitialState = {
    isOpen: false,
    inputValue: '',
    commands: [
      {
        name: 'Open File',
        type: 'system',
        action: () => console.log('Opening file...'),
      },
      {
        name: 'Save File',
        type: 'system',
        action: () => console.log('Saving file...'),
      },
      {
        name: 'Close File',
        type: 'system',
        action: () => console.log('Closing file...'),
      },
    ],
    filteredCommands: [],
  };

  function commandReducer(state, action) {
    switch (action.type) {
      case 'SET_IS_OPEN':
        return { ...state, isOpen: action.payload };
      case 'SET_INPUT_VALUE':
        return { ...state, inputValue: action.payload };
      case 'SET_FILTERED_COMMANDS':
        return { ...state, filteredCommands: action.payload };
      case 'SET_COMMANDS':
        return { ...state, commands: action.payload };
      
      default:
        throw new Error(`Unhandled action type: ${action.type}`);
    }
  }

  
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
        console.log('OPEN_NEW_WEBVIEW_TABPANEL');
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
        console.log('clear state');
        localStorage.removeItem('tabBarState');
        return mainpanelInitialState; 
  
      default:
        throw new Error(`Unhandled action type: ${action.type}`);
    }
  }


export  function MyContextProvider(props) {
    // 初始化状态，count 为初始值
  
    // 使用 useReducer 定义状态和 dispatch 函数
    // const savedState = localStorage.getItem('tabBarState');
    // const [mainpanelState, mainpanelDispatch] = useReducer(mainpanelReducer, savedState ? JSON.parse(savedState) : mainpanelInitialState);
    // const [commandState, commandDispatch] = useReducer(commandReducer, commandInitialState);

    return (
      // 将状态和 dispatch 函数通过 AppContext.Provider 提供给子组件
      // <MyContext.Provider value={{ mainpanelState, mainpanelDispatch,commandState,commandDispatch }} {...props}>
      <MyContext.Provider {...props}>
      </MyContext.Provider>
    );
  }

  export function useMyContextState() {
    return useContext(MyContext);
  }

