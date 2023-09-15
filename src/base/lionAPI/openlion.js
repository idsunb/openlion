
import { lionContext } from '../context/lionContext';
import { registerCommand, callCommand, getCommands } from '../command/commands';
import lionEvent from  '../event/lionEvent';




const openlion = {
    // triggerEvent: triggerEvent,
    // registerEvent: registerEvent,
    lionCommand: {
    register: registerCommand,
    getCommands: getCommands,
    call: callCommand,
    },

    lionContext:{
        setState:lionContext.setState,
        mergeState:lionContext.mergeState,
        getState:lionContext.getState,
        getTestState:lionContext.getTestState,

    },


    // lionEvent:lionEvent,
    lionEvent: {
        register: lionEvent.register.bind(lionEvent),
        trigger: lionEvent.trigger.bind(lionEvent),
        remove: lionEvent.remove.bind(lionEvent),
        getLionEvents: lionEvent.getLionEvents.bind(lionEvent),
    },
}

export default openlion;