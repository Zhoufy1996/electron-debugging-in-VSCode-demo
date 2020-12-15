/** @format */
const request = require('request');
const { app, BrowserWindow } = require('electron');
const minimist = require('minimist');
const { getPort } = require('../context');

const args = minimist(process.argv.slice(2));

let mainWindow = null;

const createWindow = async () => {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        show: false,
    });

    const fontPort = await getPort();

    const url = `http://127.0.0.1:${fontPort}/`;

    mainWindow.webContents.openDevTools();

    mainWindow.loadURL(url);

    const show = () => {
        if (args['remote-debugging-port']) {
            request(
                `http://127.0.0.1:${args['remote-debugging-port']}/json/list`,
                (err, response, body) => {
                    if (
                        err == null &&
                        body &&
                        JSON.parse(body).find((ws) => ws.url === url)
                    ) {
                        mainWindow.show();
                        return;
                    }

                    setTimeout(() => {
                        show();
                    }, 1000);
                }
            );
        } else {
            mainWindow.show();
        }
    };

    mainWindow.on('ready-to-show', () => {
        show();
    });
};

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
