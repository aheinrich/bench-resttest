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
var TransactionListComponent = (function () {
    function TransactionListComponent() {
        this.onCategoryFilter = new core_1.EventEmitter();
        this.sortModeAsc = true;
    }
    TransactionListComponent.prototype.ngOnInit = function () {
        // Nothing to do?
    };
    TransactionListComponent.prototype.total = function () {
        var total = 0;
        this.transactions.forEach(function (t) {
            total = total + t.amount;
        });
        return total;
    };
    Object.defineProperty(TransactionListComponent.prototype, "totalAsDollars", {
        get: function () {
            return this.total() / 100;
        },
        enumerable: true,
        configurable: true
    });
    TransactionListComponent.prototype.applySort = function (key) {
        this.sorting = this.sortModeAsc ? "+" + key : "-" + key;
        this.sortModeAsc = !this.sortModeAsc;
    };
    TransactionListComponent.prototype.applyFilter = function (ledger) {
        this.onCategoryFilter.emit({
            ledger: ledger
        });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], TransactionListComponent.prototype, "transactions", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], TransactionListComponent.prototype, "sorting", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], TransactionListComponent.prototype, "onCategoryFilter", void 0);
    TransactionListComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: "transaction-list",
            pipes: [index_1.CurrencyPipe, index_1.SortingPipe],
            template: "\n    <div class=\"box\">\n        <h3>Total: {{ totalAsDollars | basicCurrency }} </h3>\n        \n        <ng-content></ng-content>\n        \n        <div>\n            <button (click)=\"applySort('date')\">Date</button>\n            <button (click)=\"applySort('amount')\">Amount</button>\n            <button (click)=\"applySort('company')\">Company</button>\n            <button (click)=\"applySort('ledger')\">Ledger</button>\n        </div>        \n        <ul>\n            <li *ngFor=\"let t of transactions | sortBy : sorting\">\n                {{ t.date | date }}\n                [<b (click)=\"applyFilter(t.ledger)\"> {{ t.ledger }} </b>]\n                {{ t.company }}\n                {{ t.amountInDollars | basicCurrency }}\n                \n            </li>\n        </ul>\n    </div>\n    "
        }), 
        __metadata('design:paramtypes', [])
    ], TransactionListComponent);
    return TransactionListComponent;
}());
exports.TransactionListComponent = TransactionListComponent;
