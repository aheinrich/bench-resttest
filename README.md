# Bench RestTest

My application for Bench Labs "RestTest" code evaluation 

Uses:
- Express (as a host, CORS proxy)
- Angular2
- Bootstrap
- Font-Awesome

You will need NodeJS ( v4.4.4 or newer ) to run the project

# Installation

Clone the repository

`git clone https://github.com/aheinrich/bench-resttest.git`

Install requirements via NPM, run the following:

`npm install`

# Start

To start the application, run the following:

`npm run start`

Then, open your browser to:

http://localhost:8000/run

# Deploy via Docker

To 'dockerize' the application, run the following:

`npm run docker:build`

... and then go grab a coffee while it builds :-)

To run the application: 

`npm run docker:run`

This will build the application at container runtime. It can be accessed via your Docker-Machine IP address:

http://http://192.168.99.100:8000/run *
 
** This is an example. Your Docker IP address may vary
 
# Build

To build the application, run the following:

`npm run dev`

Then, open your browser to:

http://localhost:8000/run

The project uses **Typescript**, compiling to Javascript (es5) and a leverages a build pipeline with **Gulp**. The server-side 
of the project is using the **ExpresssJS** framework. The client-side of the project is using the **Angular2** framework. It is 
built with **SystemJS** module loader.


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
├── Dockerfile
├── gulpfile.js
├── LICENSE
├── package.json
├── README
├── tsconfig.js
├── tslint.json
|
├── .vscode                        
│   └── settings.json
|
├── config                        
│   └── index.js
│   └── development.js
│   └── production.js
|
├── src                        
│   └── client
│   └── server
|
├── public                        
│   └── css
│   └── img
│   └── mock
|
├── typings
│   └── client

```

# Testing
There are no unit tests ... :-\

There are no e2e tests ... :-\ 

**... What. What?! Why not?** 

Unit-testing with Karma and Angular2 (...using SystemJS exclusively...) wasn't as 'straight-forward' as I expected when starting 
this project. I re-wrote my build pipeline with Gulp in the last day before submission, and had to prioritize other parts of 
the project. **In the interest of time**, I opted to submit this application without proper unit test or end-2-end tests. 
Obviously, this is less-than-ideal...
