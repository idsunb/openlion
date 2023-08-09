
import React, { useReducer } from 'react';
// import MyContext from './MyContext';
//mycontext 在preload.js中定义，这里不需要再定义，它已经变成了全局变量
import ReactDOM from 'react-dom';
// import TopBar from './TopBar';
// import NavBar from './NavBar';
// import SideBar from './SideBar';

import LeftSidePanel from './LeftSidePanel';
import MainPanel from './MainPanel';
import RightSidePanel from './RightSidePanel';
// import './App.css';
import styles from './App.module.css';
import {MyContextProvider} from './MyContext';
import LionCommand from './lioncommand/LionCommand';



// // 启用 React 开发者工具
// if (process.env.NODE_ENV !== 'production') {
//   window.__REACT_DEVTOOLS_GLOBAL_HOOK__.inject = function() {};
// }


function App() {



  function StatusBar() {
    return (
      <div className={styles.statusBar}>
        <span>状态栏</span>
      </div>
    );
  }

  const content = (
    <div className={styles.app}>
        <LeftSidePanel  />
        <MainPanel title={'finlion'}/>
        <RightSidePanel  />
        <LionCommand  />


    </div>
  );


  function myContexApp(){    
    console.log('myContexApp');
    // console.log(MyContext);
    // 将数据传递给上下文对象的 Provider 组件
    return (
      <MyContextProvider>
      {content}
      {/* <StatusBar /> */}
      </MyContextProvider>
  

 
  )};


  return myContexApp();
}
// const App = () => {  
//   return (
//     <div>
//       haha
//     </div>
//   );
// };


export default App;


