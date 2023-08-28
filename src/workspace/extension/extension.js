import fs from 'fs';
import path, { parse } from 'path';
// import openlion from '../lionAPI/openlion';
import lionEvent from '../event/lionEvent';



 class LionExtension {
  constructor(name) {
    this.name = name;
  }

  setName(name){
    this.name = name
  }


  active() {
    console.log('activate-----------',this.name);

  }

  deactive() {
    console.log('deactivate----------',this.name);
  }

  start() {
    console.log('start---------',this.name);
    this.active()
  }

  die(){
    console.log('die---------',this.name)
    lionEvent.triggerLocal('extension.port.close',this.name)
    lionEvent.trigger('extension.die',this.name)
    this.deactive()
  }


}

export const lionExtension = new LionExtension





const installedExtensions = {};


const extensionlist ={
  "test1": {path: "test",url: "test",installed: "false"},

}


function isFolderStructureValid(path) {
  const stats = fs.statSync(path);

  if (!stats.isDirectory()) {
    return false;
  }

  const files = fs.readdirSync(path);
  // const requiredFolders = ['src', 'public'];
  const requiredFiles = ['extension.json'];

  // Check if all required folders exist
  // for (const folder of requiredFolders) {
  //   if (!files.includes(folder)) {
  //     return false;
  //   }
  // }

  // Check if all required files exist
  for (const file of requiredFiles) {
    if (!files.includes(file)) {
      return false;
    }
  }

  // Check if all subfolders have valid structure
  // for (const file of files) {
  //   const filePath = `${path}/${file}`;
  //   if (fs.statSync(filePath).isDirectory()) {
  //     if (!isFolderStructureValid(filePath)) {
  //       return false;
  //     }
  //   }
  // }

  return true;
}

const extensionRoot = "C:\\Users\\Administrator\\AppData\\Roaming\\openlion\\extensions"

const scanPath = () => {
  const list = fs.readdirSync(extensionRoot)
  list.forEach((item) => {
    const path = `${extensionRoot}\\${item}`

    if (isFolderStructureValid(path)) {
      extensionlist[item] = {path: path,url: "test",installed: "false"}
    }
    else {
      console.warn('invalid extension',item)
    }
  })

  return extensionlist
}

scanPath()
console.log('extensionlist',extensionlist)


  const addExtension = (extension) => {
    console.log('addExtension',extension.name)
    installedExtensions[extension.name] = extension;
    console.log('installedExtensions',installedExtensions)
  };



  const parseConfig = (config,rootPath) => {


    const Actions = {
      js: () => {
        // openlion.lionCommand.call('infopanel.addmessage', 'js mode')
        // lionAPI.lionCommand.getCommands()
            // const m2 = require("file:///c://Users//Administrator//AppData//Roaming//openlion//extensions//chatextension3//App.js")

        // 执行其他程序
        // Actions[config.js.codes]();
        'codes' in config || console.log('lack of codes')
        ('activeEvents' in config.codes)?  Actions['activeEvents']():console.warn('lack of activeEvents') ;
        ('commands' in config.codes)?  Actions['commands']():console.warn('lack of commands') ;
        ('keybindings' in config.codes)?  Actions['keybindings']():console.warn('lack of keybindings') ;
        ('menus' in config.codes)?  Actions['menus']():console.warn('lack of menus') ;


        
      },
      webview: () => {
        // 执行其他程序
        console.log('webview------------');
      },
      // 添加其他属性...
      activeEvents: () => {
        console.log('activeEvents');
        console.log('rootPath',rootPath);


        // 执行其他程序
      },

      commands: () => {
        console.log('commands');
        // 执行其他程序
      },
      keybindings: () => {
        console.log('keybindings');
        // 执行其他程序
      },
      menus: () => {
        console.log('menus');
        // 执行其他程序
      },
      default: (arg) => {
        console.log(`${arg} is not recognized`);
      },
    };

    (Actions[config.mode] || Actions.default)("mode");

  }

  const installExtension = (rootPath) => {
    //测试用
    if(rootPath == 'test') {
      return
    }
    //从extension.json中读取配置
    const configPath = `${rootPath}\\extension.json`
    const config = JSON.parse(fs.readFileSync(configPath, 'utf8'))

    parseConfig(config,rootPath)

    // if('mode' in config ||  console.log('lack of mode') && config.mode == 'js' )
    // {
    //   console.log('iam the test ----------------')
    // }




    if(config.mode == 'js') {
    // addExtension(config);
    const extensionPath = `${rootPath}\\${config.main}`
    // const extensionPath = `${rootPath}\\App.mjs`
    console.log('extensionPath',extensionPath);
    
    // import(extensionPath).then(module => {
    //   const myModule = module
    //   console.log('myModule',myModule);
    //   // 使用 myModule
    // }).catch(error => {
    //   // 处理错误
    // });
    // const myEx1 = new chat3(config.name)
    let ex3 = require(extensionPath)
    console.log('ex3',ex3);
    ex3.lionExtension.setName("chat3")
    ex3.lionExtension.start()

    // // const myEx = new ex.LionExtension(config.name)

    // const myEx2 = require(extensionPath)

    // async function loadModule() {
    //   try {
    //     // 使用 import() 来动态加载 ES 模块
    //     const dynamicModule = await import(extensionPath);
    //     console.log('dy',dynamicModule.chat3)
    //   } catch (error) {
    //     console.error(error);
    //   }
    // }
    
    // loadModule();

    

  //  console.log('a.name',myEx1.a.name)
    // console.log('a',myEx1.a.toString())
    // console.log('config',config);
    // if(config.codes && config.codes.commands) {
      setTimeout(() => {
        console.log('deactive')
        ex3.lionExtension.die()
        // ex3= null
        delete require.cache[require.resolve(extensionPath)];
        
      }, 5000);


      
      setTimeout(() => {
        let ex4 = require(extensionPath)
        console.log('ex4',ex4);
  
        
        // myEx1 = require('lodash')
      }, 15000);
  

    //   console.log('commands',config.codes.commands)
    }







    // const m2 = require("c:/Users/Administrator/AppData/Roaming/openlion/extensions"+test3)

    
    // if (config.mode == 'webview') {
    //   console.log('webview')
    // }


  }



  export const installAllExtensions = () => {
    Object.keys(extensionlist).forEach((item) => {
      const path = extensionlist[item].path
      installExtension(path)
    }
    )
  }

// installAllExtensions()

console.log('installedExtensions',installedExtensions)

  const uninstallExtension = (extension) => {
  }




  export const getExtensions = () => {
    return installedExtensions;
  };

  export const getATest = () => {
    return "test";
  };



