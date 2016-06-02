import * as moment from "moment";

export interface IRawTransaction {
    "Date": string;
    "Ledger": string;
    "Amount": string;
    "Company": string;
}

/**
 * Transaction
 * 
 */
export class Transaction {

    // Raw data, as provided. Not externally accessable
    private source: IRawTransaction;
    private _date: Date;
    private _value: number;
    private _company: string;
    private _ledger: string;

    /**
     * Generator
     */
    static fromJSON(data: IRawTransaction) {
        let t = new Transaction();
        t.source = data;

        // Validation
        if (!moment(t.source.Date).isValid()) {
            throw Error("Please verify the Date provided is in an acceptable format...");
        }

        return t;
    }

    // Use Transaction.fromJSON() instead
    constructor() {
        // Nothing to do here...
    }

    /**
     * Transaction.amount
     * 
     * Getter: provides the value of the Transaction in a numeric format. 
     */
    get amount(): number {
        if (!this._value) {

            // Need to convert string to number; Dont want to introduce floating point calculation on 
            // fraction of currency. 
            try {
                let decimal = this.source.Amount.indexOf(".");

                if (decimal === -1) {
                    // There is no decimal in the value
                    this._value = Number.parseInt(this.source.Amount) * 100;
                } else {
                    // Super hacky, and pretty much garbage. Re-write this (!!)
                    let fractions = (this.source.Amount.length - decimal - 1);
                    if (fractions === 2) {
                        this._value = Number.parseInt(this.source.Amount.replace(".", ""));
                    } else if (fractions === 1) {
                        this._value = Number.parseInt(this.source.Amount.replace(".", "")) * 10;
                    }
                }
            } catch (err) {
                throw err;
            }
        }
        return this._value;
    }

    /**
     * Transaction.amountInDollars
     * 
     * Getter: provides the value of the Transaction in numeric format, converted to a fraction (dollars)
     */
    get amountInDollars(): number {
        return this.amount / 100;
    }

    /**
     * Transaction.ledger
     * 
     * Getter: provides the category of the Transaction
     */
    get ledger(): string {
        if (!this._ledger){
            this._ledger = this.source.Ledger == "" ? "N/A" : this.source.Ledger  
        } 
        return this._ledger;
    }

    /**
     * Transaction.date
     * 
     * Getter: provides the date of the Transaction
     */
    get date(): Date {
        if (!this._date) {
            try {
                let m = moment(this.source.Date, "YYYY-MM-DD");
                this._date = m.toDate();
            } catch (err) {
                throw err;
            }
        }
        return this._date;
    }

    /**
     * Transaction.date
     */
    get dateTimestamp(): number {
        return Number.parseInt(moment(this.date).format("x"));
    }

    /**
     * Transaction.company
     */
    get company(): string {
        if (!this._company) {
            this._company = this.sanitizeCompany(this.source.Company);
        }
        return this._company;
    }


    dateAsFormat(format: string): string {
        return moment(this.date).format(format);
    }

    /**
     * sanitizeCompany()
     * 
     * Used to cleanup company description, remove garbage
     */
    private sanitizeCompany(source: string): string {
        let match: RegExpExecArray;

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
    }

}
