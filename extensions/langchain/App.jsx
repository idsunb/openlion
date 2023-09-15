import { template } from 'lodash';
import React from 'react';
import ReactDOM from 'react-dom';



const App = () => {


    const handleChat = () => {
        openlion.openWebview({url:"chat/chat.html",title:openlion.lionContext.getConfig().name,uid:"langchain-chat",where:'mainpanel'})
        // openlion.openWebview({aburl:"file:///C:/Users/Administrator/AppData/Roaming/openlion/extensions/langchain/chat/chat.html",title:"chat",uid:'langchain-chat',where:'mainpanel'})

    }

    const handleTemplate = () => {
        openlion.openWebview({url:"template/template.html",title:"template",uid:"langchain-template",where:'mainpanel'})
    }



    

    return (
        
        <div>
            <h1>langchain</h1>
            <button onClick={handleChat}>chat</button>
            <br/>
            <button onClick={handleTemplate}>template</button>


        </div>


    );
}


export default App;
