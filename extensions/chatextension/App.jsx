import React from 'react';
import ReactDOM from 'react-dom';
// import openlion from '../../src/workspace/openlion/openlion';
// const {registerCommand, callCommand, getCommands } = openlion;


const setTitle = () => {
    openlion.setTitle('hello');
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
