/** @format */
var net = require('net');

const portInUse = (port = 4000, callback = () => {}) => {
    return new Promise((resolve, reject) => {
        const server = net.createServer().listen(port);

        server.on('listening', function () {
            // 执行这块代码说明端口未被占用
            server.close(); // 关闭服务
            resolve(port);
        });

        server.on('error', function (err) {
            reject(err);
        });
    });
};

const getAvailablePort = (port = 4000, timeout = 5000) => {
    let beginTime = new Date();
    return new Promise((resolve, reject) => {
        let p = port;
        const detection = () => {
            if (new Date() - beginTime > 5000) {
                reject('超时了');
                return;
            }

            portInUse(p)
                .then((v) => {
                    resolve(v);
                })
                .catch((e) => {
                    p += 1;
                    detection();
                });
        };
        detection();
    });
};

exports.getAvailablePort = getAvailablePort;
