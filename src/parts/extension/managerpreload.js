const { contextBridge } = require('electron')
// import openlion from '../../../src/workspace/lionAPI/openlion';

// const path = require('path');
import path from 'path';
import { extensions } from './Extensions';

window.extensions = extensions



import { Chroma } from "langchain/vectorstores/chroma";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
// import * as fs from "fs";

// import { PDFLoader } from "langchain/document_loaders/fs/pdf";


const fs = require('fs');





setTimeout(async() => {
    // const text = fs.readFileSync("D:\\文档\\test.txt", "utf8");
// /* Split the text into chunks */
// const textSplitter = new RecursiveCharacterTextSplitter({ chunkSize: 1000 });
// const docs = await textSplitter.createDocuments([text]);


// const data = fs.readFileSync("E:/下载/H2_AN202303301584713680_1.pdf");

// console.log('text',text)



//   const vectorStore = await Chroma.fromDocuments(docs,
//    {
//       collectionName: "state_of_the_union",
//     });

// const vectorStore = await Chroma.fromTexts(
//     [
//       `Tortoise: Labyrinth? Labyrinth? Could it Are we in the notorious Little
//           Harmonic Labyrinth of the dreaded Majotaur?`,
//       "Achilles: Yiikes! What is that?",
//       `Tortoise: They say-although I person never believed it myself-that an I
//           Majotaur has created a tiny labyrinth sits in a pit in the middle of
//           it, waiting innocent victims to get lost in its fears complexity.
//           Then, when they wander and dazed into the center, he laughs and
//           laughs at them-so hard, that he laughs them to death!`,
//       "Achilles: Oh, no!",
//       "Tortoise: But it's only a myth. Courage, Achilles.",
//     ],
//     [{ id: 2 }, { id: 1 }, { id: 3 }],
//       new OpenAIEmbeddings({verbose:true,openAIApiKey:'sk-LAwhVW2PPHk0clu4065039E860374a5e8571E8570597A69d'},{baseURL:"https://api.ai-yyds.com/v1"}),
// {
//       collectionName: "godel-escher-bach",
//     }
//   );
  
//   const response = await vectorStore.similaritySearch("scared", 2);
  
//   console.log(response);


}, 2000);


// import { re } from 'mathjs';

// import { extensions } from './Extensions'
// // require = require("esm")(module, {cjs: true,mode:'auto'});

// // const epath = "C:\\Users\\Administrator\\AppData\\Roaming\\openlion\\extensions\\langchain\\extension.js"
// // const dynamicModule = require("C:\\Users\\Administrator\\AppData\\Roaming\\openlion\\extensions\\langchain\\extension.js");
// // console.log("🚀 ~ file: managerpreload.js:14 ~ dynamicModule:", dynamicModule)











// // async function loadModuleAndAccessVariable(modulePath, variableName) {
// //     const module = await import(modulePath);
// //     return module[variableName];
// //   }
  
// //   // 在需要的地方使用函数来加载变量
// //   const dynamicVariable = await loadModuleAndAccessVariable('C:\\Users\\Administrator\\AppData\\Roaming\\openlion\\extensions\\langchain\\extension.js', 'variable1');
// //   console.log(dynamicVariable);

// const epath = "C:\\Users\\Administrator\\AppData\\Roaming\\openlion\\extensions\\langchain\\extension.js"
// const e = "extension.js"

// import(`C:\\Users\\Administrator\\AppData\\Roaming\\openlion\\extensions\\langchain\\${e}`).then((module) => {
//     // 使用加载的模块
//     console.log(module)
//     // const result = module.someFunction();
//     // console.log(result);
//   }).catch((error) => {
//     console.error(error);
//   });

// console.log('managerpreload+++++++++++++++++++++++++++++++++++++++++++++++++++')







// // const importM = async (path) => {
// // //   // const module = await import(path);

// //   const exp = "chatextension2\\extension.js"
// // //   console.log("🚀 ~ file: managerpreload.js:23 ~ importM ~ exp:", exp)

// // //   console.log("????????????????C:\\Users\\Administrator\\AppData\\Roaming\\openlion\\extensions\\"+exp)

// //   const module  = await import(path)
// // //   const module  = await import("C:\\Users\\Administrator\\AppData\\Roaming\\openlion\\extensions\\langchain\\extension.js")
// //   console.log('module',  module)

// // //   return module;
// // };
// // importM("C:\\Users\\Administrator\\AppData\\Roaming\\openlion\\extensions\\langchain\\extension.js");


























// openlion.lionCommand.register({name:'test', action:() => {
//   console.log('test')
// }})








// contextBridge.exposeInMainWorld('openlion', openlion);

// // contextBridge.exposeInMainWorld('extensions', {getAllExtensions: extensions.getAllExtensions, enable: extensions.enable, disable: extensions.disable, getExtension: extensions.getExtension, getExtensionByName: extensions.getExtensionByName});
// contextBridge.exposeInMainWorld('extensions', {getAllExtensions: extensions.getAllExtensions,getExtension: extensions.getExtension,enable:(name) => { extensions.enable(name)},disable: extensions.disable, getExtensionByName: extensions.getExtensionByName});


