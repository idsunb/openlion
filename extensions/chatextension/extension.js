import { lionCommand, lionContext } from "openlion";
import openlion from "../../src/workspace/lionAPI/openlion";
import { lionExtension } from "../../src/workspace/extension/LionExtension";
const path = require('path');

export {openlion} from "../../src/workspace/lionAPI/openlion";

console.log('i am the first extension')


console.log("🚀 ~ file: extension.js:9 ~ openlion.lionExtension.active:", openlion.lionExtension.active)


//覆盖lionExtension.active的方法





openlion.lionExtension.setActive(()=>{
    console.log("hahahahhahahahahhaha")
    openlion.openWebview({url:"index.html",title:openlion.lionContext.getConfig().name,where:'mainpanel'})


})

openlion.lionExtension.setDeactive(()=>{
    lionCommand.call('mainpanel.deletewebview',{title:openlion.lionContext.getConfig().name})

}   )

