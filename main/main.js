/** @format */
const http = require('http');
const request = require('request');
const { app, BrowserWindow } = require('electron');

let mainWindow = null;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
    });

    mainWindow.webContents.openDevTools();
    const hasConnectReq = () => {
        request('http://127.0.0.1:9223/json/list', (err, response, body) => {
            if (err) {
                setTimeout(() => {
                    hasConnectReq();
                }, 1000);
                return;
            } else {
                console.log(response, body);
            }
        });
    };
    setTimeout(() => {
        hasConnectReq();
    }, 0);
}

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit();
});

app.whenReady().then(() => {
    createWindow();

    app.on('activate', function () {
        if (mainWindow == null) {
            createWindow();
        }
    });
});
