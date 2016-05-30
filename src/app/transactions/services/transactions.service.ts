import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { Observable } from "rxjs/Rx";
import { Transaction, IRawTransaction } from "../models/transactions.models";
import * as _ from "lodash";

interface ITransactionResponse {
    totalCount: number;
    page: string;
    transactions: IRawTransaction[];
}

@Injectable()
export class TransactionService {

    transactionList: Transaction[];
    ledgerCache: string[];
    isReady: boolean;
    serviceUrl: string;

    constructor(private http: Http) {
        this.serviceUrl = "http://localhost:8000/";
        this.transactionList = [];
        this.isReady = false;
    }

    getAllTransactions(): Observable<any> {
        let fetchAll = Observable.range(1, 4).flatMap(pageNumber => {
            return this.http.get(this.serviceUrl + "transactions/" + pageNumber + ".json").map(response => {
                return response.json();
            });
        });
        return fetchAll;
    }

    /**
     * 
     */
    fetchTransactions() {
        if (this.isReady && this.transactionList) {
            return new Promise((res, rej) => res(this.transactionList));
        } else {
            return new Promise((resolve, reject) => {

                let handleData = (data: Transaction[]) => {
                    this.transactionList = data.concat(this.transactionList);
                };

                let catchErrors = (err: any) => {
                    reject(err);
                };

                let finalize = () => {
                    //let count = this.transactionList.length

                    this.transactionList = _.uniqWith(this.transactionList, _.isEqual);
                    //console.log(`Number of duplicates: ${ count - this.transactionList.length}`)

                    this.isReady = true;
                    resolve(this.transactionList);
                };

                this.getAllTransactions().map((response: ITransactionResponse) => {
                    return response.transactions.map((t: IRawTransaction) => {
                        return Transaction.fromJSON(t);
                    });
                }).subscribe(
                    (data: Transaction[]) => handleData(data),
                    (error: any) => catchErrors(error),
                    () => finalize()
                    );
            });
        }
    }

    /**
     * filterByLedger()
     * 
     */
    filterByLedger(transactionList: Transaction[], ledger: string): Transaction[] {
        return transactionList.filter((t: Transaction) => {
            return t.ledger === ledger ? true : false;
        });
    }

    /**
     * summarizeByDate()
     * 
     */
    summarizeByDate(transactionList: Transaction[]): Array<{ date: any, total: number, transactions: Transaction[] }> {

        // First, group the transactions by their date. This will return a collection of dates with an array of Transactions 
        // as the only property
        let groupByTimestamp: _.Dictionary<any> = _.groupBy(transactionList, "dateTimestamp");

        // With this collection, I need to total each array, so start by mapping over the dates
        return Object.keys(groupByTimestamp).map(dateTimestamp => {

            // Use reduce to iterate over items and sum up the totals. To do this, I also need to simplify the Transaction object
            // down to the amount, as that"s the only value I need. I map over the transactions, returning only the amount, and 
            // then run reduce over the results. That gives me the total
            let dailyTotal = _.reduce(groupByTimestamp[dateTimestamp].map((t: Transaction) => t.amount), (sum: number, n: number) => {
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
    }

}
