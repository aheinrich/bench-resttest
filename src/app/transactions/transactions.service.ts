import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Transaction, IRawTransaction } from './transactions.models'

interface ITransactionResponse {
    totalCount:number;
    page: string;
    transactions: IRawTransaction[]
}

@Injectable()
export class TransactionService {

    serviceUrl: string;

    constructor(private http: Http) {
        this.serviceUrl = "http://localhost:8000/"
    }
    
    getAllTransactions(){
        let transactionList:Array<any> = []
        
        let fetchAll = Observable.range(1, 4).flatMap(pageNumber => {
            return this.http.get(this.serviceUrl + "transactions/" + pageNumber + ".json").map(response => {
                return response.json()
            })
        })
       
        return fetchAll
    }
    
    getTransactions() {
        return this.getAllTransactions().map( (response:ITransactionResponse) => {
            return response.transactions.map( (t:IRawTransaction) => {
                return Transaction.fromJSON(t)
            })
        })
    }


    
    // getTransactionCount(){
    //     return this.http.get(this.serviceUrl + "transactions/" + "1.json").map(response => {
    //         return response.json().totalCount
    //     })
    // }

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