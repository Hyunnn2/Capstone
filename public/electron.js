// electron.js

const { app, BrowserWindow, ipcMain } = require('electron/main')
const path = require('node:path')

// React 개발서버 사용을 위한 설정
const remote = require('@electron/remote/main')
remote.initialize()

// 이벤트 핸들러 모음 시작
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
            nodeIntegration: true,
            devTools: true,
            preload: path.join(__dirname, 'preload.js'),
            zoomFactor: 1.0
        }
    })
    activateEventHandler(mainWindow)

	// React 개발서버 사용을 위한 설정
	remote.enable(mainWindow.webContents)

    mainWindow.loadURL('http://localhost:3000')
    mainWindow.webContents.openDevTools()

}

app.whenReady().then(() => {
	createMainWindow()

	app.on('activate', () => {
		if (BrowserWindow.getAllWindows().length === 0) {
            createMainWindow()
		
		}
	})
})

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit()
	}
})

ipcMain.on('asynchronous-message', (event, arg) => {
  console.log(arg) // "ping" 출력
  event.reply('asynchronous-reply', 'pong')
})
