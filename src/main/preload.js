const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('main_process', {
  setTitle: (title) => ipcRenderer.send('set-title', title),
  getJsFile: async (url) =>{
    return await ipcRenderer.invoke('get-js-file', url);
  }
})