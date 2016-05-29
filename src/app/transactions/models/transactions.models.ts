import * as moment from 'moment';

export interface IRawTransaction {
    "Date": string,
    "Ledger": string,
    "Amount": string,
    "Company": string
}

export class Transaction {

    // static creditCardMatchPattern = new RegExp("(x{4,}\d{4}.*)").compile()
    // static provinceLocationMatchPattern = new RegExp("\s(\w*)\s(AB|BC|MB|NB|NL|NT|NS|NU|ON|PE|QC|SK|YT)$")

    private source: IRawTransaction;
    private _date: Date;
    private _value: number;
    private _company: string;

    /**
     * Generator
     */
    static fromJSON(data: IRawTransaction) {
        let t = new Transaction()
        t.source = data;
        return t
    }

    // Use Transaction.fromJSON() instead
    constructor() { }

    /**
     * Transaction.amount
     */
    get amount(): number {
        if (!this._value) {

            // Need to convert string to number; Dont want to introduce floating point calculation on 
            // fraction of currency. 
            //
            try {
                let decimal = this.source.Amount.indexOf(".")
                
                // There is no decimal in the value
                if (decimal == -1){
                    this._value = Number.parseInt(this.source.Amount) * 100
                } 
                // Super hacky, and pretty much garbage. Re-write this (!!)
                else {
                    let fractions = (this.source.Amount.length - decimal - 1)
                    if (fractions == 2){
                        this._value = Number.parseInt(this.source.Amount.replace(".", ""))
                    } else if (fractions == 1) {
                        this._value = Number.parseInt(this.source.Amount.replace(".", "")) * 10
                    }
                }
            } catch (err) {
                throw err
            }

        }
        return this._value
    }

    /**
     * Transaction.amountInDollars
     */
    get amountInDollars(): number {
        return this.amount / 100
    }

    /**
     * Transaction.ledger
     */
    get ledger() : string {
        return this.source.Ledger
    }

    /**
     * Transaction.date
     */
    get date(): Date {
        if (!this._date) {
            try {
                let m = moment(this.source.Date, "YYYY-MM-DD")
                this._date = m.toDate()
            } catch (err) {
                throw err
            }
        }
        return this._date
    }
    
    /**
     * Transaction.date
     */
    get dateTimestamp():number {
        return Number.parseInt(moment(this.date).format("x"))
    }

    /**
     * Transaction.company
     */
    get company(): string {
        if (!this._company) {
            this._company = this.sanitizeCompany(this.source.Company)
        }
        return this._company
    }


    /**
     * sanitizeCompany()
     * 
     * Used to cleanup company description, remove garbage
     */
    private sanitizeCompany(source: string): string {
        let match: RegExpExecArray

        // Creditcard match
        match = new RegExp("(x{4,})").exec(source)
        if (match) {
            return source.slice(0, match.index)
        }

        // City-Provice location match
        match = /^(.*)\s+(\w*)\s+(AB|BC|MB|NB|NL|NT|NS|NU|ON|PE|QC|SK|YT)$/.exec(source)
        if (match) {
            return match[1]
        }

        // Unable to find a suitable match to cleanup
        return source
    }
    
    dateAsFormat(format:string):string{
        return moment(this.date).format(format)
    }


}


class Balance {
    startingBalance: number;
}