const { ipcMain, dialog} = require('electron/main')
const path = require('path');
const fs = require('fs');

function activateEventHandler(mainWindow) {

    ipcMain.on('minimizeMainWindow', () => {
        mainWindow.minimize()
    })

    ipcMain.on('maximizeMainWindow', () => {
        if (mainWindow.isMaximized()) {
            mainWindow.restore()
        } else {
            mainWindow.maximize()
        }
    })

    ipcMain.on('closeMainWindow', () => {
        mainWindow.close()
    })



    ipcMain.handle('openDirectory', async () => {
        const result = await dialog.showOpenDialog(mainWindow, {
            properties: ['openDirectory'],
          });
        
          if (!result.canceled) {
            const selectedDirectory = result.filePaths[0];
            const directoryName = path.basename(selectedDirectory);
            const files = fs.readdirSync(selectedDirectory);
            return {
                selectedDirectory: directoryName,
                files: files
            };
          }
        
          return [];
    })

    ipcMain.on('searchClick', () => {
        console.log('searchClick')
    })

    ipcMain.on('settingClick', () => {
        console.log('settingClick')
    })

}

module.exports = activateEventHandler