<<<<<<< HEAD
import React from 'react';
=======
import React, { useReducer } from 'react';
// import MyContext from './MyContext';
//mycontext 在preload.js中定义，这里不需要再定义，它已经变成了全局变量
>>>>>>> c2b5c09 (0.1.8.9.1)
import ReactDOM from 'react-dom';
// import TopBar from './TopBar';
// import NavBar from './NavBar';
// import SideBar from './SideBar';
<<<<<<< HEAD
// import MainPanel from './MainPanel';
// import AssistantPanel from './AssistantPanel';

// import './App.css';
// import { OpenAI } from "langchain/llms/openai";

// const model = new OpenAI({ openAIApiKey: "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", temperature: 0.9 });
// const res = await model.call(
//   "你还好吗"
// );
// console.log(res);




// const App = () => {
//   let activeItem;


//   const handleItemClick = (item) => {
//     activeItem= item;
//     render();

//   };

  
//   const renderSideBar = () => {
//     switch (activeItem) {
//       case 'notifications':
//         return <SideBar title="Notifications" />;
//       case 'profile':
//         return <SideBar title="Profile" />;
//       case 'project1':
//         return <SideBar title="Project 1" />;
//       case 'project2':
//         return <SideBar title="Project 2" />;
//       case 'settings':
//         return <SideBar title="Settings" />;
//       default:
//         return null;
//     }
//   };

//   const renderMainPanel = () => {
//     switch (activeItem) {
//       case 'notifications':
//         return <MainPanel title="Notifications" />;
//       case 'profile':
//         return <MainPanel title="Profile" />;
//       case 'project1':
//         return <MainPanel title="Project 1" />;
//       case 'project2':
//         return <MainPanel title="Project 2" />;
//       case 'settings':
//         return <MainPanel title="Settings" />;
//       default:
//         return null;
//     }
//   };

//   const render = () => {
//     const content = (
//       <div className="app" >
//         <TopBar />
        
//         <div className="content">
          
//           <NavBar handleItemClick={handleItemClick} />
//           {renderSideBar()}
//           {renderMainPanel()}
//           <AssistantPanel />
//         </div>
//       </div>
//     );

    
//     ReactDOM.render(content, document.getElementById('root'));
//   };

//   // 初始化 activeItem 的值
//   activeItem = 'notifications';

//   render();
//   console.log(render());
// };

// console.log(App());

const App = () =>{
  return (<div>hello world</div>);
}


=======
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
>>>>>>> c2b5c09 (0.1.8.9.1)


export default App;


