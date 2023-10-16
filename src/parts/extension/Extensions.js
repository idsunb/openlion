
import openlion from "../../workspace/lionAPI/openlion"
import { scanPath } from "./extensionManager";
// import {openlion} from "../../workspace/lionAPI/openlionweb";
const path = require('path');

// console.log('checkdependency',openlion.chekDependency('lodash')) 

class Extensions {
  constructor() {
    this.extensions = {} 
    scanPath(this.extensions)

  }


  toString = () => {
    return "fefefefefefe"
  }

  setExtension = ({name,entry,root,title,config,mode,description,active=false}) => {
    this.extensions[name] = {name,root,entry,title,config,mode,active,description}
  }

  getExtension = (name) => {
    return this.extensions[name]
  }

  getAllExtensions = () => {
    // scanPath(this.extensions)
    return this.extensions
  }





  enable = async (name) => {
    const {entry,active,root,type,where} = this.extensions[name]
    // console.log("🚀 ~ file: Extensions.js:34 ~ Extensions ~ enable= ~ name,entry,active,root,type:", name,entry,active,root,type)
    if(type == 'webview'){
      if(where == 'mainpanel'){
        openlion.lionCommand.call('mainpanel.openwebview', { url: entry, tip: "none",uid:name, title: name,config:{root:root,name:name,active:true}})
      }
      if(where == 'leftpanel'){
        openlion.lionCommand
        openlion.lionCommand.call('leftpanel.openwebview', { url: entry, tip: "none",uid:name, title: name,config:{root:root,name:name,active:true}})
      }

    }

    if(type == 'js'){
      // let mod = null;
// import('C:/Users/Administrator/AppData/Roaming/openlion/extensions/langchain/extension.js').then((module) => {
//     // 使用加载的模块
//     mod = module
// })
// console.log(mod)


try {
const module = this.extensions[name].module =require(entry)
await module.lionContext.setConfig({'root':root,name:name,active:true})
module.lionExtension.enable()
} catch (error) {
    return error
}
    //   console.log("🚀 ~ file: LionExtensions.js:37 ~ Extensions ~ enable= ~ mod:", mod)

      // const module = this.extensions[name].module =await import(entry)
      // console.log("🚀 ~ file: Extensions.js:37 ~ Extensions ~ enable= ~ module:", module)
      // await module.openlion.lionContext.setConfig({'root':root,name:name,active:true})
      // module.openlion.lionExtension.enable()
      // this.extensions[name].active= true

    }
    

    this.extensions[name].active= true
    this.active()
  }

  active = () => {
    console.log("🚀 ~ file: Extension.js: active ~ active:")
  }

  deactive = () => {
    console.log("🚀 ~ file:  Extension.js ~ deactive ~ deactive:")
  }

  disable = (name) => {
    const {entry,mode,active,module,type,where} = this.extensions[name]
    //如果type是webview
    if(type == 'webview'){
      if(where == 'mainpanel'){
        openlion.lionCommand.call('mainpanel.deletewebview',{title:name})
      }
      if(where == 'leftpanel'){
        openlion.lionCommand.call('leftpanel.deletewebview',{title:name})
      }
    }
    //如果type是js
    if(type == 'js'){
      module.contextDispose();
      module.lionExtension.disable()
      module.lionContext.setConfig({active:false})
      this.extensions[name].active= false
      this.deactive()
      //把module从require.cache中删除
      delete require.cache[require.resolve(entry)]

    }

    // module.openlion.lionExtension.disable()
    // module.openlion.lionContext.setConfig({active:false})
    // this.extensions[name].active= false
    // this.deactive()
  }
}

export const extensions = new Extensions
