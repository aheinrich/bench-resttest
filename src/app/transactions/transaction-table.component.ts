import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

import { Transaction, CurrencyPipe, SortingPipe } from "./index";

@Component({
    moduleId: module.id,
    selector: "transaction-table",
    pipes: [CurrencyPipe, SortingPipe],
    template: `
    <ul class="nav nav-pills">
        <li role="presentation"><a>Menu 1</a></li>
        <li role="presentation"><a>Menu 1</a></li>
        <li role="presentation"><a>Menu 1</a></li>
        <li role="presentation"><a>Menu 1</a></li>
        <li role="presentation"><a>Menu 1</a></li>
        <li role="presentation"><a>Menu 1</a></li>
    </ul>
    
    <h3>Total: {{ totalAsDollars | basicCurrency }} </h3>
    <table class="table">
        <thead>
            <tr>
                <th (click)="applySort('date')">Date</th>
                <th (click)="applySort('company')">Company</th>
                <th (click)="applySort('ledger')">Ledger</th>
                <th (click)="applySort('amount')">Amount</th>
            </tr>
        </thead>
        
        <tbody>
            <tr *ngFor="let t of transactions | sortBy : sorting">
                <td>{{t.date | date}}</td>
                <td>{{t.company }}</td>
                <td (click)="applyFilter(t.ledger)"> <b> {{t.ledger }} </b> </td>
                <td>{{t.amountInDollars }}</td>
            </tr>
        </tbody>
    </table>
    `
})
export class TransactionTableComponent implements OnInit {

    @Input() transactions: Transaction[];
    @Input() sorting: string;

    sortModeAsc: boolean;

    @Output() onCategoryFilter = new EventEmitter();

    constructor() {
        this.sortModeAsc = true;
    }

    ngOnInit() {
        // Nothing to do
    }

    total() {
        let total = 0;

        this.transactions.forEach((t: Transaction) => {
            total = total + t.amount;
        });
        return total;
    }

    get totalAsDollars() {
        return this.total() / 100;
    }

    applySort(key: string) {
        this.sorting = this.sortModeAsc ? "+" + key : "-" + key;
        this.sortModeAsc = !this.sortModeAsc;
    }

    applyFilter(ledger: string) {
        this.onCategoryFilter.emit({
            ledger: ledger
        });
    }
}
