"use strict";
var _ = require("lodash");
var Utilities = (function () {
    function Utilities() {
    }
    /**
     *
     */
    Utilities.calculateDailyTotals = function (transactionList) {
        var groupByTimestamp = _.groupBy(transactionList, "dateTimestamp");
        return Object.keys(groupByTimestamp).map(function (dateTimestamp) {
            var dailyTotal = _.reduce(groupByTimestamp[dateTimestamp].map(function (t) { return t.amount; }), function (sum, n) {
                return sum + n;
            }, 0);
            return {
                date: new Date(Number.parseInt(dateTimestamp)),
                total: dailyTotal,
                balance: 0,
                transactions: groupByTimestamp[dateTimestamp]
            };
        });
    };
    return Utilities;
}());
exports.Utilities = Utilities;
