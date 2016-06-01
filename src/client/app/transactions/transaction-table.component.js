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
var TransactionTableComponent = (function () {
    function TransactionTableComponent() {
        this.onCategoryFilter = new core_1.EventEmitter();
        this.sortModeAsc = true;
    }
    TransactionTableComponent.prototype.ngOnInit = function () {
        // Nothing to do
    };
    TransactionTableComponent.prototype.total = function () {
        var total = 0;
        this.transactions.forEach(function (t) {
            total = total + t.amount;
        });
        return total;
    };
    Object.defineProperty(TransactionTableComponent.prototype, "totalAsDollars", {
        get: function () {
            return this.total() / 100;
        },
        enumerable: true,
        configurable: true
    });
    TransactionTableComponent.prototype.applySort = function (key) {
        this.sorting = this.sortModeAsc ? "+" + key : "-" + key;
        this.sortModeAsc = !this.sortModeAsc;
    };
    TransactionTableComponent.prototype.applyFilter = function (ledger) {
        this.onCategoryFilter.emit({
            ledger: ledger
        });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], TransactionTableComponent.prototype, "transactions", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], TransactionTableComponent.prototype, "sorting", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], TransactionTableComponent.prototype, "onCategoryFilter", void 0);
    TransactionTableComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: "transaction-table",
            pipes: [index_1.CurrencyPipe, index_1.SortingPipe],
            template: "\n    <div class=\"box\">\n        <h3>Total: {{ totalAsDollars | basicCurrency }} </h3>\n        <table>\n            <thead>\n                <tr>\n                    <th (click)=\"applySort('date')\">Date</th>\n                    <th (click)=\"applySort('company')\">Company</th>\n                    <th (click)=\"applySort('ledger')\">Ledger</th>\n                    <th (click)=\"applySort('amount')\">Amount</th>\n                </tr>\n            </thead>\n            \n            <tbody>\n                <tr *ngFor=\"let t of transactions | sortBy : sorting\">\n                    <td>{{t.date | date}}</td>\n                    <td>{{t.company }}</td>\n                    <td (click)=\"applyFilter(t.ledger)\"> <b> {{t.ledger }} </b> </td>\n                    <td>{{t.amountInDollars }}</td>\n                </tr>\n            </tbody>\n        </table>\n    </div>"
        }), 
        __metadata('design:paramtypes', [])
    ], TransactionTableComponent);
    return TransactionTableComponent;
}());
exports.TransactionTableComponent = TransactionTableComponent;
