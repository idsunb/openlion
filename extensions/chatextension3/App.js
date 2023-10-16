// import { registerCommand } from '../../src/workspace/command/commands';
import {openlion} from '../../src/workspace/lionAPI/openlion';
// import openlion from 'openlion'
export {openlion} from '../../src/workspace/lionAPI/openlion';
// import { IpcRenderer } from 'electron';

export const commandTest =  openlion.lionCommand
// const newLion = new LionExtension('chatextension3');

// class chat3 extends LionExtension {
//     mouth() {
//         console.log('mouth test ',this.name);
//     }
// extension.active = () => {
//     console.log('active from extension~~~66');
// }






// }

// const newLion2 = new chat3('chatextension3');
// newLion2.activate()



const b =3 
// newLion.mouth()
// newLion.activate()
// newLion.deactivate()
// newLion.ass()



console.log('chatextension3');


const test = (data) => {
    console.log("🚀 ~ file: App.js:41 ~ test ~ test from extension:", data)
    return "gooooooooooooooo"
}



openlion.lionCommand.register({name:'test1',action:test});

setTimeout(() => {
    console.log("🚀 ~ file: App.js:50 ~ setTimeout ~ openlion.lionContext.getState():", openlion.lionContext.getState())
    console.log("🚀 ~ file: App.js:51 ~ setTimeout ~ openlion.lionContext.getTestState():", openlion.lionContext.getTestState())


}, 1000);







const test3 = (name,age) => {
    console.log('test3 from extension');
}



// module.exports = {
//     chat3
// }


// export default chat3