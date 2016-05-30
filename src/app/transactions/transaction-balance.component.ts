import { Component, OnInit, Input } from "@angular/core";

import { Transaction, Utilities, ITransactionGroup, CurrencyPipe } from "./index";

@Component({
    moduleId: module.id,
    selector: "transaction-balance",
    pipes: [CurrencyPipe],
    template: `
    <div>
        <table>
            <tr>
                <th>Date</th>
                <th>Total</th>
                <th>Balance</th>
            </tr>
            <tr *ngFor="let group of dailyTotals">
                <td> {{ group.date | date }} </td>
                <td> {{ group.total | basicCurrency : "dollars" }} </td>
                <td> {{ group.balance | basicCurrency : "dollars" }} </td>
            </tr>
        </table>
    </div>
    `
})
export class TransactionBalanceComponent implements OnInit {
    @Input() transactions: Transaction[];
    @Input() startingBalance: number = 0;

    dailyTotals: ITransactionGroup[];

    constructor() {
        // Nothing to do
    }

    ngOnInit() {
        this.dailyTotals = this.calculateDailyBalance();
    }

    /**
     * calculateDailyBalance()
     * 
     */
    calculateDailyBalance() {
        let results: ITransactionGroup[];
        let dailyTotals: ITransactionGroup[] = Utilities.calculateDailyTotals(this.transactions);

        // Sort by Date
        results = dailyTotals.sort((a, b) => {
            return a.date > b.date ? 1 : -1;
        })
            // Calculate balance
            .map((current: ITransactionGroup, i: number, group: ITransactionGroup[]) => {
                if (i === 0) {
                    current.balance = this.startingBalance + current.total;
                } else {
                    current.balance = group[i - 1].balance + current.total;
                }
                return current;
            });

        return results;
    }
}
