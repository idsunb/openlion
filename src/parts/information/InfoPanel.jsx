import React,{useEffect, useState} from "react";
import openlion from "../../workspace/lionAPI/openlion";
import { lionContext } from "../../workspace/context/lionContext";
lionContext.setState({a:2,b:3});
lionContext.setState({e:2,f:3});






const InfoPanel = () => {

    const [messages, setMessages] = useState([]);

    const addMessage = (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      };




    useEffect(() => {
        openlion.lionCommand.register({name:'infopanel.addmessage', action:(message) => {
            addMessage(message);
            }});

        openlion.lionCommand.call('infopanel.addmessage','hello from InfoPanel');
        // addMessage({"a":4});

    },[]);

    



    return (
        <div>
      {messages.map((message, index) => (
        <div key={index}>{typeof message === 'object'? JSON.stringify(message): message}</div>
      ))}
        </div>
    );
}

export default InfoPanel;


