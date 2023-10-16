import React,{useEffect} from "react";
import { Document } from "langchain/document";
import { CharacterTextSplitter } from "langchain/text_splitter";

import { OpenAI } from "langchain/llms/openai";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
// import { ChromaClient } from "chromadb";


import { Chroma } from "langchain/vectorstores/chroma";


import * as pdfjsLib from 'pdfjs-dist';
import pdfWorker from 'pdfjs-dist/build/pdf.worker.js?url'
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;


// const data = fs.readFileSync("E:/下载/H2_AN202303301584713680_1.pdf");




const model = new OpenAI({
    openAIApiKey: 'sk-LAwhVW2PPHk0clu4065039E860374a5e8571E8570597A69d',//你的OpenAI API Key
    temperature: 0.9,
    streaming: true,
    modelName:"gpt-3.5-turbo",
  },{baseURL:"https://api.ai-yyds.com/v1"});


const embeddings = new OpenAIEmbeddings({verbose:true,openAIApiKey:'sk-LAwhVW2PPHk0clu4065039E860374a5e8571E8570597A69d'},{baseURL:"https://api.ai-yyds.com/v1"});

  // const res = await embeddings.embedQuery("Hello world");
  // console.log(res);




//   const documentRes = await embeddings.embedDocuments(["Hello world", "Bye bye"]);
// console.log({ documentRes });


// const text = "foo bar baz 123";
// const splitter = new CharacterTextSplitter({
//   separator: " ",
//   chunkSize: 11,
//   chunkOverlap: 5,
// });
// const output = await splitter.createDocuments([text]);
// console.log(output);

import {
    SupportedTextSplitterLanguages,
    RecursiveCharacterTextSplitter,
  } from "langchain/text_splitter";
  
  console.log(SupportedTextSplitterLanguages); 

  const splitter = new CharacterTextSplitter({
    chunkSize: 1536,
    chunkOverlap: 200,
  });

  
const jimDocs = await splitter.createDocuments(
    [`My favorite color is blue.`],
    [],
    {
      chunkHeader: `DOCUMENT NAME: Jim Interview\n\n---\n\n`,
      appendChunkOverlapHeader: true,
    }
  );

    console.log(jimDocs);

    const pamDocs = await splitter.createDocuments(
        [`My favorite color is red.`],
        [],
        {
          chunkHeader: `DOCUMENT NAME: Pam Interview\n\n---\n\n`,
          appendChunkOverlapHeader: true,
        }
      );

    console.log('pand',pamDocs);



    
setTimeout(async () => {

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
  //       embeddings,
  // {
  //       collectionName: "godel-escher-bach",
  //     }
  //   );
    
    const vectorStore = await Chroma.fromExistingCollection(
      embeddings,
      { collectionName: "godel-escher-bach" }
    );

    const response = await vectorStore.similaritySearch("scared", 2);
    
    console.log(response);

    const filteredResponse = await vectorStore.similaritySearch("scared", 1, {
      id: 1,
    });
    
    console.log(filteredResponse);




    




// console.log(response);
}, 2000);







    // console.log('vectors',vectorStore);
    
    // const response = await vectorStore.similaritySearch("scared", 2);
    
    // console.log(response);








const PdfReader = ()=> {


    useEffect(()=>{
        //从给定的网址中得到html,然后解析html,得到所有文字数据  不要css和代码
        // fetch("https://www.baidu.com")
        // .then(response => response.text())
        // .then(async data => {
        //     const splitter = RecursiveCharacterTextSplitter.fromLanguage('html',{chunkSize: 175,chunkOverlap: 20,})
        //     const output = await splitter.createDocuments([data]);
        //     console.log(output);

        const url = "E:/下载/H2_AN202303301584713680_1.pdf";
// // const data = new Uint8Array(fs.readFileSync(url));
// console.log('pdf',pdfjsLib)
// // console.log('data',data)



// loadingTask.promise.then(pdf => {
//     console.log('Total pages:', pdf.numPages);
//   });


  // 显示pdf
  const loadingTask = pdfjsLib.getDocument(url);
loadingTask.promise.then(pdf => {
  console.log('PDF loaded');
  // Fetch the first page
  const pageNumber = 1;
  pdf.getPage(pageNumber).then(page => {
    console.log('Page loaded');
    const scale = 1.5;
    const viewport = page.getViewport({ scale: scale, });

    // Prepare canvas using PDF page dimensions
    const canvas = document.getElementById('the-canvas');
    const context = canvas.getContext('2d');
    canvas.height = viewport.height;
    canvas.width = viewport.width;

    // Render PDF page into canvas context
    const renderContext = {
      canvasContext: context,
      viewport: viewport,
    };
    const renderTask = page.render(renderContext);
    renderTask.promise.then(() => {
      console.log('Page rendered');
    });
  }
  );

}


);

  










    },[])

    return (
        <div>
            hello scraper
            <canvas id="the-canvas"></canvas>

        </div>
    )





}

export default PdfReader



