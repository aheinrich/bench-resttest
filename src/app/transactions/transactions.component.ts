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
        <transaction-list 
            [transactions]="transactionList" 
            (onCategoryFilter)="filterTransactions($event)"
            (onSort)="sortTransactions($event)">
            <p *ngIf="filterBy">Filtered by: {{filterBy}}</p>
        </transaction-list>
        
        <button (click)="getTransactions()">Fetch Data</button>
        <button (click)="doReset()">Reset Filter</button>
    </div>
    `
})
export class TransactionsComponent implements OnInit {
    
    transactionList:Transaction[]
    filterBy: string;
    
    constructor(private service:TransactionService) {
        this.transactionList = []
    }

    ngOnInit() { }
    
    getTransactions(){
        this.service.fetchTransactions().then(
            results => this.transactionList = results 
        )
    }
    
    filterTransactions(ev:{ledger:string}){
        this.filterBy = ev.ledger
        this.transactionList = this.service.filterByLedger(this.transactionList, ev.ledger)
    }
    
    sortTransactions(ev:any){
        this.transactionList.sort((a,b) => {
            if(a[ev.key] < b[ev.key]) return -1;
            if(a[ev.key] > b[ev.key]) return 1;
            return 0
        })
        
    }
    
    doReset(){
        
    }

}