/** @format */

const { getAvailablePort } = require('./utils');

/** @format */
let frontPort = null;

const getPort = (port = 4000, timeout = 5000) => {
    if (frontPort == null) {
        return new Promise((resolve, reject) => {
            getAvailablePort(port, timeout)
                .then((p) => {
                    frontPort = p;
                    resolve(p);
                })
                .catch((e) => {
                    reject(e);
                });
        });
    } else {
        return Promise.resolve(port);
    }
};

exports.getPort = getPort;
