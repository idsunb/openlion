// import { lionCommand, lionContext } from "openlion";
import openlion from "../../src/workspace/lionAPI/openlion";
// const path = require('path');

export {openlion} from "../../src/workspace/lionAPI/openlion";

console.log('i am the first extension')








// console.log("🚀 ~ file: extension.js:9 ~ openlion.lionExtension.active:", openlion.lionExtension.active)




//覆盖lionExtension.active的方法




openlion.lionExtension.setActive(()=>{
    console.log("hahahahhahahahahhaha")
    openlion.openWebview({url:"index.html",title:"ex1",uid:"ex1",where:'mainpanel'})


})

openlion.lionExtension.setDeactive(()=>{
    openlion.lionCommand.call('mainpanel.deletewebview',{title:openlion.lionContext.getConfig().name})

}   )

