
import { contextBridge, ipcRenderer, app } from 'electron';
import React, { useContext } from 'react';
import { ReactDOM } from 'react';
import path from 'path';
// import MyContext from './MyContext';
// import {useMyContextState} from './MyContext';
// import { triggerEvent } from './lionevent/LionEvent';
// import { triggerEvent, registerEvent } from './lionevent/LionEvent';
// import { registerCommand, getCommands, callCommand } from './workspace/command/commands';
// import {initKeybinds, getkeybinds} from './workspace/keybinding/keybinding';

// import openlion from './workspace/lionAPI/openlion';
// import lionEvent from './workspace/event/lionEvent';

// console.log('-----');

// window.lionAPIP = openlion;



// openlion.lionCommand.register({name:'test',action:() => {console.log('test from preload')}});

// //初始化快捷键
// initKeybinds();
// openlion.getkeybinds=getkeybinds;

// console.log(lionAPI.getPreloadFilePath())

// ipcRenderer.on('testback', (event, data) => {
//   console.log('testback', data);
// });


// ipcRenderer.send('sendID','preload')


// path.join(__dirname, 'preload.js')

// registerEvent('test', (data) => {
//   console.log('useContexttest', data);
// }
// );

let chat_url = '';
let chat_name = '';




window.myAPI = {
  desktop: true
}
// contextBridge.exposeInMainWorld('myAPI', {
//     desktop: true
// })

// contextBridge.exposeInMainWorld("ipcRenderer", {on: ipcRenderer.on, send: ipcRenderer.send})

process.myvalue = 42;




window.addEventListener('load', (event) => {
  console.log('load');
});

window.addEventListener('unload', (event) => {
  console.log('did-stop-loading');
});






// contextBridge.exposeInMainWorld('lion', lion);

window.sayHello = () => {
  console.log('Hello from myAPI!');
};

  // contextBridge.exposeInMainWorld('sayhello', {
  //   sayHello: () => {
  //     console.log('Hello from myAPI!');
  //   },
  // });

