

const { app, BrowserWindow,webContents,Notification ,ipcMain,dialog,Menu,session } = require('electron');
const path = require('path');
const os = require('os')
import installExtension, { REACT_DEVELOPER_TOOLS } from 'electron-devtools-installer';
const { registerCommand, callCommand, getCommands } = require('./base/command/commands');
import lionEvent from  './base/event/lionEvent';
import { sources } from 'webpack';

// console.log(path.join(os.homedir(), '\\AppData\\Local\\Google\\Chrome\\User Data\\Default\\Extensions\\fmkadmapgofadopljbjfkapdkoienihi'));

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
            preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
        },
    });
  // 加载 React 开发者工具
//   const reactDevToolsPath = path.join(os.homedir(), '\\AppData\\Local\\Google\\Chrome\\User Data\\Default\\Extensions\\fmkadmapgofadopljbjfkapdkoienihi\\4.28.0_0');

//   await session.defaultSession.loadExtension(reactDevToolsPath)
installExtension(REACT_DEVELOPER_TOOLS)
.then((name) => console.log(`Added Extension:  ${name}`))
.catch((err) => console.log('An error occurred: ', err));


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
    mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
    // commandPanel.loadURL('http://localhost:8087/commandPanel.html');
    

    mainWindow.on('closed', () => {
        // windows = windows.filter(w => w !== mainWindow);
        // mainWindow = null;
        cosole.log('closed');
        mainWindow = null;
    });

    mainWindow.webContents.on('dom-ready', () => {
        console.log('mainwindow dom-ready');
      })

    mainWindow.on('did-finish-load', () => {
        console.log('did-finish-load');
      }
    );

    process.env.MY_VARIABLE = 'Hello Electron!';
   
    // windows.push(mainWindow);
    // mainWindow.webContents.openDevTools();

    // mainWindow.webContents.send('setcommand', {registerCommand, callCommand, getCommands });
    // mainWindow.webContents.send('setcommand', 1)
    mainWindow.webContents.openDevTools({ mode: 'detach' });


}

app.on('ready', () => {
    ipcMain.handle('dialog:openFile', handleFileOpen);
    ipcMain.on('set-title', handleSetTitle)
    ipcMain.on('i am the test----', (event, arg) => {
        console.log('i am the test----');
        console.log(event.sender)
    })


    // ipcMain.on('callCommand', (event, {name,args}) => {
    //     console.log('callCommand',name,args);
    //     callCommand(name,args);
    //     // callCommand(command.name, command.args);
    //     });



    ipcMain.handle('system:getUserDataPath', async () => {
        return app.getPath('userData');
    });
    
    createWindows();

    // const id = Math.random().toString(36).substr(2, 9);
    // const channel = `invokeRenderer-${id}`;


    // ipcMain.on('test', (event, arg) => {
    //     console.log('dom-ready',arg);
    //     console.log('dom-ready received ');
    // });
    // mainWindow.webContents.once('test', (event, arg) => {
    //     console.log('dom-ready',arg);
    //     console.log('dom-ready received ');
    // });
    
    registerCommand({name:'system.showNotification',action:showNotification,type: 'system',source:'system'});

    registerCommand({name:'system.openfile',action:handleFileOpen,type: 'system',source:'system'});

    registerCommand({name:'hellofrommain', action:helloFromMain, type:'system',source:'system'});

    lionEvent.register('system.eventtest1',(data) => {
        console.log('somethingHappenedfrommaintriger', data);
      }
    );
    lionEvent.trigger('system.eventtest1', { data:"hello from main" });


    
});




app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

