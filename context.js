/** @format */

const { getAvailablePort } = require('./utils');

/** @format */
let frontPort = 4000;

const getPort = () => {
    return Promise.resolve(frontPort);
    // if (frontPort == null) {
    //     return new Promise((resolve, reject) => {
    //         getAvailablePort(port, timeout)
    //             .then((p) => {
    //                 frontPort = p;
    //                 resolve(p);
    //             })
    //             .catch((e) => {
    //                 reject(e);
    //             });
    //     });
    // } else {
    //     return Promise.resolve(port);
    // }
};

exports.getPort = getPort;
