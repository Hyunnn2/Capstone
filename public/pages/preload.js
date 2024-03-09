const { contextBridge, ipcRenderer } = require('electron')


contextBridge.exposeInMainWorld('mainWindowAPI', {
    minimizeMainWindow: () => ipcRenderer.send('minimizeMainWindow')
})