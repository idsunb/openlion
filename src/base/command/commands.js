import {  ipcMain } from 'electron';
import { lionContext } from '../context/lionContext';

//这是系统命令，不是用户自定义命令
// const commands = [];
const commands = {};

commands[0] = {};




// }

export const registerCommand = ({ name, action, type , source = 'system' ,title}) => {

  // const existingCommand = commands[name];
  // if (existingCommand) {
  //   console.warn(`Command "${name}" already exists. Skipping...`);
  //   return;
  // }

  if (commands[0][name]) {
    console.warn(`Command "${name}" already exists. Skipping...`);
    return;
  }else{
  commands[0][name] = action;
  lionContext.mergeState({ commands: { [name]: { type: "system",title:title } } });
  }
  // if(type === 'system'){

  //   commandstest[0][name]=action

  //   console.log(`command reg ----`,commandstest);
  //   lionContext.mergeState({commands:{[name]: {type: type, title:title}}});
  // }else if(type === 'renderer'){
  //   // lionContext.mergeStateByID(source.id,{commands:{[name]: {type: type,title:title}}});
  // }




  console.log(`registetr command commands:`,commands);
  return;








};

function sendMessage(port,message) {
  return new Promise((resolve) => {
    port.on('message', (event) => {
      resolve(event.data);
    });

    console.log('here',message);
    console.log('port',port)
    port.postMessage(message);
  });
}

export const callCommand = async (name, args ) => {


  // console.log(`call command command name:${name} all commands:`, commands);
  // const command = commands[name];

  // if (command) {
  //   const result = await command.action(args);
  //   return result;
  // } else {
  //   console.warn(`Command not found: ${name}`);
  // }

    if(name in commands[0]){
      const result = await commands[0][name](args);
      return result;
    }
    else{
      //找到命令所在的port,进行发送
      for (const [key, value] of portMap.entries()) {
        if(name in commands[value]){
          const back = await sendMessage(key,{type:'callCommand',name:name,args:args,commandID:value})
          // const result = await commands[value][name](args);
          // console.log('back',back);
          const result = back.result;
          return result;
        }
      }


    }

  // if (command) {
  //   //如果是系统命令，直接执行
  //   if (command.type === 'system') {
  //     const result = await command.action(args);
  //     return result;
  //   } else if (command.type === 'renderer') {
  //     //如果是渲染进程命令，则使用invoke程序调用远端进程命令
  //     //使用await是为了顺序得到，否则的话result返回顺序会出错，会先返回空result
  //     const result = await invokeRenderer(command.source, name, args).then((result) => {
  //       return result;
  //     });
  //     return result;
  //     // command.source.send('callCommand', { name, args });
  //   }
  //   else if (command.type === 'webview') {
  //     command.source.send('callCommand', { name, args });
  //   }
  // } else {  
  //   console.warn(`Command not found: ${name}`);
  // }

};





export const getCommands = () => {
  console.log(`getcommands:`,commands);
  return commands;
}

//处理远端registerCommand
// ipcMain.on('registerCommand', (event, command) => {

  
//   const webcontent = event.sender;

//   console.log('system registercommand', command);
//   if (command.type === 'renderer') {
      
//       webcontent.on('destroyed', () => {
//         console.log('destroyed');
//       });
    
//       // registerCommand(command.name, command.action, command.type,webcontent);
//       registerCommand({ ...command, type:"renderer", source: webcontent });
//     }


// });

ipcMain.handle('registerCommand', (event, { command, commandID }) => {

  console.log(commandID)
  //如果存在,返回错误
  if(command.name in commands[commandID]){
    return 'already exist command,register failure';
  }else{
    // 否则注册
    commands[commandID][command.name] = command.action;
    // lionContext.mergeState({ commands: { [command.name]: { type: command.type, title: command.title } } });

    console.log('registercommand----------------', commands);

    return 'success';

  }

  // const existingCommand = commands[command.name];
  // if (existingCommand){
  //   return 'already exist command,register failure';
  // } else {



  // console.log('system registercommand', command);
  // const webcontent = event.sender;
  // webcontent.on('did-start-loading', () => {
  //   console.log('reload---------');
  //   delete commands[command.name];
  // })

  // const handler = async (args) => {
  //   const result = await invokeRenderer(webcontent, {name:command.name, args:args,commandID:commandID}).then((result) => {
  //     return result;
  //   });
  //   return result;
  // }

  // registerCommand({...command, action:handler,type:"renderer", source: webcontent});

  // return 'success';
  // }

} );



//处理远端callCommand
ipcMain.handle('callCommand', async (event, { name, args }) => {

  console.log('system callCommand', name, args);
  const result = await callCommand(name, args);
  return result;
  // callCommand(command.name, command.args);
});


//旧版本函数
// async function invokeRenderer(webcontent, {name, args, commandID}) {
//   console.log('invokeRenderer');
//   return new Promise((resolve, reject) => {
//     //此处为设定一个随机的channel，用于接收返回值，当出现问题时，可以修改为独一无二的，渲染进程也要修改
//     // const id = Math.random().toString(36).substr(2, 9);
//     // const channel = `invokeRenderer-${id}`;
//     ipcMain.once("callCommandResult", (event, { error, result }) => {
//       if (error) {
//         reject(error);

//       } else {
//         resolve(result);
//       }
//     });
//     // webcontent.send('calltest', { ...args, channel });
//     webcontent.send('callCommand', { name, args, commandID });

//   });

// }



const portMap = new Map();

ipcMain.on('commands', (event,data) => {
  // 当我们在主进程中接收到 MessagePort 对象, 它就成为了
  // MessagePortMain.
  const port = event.ports[0]
  const commandID = data.commandID;
  portMap.set(port,commandID)
  commands[commandID] = {};

  


  port.on('message', async (event) => {

    const message = event.data;

  })


  port.on('close', () => {  
    console.log('port closed commands');
    delete commands[commandID];
    portMap.delete(port);
    // console.log(`port closed `,data);
  })
  // MessagePortMain 阻塞消息直到 .start() 方法被调用
  port.start()
})