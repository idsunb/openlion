import fs from 'fs';
import path from 'path';

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



  const installExtension = (rootPath) => {
    //测试用
    if(rootPath == 'test') {
      return
    }
    const configPath = `${rootPath}\\extension.json`
    const config = JSON.parse(fs.readFileSync(configPath, 'utf8'))
    if(config.mode == 'js') {
    addExtension(config);


      const test3  = "/chat3/a.js"
    //webpack的bug，只能这么写
    const myEx1 = import(`C:/Users/Administrator/AppData/Roaming/openlion/extensions/chat3/${config.main}`)
    // const m2 = require("c:/Users/Administrator/AppData/Roaming/openlion/extensions"+test3)

    }


  }



  const installAllExtensions = () => {
    Object.keys(extensionlist).forEach((item) => {
      const path = extensionlist[item].path
      installExtension(path)
    }
    )
  }

installAllExtensions()

console.log('installedExtensions',installedExtensions)

  const uninstallExtension = (extension) => {
  }




  export const getExtensions = () => {
    return installedExtensions;
  };

  export const getATest = () => {
    return "test";
  };



