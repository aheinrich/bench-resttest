import * as express from 'express'
import * as cors from 'cors'
import * as request  from 'request';
import * as path from 'path';

import { config } from '../../config';

let publicDir = path.join(__dirname, '../public/');

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