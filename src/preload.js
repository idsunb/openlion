
import { contextBridge, ipcRenderer, app } from 'electron';
import React, { useContext } from 'react';
import { ReactDOM } from 'react';
import path from 'path';
// import MyContext from './MyContext';
// import {useMyContextState} from './MyContext';
// import { triggerEvent } from './lionevent/LionEvent';
import { triggerEvent, registerEvent } from './lionevent/LionEvent';



// path.join(__dirname, 'preload.js')

registerEvent('test', (data) => {
  console.log('useContexttest', data);
}
);

//   console.log(`file://${__dirname}/preload.js`);
// console.log('preload.js');

// data = useContext(MyContext);

// contextBridge.exposeInMainWorld('MyContext', MyContext);
// const lionAPI = {
//     sayHello: () => {
//       console.log('Hello from lionAPI!');
//     },
//     fetchdata: () => {
//       console.log('fetchdata from lionAPI!');
//       console.log(data);
//     }
//   };

// contextBridge.exposeInMainWorld('lionAPI', lionAPI);
//  const { state, dispatch } = statereducer();
// console.log(state);


window.myAPI = {
  desktop: true
}
// contextBridge.exposeInMainWorld('myAPI', {
//     desktop: true
// })

// contextBridge.exposeInMainWorld("ipcRenderer", {on: ipcRenderer.on, send: ipcRenderer.send})

process.myvalue = 42;



const lionAPI = {
  triggerEvent: triggerEvent,
  registerEvent: registerEvent,
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
    const myfilepath = path.join(__dirname, '..', 'extension', 'preload.js');
    return myfilepath;
    console.log(myfilepath);
  },
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  myvalue: () => process.myvalue,
  getUserDataPath: async () => {
    const response = await ipcRenderer.invoke('system:getUserDataPath');

    return response;
  },
  getExtensionPath: async () => {
    const response = await ipcRenderer.invoke('system:getUserDataPath');
    return path.join(response, 'extensions');
  },
  openMainPanelTab: ({ name, path }) => {
    triggerEvent('open-main-panel-tab', { name, path });
  }
};

window.lionAPI = lionAPI;


// contextBridge.exposeInMainWorld('lion', lion);

window.sayHello = () => {
  console.log('Hello from myAPI!');
};

  // contextBridge.exposeInMainWorld('sayhello', {
  //   sayHello: () => {
  //     console.log('Hello from myAPI!');
  //   },
  // });

