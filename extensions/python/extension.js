// import { lionCommand } from "openlion"
import openlion from "../../src/workspace/lionAPI/openlion";
// const path = require('path');

export {openlion} from "../../src/workspace/lionAPI/openlion";

console.log('i am the python extension')





const { execSync } = require("child_process");
const {spawn} = require('child_process');



// const { execSync } = require("child_process");

// const a =1;
// const b =2000000000000;
// console.log(execSync(`python -c "print(${a}+${b})"`).toString());
// console.log('langchian,python')

openlion.lionExtension.setActive(()=>{

    const statusItem = openlion.createStatusBarItem(openlion.StatusBar.Right);
    statusItem.text = 'Python';

    try {
        // 执行 python 命令，并获取输出
        const output = execSync('python --version').toString();
        statusItem.tooltip =   output.trim();
        statusItem.command = 'system.openfile';
        statusItem.show();
        // console.log(`Python version: ${output.trim()}`);
      } catch (error) {
        // 如果执行 python 命令失败，则说明没有安装 Python 并且抛出错误
        statusItem.tooltip = 'Python is not installed.';
        statusItem.show();
        // console.error('Python is not installed.');
        new Error('Python is not installed.')
      }  


})


openlion.lionExtension.setDeactive(()=>{
    console.log('python deactive')



}   )

