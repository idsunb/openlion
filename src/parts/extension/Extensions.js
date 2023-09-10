import { set } from "lodash"
import openlion from "../../workspace/lionAPI/openlion"






class Extensions {
  constructor() {
    this.extensions = {} 

  }

  toString(){

    return "fefefefefefe"
  }

  setExtension({name,entry,root,title,config,mode,description,active=false}){
    this.extensions[name] = {name,root,entry,title,config,mode,active,description}
  }

  getExtension(name){
    return this.extensions[name]
  }

  getAllExtensions(){
    return this.extensions
  }
  


  

  async enable(name) {
    console.log("🚀 ~ file: LionExtensions.js:27 ~ LionExtensions ~ enable ~ name:", name)
    const {entry,active,root} = this.extensions[name]
    console.log("🚀 ~ file: Extensions.js:34 ~ Extensions ~ enable ~ extensions:", extensions)
    console.log("🚀 ~ file: LionExtensions.js:27 ~ LionExtensions ~ enable ~ entry,active:", entry,active,root)
    


    const module = this.extensions[name].module =await import(entry)
    await module.openlion.lionContext.setConfig({'root':root,name:name,active:true})
      // console.log("🚀 ~ file: Extensions.js:41 ~ Extensions ~ enable ~ setConfig:", module.openlion.lionContext.getConfig())
      


    module.openlion.lionExtension.enable()
    this.extensions[name].active= true
    


    //parse config
    // if(mode == 'js'){
    //   //设置名字和激活状态，把module存起来
    //  const module = this.extensions[name].module =await import('/'+entry)
    //  console.log("🚀 ~ file: LionExtensions.js:33 ~ LionExtensions ~ enable ~ tempmodule:", module)
    //   module.openlion.lionExtension.setName(name)
    //   module.openlion.lionExtension.enable()
    //   this.extensions[name].active= true
    // }
    // if(mode == 'webview'){
    //   openlion.lionCommand.call('mainpanel.openwebview',{url:'file://'+entry,title:name})
    //   console.log("🚀 ~ file: Extensions.js:45 ~ Extensions ~ enable ~ entry:", entry)
    // }
    // if(mode == 'mix'){
    //   console.log("还没有实现")

    // }

    this.active()

  }
  active = () => {
    console.log("🚀 ~ file: LionExtensions.js: active ~ active:")

  }

  deactive() {

    console.log("🚀 ~ file: extension.js:32 ~ Extension ~ deactive ~ deactive:")
    //require卸载模块使用delete require.cache[require.resolve('模块名')]，import直接delete
    // delete require.cache[require.resolve(this.path)];
    
  }


  disable(name){
    const {entry,mode,active,module} = this.extensions[name]
    module.openlion.lionExtension.disable()

      module.openlion.lionContext.setConfig({active:false})

      this.extensions[name].active= false

      this.deactive()

    // if(mode == 'webview'){
    //   openlion.lionCommand.call('mainpanel.deletewebview',{title:name})
    // }

    
  }


}

export const extensions = new Extensions

