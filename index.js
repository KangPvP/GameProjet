const electron = require('electron')
const { ipcMain, ipcRenderer } = require('electron')
const app = electron.app

let time = Date.now()

function createWindow() {

    mainWindow = new electron.BrowserWindow({ width: 1200, height: 800, title: 'Game', center: true, webPreferences: { nodeIntegration: true, contextIsolation: false}, resizable: false })
    mainWindow.setMenu(null)
    mainWindow.openDevTools()
    mainWindow.loadURL(`file://${__dirname}/game.html`)

    mainWindow.on('closed', () => {
        mainWindow = null
    })

}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
    if(process.platform != 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if(mainWindow === null) {
        createWindow()
    }
})

// events
ipcMain.on('getTime', (event, args) => {
    return Date.now - time
    
})