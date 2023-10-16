// import { lionCommand } from "openlion"
import openlion from "../../src/workspace/lionAPI/openlion";
// const path = require('path');

export {openlion} from "../../src/workspace/lionAPI/openlion";

console.log('i am the chroma extension')

const { execSync } = require("child_process");
const {spawn} = require('child_process');
import { Chroma } from "langchain/vectorstores/chroma";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
const { ChromaClient } = require("chromadb");
// import { ChromaClient } from "chromadb";
// const client = new ChromaClient();
















// const model = new OpenAI({
//     openAIApiKey: 'sk-LAwhVW2PPHk0clu4065039E860374a5e8571E8570597A69d',//你的OpenAI API Key
//     temperature: 0.9,
//     modelName:"gpt-3.5-turbo",

//   },{baseURL:"https://api.ai-yyds.com/v1"});

// const res = await model.call(

//     "What would be a good company name a company that makes colorful socks?"
//   );

// console.log(res);



// const a =1;
// const b =2000000000000;
// console.log(execSync(`python -c "print(${a}+${b})"`).toString());
// console.log('proma,python')

// let py;

// async function startPython() {
// const py = spawn('python', ["d:/文档/codes/openlion/extensions/chroma/chromaservice.py"]);
// // const py = spawn('python', ['--version']);
// py.stdout.on('data', (data) => {
//     console.log(data.toString());
// });
// py.stderr.on('data', (data) => {
//     console.log(data.toString());
// });
// py.on('close', (code) => {
//     console.log(`子进程退出码：${code}`);
// });


// //如果进程结束,则关闭python进程
// process.on('SIGINT', function () {
//     py.stdin.end();
//     py.kill('SIGINT');
// }   
// );

// }




// const {OpenAIEmbeddingFunction} = require('chromadb');
// const embedder = new OpenAIEmbeddingFunction({openai_api_key: "apiKey"})
// class MyEmbeddingFunction {
  
//     constructor(api_key) {
//       this.api_key = api_key;
//     }
  
//     async generate() {
//       // do things to turn texts into embeddings with an api_key perhaps
//       return "embeddings";
//     }
//   }



// setTimeout(async () => {



// //     let collection = await client.createCollection({
// //         name: "my_collection1",
// //         embeddingFunction: MyEmbeddingFunction,
// //       });

// //       await collection.add({
// //         ids: ["id1", "id2", "id3"],
// //         metadatas: [{"chapter": "3", "verse": "16"}, {"chapter": "3", "verse": "5"}, {"chapter": "29", "verse": "11"}],
// //         documents: ["lorem ipsum...", "doc2", "doc3"],
// //     })

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
//     new OpenAIEmbeddings({verbose:true,openAIApiKey:'sk-LAwhVW2PPHk0clu4065039E860374a5e8571E8570597A69d'},{baseURL:"https://api.ai-yyds.com/v1"}),
//     {
//       collectionName: "godel-escher-bach",
//     }
//   );
  
//   const response = await vectorStore.similaritySearch("scared", 2);
  
//   console.log(response);
    
// }, 2000);




let chromaservice;
let port = 8000;

openlion.lionExtension.setActive(()=>{
    // openlion.openWebview({url:"/index/index.html?panel=home",title:openlion.lionContext.getConfig().name,uid:"langchain-index",where:'leftpanel'})
    // openlion.openWebview({url:"chat/chat.html",title:openlion.lionContext.getConfig().name,uid:"langchain-chat",where:'mainpanel'})
    // openlion.openWebview({aburl:"http://localhost:8082/chat.html",title:openlion.lionContext.getConfig().name,where:'mainpanel'})

    const statusItem = openlion.createStatusBarItem(openlion.StatusBar.Right);
    statusItem.text = 'Chroma';
    statusItem.tooltip = 'Chroma is not installed.';
    statusItem.show();




    const depresult = openlion.chekDependency(['python组件','pip'])

if(depresult['python组件']==true){

    console.log('python组件已安装')
    
    chromaservice = spawn('chroma', ['run','--path','c:/Users/Administrator/AppData/Roaming/openlion/databases/chroma']);
    chromaservice.unref();
    statusItem.tooltip = "端口地址： http://localhost:8000" ;
    statusItem.show();


    const handleClose =(code) => {
        console.log(`子进程退出码：${code}`);
            if (code === 1)
            {
                statusItem.tooltip = "启动失败，可能端口占用 port:"+port.toString()+" 请尝试重启软件";
                statusItem.show();

                //尝试使用新的端口启动

                port = port + 1;
                chromaservice = spawn('chroma', ['run', '--path', 'c:/Users/Administrator/AppData/Roaming/openlion/databases/chroma', '--port', port.toString()]);
                chromaservice.unref();
                statusItem.tooltip = "端口地址： http://localhost:"+port.toString();
                statusItem.show();

                chromaservice.on('close', handleClose);
                chromaservice.stdout.on('data', (data) => {
                    console.log('std', data.toString());
                });
                chromaservice.stderr.on('data', (data) => {
                    console.log('err', data.toString());
                });
            }

        }


    chromaservice.stdout.on('data', (data) => {
        console.log('std',data.toString());
    });
    chromaservice.stderr.on('data', (data) => {
        console.log('err',data.toString());
    });
    chromaservice.on('close', handleClose);

    //如果进程结束,则关闭python进程
    process.on('SIGINT', function () {
        chromaservice.stdin.end();
        chromaservice.kill('SIGINT');
    }   
    );



  

}

})

openlion.lionExtension.setDeactive(()=>{
//     openlion.lionCommand.call('leftpanel.deletewebview',{title:openlion.lionContext.getConfig().name})
// console.log("🚀 ~ file: extension.js:37 ~ openlion.lionExtension.setDeactive ~ setDeactive:")
if(chromaservice){
    chromaservice.stdin.end();
    chromaservice.kill('SIGINT');
}    


}   )

