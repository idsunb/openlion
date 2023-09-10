import React, { useState,useEffect,useReducer, useContext } from 'react';
import styles from './command.module.css';
// const { triggerEvent, registerEvent } = window.lionAPI;
import openlion from '../../workspace/lionAPI/openlion';


// const commandInitialState = {
//     isOpen: false,
//     inputValue: '',
//     commands: [
//       {
//         name: 'Open File',
//         type: 'system',
//         action: () => console.log('Opening file...'),
//       },
//       {
//         name: 'Save File',
//         type: 'system',
//         action: () => console.log('Saving file...'),
//       },
//       {
//         name: 'Close File',
//         type: 'system',
//         action: () => console.log('Closing file...'),
//       },
//       {
//         name: 'Hello',
//         type: 'custom',
//         action: () => {
//           callCommand('hello');
//         }
//       },
//     ],
//     filteredCommands: [],
//   };


  const commandInitialState = {
    isOpen: false,
    inputValue: '',
    commands: {},
    filteredCommands: {},
  };

  function commandReducer(state, action) {
    switch (action.type) {
      case 'SET_IS_OPEN':
        return { ...state, isOpen: action.payload };
      case 'SET_INPUT_VALUE':
        return { ...state, inputValue: action.payload };
      case 'SET_FILTERED_COMMANDS':
        return { ...state, filteredCommands: action.payload };
      case 'SET_COMMANDS':
        return { ...state, commands: action.payload };
      default:
        throw new Error(`Unhandled action type: ${action.type}`);
    }
  }



function LionCommand(props) {
    const [state, dispatch] = useReducer(commandReducer, commandInitialState);
    // const [state, setState] = useState({
    //   isOpen: false,
    //   inputValue: '',
    //   filteredCommands: [],
    //   commands: props.commands,
    // });
    // const { isOpen, inputValue, filteredCommands, commands } = state;



  const handleInputChange = (event) => {
    // const value = event.target.value;
    // dispatch({ type: 'SET_INPUT_VALUE', payload: value });
    // const filteredCommands = {}
    // for (const key in state.commands) {
    //   if (state.commands[key].name.includes(value)) {
    //     filteredCommands[key] = state.commands[key]
    //   }
    // }

    console.log('state.command',state.commands);
    const value = event.target.value;
    dispatch({ type: 'SET_INPUT_VALUE', payload: value });
    // const newFilteredCommands = {}
    const filteredCommands = {}
    for (const key in state.commands) {
      if (key.includes(value)) {
        filteredCommands[key] = state.commands[key]
      }
    }




    dispatch({ type: 'SET_FILTERED_COMMANDS', payload: filteredCommands });
  };





  const setFilteredCommands = (commands) => {
    // console.log('setFilteredCommands',{...commands});
    dispatch({ type: 'SET_FILTERED_COMMANDS', payload: commands });
  };


  const hellocommand =  () => {
    // Do something...
    const result ="hellocommand result............"
    return result;
  };

  const handleSomethingHappened = (data) => {
    console.log('handleSomethingHappened', data);
  };
  

  useEffect(() => {
    // Register commands

    openlion.lionCommand.register({name:'mainpanel.preloadcommandtest1',action: async () => await openlion.lionCommand.call('system.openfile')});
    openlion.lionCommand.register({name:'mainpanel.preloadcommandtest2',action: async () => await openlion.lionCommand.call('system.savefile')});


    openlion.lionCommand.register({name:'lioncommand.open', action:()=>{openlion.lionEvent.trigger('command.open');
        dispatch({ type: 'SET_IS_OPEN', payload: true });}})
    openlion.lionCommand.register({name:'lioncommand.close', action:()=>{dispatch({ type: 'SET_IS_OPEN', payload: false });}})
    openlion.lionCommand.register({name:'lioncommand.flitercommands.reflesh',action:()=>{openlion.lionContext.getState()['commands']}})  
    openlion.lionCommand.register({name:'lioncommand.hellofromlioncommand', action:hellocommand});


    // registerEvent('somethingHappened', handleSomethingHappened);


    
    dispatch({ type: 'SET_COMMANDS', payload: openlion.lionContext.getState()['commands'] });
    console.log("🚀 ~ file: LionCommand.jsx:143 ~ useEffect ~ state.commands:", state.commands)

    openlion.lionEvent.register('command.open', () => {
    setFilteredCommands(openlion.lionContext.getState()['commands']);
    });
    // init();


      // Register keydown event listener
      // document.addEventListener('keydown', handleKeyDown);
  
      // Unregister keydown event listener


    return () => {
      // document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);





  const handleCommandClick = async (key) => {
    const result = await openlion.lionCommand.call(key)
    console.log('click result',result);
  };


  return (
    <>
      {state.isOpen && (
        <div className={styles.commandoverlay}>
          <div className={styles.command}>
            {/* <input
              type="text"
              placeholder="Type a command"
              value={state.inputValue}
              onChange={handleInputChange}
              autoFocus
            />
            {state.filteredCommands.map((command) => (
              <div key={command.name} className={styles.item} onClick={() => handleCommandClick(command)}>
                {command.name}
              </div>
            ))} */}
            <input type="text" placeholder="Type a command" value={state.inputValue} onChange={handleInputChange} autoFocus />
            {Object.keys(state.filteredCommands).map((key) => (
              <div key={key} className={styles.item} onClick={() => handleCommandClick(key)}>
                {/* {state.filteredCommands[key].name} */}
                {key}
                </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default LionCommand;