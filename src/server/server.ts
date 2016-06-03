import * as express from 'express'
import * as cors from 'cors'
import * as request  from 'request';
import * as path from 'path';

import { config } from '../../config';

// Define publicDir for use below
let publicDir = path.join(__dirname, '../public/');

// Create an express application
const app = express();

// Enable CORS for use across all server endpoints
// Not ideal, but OK for a prototype. 
app.use(cors());

// Entry point for server
app.get('/', (req, res) => {
  res.sendFile(path.join(publicDir, "index.html"))
});

// Environment pre-loader endpoint. Provides configuration to 
// client on bootstrap
app.get('/settings', (req, res) => {
  let settings = {};
  
  // set the properties
  settings['start'] = config.app.start;
  settings['environment'] = config.env;
  settings['webApiUrl'] = config.api.host;

  // return the settings
  res.send(settings);
});

// Public assets and Angular libraries
app.use('/public', express.static(path.join(publicDir)));

// Put the whole node_modules in a LIBS directory?! Uuugh. No
// TODO: Bundle and minify for the love of GOD!
app.use('/libs', express.static(path.join(publicDir, "libs")));

// BenchLabs RestTest API Proxy. because CORS
app.use('/api', (req, res, next) => {

  let url = config.api.host + req.url;
  
  //console.log(`Proxy request from ${req.url} to ${url}`)
  req.pipe(request(url)).pipe(res);;

});

var server = app.listen(config.server.port, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('App listening at http://%s:%s', host, port);
});