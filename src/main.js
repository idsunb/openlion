

const { app, BrowserWindow,ipcMain,dialog,Menu,session } = require('electron');
const path = require('path');
const os = require('os')
import installExtension, { REACT_DEVELOPER_TOOLS } from 'electron-devtools-installer';


// console.log(path.join(os.homedir(), '\\AppData\\Local\\Google\\Chrome\\User Data\\Default\\Extensions\\fmkadmapgofadopljbjfkapdkoienihi'));


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

console.log(__dirname);
console.log(app.getPath('appData'));
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
        mainWindow = null;
    });
    process.env.MY_VARIABLE = 'Hello Electron!';
   
    // windows.push(mainWindow);
    // mainWindow.webContents.openDevTools();

    mainWindow.webContents.openDevTools({ mode: 'detach' });


}

app.on('ready', () => {
    ipcMain.handle('dialog:openFile', handleFileOpen);
    ipcMain.on('set-title', handleSetTitle)
    ipcMain.handle('system:getUserDataPath', async () => {
        return app.getPath('userData');
    });
    
    createWindows();

    
});




app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

