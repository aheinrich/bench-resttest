"use strict";
var moment = require("moment");
/**
 * Transaction
 *
 */
var Transaction = (function () {
    // Use Transaction.fromJSON() instead
    function Transaction() {
        // Nothing to do here...
    }
    /**
     * Generator
     */
    Transaction.fromJSON = function (data) {
        var t = new Transaction();
        t.source = data;
        // Validation
        if (!moment(t.source.Date).isValid()) {
            throw Error("Please verify the Date provided is in an acceptable format...");
        }
        return t;
    };
    Object.defineProperty(Transaction.prototype, "amount", {
        /**
         * Transaction.amount
         *
         * Getter: provides the value of the Transaction in a numeric format.
         */
        get: function () {
            if (!this._value) {
                // Need to convert string to number; Dont want to introduce floating point calculation on 
                // fraction of currency. 
                try {
                    var decimal = this.source.Amount.indexOf(".");
                    if (decimal === -1) {
                        // There is no decimal in the value
                        this._value = Number.parseInt(this.source.Amount) * 100;
                    }
                    else {
                        // Super hacky, and pretty much garbage. Re-write this (!!)
                        var fractions = (this.source.Amount.length - decimal - 1);
                        if (fractions === 2) {
                            this._value = Number.parseInt(this.source.Amount.replace(".", ""));
                        }
                        else if (fractions === 1) {
                            this._value = Number.parseInt(this.source.Amount.replace(".", "")) * 10;
                        }
                    }
                }
                catch (err) {
                    throw err;
                }
            }
            return this._value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Transaction.prototype, "amountInDollars", {
        /**
         * Transaction.amountInDollars
         *
         * Getter: provides the value of the Transaction in numeric format, converted to a fraction (dollars)
         */
        get: function () {
            return this.amount / 100;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Transaction.prototype, "ledger", {
        /**
         * Transaction.ledger
         *
         * Getter: provides the category of the Transaction
         */
        get: function () {
            return this.source.Ledger;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Transaction.prototype, "date", {
        /**
         * Transaction.date
         *
         * Getter: provides the date of the Transaction
         */
        get: function () {
            if (!this._date) {
                try {
                    var m = moment(this.source.Date, "YYYY-MM-DD");
                    this._date = m.toDate();
                }
                catch (err) {
                    throw err;
                }
            }
            return this._date;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Transaction.prototype, "dateTimestamp", {
        /**
         * Transaction.date
         */
        get: function () {
            return Number.parseInt(moment(this.date).format("x"));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Transaction.prototype, "company", {
        /**
         * Transaction.company
         */
        get: function () {
            if (!this._company) {
                this._company = this.sanitizeCompany(this.source.Company);
            }
            return this._company;
        },
        enumerable: true,
        configurable: true
    });
    Transaction.prototype.dateAsFormat = function (format) {
        return moment(this.date).format(format);
    };
    /**
     * sanitizeCompany()
     *
     * Used to cleanup company description, remove garbage
     */
    Transaction.prototype.sanitizeCompany = function (source) {
        var match;
        // Creditcard match
        match = new RegExp("(x{4,})").exec(source);
        if (match) {
            return source.slice(0, match.index);
        }
        // City-Provice location match
        match = /^(.*)\s+(\w*)\s+(AB|BC|MB|NB|NL|NT|NS|NU|ON|PE|QC|SK|YT)$/.exec(source);
        if (match) {
            return match[1];
        }
        // Payment
        match = /^(.*)PAYMENT(.*)$/.exec(source);
        if (match) {
            return "PAYMENT";
        }
        // Unable to find a suitable match to cleanup
        return source;
    };
    return Transaction;
}());
exports.Transaction = Transaction;
