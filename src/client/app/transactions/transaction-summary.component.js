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
var TransactionSummaryComponent = (function () {
    function TransactionSummaryComponent() {
        // Nothing to do
    }
    TransactionSummaryComponent.prototype.ngOnInit = function () {
        // Nothing to do
    };
    Object.defineProperty(TransactionSummaryComponent.prototype, "summaryList", {
        get: function () {
            return index_1.Utilities.calculateDailyTotals(this.transactions);
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], TransactionSummaryComponent.prototype, "transactions", void 0);
    TransactionSummaryComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: "transaction-summary",
            pipes: [index_1.SortingPipe, index_1.CurrencyPipe],
            template: "\n    <div class=\"box\">\n        <table>\n            <tr>\n                <th>Date</th>\n                <th>Total</th>\n            </tr>\n            <tr *ngFor=\"let s of summaryList | sortBy : 'date' \">\n                <td> {{ s.date | date }} </td>\n                <td> {{ s.total | basicCurrency : \"dollars\" }} </td>\n            </tr>\n        </table>\n    </div>\n    "
        }), 
        __metadata('design:paramtypes', [])
    ], TransactionSummaryComponent);
    return TransactionSummaryComponent;
}());
exports.TransactionSummaryComponent = TransactionSummaryComponent;
