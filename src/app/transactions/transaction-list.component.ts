import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Transaction } from './transactions.models'
import { CurrencyPipe } from './currency.pipe' 
import { SortingPipe } from './sorting.pipe' 

@Component({
    moduleId: module.id,
    selector: 'transaction-list',
    pipes: [ CurrencyPipe, SortingPipe ], 
    template: `
    <div>
        <h2>Transactions</h2>
        <ng-content></ng-content>
        
        <hr>
        Total: {{ totalAsDollars | currency }}
        
        <div>
            <button (click)="applySort('date')">Date</button>
            <button (click)="applySort('amount')">Amount</button>
            <button (click)="applySort('company')">Company</button>
            <button (click)="applySort('date')">Ledger</button>
        </div>        
        <ul>
            <li *ngFor="let t of transactions | sortBy : sorting">
                {{ t.date }}
                {{ t.amountInDollars | currency }}
                {{ t.company }} <b (click)="applyFilter(t.ledger)"> {{ t.ledger }} </b>
                
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