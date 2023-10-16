import React,{useState,useEffect} from 'react';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
// import("https://pyscript.net/latest/pyscript.js")

const container = document.getElementById('root');
const root = createRoot(container);
import { openlion } from '../../src/workspace/lionAPI/openlionweb';
// import path from 'path';
// const path = require('path');


import Pytest1 from './parts/pytest1';

const App = () => {
    // const location = useLocation();
    const [panel,setPanel] = useState(null)


    

    
    
    useEffect(()=>{

        //获得当前url中的参数
        const currentURL = window.location.href;
        const searchParams = new URLSearchParams(currentURL.substring(currentURL.indexOf('?')));
        const panelv = searchParams.get('panel');
        console.log("🚀 ~ file: App.jsx:17 ~ useEffect ~ panelv:", panelv)
        setPanel(panelv)


        // //导入css文件
        // const link = document.createElement('link');
        // link.rel = 'stylesheet';
        // link.type = 'text/css';
        // link.href = 'https://pyscript.net/latest/pyscript.css';
        // document.head.appendChild(link);

        // return ()=>{
        //     document.head.removeChild(link);
        // }

    },[]);


    const handleTest1 = async () => {
        openlion.lionContext.getConfig()
        console.log("🚀 ~ file: index.js:43 ~ handleTest1 ~ openlion.lionContext.getConfig():", openlion.lionContext.getConfig())

        //打开测试1 webview
        openlion.openWebview({ url: "index.html?panel=pytest1", uid: 'pytest1', title: 'pytest1',where:'mainpanel' })
        // await openlion.lionCommand.call('mainpanel.openwebview', { url: pageurl, tip: "none", uid: 'test1', title: 'test1', config: { root: 'test1', name: 'test1', active: true } })
    }





    return (
        <div>
            {!panel && <div>
                <button onClick={handleTest1}>打开测试1</button>
                
                </div>}
            {panel == 'pytest1' && <div><Pytest1 /></div>}
            {/* {panel =='webscraper' && <div><WebScraper /></div>} */}
            

        </div>


    );
};




root.render(<App />);





