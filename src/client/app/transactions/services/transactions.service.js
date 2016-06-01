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
var http_1 = require("@angular/http");
var Rx_1 = require("rxjs/Rx");
var transactions_models_1 = require("../models/transactions.models");
var _ = require("lodash");
var TransactionService = (function () {
    function TransactionService(http) {
        this.http = http;
        this.serviceUrl = "http://10.3.37.68:8088/";
        this.endPoint = "transactions/";
        this.transactionList = [];
        this.isReady = false;
    }
    /**
     * getPageRequest()
     *
     * Create an observable stream that fetches data from the remote source
     *  - Will retry 3 times on error
     *  - Maps the resulting Response from JSON to object
     */
    TransactionService.prototype.getPageRequest = function (pageNumber) {
        return this.http.get(this.serviceUrl + this.endPoint + pageNumber.toString(10) + ".json")
            .retryWhen(function (attempts) {
            return Rx_1.Observable
                .range(1, 3)
                .zip(attempts, function (i) {
                return i;
            })
                .flatMap(function (i) {
                console.log("...delay retry by " + i + " second(s)");
                return Rx_1.Observable.timer(i * 1000);
            });
        })
            .map(function (response) {
            return response.json();
        });
    };
    TransactionService.prototype.backoffRetry = function () {
        // return
        // return retryWhen((attempts:any) => {
        //     return Observable
        //         .range(1, 3)
        //         .zip(attempts, (i) => { 
        //             return i; 
        //         })
        //         .flatMap( (i) => {
        //             console.log("...delay retry by " + i + " second(s)")
        //             return Observable.timer(i * 1000);
        //         })
        // })
    };
    /**
     * getAllTransactions()
     *
     *  Creates an observable that will emit arrays of transactions
     *
     *  1. Fetches the first page from the server
     *  2. Calculates the number of requests needed to retrieve all transactions
     *  3. Creates an observable stream from an range based on the number of requests required
     *
     */
    TransactionService.prototype.getAllTransactions = function () {
        var _this = this;
        return Rx_1.Observable.create(function (results) {
            var startingPage = 1;
            // This is our first page of data. It is *not* requests at this point... 
            var firstPageStream = _this.getPageRequest(startingPage);
            // Generate Request Handler
            var generateRequests = function (numberOfRequests) {
                var requestStream = Rx_1.Observable
                    .range(startingPage + 1, numberOfRequests - 1)
                    .flatMap(function (pageNumber) {
                    return _this.getPageRequest(pageNumber);
                });
                requestStream.subscribe(
                // On Value
                function (benchData) {
                    results.next(benchData.transactions);
                }, 
                // On Error
                function (error) {
                    console.log("Unable to execute request for additional remote resources");
                    results.error(error);
                }, 
                // On Complete
                function () {
                    results.complete();
                });
            };
            // Error Handler
            var handleError = function (error) {
                console.log("Unable to complete...");
                results.error(error);
            };
            // Get the first page of data
            var requestStream = firstPageStream.map(function (benchData) {
                // Emit the first set of results
                results.next(benchData.transactions);
                // Return the number of requests needed
                return Math.round(benchData.totalCount / benchData.transactions.length);
            });
            // Fire EVERYTHING! This is the first observable to actually call subscribe, and it kicks off 
            // the whole chain of subscriptions
            requestStream.subscribe(
            // Pass the number of requests to a function that will generate the next stream of 
            // requests 
            function (numberOfRequests) { return generateRequests(numberOfRequests); }, 
            // Handle any error
            function (err) { return handleError(err); }, function () {
                console.log("Finished");
            });
        });
    };
    /**
     *
     */
    TransactionService.prototype.fetchTransactions = function () {
        var _this = this;
        if (this.isReady && this.transactionList) {
            return new Promise(function (res, rej) { return res(_this.transactionList); });
        }
        else {
            return new Promise(function (resolve, reject) {
                var handleData = function (data) {
                    _this.transactionList = data.concat(_this.transactionList);
                };
                var catchErrors = function (err) {
                    reject(err);
                };
                var finalize = function () {
                    //let count = this.transactionList.length
                    _this.transactionList = _.uniqWith(_this.transactionList, _.isEqual);
                    //console.log(`Number of duplicates: ${ count - this.transactionList.length}`)
                    _this.isReady = true;
                    resolve(_this.transactionList);
                };
                _this.getAllTransactions().map(function (transactionList) {
                    return transactionList.map(function (t) {
                        return transactions_models_1.Transaction.fromJSON(t);
                    });
                })
                    .subscribe(function (data) { return handleData(data); }, function (error) { return catchErrors(error); }, function () { return finalize(); });
            });
        }
    };
    /**
     * filterByLedger()
     *
     */
    TransactionService.prototype.filterByLedger = function (transactionList, ledger) {
        return transactionList.filter(function (t) {
            return t.ledger === ledger ? true : false;
        });
    };
    /**
     * summarizeByDate()
     *
     */
    TransactionService.prototype.summarizeByDate = function (transactionList) {
        // First, group the transactions by their date. This will return a collection of dates with an array of Transactions 
        // as the only property
        var groupByTimestamp = _.groupBy(transactionList, "dateTimestamp");
        // With this collection, I need to total each array, so start by mapping over the dates
        return Object.keys(groupByTimestamp).map(function (dateTimestamp) {
            // Use reduce to iterate over items and sum up the totals. To do this, I also need to simplify the Transaction object
            // down to the amount, as that"s the only value I need. I map over the transactions, returning only the amount, and 
            // then run reduce over the results. That gives me the total
            var dailyTotal = _.reduce(groupByTimestamp[dateTimestamp].map(function (t) { return t.amount; }), function (sum, n) {
                return sum + n;
            }, 0);
            // Now, I want the total in ADDITION to the transactions that were used in the accumulator. Requirements don"t 
            // specifically call for this, but ... show your work. Plus, might make for nicer summary?
            return {
                date: new Date(Number.parseInt(dateTimestamp)),
                total: dailyTotal,
                totalInDollars: dailyTotal / 100,
                transactions: groupByTimestamp[dateTimestamp]
            };
        });
    };
    TransactionService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], TransactionService);
    return TransactionService;
}());
exports.TransactionService = TransactionService;
