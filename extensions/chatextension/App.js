import React from 'react';
import ReactDOM from 'react-dom';
const {registerCommand, callCommand, getCommands } = lionAPI;


const setTitle = () => {
    lionAPI.setTitle('hello');
}

const setCommand = () => {


registerCommand({name:'hellofromchat', action:() => {
        console.log('hello from cat');
}});
}

const callrendercommandtest = () => {
    lionAPI.callCommand('hellofromchat');
}

const callrendercommandwithback = async () => {
    const result = await lionAPI.callCommand('hellofromlioncommand');
    console.log(result);
}

const App = () => {
    return (
        <div>
            <h1>hello 第一个</h1>
            <button onClick={()=>{console.log('hello')}}>hello</button>
            <button onClick={setTitle}>hello</button>
            <button onClick={setCommand}>注册命令</button>
            <button onClick={()=>{lionAPI.callCommand('hellofromchat')}}>调用命令</button>
            <button onClick={callrendercommandwithback}>调用宿主命令</button>
            <button onClick={()=>{lionAPI.callCommand('mainpanel.keybinding.panel.open')}}>调用宿主打开面板打开命令</button>
        </div>
    );
}

export default App;
