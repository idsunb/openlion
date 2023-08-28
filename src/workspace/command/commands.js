import { ipcRenderer } from 'electron';
import { lionContext } from '../context/lionContext';
import lionEvent from '../event/lionEvent';

const id = Math.random().toString(36).substring(2, 9);
const commandID = `command-${id}`;

const channel = new MessageChannel()
const port1 = channel.port1
const port2 = channel.port2

ipcRenderer.postMessage('commands', {commandID:commandID}, [port1])



// console.warn('pre commandID', commandID);

const commands = {};

// const commandstest = {}
// commandstest[commandID]={}
commands[commandID]={}

// port2.onmessage = (event) => {
//   console.log('here i receive message', event.data);

// }



port2.addEventListener('message', async (event) => {
  const message = event.data;
  // console.log('here i receive message', message);
  if (message.type === 'callCommand') {
    // console.log('here i receive callCommand');
    const { type,name, args, commandID: id } = message;
    if (id == commandID) {
      try {
        // const result = await callCommandLocal(name, args);
        // port2.postMessage({ type: 'callCommandResult', result });
        // console.log('main callCommand result id', id, 'result', result);
        const result = await commands[commandID][name](args);
        port2.postMessage({ type: 'callCommandResult', result });
      }
      catch (error) {
        console.log('callCommand error', error);
        port2.postMessage({ type: 'callCommandResult', error });

      }
    }
  }
});

port2.start();




// console.log('webcontent id', lionAPI.getWebcontentID());



// commands.push(...initialCommands);
// commands['preloadcommandtest1'] = initialCommands['preloadcommandtest1'];
// commands['preloadcommandtest2'] = initialCommands['preloadcommandtest2'];






export const registerCommand = async ({ name, action, type = 'renderer', source = 'renderer', title='' }) => {


  // const existingCommand = commands[name];
  // if (existingCommand) {
  //   console.warn(`register Command "${name}" already exists.register failure Skipping...`);
  //   return;
  // }

  //如果在本地上下文文件中已经存在该命令，则不再注册

  if (name in commands[commandID]) {
    console.warn(`register Command "${name}" already exists.register failure Skipping...`);
    return;
  }

  // console.log(`register `,commands);

  //先向系统注册，如果系统没有重复，则注册本地命令

  try{
  const result = await ipcRenderer.invoke('registerCommand', { command: { name: name, action: '', type: 'renderer', source: source, title: title }, commandID: commandID });
  if (result == 'success') {
    commands[commandID][name] = action;
    lionContext.mergeState({ commands: { [name]: { type: type,title: title }} });
    console.warn(`register command:${name}, success commands:`, commands);
  } else {
    console.warn(`register command:${name} failed because of ${result}`);
  }

  }catch(error){
    console.warn('register command error',error);
        

  }










  // //先向系统申请注册，如果系统没有重复，则注册本地命令

  // if (type === 'renderer') {
  //   // ipcRenderer.send('registerCommand', { name: name, action: '', type: 'renderer', source: source,title:title });
  //   const result = await ipcRenderer.invoke('registerCommand', { command: { name: name, action: '', type: 'system', source: source, title: title }, commandID: commandID });
  //   console.log('commandID', commandID);

  //   if (result == 'success') {
  //     commands[name] = { name: name, action: action, type: type, source: source };
  //     //上面维护的是本地action，下面维护的是全局command，但是没有action  todo 后期可改
  //     lionContext.mergeState({ commands: { [name]: { type: type,title: title }} });

  //     console.warn(`register command:${name}, success commands:`, commands);
  //   } else {
  //     console.warn(`register command:${name} failed because of ${result}`);
  //   }

  // }
  // //处理错误参数的冗余，有人想注册系统命令，但不准许，一般不会用到
  // type === 'system' && console.log('register system command ,but you dont have right ', name);



}







export const callCommand = async (name, args) => {



  // const command = commands[name];
  // if (command) {
  //   //如果存在于本地，则直接调用本地的action,如果不调用本地，直接呼叫main的命令也行，但是会增加通信成本
  //   //   console.warn('exist command,call from local');
  //   const result = await command.action(args);
  //   console.warn(`call command :call local command name:${name}`);
  //   //   console.log('command name', name);
  //   return result;
  // } else {
  //   //   //如果不存在于本地，则呼叫main的命令
  //   console.warn('call command: not exist command,called from remote, command name:', name);

  //   const result = await ipcRenderer.invoke('callCommand', { name, args })
  //   return result;

  // }
  // console.log('call command',name);
  // console.log('commands',commands[commandID]);
  // console.log('-------')
  if(name in commands[commandID]){
    console.warn(`call command :call local command name:${name}`);
    const result = await commands[commandID][name](args);
    return result;
  }else{
    console.warn('call command: not exist command,called remote command, command name:', name);
    const result = await ipcRenderer.invoke('callCommand', { name, args })
    return result;
  }




}

// const callCommandLocal = async (name, args) => {

//   const command = commands[name];
//   if (command) {
//     //如果存在于本地，则直接调用本地的action
//     console.warn(`call command from local : command name:${name}`);
//     const result = await command.action(args);

//     return result;
//   }
//   else {
//     console.warn('not exist local command');
//     return null;
//   }

// }





export const getCommands = () => {
  console.log('getcommands:', commands);
  return commands;

}


lionEvent.register('extension.port.close', (data) => {
  console.log('extension.port.close  command', data);
  // console.log('portMap', portMap);
  port2.close();
}
);



// //监听main进程的callCommand消息，如果有，则调用本地的callCommand
// ipcRenderer.on('callCommand', async (event, { name, args, commandID: id }) => {

//   if (id == commandID) {

//     try {
//       const result = await callCommandLocal(name, args);
//       ipcRenderer.send('callCommandResult', { result });
//       console.log('main callCommand result id', id, 'result', result);

//     }
//     catch (error) {
//       console.log('callCommand error', error);
//       ipcRenderer.send('callCommandResult', { error });

//     }
//   }


// });





