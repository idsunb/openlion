import { ipcRenderer } from 'electron';
const commands = [];
//用户自定义命令
const initialCommands = [

  { name: 'preloadcommandtest1', type: 'renderer', action: async () => await callCommand('system.openfile'),source:'renderer' },
  { name: 'preloadcommandtest2', type: 'renderer', action: async () => callCommand('system.savefile'),source:'renderer' }
];

commands.push(...initialCommands);





export const registerCommand = ({name,action,type='renderer',source='renderer'}) => {
  console.log('registerCommand');
  console.log('commandname',name );
  //如果在本地上下文文件中已经存在该命令，则不再注册
  const existingCommand = commands.find(c => c.name === name);
  if (existingCommand) {
    console.warn(`Command "${name}" already exists. Skipping...`);
    return;
  }
  //随后系统和本地同时注册，系统注册不包含action，只需注册名称即可
  if (type === 'renderer') {
    ipcRenderer.send('registerCommand', { name:name, action:'', type:'renderer',source:source });
    commands.push({name:name, action:action, type:type,source:source });
  } 
  console.log('command', commands);

}




export  const callCommand = async (name, args) => {


    const command = commands.find((c) => c.name === name);
    if (command) {
      //如果存在于本地，则直接调用本地的action
      console.warn('exist command,call from local');
      const result =   await command.action(args);
      console.log('command name', name);
      return result;
    } else {  
      //如果不存在于本地，则呼叫main的命令
      console.warn('not exist command,called from main args:',args);

      const result =  ipcRenderer.invoke('callCommand', { name, args })
      return result;
      

    }
    
}

const callCommandLocal = async (name, args) => {
  const command = commands.find((c) => c.name === name);
  if (command) {
    //如果存在于本地，则直接调用本地的action
    console.warn('exist command,call from local');
    const result =   await command.action(args);
    console.log('command name', name);
    return result;
  } else {
    console.warn('not exist local command');
    return null;
  }
}




export const getCommands = () => {
  console.log('getcommands', commands);
  return commands;
}

//监听main进程的callCommand消息，如果有，则调用本地的callCommand
ipcRenderer.on('callCommand', async (event, data) => {
  console.log('callCommand mesaage', data);
  try {
    console.log('callCommand result', result);
    const result = await callCommandLocal(data.name, data.args);
    ipcRenderer.send('callCommandResult', { result });

  } catch (error) {
    console.log('callCommand error', error);
    ipcRenderer.send('callCommandResult', {error });


  }

  
});


