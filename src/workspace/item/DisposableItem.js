
//创建一个可被释放的对象, 可基于此类扩展,这个类的实例会在被释放时调用dispose方法, 渲染进程中的对象需要手动或不调用dispose方法, 主进程中的对象会在进程退出时自动调用dispose方法
const { ipcRenderer } = require('electron');




class DisposableItem {
    constructor() {
    }



    dispose() {

        console.log('dispose ',ItemID);
    }
}

export default DisposableItem;