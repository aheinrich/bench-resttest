"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var SortingPipe = (function () {
    function SortingPipe() {
    }
    SortingPipe.prototype.transform = function (value, args) {
        if (!value) {
            return value;
        }
        if (!args) {
            return value;
        }
        var sortAsc = function (a, b) {
            if (a[args] < b[args])
                return -1;
            if (a[args] > b[args])
                return 1;
            return 0;
        };
        var sortDesc = function (a, b) {
            if (a[args] < b[args])
                return 1;
            if (a[args] > b[args])
                return -1;
            return 0;
        };
        var compareFn;
        if (args.startsWith("+")) {
            compareFn = sortAsc;
            args = args.slice(1);
        }
        else if (args.startsWith("-")) {
            compareFn = sortDesc;
            args = args.slice(1);
        }
        else {
            compareFn = sortAsc;
        }
        return value.sort(compareFn);
    };
    SortingPipe = __decorate([
        core_1.Pipe({
            name: "sortBy"
        }), 
        __metadata('design:paramtypes', [])
    ], SortingPipe);
    return SortingPipe;
}());
exports.SortingPipe = SortingPipe;
