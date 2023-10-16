// import { lionCommand, lionContext } from "openlion";
import openlion from "../../src/workspace/lionAPI/openlion";
import { lionExtension } from "../../src/workspace/extension/LionExtension";
const path = require('path');

export {openlion} from "../../src/workspace/lionAPI/openlion";

console.log('i am the second extension2  ')





//覆盖lionExtension.active的方法

// import crypto from 'crypto';
// console.log(crypto)


// import { OpenAI } from "langchain/llms/openai";

// const model = new OpenAI({
//   openAIApiKey: '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',//你的OpenAI API Key
//   temperature: 0.9
// });


// console.log('res++++++++++++++++++')


// // const res = await model.call(
// //     "1111111111111111"
// //     );

// // console.log(res);

// const call = async () => {
//   const res = await model.call(
//     "1111111111111111"
//     );
//     console.log('res')

//     console.log(res)
// }

// call()






openlion.lionExtension.setActive(()=>{
    console.log("heheheh")
    openlion.openWebview({url:"index.html",title:"chatextension2 test",uid:"pyodide",where:'mainpanel'})


})

openlion.lionExtension.setDeactive(()=>{
    openlion.lionCommand.call('mainpanel.deletewebview',{title:openlion.lionContext.getConfig().name})

}   )
