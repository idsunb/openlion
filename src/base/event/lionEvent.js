import { ipcMain } from 'electron';
import { web } from 'webpack';


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
    console.log(this.lionEvents);
  }

  trigger(name, data) {
    console.log('triggering event', name, data);
    console.log(this.lionEvents);
    this.lionEvents.emit(name, data);
  }

  remove(name, handler) {
    console.log('removing event', name);
    this.lionEvents.removeListener(name, handler);
    console.log(this.lionEvents);
  }
}

//收到webcontent的注册事件，注册到lionEvent中，但注册的是一个回调函数，当lionEvent触发的时候，调用webcontent的emit
ipcMain.on('system.lionEvent.register', (event, {name,channelID}) => {
  const handler = (data) => {
    event.sender.send('fromsystem.lionEvent.trigger', {name:name, channelID:channelID,data:data});
  };

  //如果文件渲染进程重新加载，就移除lionEvent的事件
  //因为重新加载的时候，会重新注册lionEvent的事件，如果不移除，就会重复注册
  const webcontent = event.sender;
  webcontent.on('did-start-loading', () => {
    console.log('reload---------');
    lionEvent.remove(name, handler);
  })
  // webcontent.on('beforeunload', (event) => {
  //   console.log('webcontent beforeunload');
  // })


  //注册了一个函数，当调用的时候，调用webcontent的中的事件emit
  lionEvent.register(name, handler);

  
});

//收到渲染进程发来的系统触发事件，触发lionEvent的事件，会调用在main中注册的回调函数
//如果是非系统事件，就会回调到webcontent的send事件，来调用渲染进程的trigger
ipcMain.on('system.lionEvent.trigger', (event, name, data) => {
  console.log('triggering event', name, data);
  lionEvent.trigger(name, data);
});


const lionEvent = new LionEvent();


export default lionEvent;

