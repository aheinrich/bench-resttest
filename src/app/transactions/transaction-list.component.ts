import { Component, OnInit, Input } from '@angular/core';
import { Transaction } from './transactions.models'
import { CurrencyPipe } from './currency.pipe' 

@Component({
    moduleId: module.id,
    selector: 'transaction-list',
    pipes: [ CurrencyPipe ], 
    template: `
    <div>
        <h2>Transactions</h2>
        {{ totalAsDollars | currency }}
        <ul>
            <li *ngFor="let t of transactions">
                {{ t.date }}
                {{ t.amountInDollars | currency }}
                {{ t.company }} [ {{ t.ledger }} ]
                
            </li>
        </ul>
    </div>
    `
})
export class TransactionListComponent implements OnInit {
    
    @Input() transactions: Transaction[]
    
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

}