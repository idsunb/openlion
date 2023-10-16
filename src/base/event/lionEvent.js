const { ipcMain } = require('electron');
// import { ipcMain } from 'electron';



const EventEmitter = require('events');






class LionEvent {
  constructor() {
    this.lionEvents = new EventEmitter();
  }

  getLionEvents() {
    return this.lionEvents;
  }

  register(name, handler) {
    console.log('registering system event', name);
    this.lionEvents.on(name, handler);
    // console.log(this.lionEvents);
    // console.log('event group', {...eventGroup});
  }

  trigger(name, args) {
    // console.log('triggering event', name, args,this.lionEvents);
    this.lionEvents.emit(name, args);
  }

  remove(name, handler) {
    // console.log('removing event', name);
    this.lionEvents.removeListener(name, handler);
    // console.log(this.lionEvents);
  }
}

// ipcMain.on('registerEvent', (event, {name,eventID}) => {
//   console.log('registerEvent', name,eventID);
  
// });




// //收到webcontent的注册事件，注册到lionEvent中，但注册的是一个回调函数，当lionEvent触发的时候，调用webcontent的emit
// ipcMain.on('system.lionEvent.register', (event, {name,channelID}) => {
//   const handler = (data) => {
//     event.sender.send('fromsystem.lionEvent.trigger', {name:name, channelID:channelID,data:data});
//   };

//   //如果文件渲染进程重新加载，就移除lionEvent的事件
//   //因为重新加载的时候，会重新注册lionEvent的事件，如果不移除，就会重复注册
//   const webcontent = event.sender;
//   webcontent.on('did-start-loading', () => {
//     console.log('reload---------');
//     lionEvent.remove(name, handler);
//   })
//   // webcontent.on('beforeunload', (event) => {
//   //   console.log('webcontent beforeunload');
//   // })


//   //注册了一个函数，当调用的时候，调用webcontent的中的事件emit
//   lionEvent.register(name, handler);

  
// });

//收到渲染进程发来的系统触发事件，触发lionEvent的事件，会调用在main中注册的回调函数
//如果是非系统事件，就会回调到webcontent的send事件，来调用渲染进程的trigger
ipcMain.on('triggerEvent', (event, {name,eventID, args}) => {
  // console.log('triggerEvent', name,eventID, args,lionEvent.getLionEvents());
  lionEvent.trigger(name, args);
});


const lionEvent = new LionEvent();


//创建一个对象，用来存储eventID和事件的对应关系
export const eventGroup = {};

function addObjectToKey(key, innerKey, value) {
  if (!eventGroup[key]) {
    eventGroup[key] = {}; // 创建内部对象
  }

  // 添加键值对到内部对象
  eventGroup[key][innerKey] = value;
}

ipcMain.on('events', (event,data) => {
  // 当我们在主进程中接收到 MessagePort 对象, 它就成为了
  // MessagePortMain.
  const port = event.ports[0]
  const eventID = data.eventID;




  port.on('message', async (event) => {

    const message = event.data;
    if (message.type === 'registerEvent') {
      const name = message.name;
      const eventID = message.eventID;
      const handler = (args) => {
        port.postMessage({ type: 'triggerEvent', name:name,eventID:eventID, args:args });
      };
      addObjectToKey(eventID,name, handler);
      lionEvent.register(name, handler);
      // console.log('eventGroup', eventGroup);
    }


  })


  port.on('close', () => {  
    // delete commands[commandID];
    // portMap.delete(port);
    console.log(`port closed lionevent`);
    // console.log('eventGroup', eventGroup);
    for (const name in eventGroup[eventID]) {
      lionEvent.remove(name, eventGroup[eventID][name]);
    }

    delete eventGroup[eventID];



    // lionEvent.remove(name, handler);
  })
  // MessagePortMain 阻塞消息直到 .start() 方法被调用
  port.start()
})




export default lionEvent;




