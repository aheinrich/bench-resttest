export interface IRawTransaction {
    "Date": string,
    "Ledger": string,
    "Amount": string,
    "Company": string
}

export class Transaction {
    
    // static creditCardMatchPattern = new RegExp("(x{4,}\d{4}.*)").compile()
    // static provinceLocationMatchPattern = new RegExp("\s(\w*)\s(AB|BC|MB|NB|NL|NT|NS|NU|ON|PE|QC|SK|YT)$")

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
        // return this.companyClean
    }
    
    get companyClean(){ 
        
        // Creditcard match
        let match = new RegExp("(x{4,})").exec(this.source.Company)
        if (match){
            return this.source.Company.slice(0, match.index)
        }
        
        match = new RegExp("(AB|BC|MB|NB|NL|NT|NS|NU|ON|PE|QC|SK|YT)$").exec(this.source.Company)
        if (match){
            console.log(/\s+(\w*)\s+(AB|BC|MB|NB|NL|NT|NS|NU|ON|PE|QC|SK|YT)$/.exec(this.source.Company))
            return this.source.Company.slice(0, match.index)
        }
        
        
        // Location Match
        // let stringTest = this.source.Company.toLowerCase()
        // let match = new RegExp("(.*)(vancouver)").exec(stringTest)
        // console.log(match)

        return this.source.Company
    }
    
    
}
//         console.log(stringTest.match("\s(\w*)\s(AB|BC|MB|NB|NL|NT|NS|NU|ON|PE|QC|SK|YT)$"))

// let creditCardMatchPattern = "(x{4,}\d{4}.*)"
// let provinceLocationMatchPattern = "\s(\w*)\s(AB|BC|MB|NB|NL|NT|NS|NU|ON|PE|QC|SK|YT)$"
