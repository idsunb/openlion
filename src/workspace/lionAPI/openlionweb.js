


export const openlion = {
    // triggerEvent: triggerEvent,
    // registerEvent: registerEvent,
    lionCommand: {

        call: window.openlion.lionCommand.call,
        register: window.openlion.lionCommand.register,
        getCommands: window.openlion.lionCommand.getCommands,
        setActive: window.openlion.lionCommand.setActive,
        setName: window.openlion.lionCommand.setName,
    },
    lionContext:{
        name: window.openlion.lionContext.name,
        setState: window.openlion.lionContext.setState,
        setConfig: window.openlion.lionContext.setConfig,
        getConfig: window.openlion.lionContext.getConfig,
        mergeState: window.openlion.lionContext.mergeState,
        getState: window.openlion.lionContext.getState,
        getTestState: window.openlion.lionContext.getTestState,
    },
    lionEvent: {
        setActive: window.openlion.lionEvent.setActive,
        setName: window.openlion.lionEvent.setName,
        register: window.openlion.lionEvent.register,
        trigger: window.openlion.lionEvent.trigger,
        remove: window.openlion.lionEvent.remove,
        getLionEvents: window.openlion.lionEvent.getLionEvents,
    },
    openWebview: window.openlion.openWebview,

    


}
