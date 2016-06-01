import * as express from 'express'
import * as cors from 'cors'
import * as request  from 'request';
import * as path from 'path';

import { config } from '../../config';

export interface IConfig {
    env: string;
    server: {
        host: string;
        port: number;
    }
    app: {
        start:string;
    }
    api: {
        host: string;
    }
}

let publicDir = path.join(__dirname, '../public/');

if (!process.env.NODE_ENV) {
  console.log("Running in DEV mode");
} else {
  if (process.env.NODE_ENV == "production"){
    console.log(`Running in PROD mode - ${process.env.NODE_ENV}`);
  } else {
    console.log(`Running in DEV mode - ${process.env.NODE_ENV}`);
  }
  
};

console.log(config)

/**
 * 
 * 
 */
const app = express();




// Enable CORS
app.use(cors());

// Basic
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Environment pre-poader
app.get('/settings', (req, res) => {
  let settings = {};
  
  // set the properties
  settings['start'] = config.app.start;
  settings['environment'] = config.env;
  settings['webApiUrl'] = config.api.host;

  // return the settings
  res.send(settings);
});

// Angular client
app.use('/public', express.static(path.join(publicDir)));
app.use('/libs', express.static(path.join(publicDir, "libs")));
app.get('/run', (req, res) => {
  res.sendFile(path.join(publicDir, "index.html"))
});

// API Proxy
app.use('/api', (req, res, next) => {

  let url = config.api.host + req.url;
  
  console.log(`Proxy request from ${req.url} to ${url}`)

  req.pipe(request(url)).pipe(res);;

});

var server = app.listen(config.server.port, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});