
import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import styles from './template.module.css';
// import '@babel/polyfill';
// const { OpenAI } = require("langchain/llms/openai");

import { LLMChain } from "langchain/chains";


const container = document.getElementById('root');
const root = createRoot(container);

// const model = new OpenAI({ openAIApiKey: "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", temperature: 0.9 });




import { OpenAI } from "langchain/llms/openai";
import { PromptTemplate } from "langchain/prompts";
import { initializeAgentExecutorWithOptions } from "langchain/agents";
import { SerpAPI } from "langchain/tools";
import { Calculator } from "langchain/tools/calculator";
import { BufferMemory } from "langchain/memory";
import { ConversationChain } from "langchain/chains";
// const { OpenAI } = require("langchain/llms/openai");
// import {crypto} from 'crypto';
// const crypto = require('crypto');











// const  OpenAI  = require("langchain/llms/openai");



// const model = new OpenAI({
//     openAIApiKey: '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',//你的OpenAI API Key
//     temperature: 0.9
// });


const tools = [

    new SerpAPI("5f56c5e9fe4b7f129aad3e37fe0e1ae16e794f87bcaac33bfea452db87c41460", {
  
      location: "China",
  
      hl: "cn",
  
      gl: "us",
  
    }),
  
    new Calculator(),
  
  ];

  const memory = new BufferMemory();


//   const executor = await initializeAgentExecutorWithOptions(tools, model, {

//     agentType: "zero-shot-react-description",
  
//   });

const App = () => {
    const [inputValue, setInputValue] = useState('');

    const [messages, setMessages] = useState([]);


    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };


    const message = []
    const chat = new OpenAI({
        openAIApiKey: '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',//你的OpenAI API Key
        temperature: 0.9,
        streaming: true,
        callbacks: [
          {
            handleLLMNewToken(token) {
                message.push(token)
                
              setMessages(prevMessages => {
                prevMessages.pop();
                return[...prevMessages, { text: message, isUser: false }]});
            },
          },
        ],
      },{baseURL:"https://openpass.idsunb.com/v1"});

    const handleSendMessage = async () => {
        // setMessages([...messages, { text: inputValue, isUser: true }]);
        setMessages(prevMessages => [...prevMessages, { text: inputValue, isUser: true }]);

        // const res = await model.call(inputValue);
        // const res = await model.call(
        // //     "What would be a good company name a company that makes colorful socks?"
        // console.log('hi,ima here')
        //   );
        // const res = await model.call(`${inputValue}`);

        const template = "What is a good name for a company that makes {product}?";
        const prompt = new PromptTemplate({

            template: template,

            inputVariables: ["product"],

        });

        // const res = await prompt.format({ product: "colorful socks" });

        // const result = await executor.call({input:inputValue});


        // const chain = new LLMChain({ llm: model, prompt: prompt });

        // const res = await chain.call({ product: "colorful socks" });
        // console.log("🚀 ~ file: template.js:126 ~ handleSendMessage ~ res", res)



        const chain = new ConversationChain({ llm: chat, memory: memory });

        setMessages(prevMessages => [...prevMessages, { text:"........", isUser: false }]);

        const res1 = await chain.call({ input: inputValue });


        // chat.call(inputValue);



        // setMessages([...messages, { text: res, isUser: false }]);
        // setMessages(prevMessages => [...prevMessages, { text:JSON.stringify(res1), isUser: false }]);
        

        setInputValue('');
    };

    return (
        <div className={styles.panel}>
            <div className={styles.chatdiv}>
                <div className={styles.messages}>
                    {messages.map((message, index) => (
                        <div key={index} style={{ textAlign: message.isUser ? 'right' : 'left' }}>
                            {message.text}
                        </div>
                    ))}
                </div>
                <div className={styles.inputdiv}>
                    <input className={styles.input} type="text" value={inputValue} onChange={handleInputChange} />
                    <button onClick={handleSendMessage}>Send</button>
                </div>
            </div>
        </div>
    );
}










root.render(<App />);


