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
var TransactionBalanceComponent = (function () {
    function TransactionBalanceComponent() {
        this.startingBalance = 0;
        // Nothing to do
    }
    TransactionBalanceComponent.prototype.ngOnInit = function () {
        this.dailyTotals = this.calculateDailyBalance();
    };
    /**
     * calculateDailyBalance()
     *
     */
    TransactionBalanceComponent.prototype.calculateDailyBalance = function () {
        var _this = this;
        var results;
        var dailyTotals = index_1.Utilities.calculateDailyTotals(this.transactions);
        // Sort by Date
        results = dailyTotals.sort(function (a, b) {
            return a.date > b.date ? 1 : -1;
        })
            .map(function (current, i, group) {
            if (i === 0) {
                current.balance = _this.startingBalance + current.total;
            }
            else {
                current.balance = group[i - 1].balance + current.total;
            }
            return current;
        });
        return results;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], TransactionBalanceComponent.prototype, "transactions", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], TransactionBalanceComponent.prototype, "startingBalance", void 0);
    TransactionBalanceComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: "transaction-balance",
            pipes: [index_1.CurrencyPipe],
            template: "\n    <div>\n        <table>\n            <tr>\n                <th>Date</th>\n                <th>Total</th>\n                <th>Balance</th>\n            </tr>\n            <tr *ngFor=\"let group of dailyTotals\">\n                <td> {{ group.date | date }} </td>\n                <td> {{ group.total | basicCurrency : \"dollars\" }} </td>\n                <td> {{ group.balance | basicCurrency : \"dollars\" }} </td>\n            </tr>\n        </table>\n    </div>\n    "
        }), 
        __metadata('design:paramtypes', [])
    ], TransactionBalanceComponent);
    return TransactionBalanceComponent;
}());
exports.TransactionBalanceComponent = TransactionBalanceComponent;
