
import { contextBridge, ipcRenderer, app } from 'electron';
import React, { useContext } from 'react';
import { ReactDOM } from 'react';
import path from 'path';
// import MyContext from './MyContext';
// import {useMyContextState} from './MyContext';
// import { triggerEvent } from './lionevent/LionEvent';
// import { triggerEvent, registerEvent } from './lionevent/LionEvent';
// import { registerCommand, getCommands, callCommand } from './workspace/command/commands';
import {initKeybinds, getkeybinds} from './workspace/keybinding/keybinding';

import lionAPI from './workspace/lionAPI/lionAPI';
// import lionEvent from './workspace/event/lionEvent';

// console.log('-----');
lionAPI.lionEvent.register('system.eventtest1', (data) => {
  console.log('system.eventtest1', data);
});
lionAPI.lionEvent.trigger('system.eventtest1',1234);

// //初始化快捷键
initKeybinds();
lionAPI.getkeybinds=getkeybinds;

console.log(lionAPI.getPreloadFilePath())

// ipcRenderer.on('testback', (event, data) => {
//   console.log('testback', data);
// });



// path.join(__dirname, 'preload.js')

// registerEvent('test', (data) => {
//   console.log('useContexttest', data);
// }
// );




window.myAPI = {
  desktop: true
}
// contextBridge.exposeInMainWorld('myAPI', {
//     desktop: true
// })

// contextBridge.exposeInMainWorld("ipcRenderer", {on: ipcRenderer.on, send: ipcRenderer.send})

process.myvalue = 42;

lionAPI.registerCommand({name:'mainpanel.keybinding.panel.open', action:
  () => {
    console.log('mainpanel.keybinding.panel.open');
  }
});
console.log('lionAPI',lionAPI.getCommands());


window.addEventListener('load', (event) => {
  console.log('load');
});

window.addEventListener('unload', (event) => {
  console.log('did-stop-loading');
});

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

