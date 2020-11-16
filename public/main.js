const { app, BrowserWindow, Notification, ipcMain } = require('electron')
const path = require('path')
const isDev = require('electron-is-dev')
 
let win, notification
 
const createBrowserWindow = () => {
    win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    })
 
    win.loadURL(
        isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, "../build/index.html")}`
        )
    win.webContents.openDevTools()
}
 
app.whenReady().then(() => createBrowserWindow())
 
ipcMain('notify', (message) => {
    new Notification({title: 'alert', body: 'message'})
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })
  
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
})