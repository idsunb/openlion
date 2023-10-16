
import React from 'react';

function Home() {


    const handleChat = () => {
        openlion.openWebview({url:"chat/chat.html",title:"chat",uid:"langchain-chat",where:'mainpanel'})
        // openlion.openWebview({aburl:"file:///C:/Users/Administrator/AppData/Roaming/openlion/extensions/langchain/chat/chat.html",title:"chat",uid:'langchain-chat',where:'mainpanel'})

    }


    const handleTemplate = () => {
        openlion.openWebview({url:"template/template.html",title:"template",uid:"langchain-template",where:'mainpanel'})
    }

    const handleWebScraper = ()=>{
        openlion.openWebview({url:"index/index.html?panel=webscraper",title:"webscraper",uid:"langchain-webscraper",where:'mainpanel'})



    }




    const handleDocument = ()=>{
        openlion.openWebview({url:"index/index.html?panel=document",title:"document",uid:"langchain-document",where:'mainpanel'})

    }



    

    return (
        <div>
            <h1>langchain</h1>
            <button onClick={handleChat}>chat</button>
            <br />
            <button onClick={handleTemplate}>template</button>
            <br />
            <button onClick={handleWebScraper}>WebScraper</button>
            <br />
            <button onClick={handleDocument} >document</button>

        </div>
    );
}

export default Home;



