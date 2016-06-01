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
var index_1 = require("./index");
var TransactionsComponent = (function () {
    function TransactionsComponent(service) {
        this.service = service;
        this.transactionList = [];
    }
    TransactionsComponent.prototype.ngOnInit = function () {
        this.doReset();
    };
    TransactionsComponent.prototype.getTransactions = function () {
        var _this = this;
        this.filterBy = undefined;
        this.service.fetchTransactions().then(function (results) {
            _this.transactionList = results;
            _this.summarize();
        });
    };
    TransactionsComponent.prototype.filterTransactions = function (ev) {
        this.filterBy = ev.ledger;
        this.transactionList = this.service.filterByLedger(this.transactionList, ev.ledger);
        this.summarize();
    };
    TransactionsComponent.prototype.doReset = function () {
        this.showList = true;
        this.showTable = false;
        this.showSummary = false;
        this.showBalance = false;
        this.filterBy = undefined;
        this.getTransactions();
    };
    TransactionsComponent.prototype.doList = function () {
        this.showList = !this.showList;
    };
    TransactionsComponent.prototype.doTable = function () {
        this.showTable = !this.showTable;
    };
    TransactionsComponent.prototype.doSummary = function () {
        this.showSummary = !this.showSummary;
    };
    TransactionsComponent.prototype.doBalance = function () {
        this.showBalance = !this.showBalance;
    };
    TransactionsComponent.prototype.summarize = function () {
        this.summaryList = this.service.summarizeByDate(this.transactionList);
    };
    TransactionsComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: "transactions",
            styleUrls: ["transactions.component.css"],
            pipes: [
                index_1.CurrencyPipe,
                index_1.SortingPipe
            ],
            directives: [
                index_1.TransactionListComponent,
                index_1.TransactionTableComponent,
                index_1.TransactionSummaryComponent,
                index_1.TransactionBalanceComponent
            ],
            providers: [index_1.TransactionService],
            template: "\n    <div>\n    \n        <h2>My Submission</h2>\n        <p>This is my submission for Bench's RestTest</p>\n\n        <h2>Requirements</h2>\n        <ol>\n            <li>We would like you to write an app that connects to an API, downloads all the data, and has a function that will calculate\n             the total balance</li>\n        </ol>\n\n        <h2>Additional Features</h2>\n        <ol>\n            <li>As a user, I need vendor names to be easily readable. Make the vendor names more readable, remove garbage from names.</li>\n            <li>As a user, I do not want to have any duplicated transactions in the list. Use the data provided to detect and identify \n              duplicate transactions.</li>\n            <li>As a user, I need to get a list expense categories. For each category I need a list of transactions, and the total \n              expenses for that category.</li>\n            <li>As a user, I need to calculate daily calculated balances. A running total for each day. For example, if I have 3 \n              transactions for the 5th 6th 7th, each for $5, then the daily balance on the 6th would be $10.</li>\n        </ol>\n       \n        <button (click)=\"getTransactions()\">Get Started - Fetch Data</button>\n        <button (click)=\"doList()\">Toggle List</button>\n        <button (click)=\"doTable()\">Toggle Table</button>\n        <button (click)=\"doSummary()\">Toggle Summary</button>\n        <button (click)=\"doBalance()\">Toggle Balance</button>\n        <button (click)=\"doReset()\">Reset View</button>\n\n        <hr>\n        \n        <div *ngIf=\"filterBy\">\n            <h3 >Filtered by: {{filterBy}}</h3>\n            <button (click)=\"getTransactions()\" >Clear</button>\n        </div>\n        \n        <div class=\"container\">\n            \n            <transaction-list *ngIf=\"showList\" \n                [transactions]=\"transactionList\" \n                (onCategoryFilter)=\"filterTransactions($event)\">\n            </transaction-list>\n            \n            <transaction-table *ngIf=\"showTable\" \n                [transactions]=\"transactionList\" \n                (onCategoryFilter)=\"filterTransactions($event)\">\n            </transaction-table>\n            \n            <transaction-balance *ngIf=\"showBalance\" [transactions]=\"transactionList\"></transaction-balance>\n            \n            <transaction-summary *ngIf=\"showSummary\" [transactions]=\"transactionList\"></transaction-summary>\n            \n        </div>\n        \n    </div>\n    "
        }), 
        __metadata('design:paramtypes', [index_1.TransactionService])
    ], TransactionsComponent);
    return TransactionsComponent;
}());
exports.TransactionsComponent = TransactionsComponent;
