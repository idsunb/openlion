import React, { useState, useEffect, useReducer } from 'react';
import app from 'electron';
import fs from 'fs';
import path from 'path';
import { registerCommand } from '../lioncommand/commands';
const {triggerEvent } = window.lionAPI;
const extensionsPath = await lionAPI.getExtensionPath();


const extensionInitialState = {
  activeTab: 0,
  extensions: [{ id: 0, type: 'local plugin', state: {}, input: {}, output: {}, pros: { pluginName: 'fisrt one' } },
  { id: 1, type: 'local plugin', state: {}, input: {}, output: {}, pros: { pluginName: 'second one' } },
  ],
}
const reducer = (state, action) => {
  switch (action.type) {
    case 'LOAD_EXTENSION':
      return {
        ...state,
        extensions: [...state.extensions, action.extension],
      };
    case 'SET_ACTIVE_TAB':
      return {
        ...state,
        activeTab: action.payload,
      };
    default:
      return state;
  }
}





const ExtensionManagerUI = () => {
  const [extensionState, dispatch] = useReducer(reducer, extensionInitialState);


  //插件分为三种，本地插件，远程插件，内置插件
  //本地插件，在一个文件夹内，可以调用EXTENSION.json文件，来描述插件的信息
  //远程插件，可以在插件商店获取插件的信息，从github上下载插件
  //内置插件，为系统自身插件


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





  const loadLocalExtension = () => {


    //读取本地插件
    console.log('extesionpath', extensionsPath);
    const extensionlist = fs.readdirSync(extensionsPath);
    console.log('extensionlist', extensionlist);

    //遍历插件文件读取插件的信息
    const extension = extensionlist.map((file, index) => {

      console.log(index);
      const extPath = path.resolve(extensionsPath, file);

      //先检查插件的文件结构是否正确，错误的插件不加载
      if (isFolderStructureValid(extPath)) {
        const jsonPath = path.join(extPath, 'extension.json');
        const jsonConfig = JSON.parse(fs.readFileSync(jsonPath));
        console.log(jsonConfig);

        //解析插件的信息

        const extensionJsonInfoParser = (extensionJsonInfo) => {
          //得到feature的信息
          const { code, explain, cmds } = extensionJsonInfo.features[0]
          const mainPath = path.join(extPath, extensionJsonInfo.main);
          console.log('mainpath', mainPath);
          console.log('cmds', cmds);
          //遍历feature的命令
          cmds.forEach((cmd, index) => {
            console.log('cmd', cmd);
            //注册命令
            registerCommand(cmd, () => { console.log('cmd', cmd); lionAPI.openMainPanelTab({ name: extensionJsonInfo.pluginName, path: mainPath });
          });
          })

      
        }

        extensionJsonInfoParser(jsonConfig);


        const newExtension = {
          id: index + 2,
          type: 'local plugin',
          input: {},
          output: {},
          pros: {
            pluginName: jsonConfig.pluginName,
            main: path.join(extPath, jsonConfig.main),
          },
        }
        dispatch({
          type: 'LOAD_EXTENSION',
          extension: newExtension,
        });

      } else {
        console.log('isFolderStructureValid false');
      }






    });


    //读取插件的图标
    //读取插件的预览图
    //读取插件的描述
    //读取插件的版本
    //读取插件的作者
    //读取插件的依赖
    //读取插件的配置
    //读取插件的入口
    //读取插件的出口
    //读取插件的权限
    //读取插件的状态
    //读取插件的安装状态
    //读取插件的启用状态
    //读取插件的运行状态
    //读取插件的卸载状态
    //读取插件的更新状态
    //读取插件的升级状态
    //读取插件的升级版本
    //读取插件的升级时间
    //读取插件的升级日志
  }

  const loadRemoteExtension = () => {
    //读取远程插件
    //读取插件的信息
    //读取插件的图标
    //读取插件的预览图
  }

  const loadBuiltinExtension = () => {
    //读取内置插件
    //读取插件的信息
    //读取插件的图标
  }

  const renderLocalExtension = () => {
    return (


      <div>local extension
        {extensionState.extensions.map((extension, index) => {
          console.log('map position');
          console.log(extension);
          console.log(index);
          return (<li key={extension.id}>{extension.pros.pluginName}</li>);
          // return (<li key={extension.id}>{extension.pros.name}</li>);
        })}
      </div>



    );
    //渲染本地插件
    // 读取插件目录下的所有插件
    // 遍历插件文件，读取插件信息
    //把插件信息


  }

  const renderRemoteExtension = () => {
    return (<div>remote extension</div>);
    //渲染远程插件
  }

  const renderBuiltinExtension = () => {
    return (<div>builtin extension</div>);
    //渲染内置插件
  }





  return (
    <div>
      <h1>EXTENSION
        Manager</h1>
      <button onClick={loadLocalExtension}>loadLocalExtension</button>
      <label >Local extension</label>
      <ul>{renderLocalExtension()}</ul>



      <label>Remote extension</label>
      <ul>{renderRemoteExtension()}</ul>
      <label>Builtin extension</label>
      <ul>{renderBuiltinExtension()}</ul>

    </div>
  );


}

export default ExtensionManagerUI;