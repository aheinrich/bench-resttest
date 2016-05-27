import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Transaction } from './transactions.models'
import { CurrencyPipe } from './currency.pipe' 

@Component({
    moduleId: module.id,
    selector: 'transaction-list',
    pipes: [ CurrencyPipe ], 
    template: `
    <div>
        <h2>Transactions</h2>
        <ng-content></ng-content>
        
        <hr>
        Total: {{ totalAsDollars | currency }}
        
        <ul>
            <li *ngFor="let t of transactions">
                {{ t.date }}
                {{ t.amountInDollars | currency }}
                {{ t.company }} <b (click)="filterByLedger(t.ledger)"> {{ t.ledger }} </b>
                
            </li>
        </ul>
    </div>
    `
})
export class TransactionListComponent implements OnInit {
    
    @Input() transactions: Transaction[]
    @Output() onCategoryFilter = new EventEmitter();
    
    constructor() { }

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
    
    filterByLedger(ledger:string){
        console.log(ledger)
        this.onCategoryFilter.emit({
            ledger: ledger
        })
    }

}