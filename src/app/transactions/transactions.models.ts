export interface IRawTransaction {
    "Date": string,
    "Ledger": string,
    "Amount": string,
    "Company": string
}

export class Transaction {

    source: IRawTransaction;
    
    static fromJSON(data:IRawTransaction) {
        let t = new Transaction()
        t.source = data;
        return t
    }
    
    constructor() {}
    
    get date(){
        return this.source.Date
    }
    
    get ledger(){
        return this.source.Ledger
    }
    
    get amount(){
        return Number.parseFloat(this.source.Amount) * 100
    }
    
    get amountInDollars(){
        return this.amount / 100
    }
    
    get company(){
        return this.source.Company
    }
    
    hasCreditCard(){
        
    }

}