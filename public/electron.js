const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

const activateEventHandler = require('./eventHandler.js');

// DPI 스케일링 무시 설정
app.commandLine.appendSwitch('high-dpi-support', '1');
app.commandLine.appendSwitch('force-device-scale-factor', '1');

function createMainWindow() {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        minWidth: 800,
        minHeight: 600,
        frame: false,
        webPreferences: {
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.js'),
            zoomFactor: 1.0
        }
    });

    activateEventHandler(mainWindow);

    // React 개발서버 사용을 위한 설정
    mainWindow.loadURL('http://localhost:3000');
    mainWindow.webContents.openDevTools();
}

app.whenReady().then(() => {
    createMainWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createMainWindow();
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

ipcMain.on('asynchronous-message', (event, arg) => {
    console.log(arg); // "ping" 출력
    event.reply('asynchronous-reply', 'pong');
});

ipcMain.handle('download-obj', async (event, url) => {
    const fetch = await import('node-fetch');
    try {
        const response = await fetch.default(url);
        const data = await response.text();
        const filePath = path.join(__dirname, 'mesh.obj');
        fs.writeFileSync(filePath, data);
        return filePath;
    } catch (error) {
        console.error('Error downloading obj file:', error);
        throw error;
    }
});