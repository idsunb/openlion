import { lionCommand } from "openlion";
import openlion from "../../src/workspace/lionAPI/openlion";
import { lionExtension } from "../../src/workspace/extension/LionExtension";
const path = require('path');

export {openlion} from "../../src/workspace/lionAPI/openlion";

console.log('i am the langchain extension')




//覆盖lionExtension.active的方法







openlion.lionExtension.setActive(()=>{
    console.log("hahahahhahahahahhaha111111")
    openlion.openWebview({url:"index.html",title:openlion.lionContext.getConfig().name,where:'leftpanel'})
    openlion.openWebview({url:"chat/chat.html",title:openlion.lionContext.getConfig().name,where:'mainpanel'})



    


})

openlion.lionExtension.setDeactive(()=>{
    openlion.lionCommand.call('leftpanel.deletewebview',{title:openlion.lionContext.getConfig().name})
console.log("🚀 ~ file: extension.js:37 ~ openlion.lionExtension.setDeactive ~ setDeactive:")
    

}   )

