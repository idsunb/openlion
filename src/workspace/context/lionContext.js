import { ipcRenderer } from 'electron';
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






export const lionContext = 
{
    states:{},



        init: async () => {
            await lionContext.update();
        },

        setState: async (newState) => {
            await lionContext.waitForInit();

            port2.postMessage({ type: 'setState', contextID: contextID, newState: newState });
        },

        mergeState: async (newState) => {
            lionEvent.trigger('mergeState', newState);


            await lionContext.waitForInit();
            port2.postMessage({ type: 'mergeState', contextID: contextID, newState: newState });
        },

        getState: () => {
            const valuesArray = Object.values(lionContext.states); // 获取原对象的值并转为数组
            const mergedObject = valuesArray.reduce((result, value, index) => {
                result = _.merge({},result,value); // 创建新对象，将值合并到新对象中
                return result;
              }, {});
            return mergedObject
        },

        getTestState: () => {
            return lionContext.states;
        },

        waitForInit: async () => {
            // console.log('waitForInit',lionContext.initPromise);
            if (!lionContext.initPromise) {
                lionContext.initPromise = lionContext.init();
                await lionContext.initPromise;

            }
        },

        update: async () => {
            // const result = await sendMessage({ type: 'getState', contextID: contextID });
            const result = await ipcRenderer.invoke('context.getState', { contextID: contextID });


            lionContext.states = Object.assign({}, result);
        },
    


}



lionEvent.register('extension.port.close', (data) => {
    console.log('extension.port.close  context', data);
    port2.close();
}   
);

// lionContext.init();






