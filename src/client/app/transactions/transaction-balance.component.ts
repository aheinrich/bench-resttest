import { Component, OnInit, Input } from "@angular/core";

import { Transaction, Utilities, ITransactionGroup, CurrencyPipe } from "./index";

@Component({
    moduleId: module.id,
    selector: "transaction-balance",
    pipes: [CurrencyPipe],
    template: `
    <div class="panel panel-default">
        <div class="panel-heading">Daily Totals</div>
        <div class="panel-body">
            <p>Current Balance: </p>
        </div>
        <ul class="list-group">
            <li class="list-group-item" *ngFor="let group of dailyTotals">
                <div class="list-group">
                    <h4 class="list-group-item-heading">{{ group.date | date }}</h4>
                    <p class="list-group-item-text">
                        Expenses: {{ group.total | basicCurrency : "dollars" }}
                    </p>                
                    <p class="list-group-item-text">
                        Balance: {{ group.balance | basicCurrency : "dollars" }}
                    </p>
                </div>
            </li>
        </ul>
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
