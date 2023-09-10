// import { ipcRenderer } from 'electron';
const {ipcRenderer} = require('electron');
const _ = require('lodash');
import lionEvent from '../event/lionEvent';

const id = Math.random().toString(36).substring(2, 9);
const contextID = `context-${id}`;




const channel = new MessageChannel()
const port1 = channel.port1
const port2 = channel.port2


const onMessageHandler = async (event) => {
    const message = event.data;
    // console.log('here i receive message', message);
    if(message.type==='updateState'){
        // port2.postMessage('success');
        

        lionContext.states = message.states;
    }


    
}

port2.addEventListener('message', onMessageHandler);





ipcRenderer.postMessage('lionport', {contextID:contextID}, [port1])


port2.start();





class LionContext {
    constructor() {
        this.states = {};
        this.states[contextID] = {};
        this.setConfig({contextID:contextID})


    }

    static  init =async () => {
        const result = await ipcRenderer.invoke('context.getState', { contextID: contextID });

        return result; 
    }



    async setConfig(config) 
    {
        // this.states[contextID].config = config;
        // _.merge(this.states[contextID],config);
        await this.mergeState({config:config})
    }

    getConfig() {
        return this.states[contextID].config;
    }

    async setState(newState) {
        port2.postMessage({ type: 'setState', contextID: contextID, newState: newState });

    }

    async mergeState(newState) {
        // port2.postMessage({ type: 'mergeState', contextID: contextID, newState: newState });
        const result = await ipcRenderer.invoke('context.mergeState', { contextID: contextID, newState: newState });
        this.states = Object.assign({}, result);
    }

    getState() {
        const valuesArray = Object.values(this.states);
        const mergedObject = valuesArray.reduce((result, value, index) => {
            result = _.merge({},result,value);
            return result;
        }, {});
        return mergedObject
    }

    getTestState() {
        return this.states;
    }



    async update() {
        const result = await ipcRenderer.invoke('context.getState', { contextID: contextID });
        this.states = Object.assign({}, result);
    }
}

const initState = LionContext.init();

export const lionContext = new LionContext(initState);



lionEvent.register('extension.port.close', (data) => {
    console.log('extension.port.close  context', data);
    port2.close();
}   
);

// lionContext.init();






