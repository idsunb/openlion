
import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import styles from './chat.module.css';
// import '@babel/polyfill';
// const { OpenAI } = require("langchain/llms/openai");



const container = document.getElementById('root');
const root = createRoot(container);

// const model = new OpenAI({ openAIApiKey: "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", temperature: 0.9 });




import { OpenAI } from "langchain/llms/openai";
// const { OpenAI } = require("langchain/llms/openai");
// import {crypto} from 'crypto';
// const crypto = require('crypto');












// const  OpenAI  = require("langchain/llms/openai");



const model = new OpenAI({
  openAIApiKey: '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',//你的OpenAI API Key
  temperature: 0.9
});

// const res = await model.call(

//     "What would be a good company name a company that makes colorful socks?"
//   );


//   console.log(res);











// const randomBytes = crypto.randomBytes(16).toString('hex');
// console.log("🚀 ~ file: LeftSidePanel.jsx:18 ~ randomBytes:", randomBytes)
// console.log(randomBytes);




const App = () => {
  const [inputValue, setInputValue] = useState('');

  const [messages, setMessages] = useState([]);


  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSendMessage = async () => {
    // setMessages([...messages, { text: inputValue, isUser: true }]);
    setMessages(prevMessages => [...prevMessages, { text: inputValue, isUser: true }]);

    console.log("🚀 ~ file: chat.js:76 ~ handleSendMessage ~ messages:", messages)

    // const res = await model.call(inputValue);

    // const res = await model.call(

    // //     "What would be a good company name a company that makes colorful socks?"
    // console.log('hi,ima here')
    //   );
    const res = await model.call(`${inputValue}`);
    // setMessages([...messages, { text: res, isUser: false }]);
    setMessages(prevMessages => [...prevMessages, { text: res, isUser: false }]);


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


