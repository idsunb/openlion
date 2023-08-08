import React, { useState,useEffect,useReducer, useContext } from 'react';
import styles from './command.module.css';
import { registerCommand,callCommand,getCommands } from './commands';
const { triggerEvent, registerEvent } = window.lionAPI;


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
    commands: getCommands(),
    filteredCommands: [],
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
    const temp = getCommands();



  const handleInputChange = (event) => {
    const value = event.target.value;
    dispatch({ type: 'SET_INPUT_VALUE', payload: value });
    dispatch({
      type: 'SET_FILTERED_COMMANDS',
      payload: state.commands.filter((command) => command.name.toLowerCase().includes(value.toLowerCase())),
    });
  };



  const handleKeyDown = (event) => {
    console.log(event.key);
    if (event.key === 'F1') {
      //更新filteredCommands
      dispatch({ type: 'SET_FILTERED_COMMANDS', payload: [...getCommands()] });
      //打开命令行
      dispatch({ type: 'SET_IS_OPEN', payload: true });

    } else if (event.key === 'Escape') {
      dispatch({ type: 'SET_IS_OPEN', payload: false });
    } else if (event.key === 'Enter') {
      // 测试用
      callCommand('hello');
    }

  };



  const setFilteredCommands = (commands) => {
    dispatch({ type: 'SET_FILTERED_COMMANDS', payload: [...commands] });
  };


  const hellocommand = () => {
    // Do something...
    console.log('hellocommand');
  };

  const handleSomethingHappened = (data) => {
    console.log('handleSomethingHappened', data);
  };
  

  useEffect(() => {
    // Register commands


    registerCommand('hello', hellocommand);
    registerEvent('somethingHappened', handleSomethingHappened);




    setFilteredCommands(state.commands)



      // Register keydown event listener
      document.addEventListener('keydown', handleKeyDown);
  
      // Unregister keydown event listener

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);




  const handleCommandClick = (command) => {
    command.action();
  };

  return (
    <>
      {state.isOpen && (
        <div className={styles.commandoverlay}>
          <div className={styles.command}>
            <input
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
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default LionCommand;