
// import lionEvent from './workspace/event/lionevent';
import openlion from './workspace/lionAPI/openlion';


window.openlion = openlion;

// ipcRenderer.send('sendID','no')


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


  // contextBridge.exposeInMainWorld('openlion', openlion);


  // contextBridge.exposeInMainWorld('sayhello', {
  //   sayHello: () => {
  //     console.log('Hello from myAPI!');
  //   },
  // });
