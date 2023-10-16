import React from 'react';
import ReactDOM from 'react-dom';
// import openlion from '../../src/workspace/openlion/openlion';
// const {registerCommand, callCommand, getCommands } = openlion;
import { Chroma } from "langchain/vectorstores/chroma";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
const { ChromaClient } = require("chromadb");


const vectorStore = await Chroma.fromTexts(
    [
      `Tortoise: Labyrinth? Labyrinth? Could it Are we in the notorious Little
          Harmonic Labyrinth of the dreaded Majotaur?`,
      "Achilles: Yiikes! What is that?",
      `Tortoise: They say-although I person never believed it myself-that an I
          Majotaur has created a tiny labyrinth sits in a pit in the middle of
          it, waiting innocent victims to get lost in its fears complexity.
          Then, when they wander and dazed into the center, he laughs and
          laughs at them-so hard, that he laughs them to death!`,
      "Achilles: Oh, no!",
      "Tortoise: But it's only a myth. Courage, Achilles.",
    ],
    [{ id: 2 }, { id: 1 }, { id: 3 }],
    new OpenAIEmbeddings({verbose:true,openAIApiKey:'sk-LAwhVW2PPHk0clu4065039E860374a5e8571E8570597A69d'},{baseURL:"https://api.ai-yyds.com/v1"}),
    {
      collectionName: "godel-escher-bach",
    }
  );
  
  const response = await vectorStore.similaritySearch("scared", 2);
  
  console.log(response);


const setTitle = () => {
    openlion.setTitle('hello1');
}

const setCommand = () => {






    

openlion.lionCommand.register({name:'extension1.hellofromchat', action:() => {
        console.log('hello from cat');
}});
}



const callrendercommandtest = () => {
    openlion.lionCommand.call('extension1.hellofromchat');
}


const callrendercommandwithback = async () => {
    const result = await openlion.lionCommand.call('hellofromlioncommand');
    console.log(result);
}



const App = () => {
    return (
        <div>
            <h1>hello 第一个</h1>
            <button onClick={()=>{console.log('hello')}}>hello</button>
            <button onClick={setTitle}>hello</button>
            <button onClick={setCommand}>注册命令</button>
            <button onClick={()=>{openlion.lionCommand.call('hellofromchat')}}>调用命令</button>
            <button onClick={callrendercommandwithback}>调用宿主命令</button>
            <button onClick={()=>{openlion.lionCommand.call('mainpanel.keybinding.panel.open')}}>调用宿主打开面板打开命令</button>
            <button onClick={()=>{openlion.lionCommand.call('infopanel.addmessage',{a:"4"})}}>传递wbid信息</button>
            
        </div>
    );
}

export default App;
