import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

import { Transaction, CurrencyPipe, SortingPipe } from "./index";

@Component({
    moduleId: module.id,
    selector: "transaction-table",
    pipes: [
        CurrencyPipe, 
        SortingPipe
    ],
    template: `
    <h3>Total: {{ total | basicCurrency : "dollars" }} </h3>
    <table class="table">
        <thead>
            <tr>
                <th (click)="applySort('date')">
                    Date <i [ngClass]="getSortClasses('date')" aria-hidden="true"></i>
                </th>
                <th (click)="applySort('company')">
                    Company <i [ngClass]="getSortClasses('company')" aria-hidden="true"></i>
                </th>
                <th (click)="applySort('ledger')">
                    Ledger <i [ngClass]="getSortClasses('ledger')" aria-hidden="true"></i>
                </th>
                <th (click)="applySort('amount')">
                    Amount<i [ngClass]="getSortClasses('amount')" aria-hidden="true"></i>
                </th>
            </tr>
        </thead>
        
        <tbody>
            <tr *ngFor="let t of transactions | sortBy : sorting">
                <td>{{t.date | date}}</td>
                <td>{{t.company }}</td>
                <td>{{t.ledger }} <button class="btn btn-xs" (click)="applyFilter(t.ledger)">Filter</button> </td>
                <td>{{t.amount | basicCurrency : "dollars" }}</td>
            </tr>
        </tbody>
    </table>
    `
})
export class TransactionTableComponent implements OnInit {

    @Input() transactions: Transaction[];
    
    sorting: string;
    sortColumn: string;
    sortModeAsc: boolean;

    @Output() onCategoryFilter = new EventEmitter();

    constructor() {
        this.sortModeAsc = true;
    }

    ngOnInit() {
        // Nothing to do
    }

    get total(){
        let total = 0;

        this.transactions.forEach((t: Transaction) => {
            total = total + t.amount;
        });
        return total;
    }

    applySort(key: string) {
        this.sorting = this.sortModeAsc ? "+" + key : "-" + key;
        this.sortColumn = key
        this.sortModeAsc = !this.sortModeAsc;
    }

    applyFilter(ledger: string) {
        this.onCategoryFilter.emit({
            ledger: ledger
        });
    }
    
    getSortClasses(column:string){
        
        let styles = {
            'fa': true
        }
        if (column === this.sortColumn){
            if (!this.sortModeAsc){
                styles['fa-sort-asc'] = true
            } else {
                styles['fa-sort-desc'] = true
            }
            
        } else {
            styles['fa-sort'] = true
        }
       
        return styles
    }
}
