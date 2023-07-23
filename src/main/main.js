const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path');
const fs = require('fs');

function createWindow() {
  const mainWindow = new BrowserWindow({
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      devTools: true
    }
  })



  mainWindow.loadFile('src/renderer/index.html');
  mainWindow.webContents.openDevTools();
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

ipcMain.on('set-title', (event, title) => {
  const webContents = event.sender
  const win = BrowserWindow.fromWebContents(webContents)
  win.setTitle(title)
});

ipcMain.handle('get-js-file', async (event, url) => {
  const webContents = event.sender
  const win = BrowserWindow.fromWebContents(webContents);
  return fs.readFileSync(url, {encoding:'utf-8'}).toString();
});