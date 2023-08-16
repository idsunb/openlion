
const { contextBridge,ipcRenderer,app  } = require('electron');
const path = require('path');
import {  registerCommand, getCommands, callCommand } from './workspace/command/commands';
// import lionEvent from './workspace/event/lionevent';
import lionAPI from './workspace/lionAPI/lionAPI';


window.addEventListener('load', (event) => {
  ipcRenderer.send('finishload', 'finishload111111');
  console.log('load');
});

ipcRenderer.on('beforeunload', (event, data) => {
  ipcRenderer.send('finishunload', data);
  console.log('beforeunload');
});


// const lionAPI = {
//     setTitle: (title) => {
//       ipcRenderer.send('set-title', title);
//     },
//     registerCommand:registerCommand,
//     callCommand: callCommand,
//     getCommands: getCommands,
//     lionEvent:{
//       register:lionEvent.register,
//       trigger:lionEvent.trigger,
//       remove:lionEvent.remove,
//       getLionEvents:lionEvent.getLionEvents,
//     },

//     openFile: async () => {
//       const response = await ipcRenderer.invoke('dialog:openFile');
//       return response;
//     },
//     onUpdateCounter: (callback) => ipcRenderer.on('update-counter', callback),
//     useContexttest: (callback) => {
//       console.log(callback);
//         onecallback = callback;      
//       // callback();

//     },
//     useContexttest1: () => {
//       console.log('useContexttest1');
//       window.postMessage({ type: 'add-tab-panel' }, '*');
//   },
//     getPreloadFilePath: () => {
//       console.log('getfilepath');
//       const myfilepath = path.join(__dirname,'..','extension', 'preload.js');
//       return myfilepath;
//       console.log(myfilepath);
//     },
//     node: () => process.versions.node,
//   chrome: () => process.versions.chrome,
//   electron: () => process.versions.electron,
//   myvalue: () => process.myvalue,

//   };


  contextBridge.exposeInMainWorld('lionAPI', lionAPI);


  contextBridge.exposeInMainWorld('sayhello', {
    sayHello: () => {
      console.log('Hello from myAPI!');
    },
  });
