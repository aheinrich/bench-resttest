import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Transaction, CurrencyPipe, SortingPipe } from './index'

@Component({
    moduleId: module.id,
    selector: 'transaction-list',
    pipes: [ CurrencyPipe, SortingPipe ], 
    template: `
    <div class="box">
        <h3>Total: {{ totalAsDollars | currency }} </h3>
        
        <ng-content></ng-content>
        
        <div>
            <button (click)="applySort('date')">Date</button>
            <button (click)="applySort('amount')">Amount</button>
            <button (click)="applySort('company')">Company</button>
            <button (click)="applySort('ledger')">Ledger</button>
        </div>        
        <ul>
            <li *ngFor="let t of transactions | sortBy : sorting">
                {{ t.date | date }}
                [<b (click)="applyFilter(t.ledger)"> {{ t.ledger }} </b>]
                {{ t.company }}
                {{ t.amountInDollars | currency }}
                
            </li>
        </ul>
    </div>
    `
})
export class TransactionListComponent implements OnInit {
    
    @Input() transactions: Transaction[]
    @Input() sorting: string;
    
    sortModeAsc: boolean; 
    
    @Output() onCategoryFilter = new EventEmitter();
    
    constructor() {
        this.sortModeAsc = true;
    }

    ngOnInit() { }
    
    total(){
        let total = 0
        
        this.transactions.forEach( (t:Transaction) => {
            total = total + t.amount
        })
        return total
    }
    
    get totalAsDollars(){
        return this.total() / 100
    }
    
    applySort(key:string){
        this.sorting = this.sortModeAsc ? "+" + key : "-" + key
        this.sortModeAsc = !this.sortModeAsc
    }
    
    applyFilter(ledger:string){
        this.onCategoryFilter.emit({
            ledger: ledger
        })
    }

}