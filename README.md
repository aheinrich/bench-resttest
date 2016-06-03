# Bench RestTest

My application for Bench Labs "RestTest" code evaluation. 

Uses:
- Express (as a host, CORS proxy)
- Angular2
- Bootstrap
- Font-Awesome

You will need NodeJS (tested on v4.4.4 ) to run the project.

# Installation

Clone the repository

`git clone https://github.com/aheinrich/bench-resttest.git`

Install requirements via NPM, run the following:

`npm install`

# Start

To start the application, run the following:

`npm run start`

Then, open your browser to:

http://localhost:8000/

# Deploy via Docker

To 'dockerize' the application, run the following:

`npm run docker:build`

... and then go grab a coffee while it builds :-)

To run the application: 

`npm run docker:run`

This will build the application at container runtime. It can be accessed via your Docker-Machine IP address:

http://192.168.99.100:8000/ *
 
** This is an example. Your Docker IP address may vary

# Build

To build the application, run the following:

`npm run dev`

Then, open your browser to:

http://localhost:8000/

The project uses **Typescript**, compiling to Javascript (es5) and a leverages a build pipeline with **Gulp**. The server-side 
of the project is using the **ExpresssJS** framework. The client-side of the project is using the **Angular2** framework. It is 
built with **SystemJS** module loader.

## Errors during build?

Seeing lots of these...

```
... error TS2304: Cannot find name 'module'.
... error TS2304: Cannot find name 'Promise'.
```

I changed over the project structure and didn't update the `Typescript` module definitions. The project *should* still compile.  


## Gulp Tasks

```
├── compile:server            << Compiles Server-related Typescript into Javascript; Outputs to 'dist' directory    
├── compile:client            << Compiles Client-related Typescript into Javascript; Outputs to 'dist' directory
├── copy:client               << Copies basic client assets (index.html and SystemJS module loader)
├── copy:dependencies         << Copies application dependencies (libs) into `dist` for client app to reference
├── copy:dependencies:dev     << Not used
├── copy:styles               << Copies CSS and assets into `dist/public` for client app to reference 
├── copy                      << Shortcut for all 'copy' tasks 
├── compile                   << Shortcut for all 'compile' tasks  
├── build                     << Shortcut for all 'build' tasks
├── dev:watch                 << Watches locations in the `dist` directory and reloads server during development
│   └── dev:start
├── dev:clean                 << Cleans the 'dist' directory
├── dev:start                 << Starts the server with Nodemon in development mode 
├── start                     << Starts the server with Nodemon in production mode
```

## Directory Structure

```
.
├── Dockerfile                < Instructions for building Docker
├── gulpfile.js               < Tasks for build pipetime (see above)
├── LICENSE.md                < Because always
├── package.json              < Project definition
├── README.md                 < You're looking at it
├── tsconfig.js               < Typescript configuration, used by editor to understand project typings, not used at 
|                               compile-time
├── tslint.json               < Linting instructions
|
├── .vscode                   
│   └── settings.json         < VSCode workspace project settings
|
├── config                    < Project configuration folder
│   └── index.js              < CommonJS module to define project configuration based on NODE_ENV
│   └── development.js        < Dev settings
│   └── production.js         < Production settings
|
├── src                        
│   └── client                < Client-side AngularJS project source
│   |   └── app               < Typescript-based application source lives here
│   |   |   └── ...           < Angular2 app project structure
|   |   |
│   |   └── index.html        < Entry point
│   |   └── system.config.js  < SystemJS module loader definitions
|   |   └── tsconfig.json     < Typescript config when compiling the client
|   |
│   └── server                < Server-side ExpressJS project source
|       └── server.ts         < ExpressJS server source
|       └── tsconfig.json     < Typescript config when compiling the server
|
├── public                    < Public assets
│   └── css
│   └── img
│   └── mock
|
├── typings                   < Typescript module definitions (typings) 

```

# Testing
There are no unit tests ... :neutral_face:

There are no e2e tests ... :neutral_face:

**... What. What?! Why not?** 

Unit-testing with Karma and Angular2 (...using SystemJS exclusively...) wasn't as 'straight-forward' as I expected when starting 
this project. I re-wrote my build pipeline with Gulp in the last day before submission, and had to prioritize other parts of 
the project. **In the interest of time**, I opted to submit this application without proper unit test or end-2-end tests. 
Obviously, this is less-than-ideal...

# NPM Project Dependencies


```
@angular/common                       >> Angular2
@angular/compiler                     >> Angular2
@angular/core                         >> Angular2
@angular/http                         >> Angular2
@angular/platform-browser             >> Angular2
@angular/platform-browser-dynamic     >> Angular2

core-js                               >> Polyfill ES6 specs for older browsers
reflect-metadata                      >> Reflection (for Angular2)
rxjs                                  >> Observables (for Angular2)
zone.js                               >> Zones (for Angular2)
systemjs                              >> ES6 Module loader

whatwg-fetch                          >> Polyfill Fetch Api for somne browsers (Edge, Safari) 
bootstrap                             >> UI Component library 
font-awesome                          >> Icon library
lodash                                >> Utility / General-purpose awesomeness library
moment                                >> Datetime library

express                               >> ExpressJS
cors                                  >> Middleware library to easily add CORS headers to HTTP requests
request                               >> HTTP request client library
```

## Developer Dependencies

```
del                                   >> Build pipeline; Clean directories 
gulp                                  >> Javascript task runner for Build pipeline
gulp-nodemon                          >> Nodmon for Gulp tasks
gulp-sourcemaps                       >> Generate sourcemaps for Gulp tasks
gulp-typescript                       >> Typescript for Gulp tasks
run-sequence                          >> Run a sequence of Gulp tasks in provided order
tslint                                >> Typescript linting
typescript                            >> Typescript compiler
typings                               >> Typescript module definitions tool
```