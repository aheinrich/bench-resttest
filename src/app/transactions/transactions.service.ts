import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Transaction, IRawTransaction } from './transactions.models'
import * as lodash from 'lodash';

interface ITransactionResponse {
    totalCount: number;
    page: string;
    transactions: IRawTransaction[]
}

@Injectable()
export class TransactionService {

    transactionList: Transaction[]
    ledgerCache: string[]
    
    isReady:boolean;

    serviceUrl: string;

    constructor(private http: Http) {
        this.serviceUrl = "http://localhost:8000/"
        this.transactionList = []
        this.isReady = false
    }

    getAllTransactions(): Observable<any> {
        let transactionList: Array<any> = []

        let fetchAll = Observable.range(1, 4).flatMap(pageNumber => {
            return this.http.get(this.serviceUrl + "transactions/" + pageNumber + ".json").map(response => {
                return response.json()
            })
        })

        return fetchAll
    }

    fetchTransactions() {
        if (this.isReady && this.transactionList) {
            return new Promise((res, rej) => res(this.transactionList))
        } else {
            return new Promise((resolve, reject) => {
                
                let handleData = (data: Transaction[]) => {
                    this.transactionList = data.concat(this.transactionList)
                }
                
                let catchErrors = (err: any) => {
                    reject(err)
                }
                
                let finalize = () => {
                    let count = this.transactionList.length
                    
                    this.transactionList = lodash.uniqWith(this.transactionList, lodash.isEqual);
                    //console.log(`Number of duplicates: ${ count - this.transactionList.length}`)
                    
                    this.isReady = true
                    resolve(this.transactionList)
                }
                
                this.getAllTransactions().map((response: ITransactionResponse) => {
                    return response.transactions.map((t: IRawTransaction) => {
                        return Transaction.fromJSON(t)
                    })
                }).subscribe(
                    (data: Transaction[]) => handleData(data),
                    (error: any) => catchErrors(error),
                    () => finalize()
                )
            })
        }
    }



    filterByLedger(transactionList: Transaction[], ledger: string): Transaction[] {
        return transactionList.filter((t: Transaction) => {
            return t.ledger === ledger ? true : false
        })
    }

    private extractData(res: Response) {
        return res.json()
    }

    private handleError(error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }

}