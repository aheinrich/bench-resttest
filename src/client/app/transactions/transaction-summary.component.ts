import { Component, OnInit, Input} from "@angular/core";

import { Transaction, Utilities, CurrencyPipe, SortingPipe } from "./index";

@Component({
    moduleId: module.id,
    selector: "transaction-summary",
    pipes: [SortingPipe, CurrencyPipe],
    template: `
    <table class="table">
        <thead>
            <tr>
                <th>Date</th>
                <th>Number of Transactions</th>
                <th>Total</th>
            </tr>
        </thead>
        
        <tbody>
            <tr *ngFor="let s of summaryList | sortBy : 'date' ">
                <td> {{ s.date | date }} </td>
                <td> {{ s.transactions.length  }} </td>
                <td> {{ s.total | basicCurrency : "dollars" }} </td>
            </tr>
        </tbody>
    </table>
    `
})
export class TransactionSummaryComponent implements OnInit {

    @Input() transactions: Transaction[];

    constructor() {
        // Nothing to do
    }

    ngOnInit() {
        // Nothing to do
    }

    get summaryList() {
        return Utilities.calculateDailyTotals(this.transactions);
    }
}
