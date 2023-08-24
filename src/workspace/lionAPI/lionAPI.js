
import lionEvent from '../event/lionEvent';

import { ipcRenderer } from 'electron';

import { registerCommand, getCommands, callCommand } from '../command/commands';

import { lionContext } from '../context/lionContext';


// console.log(registerCommand, getCommands, callCommand);


// console.log(lionEvent.getLionEvents());
// console.log('-----');
// lionEvent.register('system.eventtest1', (data) => {
//     console.log('system.eventtest1', data);
// });
// lionEvent.trigger('system.eventtest1', 1234);



const lionAPI = {
    // triggerEvent: triggerEvent,
    // registerEvent: registerEvent,
    lionCommand: {
    register: registerCommand,
    getCommands: getCommands,
    call: callCommand,
    },

    lionContext:{
        setState:lionContext.setState,
        mergeState:lionContext.mergeState,
        getState:lionContext.getState,

    },


    // lionEvent:lionEvent,
    lionEvent: {
        register: lionEvent.register.bind(lionEvent),
        trigger: lionEvent.trigger.bind(lionEvent),
        remove: lionEvent.remove.bind(lionEvent),
        getLionEvents: lionEvent.getLionEvents.bind(lionEvent),
    },
    getWebcontentsID: () => {
        return webContentsID;

        // return ipcRenderer.id;
    },

    setTitle: (title) => {
        ipcRenderer.send('set-title', title);
    },
    openFile: async () => {
        // const response = await ipcRenderer.invoke('dialog:openFile');
        // return response;
        const response = await callCommand('system.openfile');
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
    // getPreloadFilePath: () => {
    //     console.log('getfilepath');
    //     const myfilepath = path.join(__dirname, '..', 'extension', 'preload.js');
    //     return myfilepath;
    //     console.log(myfilepath);
    // },
    // node: () => process.versions.node,
    // chrome: () => process.versions.chrome,
    // electron: () => process.versions.electron,
    // myvalue: () => process.myvalue,
    getUserDataPath: async () => {
        const response = await ipcRenderer.invoke('system:getUserDataPath');

        return response;
    },
    getExtensionPath: async () => {
        const response = 'c:\\Users\\Administrator\\AppData\\Roaming\\openlion\\extensions\\'
        // const response = await ipcRenderer.invoke('system:getUserDataPath');
        // return path.join(response, 'extensions');
    },
    openMainPanelTab: ({ name, path }) => {
        // triggerEvent('open-main-panel-tab', { name, path });
    }
};



export default lionAPI;


module.exports = lionAPI;


console.log('lionAPI context',lionContext.getState() );