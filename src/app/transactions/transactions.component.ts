import { Component, OnInit } from '@angular/core';

import { TransactionListComponent } from './transaction-list.component';
import { TransactionService } from './transactions.service'
import { Transaction } from './transactions.models'

@Component({
    moduleId: module.id,
    selector: 'transactions',
    directives: [ TransactionListComponent ],
    providers: [ TransactionService ],
    template: `
    <div>
        <transaction-list [transactions]="transactionList">
        </transaction-list>
        
        <button (click)="getTransactions()">Fetch Data</button>
    </div>
    `
})
export class TransactionsComponent implements OnInit {
    
    transactionList:Array<any>
    
    constructor(private service:TransactionService) {
        this.transactionList = []
    }

    ngOnInit() { }
    
    getTransactions(){
        this.service.getTransactions().subscribe( (data:Transaction[]) => {
            this.transactionList = data.concat(this.transactionList)
        })
    }

}