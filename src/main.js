

import { app, BrowserWindow,webContents,Notification ,ipcMain,dialog,Menu,session } from 'electron';
import path from 'path';
// const os = require('os')
import os from 'os';
// import installExtension, { REACT_DEVELOPER_TOOLS } from 'electron-devtools-installer';

import openlion from './base/lionAPI/openlion';



const { electronReloader} = require('electron-reloader')
// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
    app.quit();
  }

// electronReloader();
try {
  require('electron-reloader')(module,{});
} catch (error) {}






function showNotification ({title, body}) {
    new Notification({ title: title, body: body }).show()
  }

let mainWindow;


async function handleFileOpen() {
    const { canceled, filePaths } = await dialog.showOpenDialog()
    console.log('handleFileOpen');
    if (!canceled) {
        return filePaths[0]
    }
}


function handleSetTitle(event, title) {
    const webContents = event.sender
    const win = BrowserWindow.fromWebContents(webContents)
    win.setTitle(title)
}
function handleGetObject({name}) {
  console.log('handleGetObject name',name);

  if(name=='event')
    return JSON.stringify(openlion.lionEvent.eventGroup);
  if(name=='command')
    return JSON.stringify(openlion.lionCommand.getCommands());
  if(name=='context')
    return JSON.stringify(openlion.lionContext.getTestState());
}




const helloFromMain= ()=> {
    console.log('Hello from main process!')
    }

// console.log(__dirname);
// console.log(app.getPath('appData'));
const createWindows = async () => {
    mainWindow = new BrowserWindow({
        width: 1000,
        height: 800,
        webPreferences: {
            nodeIntegration: true,
            webviewTag: true,
            webSecurity: false,
            contextIsolation: false,
            devTools: true, // 启用 devTools 选项

            // nodeIntegrationInWorker: true,

            // preload: path.join(__dirname, 'preload.js'),
            preload: path.join(__dirname, 'preload.js')
        },
    });
  // 加载 React 开发者工具
  // const reactDevToolsPath = path.join(os.homedir(), '\\AppData\\Local\\Google\\Chrome\\User Data\\Default\\Extensions\\fmkadmapgofadopljbjfkapdkoienihi\\4.28.0_0');

  // await session.defaultSession.loadExtension(reactDevToolsPath)
// installExtension(REACT_DEVELOPER_TOOLS)
// .then((name) => console.log(`Added Extension:  ${name}`))
// .catch((err) => console.log('An error occurred: ', err));

  // and load the index.html of the app.
  // if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {

  //for vite
    mainWindow.loadURL("http://localhost:5180/");
  // } else {
  //   mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
  // }


  //for esbuild 
  // console.log('___dirname----------------------------',__dirname);
  // mainWindow.loadFile(path.join(__dirname, 'index.html'));

  


//设置菜单
    // const menu = Menu.buildFromTemplate([
    //     {
    //       label: app.name,
    //       submenu: [
    //         {
    //           click: () => mainWindow.webContents.send('update-counter', 1),
    //           label: 'Increment'
    //         },
    //         {
    //           click: () => mainWindow.webContents.send('update-counter', -1),
    //           label: 'Decrement'
    //         }
    //       ]
    //     }
    
    //   ])

    //   Menu.setApplicationMenu(menu)

    // mainWindow.loadURL('http://localhost:8088/index.html');
    // mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
    // commandPanel.loadURL('http://localhost:8087/commandPanel.html');
    

    mainWindow.on('closed', () => {
        // windows = windows.filter(w => w !== mainWindow);
        // mainWindow = null;
        mainWindow = null;
    });

    mainWindow.webContents.on('dom-ready', () => {
        console.log('mainwindow dom-ready');
        // mainWindow.webContents.send('chat.urlandname', {url:CHAT_EXTENSION_VITE_DEV_SERVER_URL, name:CHAT_EXTENSION_VITE_NAME});

      })



    process.env.MY_VARIABLE = 'Hello Electron!';
   

    mainWindow.webContents.openDevTools({ mode: 'detach' });


}




const initialContext = ()=>{
  openlion.lionContext.mergeState({name:'lionContext',value:'hello from main'});
  console.log('initialContext',openlion.lionContext.getState());


}

const initialCommand = ()=>{
  
  openlion.lionCommand.register({name:'system.shownotification',action:showNotification,type: 'system',source:'system'});

  openlion.lionCommand.register({name:'system.openfile',action:handleFileOpen,type: 'system',source:'system'});

  openlion.lionCommand.register({name:'hellofrommain', action:helloFromMain, type:'system',source:'system'});


  openlion.lionCommand.register({name:'system.getobject',action:handleGetObject,type: 'system',source:'system'});


  openlion.lionCommand.call('hellofrommain');
}



app.on('ready', () => {
    ipcMain.handle('dialog:openFile', handleFileOpen);
    ipcMain.on('set-title', handleSetTitle)





    ipcMain.handle('system:getUserDataPath', async () => {
        return app.getPath('userData');
    });
    
    createWindows();
    ipcMain.on('sendID', (event, data) => {
        console.log('sendID', data,'id',event.sender.id);

    });




    
    initialContext()
    initialCommand()



  ipcMain.on('remove-state-by-id', (event, webContentsId) => {
    console.log('remove-state-by-id', webContentsId);
    // lionContext.deleteStateByID(webContentsId);
  });
  


    openlion.lionEvent.register('system.eventtest1',(data) => {
        console.log('system.eventtest1 system', data);
      }
    );
    openlion.lionEvent.trigger('system.eventtest1', 'system');


    
});




app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

