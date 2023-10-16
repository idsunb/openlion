// import { lionCommand } from "openlion"
import openlion from "../../src/workspace/lionAPI/openlion";
// const path = require('path');

export {openlion} from "../../src/workspace/lionAPI/openlion";

console.log('i am the langchain extension')


import { OpenAI } from "langchain/llms/openai";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { Chroma } from "langchain/vectorstores/chroma";


// import { PDFLoader } from "langchain/document_loaders/fs/pdf";

import * as pdfjsLib from 'pdfjs-dist';
import pdfWorker from 'pdfjs-dist/build/pdf.worker.js?url'
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

const fs = require('fs');





const model = new OpenAI({
  openAIApiKey: 'sk-LAwhVW2PPHk0clu4065039E860374a5e8571E8570597A69d',//你的OpenAI API Key
  temperature: 0.9,
  streaming: true,
  modelName:"gpt-3.5-turbo",
},{baseURL:"https://api.ai-yyds.com/v1"});

const result = model.call("你好");

const embeddings = new OpenAIEmbeddings({verbose:true,openAIApiKey:'sk-LAwhVW2PPHk0clu4065039E860374a5e8571E8570597A69d'},{baseURL:"https://api.ai-yyds.com/v1"});


setTimeout(async () => {
//   const docs = await loader.load();
// console.log(docs);

// const vectorStore = await Chroma.fromExistingCollection(
//   embeddings,
//   { collectionName: "godel-escher-bach" }
// );

// const response = await vectorStore.similaritySearch("scared", 2);

// console.log(response);

// const filteredResponse = await vectorStore.similaritySearch("scared", 1, {
//   id: 1,
// });

// console.log(filteredResponse);
// const loader = new PDFLoader("E:/下载/H2_AN202303301584713680_1.pdf", {
//     // you may need to add `.then(m => m.default)` to the end of the import
//     pdfjs: () => import("pdfjs-dist"),
//   });
  
// const docs = await loader.load();

// console.log(docs);


// const url = "E:/下载/H2_AN202303301584713680_1.pdf";
// // const data = new Uint8Array(fs.readFileSync(url));
// console.log('pdf',pdfjsLib)
// // console.log('data',data)

// const loadingTask = pdfjsLib.getDocument(fs.readFileSync(url));


// loadingTask.promise.then(pdf => {
//     console.log('Total pages:', pdf.numPages);
//   });





}, 2000);



// //覆盖lionExtension.active的方法
// import { loadPyodide } from "pyodide";

// console.log('pyodide')
// async function main(){
//     let pyodide = await loadPyodide();
//     console.log(pyodide.runPython(`
//         import sys
//         sys.version
//     `));
//     pyodide.runPython("print(1 + 2)");
//   }
//   main();

// const impath = "C:\\Users\\Administrator\\AppData\\Roaming\\openlion\\extensions\\chatextension2\\extension.js"

// const module  = await import(impath)
// console.log("🚀 ~ file: extension.js:27 ~ module:", module)





// const model = new OpenAI({
//     openAIApiKey: 'sk-LAwhVW2PPHk0clu4065039E860374a5e8571E8570597A69d',//你的OpenAI API Key
//     temperature: 0.9,
//     modelName:"gpt-3.5-turbo",

//   },{baseURL:"https://api.ai-yyds.com/v1"});

// const res = await model.call(

//     "What would be a good company name a company that makes colorful socks?"
//   );

// console.log(res);







openlion.lionExtension.setActive(()=>{
    openlion.openWebview({url:"/index/index.html?panel=home",title:openlion.lionContext.getConfig().name,uid:"langchain-index",where:'leftpanel'})
    // openlion.openWebview({url:"chat/chat.html",title:openlion.lionContext.getConfig().name,uid:"langchain-chat",where:'mainpanel'})
    // openlion.openWebview({aburl:"http://localhost:8082/chat.html",title:openlion.lionContext.getConfig().name,where:'mainpanel'})



    



})

openlion.lionExtension.setDeactive(()=>{
    openlion.lionCommand.call('leftpanel.deletewebview',{title:openlion.lionContext.getConfig().name})
    

}   )

