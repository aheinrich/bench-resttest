import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { Observable, Observer } from "rxjs/Rx";
import { Transaction, IRawTransaction } from "../models/transactions.models";
import * as _ from "lodash";

interface IBenchData {
    totalCount: number
    page: number
    transactions: Array<any>
}

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
    endPoint: string;

    constructor(private http: Http) {
        this.serviceUrl = "http://localhost:8000/";
        this.endPoint = "";
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
    getPageRequest(pageNumber: number): Observable<IBenchData> {
        return this.http.get(this.serviceUrl + this.endPoint + pageNumber.toString(10) + ".json")
        // .retry(3)
        .retryWhen((attempts:any) => {
            return Observable
                .range(1, 3)
                .zip(attempts, (i) => { 
                    return i; 
                })
                .flatMap( (i) => {
                    console.log("...delay retry by " + i + " second(s)")
                    return Observable.timer(i * 1000);
                })
        })
        // .catch((e) => {
        //     console.log(e)
        //     return e
        // })
        .map(response => {
            return response.json();
        });
    }

    backoffRetry() {
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
    }
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
    getAllTransactions(): Observable<Transaction[]> {
        return Observable.create((results: Observer<Transaction[]>) => {


            let startingPage: number = 1
            
            // This is our first page of data. It is *not* requests at this point... 
            let firstPageStream = this.getPageRequest(startingPage)

            // Generate Request Handler
            let generateRequests = (numberOfRequests: number) => {
                let requestStream = Observable
                    .range(startingPage + 1, numberOfRequests - 1)
                    .flatMap(pageNumber => {
                        return this.getPageRequest(pageNumber);
                    })

                requestStream.subscribe(
                    // On Value
                    (benchData: IBenchData) => {
                        results.next(benchData.transactions)
                    },
                    // On Error
                    (error: any) => {
                        console.log("Unable to execute request for additional remote resources")
                        results.error(error)
                    },
                    // On Complete
                    () => {
                        results.complete()
                    })
            }

            // Error Handler
            let handleError = (error: any) => {
                console.log("Unable to complete...")
                results.error(error)
            }

            // Get the first page of data
            let requestStream = firstPageStream.map((benchData) => {
                // Emit the first set of results
                results.next(benchData.transactions)
                // Return the number of requests needed
                return Math.round(benchData.totalCount / benchData.transactions.length)
            })
            
            // Fire EVERYTHING! This is the first observable to actually call subscribe, and it kicks off 
            // the whole chain of subscriptions
            requestStream.subscribe(
                // Pass the number of requests to a function that will generate the next stream of 
                // requests 
                (numberOfRequests: number) => generateRequests(numberOfRequests),
                // Handle any error
                (err: any) => handleError(err),
                () => {
                    console.log("Finished")
                }
            )
            
        })
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

                this.getAllTransactions().map((transactionList: Array<any>) => {
                    return transactionList.map((t: IRawTransaction) => {
                        return Transaction.fromJSON(t);
                    });
                })
                    .subscribe(
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
