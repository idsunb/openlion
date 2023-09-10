import React,{useState} from 'react';
import { createRoot } from 'react-dom/client';
import { OpenAI } from "langchain/llms/openai";


const container = document.getElementById('root');
const root = createRoot(container);

const App = () => {
    const [inputValue, setInputValue] = useState('');

    const [messages, setMessages] = useState([]);


    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleSendMessage = () => {


        setMessages([...messages, { text: inputValue, isUser: true }]);

        setInputValue('');
    };

    return (
        <div>
        <div>
          {messages.map((message, index) => (
            <div key={index} style={{ textAlign: message.isUser ? 'right' : 'left' }}>
              {message.text}
            </div>
          ))}
        </div>
        <div>
          <input type="text" value={inputValue} onChange={handleInputChange} />
          <button onClick={handleSendMessage}>Send</button>
        </div>
      </div>
    );
}

root.render(<App />);
