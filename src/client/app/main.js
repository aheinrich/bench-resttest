"use strict";
// import { enableProdMode } from "@angular/core";
var platform_browser_dynamic_1 = require("@angular/platform-browser-dynamic");
var http_1 = require("@angular/http");
var app_component_1 = require("./app.component");
// enableProdMode();
fetch();
{
}
platform_browser_dynamic_1.bootstrap(app_component_1.AppComponent, [
    http_1.HTTP_PROVIDERS,
]).then(function (success) { return console.log("Bootstrap success"); })
    .catch(function (error) { return console.log(error); });
