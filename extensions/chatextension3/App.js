// import { registerCommand } from '../../src/workspace/command/commands';
import { set } from 'lodash';
import openlion,{lionExtension} from '../../src/workspace/lionAPI/openlion';
// import openlion from 'openlion'


// import { IpcRenderer } from 'electron';


// const newLion = new LionExtension('chatextension3');

// class chat3 extends LionExtension {
//     mouth() {
//         console.log('mouth test ',this.name);
//     }
lionExtension.active = () => {
    console.log('active from extension~~~66');
}


// }

// const newLion2 = new chat3('chatextension3');
// newLion2.activate()



export const b =3 
// newLion.mouth()
// newLion.activate()
// newLion.deactivate()
// newLion.ass()



console.log('chatextension3');


export const test = () => {
    console.log('test from extension');
}



openlion.lionCommand.register({name:'test1',action:test});

console.log('lioncontext--------------',openlion.lionContext.getState());
setTimeout(() => {
    console.log('lioncontext',openlion.lionContext.getState());

}, 1000);
console.log('lioncontext getTestState',openlion.lionContext.getTestState());



const test3 = (name,age) => {
    console.log('test3 from extension');
}


// module.exports = {
//     chat3
// }


// export default chat3