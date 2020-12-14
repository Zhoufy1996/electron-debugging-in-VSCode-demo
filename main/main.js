/** @format */
const request = require('request');
const { app, BrowserWindow } = require('electron');

let mainWindow = null;

function createWindow() {

    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        show: false,
    });
    mainWindow.webContents.openDevTools();
    // 如果不先loadURL, 本地代码不会映射到9223端口
    mainWindow.loadURL('http://127.0.0.1:4000/');

    const show = () => {
        // 判断本地代码有没有映射到9223端口
        request('http://127.0.0.1:9223/json/list', (err, response, body) => {
            if (
                err == null &&
                body &&
                JSON.parse(body).find(
                    (ws) => ws.url === 'http://127.0.0.1:4000/'
                )
            ) {
                mainWindow.show();
                return;
            }

            setTimeout(() => {
                show();
            }, 1000);
        });
    };

    mainWindow.on('ready-to-show', () => {
        show();
    });
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
