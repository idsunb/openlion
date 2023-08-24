import lionAPI from '../../src/workspace/lionAPI/lionAPI';


const a = 3;



// lionAPI.registerCommand({name:'test',action:() => {console.log('test from extension')}});
// lionAPI.callCommand('test');
console.log(a);

const test = () => {
    console.log('test from extension');
}

const test2 = () => {
    console.log('test test test from extension');
}






module.exports = {
    test: test,
    test2: test2
}
