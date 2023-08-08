

const commands = [];

const initialCommands = [
    {
      name: 'Open File',
      type: 'system',
      action: () => console.log('Opening file...'),
    },
    {
      name: 'Save File',
      type: 'system',
      action: () => console.log('Saving file...'),
    },
    {
      name: 'Close File',
      type: 'system',
      action: () => console.log('Closing file...'),
    },
  ];
  commands.push(...initialCommands);

export const getCommands = () => {

    console.log('getcommands',commands);
    return commands;
  }



export function registerCommand(name,action,type='default') {
    console.log('registerCommand');
    
    commands.push({ name, type,action });
    console.log(commands);
  }


  export function callCommand(name) {
    console.log(commands);
    const command = commands.find((c) => c.name === name);
    if (command) {
      command.action();
    } else {
      console.warn(`Command not found: ${name}`);
    }
  }