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
        lionContext.states[id] = { ...lionContext.states[id], ...newState };

        for (const [key, value] of portMap.entries()) {
            await key.postMessage({
                type: "updateState",
                states: lionContext.states,
                contextID: value,
            });
        }


    },
    mergeStateByID: async (id, newState) => {
                lionContext.states[id] = _.merge(lionContext.states[id], newState);

        for (const [key, value] of portMap.entries()) {
            await key.postMessage({
                type: "updateState",
                states: lionContext.states,
                contextID: value,
            });
        }
    },
    deleteAllState: () => {
        lionContext.states = {};
    },
    deleteStateByID: async (id) => {

        delete lionContext.states[id];
        for (const [key, value] of portMap.entries()) {
            await key.postMessage({
                type: "updateState",
                states: lionContext.states,
                contextID: value,
            });
        }
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



ipcMain.handle('context.getState', async (event, data) => {
    return lionContext.states;
});


const portMap = new Map();



ipcMain.on('lionport', (event,data) => {
  // 当我们在主进程中接收到 MessagePort 对象, 它就成为了
  // MessagePortMain.
  const port = event.ports[0]
  const contextID = data.contextID;
  portMap.set(port,contextID)
  lionContext.states[contextID] = {};



  port.on('message', async (event) => {

    const message = event.data;
    if (message.type === 'getState') {
    //   const newState = message.payload;
      // 执行更新状态的操作
      console.log('here i receive getState and send states',lionContext.states);
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

//删除,需要删除后,及时通知更新
  port.on('close', () => {  
    portMap.delete(port);
    lionContext.deleteStateByID(contextID);
    console.log(`port closed context `);
  })
  // MessagePortMain 阻塞消息直到 .start() 方法被调用
  port.start()
})

