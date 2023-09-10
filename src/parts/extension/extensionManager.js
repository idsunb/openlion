// import fs from 'fs';
const fs = require('fs');
// import path, { parse } from 'path';
const path = require('path');
// import openlion from '../lionAPI/openlion';
import lionEvent from '../../workspace/event/lionEvent';

import { extensions } from './Extensions'
import { set } from 'lodash';
import openlion from '../../workspace/lionAPI/openlion';
import { title } from 'process';








//检查是否符合规范，健壮性考虑
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


const parseConfig = ({ exRootPath, config, extensions }) => {


    // const Actions = {
    //     js: () => {
    //         // openlion.lionCommand.call('infopanel.addmessage', 'js mode')
    //         // lionAPI.lionCommand.getCommands()
    //         // const m2 = require("file:///c://Users//Administrator//AppData//Roaming//openlion//extensions//chatextension3//App.js")

    //         // 执行其他程序
    //         // Actions[config.js.codes]();
    //         'codes' in config || console.log('lack of codes')
    //             ('activeEvents' in config.codes) ? Actions['activeEvents']() : console.warn('lack of activeEvents');
    //         ('commands' in config.codes) ? Actions['commands']() : console.warn('lack of commands');
    //         ('keybindings' in config.codes) ? Actions['keybindings']() : console.warn('lack of keybindings');
    //         ('menus' in config.codes) ? Actions['menus']() : console.warn('lack of menus');



    //     },
    //     webview: () => {
    //         // 执行其他程序
    //     },
    //     // 添加其他属性...
    //     activeEvents: () => {


    //         // 执行其他程序
    //     },

    //     commands: () => {
    //         // 执行其他程序
    //     },
    //     keybindings: () => {
    //         // 执行其他程序
    //     },
    //     menus: () => {
    //         // 执行其他程序
    //     },
    //     main: () => {
    //         // 执行其他程序
    //     },
    //     default: (arg) => {
    //         console.log(`${arg} is not recognized parse failed`);
    //     },
    // };


    // (Actions[config.mode] || Actions.default)("mode");

    if ('main' in config && 'title' in config && 'name' in config) {
        const { name, main, title,description} = config
        console.log("🚀 ~ file: extensionManager.js:121 ~ parseConfig ~ name, main, title, mode:", name, main, title)
        const entryPath = `${exRootPath}\\${config.main}`
        
        console.log("🚀 ~ file: extensionManager.js:124 ~ parseConfig ~ extensionPath:", entryPath)
        extensions.setExtension({ name,root:exRootPath, entry: entryPath,description, title })



    } else {
        console.warn('invalid extension lack essential args', extRoot)
    }
}




const scanPath = () => {
    const list = fs.readdirSync(extensionRoot)
    list.forEach((item) => {
        const exRootPath = `${extensionRoot}\\${item}`

        if (isFolderStructureValid(exRootPath)) {
            //如果符合规范，读取config
            const configPath = `${exRootPath}\\extension.json`
            const config = JSON.parse(fs.readFileSync(configPath, 'utf8'))
            console.log("🚀 ~ file: extensionManager.js:73 ~ list.forEach ~ config:", config)
            //解析config
            parseConfig({ exRootPath, config, extensions })


        }
        else {
            console.warn('invalid extension', item)
        }
    })

}


scanPath()

extensions.getAllExtensions()
// console.log("🚀 ~ file: extensionManager.js:161 ~ lionExtensions.getAllExtensions():", lionExtensions.getAllExtensions())


// const temppath = '/C:\\Users\\Administrator\\AppData\\Roaming\\openlion\\extensions\\chatextension3\\App.js'
// // const a = 'App.js'
// // const temppath ='/esbuild/test/App.js'

// // let test = await import('/C:\\Users\\Administrator\\AppData\\Roaming\\openlion\\extensions\\chatextension3\\App.js')
// const test = await import('/C:\\Users\\Administrator\\AppData\\Roaming\\openlion\\extensions\\chatextension3\\App.js')
// console.log("🚀 ~ file: extensionManager.js:172 ~ test:", test)
// test.extension.setName('chat4')
// test.extension.active()
// console.log('dddddd', test.extension.name)


// const group ={}
// group['test'] = test

// delete require.cache[require.resolve('C:\\Users\\Administrator\\AppData\\Roaming\\openlion\\extensions\\chatextension3\\App.js')];
// delete group['test']

// setTimeout(async() => {

// group['test1'] = await import('/C:\\Users\\Administrator\\AppData\\Roaming\\openlion\\extensions\\chatextension3\\App.js')
// console.log("🚀 ~ file: extensionManager.js:185 ~ group['test']:", group['test1'])
// console.log('dddddd', group['test1'].extension.name)
// }, 5000);




// let test1 = await import(temppath)
// console.log("🚀 ~ file: extensionManager.js:170 ~ temppath:", temppath)

// console.log("🚀 ~ file: extensionManager.js:167 ~ test:", test)
// test.extension.setName('chat3')

// test.extension.enable()
// openlion.lionCommand.call('test1', 'js mode')
// openlion.lionCommand.call('test1', 'js mode1')
// test.commandTest.setActive(false)
// openlion.lionCommand.call('test1', 'js mode2')



// setTimeout(() => {
//     // test.lionExtension.die()

//     // test = null;
//     console.log("🚀 ~ file: extensionManager.js:106 ~ setTimeout ~ test:", test)
//     // delete require.cache[require.resolve('C:\\Users\\Administrator\\AppData\\Roaming\\openlion\\extensions\\chatextension3\\App.js')];


// }, 5000);


// let test2
// setTimeout(async () => {
//     console.log('test2');
//     test2 = await import('C:\\Users\\Administrator\\AppData\\Roaming\\openlion\\extensions\\chatextension3\\App.js')
//     console.log("🚀 ~ file: extensionManager.js:112 ~ setTimeout ~ test2:", test2)

// }, 10000);







const installExtensionFromFile = (rootPath) => {

    //从extension.json中读取配置
    const configPath = `${rootPath}\\extension.json`
    const config = JSON.parse(fs.readFileSync(configPath, 'utf8'))

    parseConfig(config, rootPath)



}







