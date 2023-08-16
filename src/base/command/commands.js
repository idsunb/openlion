import { ipcRenderer, ipcMain } from 'electron';
//这是系统命令，不是用户自定义命令
const commands = [];

const initialCommands = [

  { name: 'system.savefile', type: 'system', action: () => { console.log('system savefile'); return "savefile result" }, source: 'system' }
];


//调试用，初始状态
commands.push(...initialCommands);


// export const registerCommands = (commands) => {
//   console.log('registerCommands');
//   console.log('command', commands);
//   commands.forEach(command => {
//     registerCommand(command.name, command.action, command.type,command.source);




// export const registerCommand = (name, action, type = 'renderer',source='renderer') => {
//   console.log('registerCommand');
//   const existingCommand = commands.find(command => command.name === name);
//   if (existingCommand) {
//     console.warn(`Command "${name}" already exists. Skipping...`);
//     return;
//   }

//   commands.push({ name, type, action,source });
//   console.log('command', commands);


// }

export const registerCommand = ({ name, action, type , source = 'renderer' }) => {
  console.log('registerCommand');
  const existingCommand = commands.find((c) => c.name === name);
  if (existingCommand) {
    console.warn(`Command "${name}" already exists. Skipping...`);
    return;
  }
  if (type === 'renderer') {
    //把weview关闭的时候，把命令也注销掉，也写到注册逻辑了，后期可以单独优化出去
    source.on('destroyed', () => {
      console.log('destroyed');
      const index = commands.findIndex((c) => c.name === name);
      if (index > -1) {
        commands.splice(index, 1);
      }
      console.log('commands', commands);
    });
  }
  commands.push({ name, type, action, source });
  console.log('command', commands);
};


export const callCommand = async (name, args = []) => {
  console.log('command name', name);
  console.log('all commands', commands)
  const command = commands.find((c) => c.name === name);

  if (command) {
    //如果是系统命令，直接执行
    if (command.type === 'system') {
      const result = await command.action(args);
      return result;
    } else if (command.type === 'renderer') {
      //如果是渲染进程命令，则使用invoke程序调用远端进程命令
      //使用await是为了顺序得到，否则的话result返回顺序会出错，会先返回空result
      const result = await invokeRenderer(command.source, name, args).then((result) => {
        return result;
      });
      return result;
      // command.source.send('callCommand', { name, args });
    }
    else if (command.type === 'webview') {
      command.source.send('callCommand', { name, args });


      return result;
    }
  } else {
    console.warn(`Command not found: ${name}`);
  }
}





export const getCommands = () => {
  console.log('getcommands', commands);
  return commands;
}

//处理远端registerCommand
ipcMain.on('registerCommand', (event, command) => {
  const webcontent = event.sender;


  console.log('registercommand', command);
  if (command.type === 'renderer') {

    webcontent.on('destroyed', () => {
      console.log('destroyed');
    });
  
    // registerCommand(command.name, command.action, command.type,webcontent);
    registerCommand({ ...command, type:"renderer", source: webcontent });
  }
});


//处理远端callCommand
ipcMain.handle('callCommand', async (event, { name, args }) => {

  console.log('callCommand', name, args);
  const result = await callCommand(name, args);
  return result;
  // callCommand(command.name, command.args);
});



async function invokeRenderer(webcontent, name, args) {
  console.log('invokeRenderer');
  return new Promise((resolve, reject) => {
    //此处为设定一个随机的channel，用于接收返回值，当出现问题时，可以修改为独一无二的，渲染进程也要修改
    // const id = Math.random().toString(36).substr(2, 9);
    // const channel = `invokeRenderer-${id}`;
    ipcMain.once("callCommandResult", (event, { error, result }) => {
      if (error) {
        reject(error);

      } else {
        resolve(result);
      }
    });
    // webcontent.send('calltest', { ...args, channel });
    webcontent.send('callCommand', { name, ...args });

  });

}
