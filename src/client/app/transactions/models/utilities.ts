import {Transaction} from "./transactions.models";
import * as _ from "lodash";

export interface ITransactionGroup {
    date: Date;
    total: number;
    balance: number;
    transactions: Transaction[];
}

export class Utilities {

    /**
     * 
     */
    static calculateDailyTotals(transactionList: Transaction[]): ITransactionGroup[] {
        let groupByTimestamp: _.Dictionary<any> = _.groupBy(transactionList, "dateTimestamp");

        return Object.keys(groupByTimestamp).map(dateTimestamp => {
            let dailyTotal = _.reduce(groupByTimestamp[dateTimestamp].map( (t:Transaction) => t.amount), (sum:number ,n:number) => {
                return sum+n;
            }, 0);
            return {
                date: new Date(Number.parseInt(dateTimestamp)),
                total: dailyTotal,
                balance: 0,
                transactions: groupByTimestamp[dateTimestamp]
            };
        });
    }
}
