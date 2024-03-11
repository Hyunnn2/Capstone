const { contextBridge, ipcRenderer } = require('electron')


contextBridge.exposeInMainWorld('mainWindowAPI', {
    minimizeMainWindow: () => ipcRenderer.send('minimizeMainWindow'),
    maximizeMainWindow: () => ipcRenderer.send('maximizeMainWindow'),
    closeMainWindow: () => ipcRenderer.send('closeMainWindow')
})