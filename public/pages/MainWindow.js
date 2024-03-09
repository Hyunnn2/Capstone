const { BrowserWindow, ipcMain } = require('electron/main')
const path = require('node:path')
const remote = require('@electron/remote/main')
remote.initialize()


function createMainWindow() {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        frame: false,
        webPreferences: {
            nodeIntegration: true,
            devTools: true,
            preload: path.join(__dirname, 'preload.js')
        }
    })

    remote.enable(mainWindow.webContents)

    mainWindow.loadURL('http://localhost:3000')
    mainWindow.webContents.openDevTools()

    ipcMain.on('minimizeMainWindow', () => {
        mainWindow.minimize()
    })

}


module.exports = createMainWindow;