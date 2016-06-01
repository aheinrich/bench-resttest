// var config , config_file = './' + (process.env.NODE_ENV ? process.env.NODE_ENV : 'development') + '.js';
"use strict";
// try {  
//   config = require(config_file);
// } catch (err) {
//   if (err.code && err.code === 'MODULE_NOT_FOUND') {
//     console.error('No config file matching NODE_ENV=' + process.env.NODE_ENV
//       + '. Requires "' + __dirname + '/' + process.env.NODE_ENV + '.js"');
//     process.exit(1);
//   } else {
//     throw err;
//   }
// }
// module.exports = config;
exports.config = {
    env: "DEV",
    server: {
        host: "",
        port: 8000
    },
    app: {
        start: 'index.html'
    },
    api: {
        host: "http://10.3.37.68:8000"
    }
};
