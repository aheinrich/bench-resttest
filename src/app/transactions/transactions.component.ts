import { Component, OnInit } from '@angular/core';

import { TransactionListComponent } from './transaction-list.component';
import { TransactionService } from './transactions.service'
import { Transaction } from './transactions.models'

import { MdToolbar } from '@angular2-material/toolbar';
import { MD_PROGRESS_BAR_DIRECTIVES } from '@angular2-material/progress-bar'

@Component({
    moduleId: module.id,
    selector: 'transactions',
    styleUrls: ['transactions.component.css'],
    directives: [ MD_PROGRESS_BAR_DIRECTIVES, MdToolbar, TransactionListComponent ],
    providers: [ TransactionService ],
    template: `
    <md-progress-bar *ngIf="loading" mode="indeterminate" color="accent"></md-progress-bar>
    
    <div class="container">
    
        <md-toolbar color="primary">
            <span> Transactions </span>
        </md-toolbar>
    
        <div>    
            <transaction-list [transactions]="transactionList" (onCategoryFilter)="filterTransactions($event)">
                <p *ngIf="filterBy">Filtered by: {{filterBy}}</p>
            </transaction-list>
            
            <button (click)="getTransactions()">Fetch Data</button>
            <button (click)="doReset()">Reset Filter</button>
        </div>
            
    </div>
    
    `
})
export class TransactionsComponent implements OnInit {
    
    loading:boolean;
    transactionList:Transaction[]
    filterBy: string;
    
    constructor(private service:TransactionService) {
        this.transactionList = []
        this.loading = false;
    }

    ngOnInit() { }
    
    getTransactions(){
        this.loading = true;
        this.service.fetchTransactions().then(
            results => {
                this.transactionList = results;
                setTimeout(() => {
                    this.loading = false;
                }, 500)
            }
        )
    }
    
    filterTransactions(ev:{ledger:string}){
        this.filterBy = ev.ledger
        this.transactionList = this.service.filterByLedger(this.transactionList, ev.ledger)
    }
    
    doReset(){
        
    }

}