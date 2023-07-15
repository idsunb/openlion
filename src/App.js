import React from 'react';
import ReactDOM from 'react-dom';
// import TopBar from './TopBar';
// import NavBar from './NavBar';
// import SideBar from './SideBar';
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




export default App;


