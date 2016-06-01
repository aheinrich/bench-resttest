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
var core_1 = require('@angular/core');
var TransactionIntroComponent = (function () {
    function TransactionIntroComponent() {
    }
    TransactionIntroComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'transaction-intro',
            template: "\n    <h2>My Submission</h2>\n    <p>This is my submission for Bench's RestTest</p>\n\n    <h2>Requirements</h2>\n    <ol>\n        <li>We would like you to write an app that connects to an API, downloads all the data, and has a function that will calculate\n        the total balance</li>\n    </ol>\n\n    <h2>Additional Features</h2>\n    <ol>\n        <li>As a user, I need vendor names to be easily readable. Make the vendor names more readable, remove garbage from names.</li>\n        <li>As a user, I do not want to have any duplicated transactions in the list. Use the data provided to detect and identify \n        duplicate transactions.</li>\n        <li>As a user, I need to get a list expense categories. For each category I need a list of transactions, and the total \n        expenses for that category.</li>\n        <li>As a user, I need to calculate daily calculated balances. A running total for each day. For example, if I have 3 \n        transactions for the 5th 6th 7th, each for $5, then the daily balance on the 6th would be $10.</li>\n    </ol>\n    "
        }), 
        __metadata('design:paramtypes', [])
    ], TransactionIntroComponent);
    return TransactionIntroComponent;
}());
exports.TransactionIntroComponent = TransactionIntroComponent;
