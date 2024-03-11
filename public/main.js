const { app, BrowserWindow } = require('electron/main')

const createMainWindow = require('./pages/MainWindow')


app.whenReady().then(() => {
	createMainWindow()

	app.on('activate', () => {
		if (BrowserWindow.getAllWindows().length === 0) {
			app.quit()
		}
	})
})

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit()
	}
})