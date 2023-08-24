import { ipcRenderer } from 'electron';
const _ = require('lodash');


const id = Math.random().toString(36).substring(2, 9);
const contextID = `context-${id}`;




const channel = new MessageChannel()
const port1 = channel.port1
const port2 = channel.port2


const onMessageHandler = async (event) => {
    const message = event.data;
    if(message.type==='updateState'){
        // console.log('lioncontext  state',{...message});
        // port2.postMessage('success');
        lionContext.states = message.states;
    }


    
}

port2.addEventListener('message', onMessageHandler);

function sendMessage(message) {
    return new Promise((resolve) => {
      port2.onmessage = (event) => {
        resolve(event.data);
      };
      port2.postMessage(message);
    });
  }



ipcRenderer.postMessage('lionport', {contextID:contextID}, [port1])





//   function sendMessage(message) {
//     return new Promise((resolve, reject) => {
//       const onMessage = (event) => {
//         if (event.data.error) {
//           reject(event.data.error);
//         } else {
//           resolve(event.data);
//         }
//         port2.removeEventListener('message', onMessage);
//       };
//       port2.addEventListener('message', onMessage);
//       console.log('here',message);

//       port2.postMessage(message);
//     });
//   }




export const lionContext = 
{
    states:{},

    update: async ()=>{

        const result = await sendMessage({type:'getState',contextID:contextID})
        // console.log('lioncontext update result',{...result});
        // console.log('result2',result2);
        lionContext.states = Object.assign({}, result);
        // console.log('lioncontext update states',lionContext.getState());
    },


        init: async () => {
            await lionContext.update();
        },

        setState: async (newState) => {
            await lionContext.waitForInit();
            port2.postMessage({ type: 'setState', contextID: contextID, newState: newState });
        },

        mergeState: async (newState) => {
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

        waitForInit: async () => {
            if (!lionContext.initPromise) {
                lionContext.initPromise = lionContext.init();
            }
            await lionContext.initPromise;
        },

        update: async () => {
            const result = await sendMessage({ type: 'getState', contextID: contextID });
            lionContext.states = Object.assign({}, result);
        },
    


}

lionContext.waitForInit().then(() => {
    console.log('lioncontext in here',lionContext.getState())
});


// lionContext.init();






