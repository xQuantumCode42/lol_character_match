const { contextBridge, ipcRenderer } = require('electron');
contextBridge.exposeInMainWorld('riftHistory', {
  getSettings: () => ipcRenderer.invoke('history:getSettings'),
  list: () => ipcRenderer.invoke('history:list'),
  save: record => ipcRenderer.invoke('history:save', record),
  chooseDirectory: () => ipcRenderer.invoke('history:chooseDirectory'),
});
