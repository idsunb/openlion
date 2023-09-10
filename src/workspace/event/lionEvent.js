// import { ipcRenderer } from 'electron';
const { ipcRenderer } = require('electron');

const EventEmitter = require('events');

const id = Math.random().toString(36).substring(2, 9);
const eventID = `event-${id}`;





const channel = new MessageChannel()
const port1 = channel.port1
const port2 = channel.port2


ipcRenderer.postMessage('events', {eventID:eventID}, [port1])

port2.addEventListener('message', async (event) => {
    const message = event.data;
    console.log('here i receive message', message);

    if (message.type === 'triggerEvent') {
        if(!lionEvent.active){
            console.log("🚀 ~ file: lionEvent.js:25 ~ LionEvent ~ trigger ~ can't active:", lionEvent.active)
            return;
        }
        const { type,name, args, eventID: id } = message;
        if (id == eventID) {
            lionEvent.triggerLocal(name, args);
        }
    }
});

port2.start();





class LionEvent {
    constructor() {
        this.lionEvents = new EventEmitter();
        this.name = eventID;
        this.active = true;
        // const channel = new MessageChannel()
        // const port1 = channel.port1
        // this.port2 = channel.port2
        // ipcRenderer.postMessage('events', { eventID: eventID }, [port1])

        // this.port2.addEventListener('message', async (event) => {
        //     const message = event.data;
        //     console.log('here i receive message', message);

        //     if (message.type === 'triggerEvent') {
        //         const { type, name, args, eventID: id } = message;
        //         if (id == eventID) {
        //             lionEvent.triggerLocal(name, args);
        //         }
        //     }
        //     this.port2.start();

        // });

    }

    setName(name) {
        this.name = name;
    }

    setActive(value = true) {
        this.active = value;
    }

    getLionEvents() {
        console.log('getLionEvents', this.lionEvents);
        return this.lionEvents;
    }

    register(name, handler) {
        console.warn('registering local event', name);
        if (this.lionEvents.listenerCount(name) == 0) {
            // ipcRenderer.send('lionEvent.register', {name:name,eventID:eventID});
            // console.warn('system event registered', name);
            // try {
            // const result = ipcRenderer.invoke('registerEvent', {name:name,eventID:eventID});
            // if(result=='success'){
            //     console.warn('system event registered', name);
            // }else{
            //     console.warn('system event register failed', result);
            // } 
            // } catch (error) {
            //     console.warn('system event register failed error:', error);
            // }
            port2.postMessage({ type: 'registerEvent', name: name, eventID: eventID });


        }

        this.lionEvents.on(name, handler);
        console.log(this.lionEvents);
    }


    trigger(name, args) {
        if (!this.active) {
            console.log("🚀 ~ file: lionEvent.js:103 ~ LionEvent ~ trigger ~ can't active:", this.active)
            return;
        }
        console.log(`trigger remote event ${eventID}:`, name, args, this.lionEvents);

        ipcRenderer.send('triggerEvent', { name: name, eventID: eventID, args: args });


        // // 如果本地有监听，先触发本地的监听，如果没有，再触发主进程的监听
        // if (this.lionEvents.listenerCount(name) > 0) {
        //     this.lionEvents.emit(name, data);
        // } else {
        // }
    }

    triggerLocal(name, data) {
        if(!this.active){
            console.log("🚀 ~ file: lionEvent.js:124 ~ LionEvent ~ triggerLocal  ~ can't active:", this.active)
            return

        }

        console.log('triggering local event', name, data);
        this.lionEvents.emit(name, data);
    }

    remove(name, handler) {
        console.log('removing event', name);
        this.lionEvents.removeListener(name, handler);
        console.log(this.lionEvents);
    }
}

// ipcRenderer.on('fromsystem.lionEvent.trigger', (event, {name,eventID, data}) => {

//     if(lionEvent.eventID == eventID){
//         console.log(`fromsystem.lionEvent.trigger name:${name} eventID:${eventID},data:${data}`, );
//         lionEvent.triggerLocal(name, data);
//     }

// }
// );


export const lionEvent = new LionEvent();
console.log("🚀 ~ file: lionEvent.js:138 ~ lionEvent:", lionEvent)


lionEvent.register('extension.port.close', (data) => {
    console.log('extension.port.close event response', data);
    // const { port } = data;
    port2.close();
    // port.close();
});   


export default lionEvent;

