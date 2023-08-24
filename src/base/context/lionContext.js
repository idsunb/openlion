import { ipcMain, BrowserWindow } from "electron";
const _ = require('lodash');




export const lionContext = {
    states: {},
    setState: async (newState) => {
        lionContext.states[0] = { ...lionContext.states[0], ...newState };
        for (const [key, value] of portMap.entries()) {
            await key.postMessage({
                type: "updateState",
                states: lionContext.states,
                contextID: value,
            });
        }
        console.warn("setState", lionContext.states);
    },
    mergeState: async (newState) => {
        lionContext.states[0] = _.merge({}, lionContext.states[0], newState);
        for (const [key, value] of portMap.entries()) {
            await key.postMessage({
                type: "updateState",
                states: lionContext.states,
                contextID: value,
            });
        }
        console.warn("mergeState", lionContext.states);
    },
    setStateByID: async (id, newState) => {
        for (const [key, value] of portMap.entries()) {
            await key.postMessage({
                type: "updateState",
                states: lionContext.states,
                contextID: value,
            });
        }

        lionContext.states[id] = { ...lionContext.states[id], ...newState };

    },
    mergeStateByID: async (id, newState) => {
        for (const [key, value] of portMap.entries()) {
            await key.postMessage({
                type: "updateState",
                states: lionContext.states,
                contextID: value,
            });
        }
        lionContext.states[id] = _.merge(lionContext.states[id], newState);
    },
    deleteAllState: () => {
        lionContext.states = {};
    },
    deleteStateByID: (id) => {
        delete lionContext.states[id];
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
};



// const state ={
//     0:{a:1,b:2},
//     1:{c:1,d:2},


// }




function sendMessage(message) {
    return new Promise((resolve) => {
      port2.onmessage = (event) => {
        resolve(event.data);
      };
      port2.postMessage(message);
    });
  }


const portMap = new Map();



ipcMain.on('lionport', (event,data) => {
  // 当我们在主进程中接收到 MessagePort 对象, 它就成为了
  // MessagePortMain.
  const port = event.ports[0]
  const contextID = data.contextID;
  portMap.set(port,contextID)



  port.on('message', async (event) => {

    const message = event.data;
    if (message.type === 'getState') {
    //   const newState = message.payload;
      // 执行更新状态的操作
      port.postMessage(lionContext.states);
    }
    if (message.type === 'setState') {
        const newState = message.newState;
        const contextID = message.contextID;
        await lionContext.setStateByID(contextID,newState);


    }
    if (message.type === 'mergeState') {

        const newState = message.newState;
        const contextID = message.contextID;
        await lionContext.mergeStateByID(contextID,newState);


    }

  })


  port.on('close', () => {  
    lionContext.deleteStateByID(portMap.get(port));
    portMap.delete(port);
    // console.log(`port closed `,data);
  })
  // MessagePortMain 阻塞消息直到 .start() 方法被调用
  port.start()
})

