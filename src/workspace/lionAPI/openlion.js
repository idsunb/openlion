import lionEvent from '../event/lionEvent';

import { lionContext } from '../context/lionContext';
const path = require('path');
import { utils } from './utils';
import StatusItem from '../item/StatusItem';
// import {SHA256} from 'crypto-js';



// import { ipcRenderer } from 'electron';
const {ipcRenderer} = require('electron');

import command from '../command/commands';

import { lionExtension } from '../extension/LionExtension';

// console.log(registerCommand, getCommands, callCommand);


// console.log(lionEvent.getLionEvents());
// console.log('-----');
// lionEvent.register('system.eventtest1', (data) => {
//     console.log('system.eventtest1', data);
// });
// lionEvent.trigger('system.eventtest1', 1234);
let openlionContext = [];

export const openlion = {
    // triggerEvent: triggerEvent,
    // registerEvent: registerEvent,
    lionCommand: {
        setActive: command.setActive.bind(command),
        setName: command.setName.bind(command),
        register: command.registerCommand.bind(command),
        getCommands: command.getCommands.bind(command),
        call: command.callCommand.bind(command),
    },

    lionContext: {
        name: lionContext.name,
        setState: lionContext.setState.bind(lionContext),
        setConfig: lionContext.setConfig.bind(lionContext),
        getConfig: lionContext.getConfig.bind(lionContext),
        mergeState: lionContext.mergeState.bind(lionContext),
        getState: lionContext.getState.bind(lionContext),
        getTestState: lionContext.getTestState.bind(lionContext),

    },


    // lionEvent:lionEvent,
    lionEvent: {
        setActive: lionEvent.setActive.bind(lionEvent),
        setName: lionEvent.setName.bind(lionEvent),
        register: lionEvent.register.bind(lionEvent),
        trigger: lionEvent.trigger.bind(lionEvent),
        remove: lionEvent.remove.bind(lionEvent),
        getLionEvents: lionEvent.getLionEvents.bind(lionEvent),
    },

    lionExtension:
    {
        setActive: lionExtension.setActive.bind(lionExtension),
        setDeactive: lionExtension.setDeactive.bind(lionExtension),
        enable: lionExtension.enable.bind(lionExtension),
        disable: lionExtension.disable.bind(lionExtension),
        name: lionExtension.name,


    },
    openWebview: ({url,tip,title,where,aburl,uid}) => {
        const config = lionContext.getConfig();
        if(where=='mainpanel' && url && !aburl ){
            // lionContext.getConfig().root
        openlion.lionCommand.call('mainpanel.openwebview', { url: path.join(lionContext.getConfig().root,url), tip: tip,uid:uid, title: title,config:config})
        }
        if(where=='leftpanel' && url && !aburl ){
            openlion.lionCommand.call('leftpanel.openwebview', { url: path.join(lionContext.getConfig().root,url),uid:uid, tip: tip, title: title,config:config})
        }
        if(where=='mainpanel' && aburl){
            openlion.lionCommand.call('mainpanel.openwebview', { url: aburl, uid:uid,tip: tip, title: title,config:config})
        }
        if(where=='leftpanel' && aburl){
            openlion.lionCommand.call('leftpanel.openwebview', { url: aburl,uid:uid, tip: tip, title: title,config:config})
        }

    },
    chekDependency:utils.chekDependency,
    createStatusBarItem:(alignment,priority,id)=>{
        //产生uid
        const name = lionContext.getConfig().name;
        const sid = Math.random().toString(36).substring(2, 9);
        const statusID = `${name}-${sid}`;


        const item =  new StatusItem(alignment,priority,statusID)
        openlionContext.push(item)
        return item
    },
    contextDispose:()=>{
        console.log('contextDispose');
        console.log('openlionContext',openlionContext);
        openlionContext.forEach(item=>{
            console.log(item);
            item.dispose()
        })
    },
    StatusBar:{
        Left:'left',
        Right:'right',

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


lionExtension.active= function(){
    console.log('gggggggggggggggggggggggggggggggggggg active');
}

export default openlion;


module.exports = openlion;

