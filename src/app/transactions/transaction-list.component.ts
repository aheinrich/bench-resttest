import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

import { Transaction, CurrencyPipe, SortingPipe } from "./index";

@Component({
    moduleId: module.id,
    selector: "transaction-list",
    pipes: [CurrencyPipe, SortingPipe],
    template: `
    <h3>Total: {{ totalAsDollars | basicCurrency }} </h3>
    
    <ng-content></ng-content>
    
    <ul class="nav nav-pills">
        <li role="presentation" (click)="applySort('date')"><a>Date</a></li>
        <li role="presentation" (click)="applySort('amount')"><a>Amount</a></li>
        <li role="presentation" (click)="applySort('company')"><a>Company</a></li>
        <li role="presentation" (click)="applySort('ledger')"><a>Ledger</a></li>
    </ul>

    <ul class="list-group">
        <li class="list-group-item" *ngFor="let t of transactions | sortBy : sorting">
            <div class="list-group">
                <h4 class="list-group-item-heading">{{ t.date | date }} - {{ t.company }}</h4>
                <p class="list-group-item-text">{{ t.amountInDollars | basicCurrency }}</p>
            </div>
            
            [<b (click)="applyFilter(t.ledger)"> {{ t.ledger }} </b>]
            
        </li>
    </ul>
    `
})
export class TransactionListComponent implements OnInit {
    @Input() transactions: Transaction[];
    @Input() sorting: string;

    sortModeAsc: boolean;

    @Output() onCategoryFilter = new EventEmitter();

    constructor() {
        this.sortModeAsc = true;
    }

    ngOnInit() {
        // Nothing to do?
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
