import { lionContext } from '../context/lionContext';
import {commands} from '../command/commands';
import { lionEvent } from '../event/lionEvent';


class LionExtension {
    constructor(name) {
      this.name = name;
    }
  
  
    setActive(fun){
      this.active = fun
    }
  
    setDeactive(fun){
      this.deactive = fun
    }

    deactive() {
      console.log("🚀 ~ file: extension.js:25 ~ Extension ~ deactive ~ Extension:", LionExtension)
    }
  
    enable() {
      lionContext.setConfig({active:true})
      commands.setActive(true)
      lionEvent.setActive(true)

      this.active()
    }

    active (){
    console.log("🚀 ~ file: LionExtension.js:37 ~ LionExtension ~ active ~ active:")
    }
  
    disable(){
      this.deactive()

      lionContext.setConfig({active:false})
      commands.setActive(false)
      lionEvent.setActive(false)
      console.log("🚀 ~ file: extension.js:36 ~ Extension ~ disable ~ disable:", this.name)

    }
  
  
  }
  


export const lionExtension = new LionExtension