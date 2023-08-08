
const { contextBridge,ipcRenderer,app  } = require('electron');
const path = require('path');

console.log('i am extension preload.js');



const lion = {
    setTitle: (title) => {
      ipcRenderer.send('set-title', title);
    },
    openFile: async () => {
      const response = await ipcRenderer.invoke('dialog:openFile');
      return response;
    },
    onUpdateCounter: (callback) => ipcRenderer.on('update-counter', callback),
    useContexttest: (callback) => {
      console.log(callback);
        onecallback = callback;      
      // callback();

    },
    useContexttest1: () => {
      console.log('useContexttest1');
      window.postMessage({ type: 'add-tab-panel' }, '*');
  },
    getPreloadFilePath: () => {
      console.log('getfilepath');
      const myfilepath = path.join(__dirname,'..','extension', 'preload.js');
      return myfilepath;
      console.log(myfilepath);
    },
    node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  myvalue: () => process.myvalue,

  };


  contextBridge.exposeInMainWorld('lion', lion);


  contextBridge.exposeInMainWorld('sayhello', {
    sayHello: () => {
      console.log('Hello from myAPI!');
    },
  });
