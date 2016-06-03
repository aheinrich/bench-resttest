import { Component, OnInit, Input } from "@angular/core";

import { Transaction, Utilities, ITransactionGroup, CurrencyPipe } from "./index";

@Component({
    moduleId: module.id,
    selector: "transaction-balance",
    pipes: [CurrencyPipe],
    template: `
    <ul class="list-group">
        <li class="list-group-item" *ngFor="let group of dailyTotals">
        
            <div class="list-group">
                <h4 class="list-group-item-heading pull-right">
                    <i class="fa fa-usd fa-lg bt-currency" aria-hidden="true"></i>
                    {{ group.balance | basicCurrency : "dollars" }}
                </h4>
                <h4 class="list-group-item-heading">{{ group.date | date : "fullDate" }}</h4>
                <p class="list-group-item-text">
                    Number of Transactions: {{ group.transactions.length }}
                </p>
                <ul>
                    <li *ngFor="let t of group.transactions"> {{t.company}}</li>
                </ul>
                <p class="list-group-item-text">
                    Daily Total: {{ group.total | basicCurrency : "dollars" }}
                </p>
            </div>
            
        </li>
    </ul>
    
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
