const { contextBridge, ipcRenderer } = require('electron')


contextBridge.exposeInMainWorld('electronAPI', {
    minimizeMainWindow: () => ipcRenderer.send('minimizeMainWindow'),
    maximizeMainWindow: () => ipcRenderer.send('maximizeMainWindow'),
    closeMainWindow: () => ipcRenderer.send('closeMainWindow'),
    openDirectory: () => ipcRenderer.invoke('openDirectory'),
    searchClick: () => ipcRenderer.send('searchClick'),
    settingClick: () => ipcRenderer.send('settingClick'),
    getwowDroHandler:() => ipcRenderer.invoke('getwowDroHandler'),
    downloadObj: (url) => ipcRenderer.invoke('download-obj', url)
})
