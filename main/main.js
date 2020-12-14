/** @format */

const http = require('http');
const { app, BrowserWindow } = require('electron');

let mainWindow = null;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
    });

    mainWindow.webContents.openDevTools();
    const hasConnectReq = () => {
        const req = http.request(
            'http://127.0.0.1:9223/json/list',
            { timeout: 1000 },
            (res) => {
                console.log(res);
                res.on('data', (data) => {
                    if (data && data.find((item) => item.title === 'demo')) {
                        tag = true;
                        mainWindow.loadUrl('http://127.0.0.1:4000');
                    } else {
                        setTimeout(() => {
                            hasConnectReq();
                        }, 0);
                    }
                });
            }
        );
        req.on('error', (e) => {
            console.log(e);
            setTimeout(() => {
                hasConnectReq();
            }, 0);
        });
        req.end();
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
