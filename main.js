const {BrowserWindow, app, globalShortcut} = require('electron');
require('./src/app');

let mainWindow = null

function main(){
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600
    })
    mainWindow.loadURL('http://localhost:3000')
    mainWindow.removeMenu()
    mainWindow.on('close',event=>{
        mainWindow = null
    })

    globalShortcut.register('Escape', ()=>{
        app.relaunch()
        app.exit(0)
    })
}

app.on('ready', main)