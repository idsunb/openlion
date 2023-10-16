// import { ipcRenderer } from 'electron';
const { ipcRenderer } = require('electron');
import { lionContext } from '../context/lionContext';
import lionEvent from '../event/lionEvent';

const id = Math.random().toString(36).substring(2, 9);
const commandID = `command-${id}`;

const channel = new MessageChannel()
const port1 = channel.port1
const port2 = channel.port2

ipcRenderer.postMessage('commands', { commandID: commandID }, [port1])


// let active = true;
// // let name = contextID;

// // export const setName = (name) => {
// //   name = name;
// // }

// /**
//  * set active 
//  * default is true
//  * @param value true or false
//  */
// export const setActive = (value = true) => {
//   active = value;
// }



// port2.onmessage = (event) => {
//   console.log('here i receive message', event.data);

// }




// port2.addEventListener('message', async (event) => {
//   const message = event.data;
//   // console.log('here i receive message', message);
//   //接收到远端调用的call
//   if (message.type === 'callCommand') {
//     // console.log('here i receive callCommand');

//     const { type, name, args, commandID: id } = message;
//     //如果非激活，则返回一个错误
//     if (!active) {
//       // console.log("🚀 ~ file: commands.js:52 ~ port2.addEventListener ~ active:",active )
//       const myError = new Error(`${commandID} : command ${name}  is not active`);
//       port2.postMessage({ type: 'callCommandResult', error:new Error('This command is not active')});
//       // console.log("🚀 ~ file: commands.js:55 ~ port2.addEventListener ~ message:", message)
//       return;

//     }
//     //冗余判断，一般来说发过来都是正确的
//     if (id == commandID) {
//       try {
//         // const result = await callCommandLocal(name, args);
//         // port2.postMessage({ type: 'callCommandResult', result });
//         // console.log('main callCommand result id', id, 'result', result);
//         const result = await commands[commandID][name](args);
//         port2.postMessage({ type: 'callCommandResult', result });
//       }
//       catch (error) {
//         // console.log("🚀 ~ file: commands.js:65 ~ port2.addEventListener ~ error:", error)
//         port2.postMessage({ type: 'callCommandResult', error });

//       }
//     }
//   }
// });

// port2.start();






class Commands {
  constructor(commandID) {
    this.commandID = commandID;
    this.commands = {};
    this.commands[this.commandID] = {};
    this.active = true;
    this.port2 = channel.port2;
    this.port2.addEventListener('message', this.handleMessage.bind(this));
    this.port2.start();
    this.name = commandID
  }

  setName(name) {
    this.name = name;
  }


  async registerCommand({ name, action, type = 'renderer', source = 'renderer', title = '' }) {
    if (!name || !action) {
      throw new Error('registerCommand error: name or action is null ,the form is {name:"somename",action:fun}');
      return;
    }

    if (name in this.commands[this.commandID]) {
      console.warn(`register Command "${name}" already exists. Register failure. Skipping...`);
      return;
    }

    try {
      //首先在本地注册
      this.commands[this.commandID][name] = action;

      //然后在远端注册
      const result = await ipcRenderer.invoke('registerCommand', { command: { name: name, action: '', type: 'renderer', source: source, title: title }, commandID: this.commandID });
      if (result == 'success') {
        lionContext.mergeState({ commands: { [name]: { type: type, title: title, source: lionContext.name } } });
        console.warn(`Register command:${name}, success commands:`, this.commands);
      } else {
        //如果远端注册失败，则删除本地注册
        delete this.commands[this.commandID][name];
        console.warn(`Register command:${name} failed because of ${result}`);
      }
    } catch (error) {
      console.warn('Register command error', error);
    }
  }

  async callCommand(name, args) {
    //如果传进来的第一个函数是一个对象
    if (typeof name === 'object') {
      const { name: commandName, args: commandArgs, arg } = name;
      name = commandName;
      args = commandArgs;
      //如果没有name，则报错
      if (!name) {
        //抛出一个错误
        throw new Error('you deliver a wrong from, call command with object {name:"somename",args:{}}');
      }
      //如果错传进来的是arg，没有args，则提醒
      if (arg) {
        //抛出一个错误
        throw new Error('you deliver a wrong from, call command with object {name:"somename",args:{}}');
      }
    }


    if (!this.active) {
      console.warn(`${this.commandID}: ${name} command is not active`);
      return;
    }
    //如果是本地的命令
    if (name in this.commands[this.commandID]) {

      if (args) {
        console.warn(`Call command: call local command name:${name} with args:`, args);
      } else {
        console.warn(`Call command: call local command name:${name}`);
      }

      const result = await this.commands[this.commandID][name](args);
      return result;
    } else
    //本地没有的话，调用远端的命令
    {
      if (args) {
        console.warn(`Call command: not exist command, called remote command, command name:${name} with args:`, args);
      } else {
        console.warn(`Call command: not exist command, called remote command, command name:${name}`);
      }
      try {
        const result = await ipcRenderer.invoke('callCommand', { name, args });
        console.log('callCommand result', result);
        return result;
      } catch (error) {
        console.warn('Call command error', error);
        return error;
      }
    }
  }


  async handleMessage(event) {
    const message = event.data;
    if (message.type === 'callCommand') {
      const { type, name, args, commandID: id } = message;
      if (!this.active) {
        const myError = new Error(`${this.commandID} : command ${name} is not active`);
        this.port2.postMessage({ type: 'callCommandResult', error: myError });
        return;
      }
      if (id == this.commandID) {
        try {
          // const result = await this.commands[this.commandID][name](args);
          const result = await this.callCommand(name, args);
          this.port2.postMessage({ type: 'callCommandResult', result});
        } catch (error) {
          this.port2.postMessage({ type: 'callCommandResult', error });
        }
      }
    }
  }


  setActive(value = true) {
    this.active = value;
  }

  getCommands() {
    console.log('getcommands:', this.commands);
    return this.commands;
  }

  closePort() {
    this.port2.close();
  }
}

export const commands = new Commands(commandID);
export default commands;






lionEvent.register('extension.port.close', (data) => {
  console.log('extension.port.close  command', data);
  // console.log('portMap', portMap);
  commands.closePort();
}
);







