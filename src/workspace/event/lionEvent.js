import { ipcRenderer } from 'electron';

const EventEmitter = require('events');

class LionEvent {
    constructor() {
        this.lionEvents = new EventEmitter();
        const id = Math.random().toString(36).substring(2, 9);
        this.channelID = `invokeRenderer-${id}`;
    }

    getLionEvents() {
        console.log('getLionEvents', this.lionEvents);
        return this.lionEvents;
    }

    register(name, handler) {
        console.warn('registering local event', name);
        if (this.lionEvents.listenerCount(name) == 0) {
            ipcRenderer.send('system.lionEvent.register', {name:name,channelID:this.channelID});
            console.warn('system event registered', name);
        }

        

        this.lionEvents.on(name, handler);
        console.log(this.lionEvents);
    }

    
    trigger(name, data) {
        console.log(`call triggering event to system channelid:${this.channelID}`, name, data);
        console.log(this.lionEvents);

        ipcRenderer.send('system.lionEvent.trigger', name, data);

        
        // // 如果本地有监听，先触发本地的监听，如果没有，再触发主进程的监听
        // if (this.lionEvents.listenerCount(name) > 0) {
        //     this.lionEvents.emit(name, data);
        // } else {
        // }
    }

    triggerLocal(name, data) {
        console.log('triggering local event', name, data);
        console.log(this.lionEvents);
        this.lionEvents.emit(name, data);
    }

    remove(name, handler) {
        console.log('removing event', name);
        this.lionEvents.removeListener(name, handler);
        console.log(this.lionEvents);
    }
}

ipcRenderer.on('fromsystem.lionEvent.trigger', (event, {name,channelID, data}) => {

    if(lionEvent.channelID == channelID){
        console.log(`fromsystem.lionEvent.trigger name:${name} channelID:${channelID},data:${data}`, );
        lionEvent.triggerLocal(name, data);
    }

}
);


const lionEvent = new LionEvent();


export default lionEvent;

