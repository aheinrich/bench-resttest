import { Component, OnInit } from '@angular/core';

import { TransactionListComponent } from './transaction-list.component';
import { TransactionService } from './services/transactions.service'
import { Transaction } from './models/transactions.models'
import { CurrencyPipe } from './pipes/currency.pipe' 
import { SortingPipe } from './pipes/sorting.pipe' 


@Component({
    moduleId: module.id,
    selector: 'transactions',
    styleUrls: ['transactions.component.css'],
    pipes: [ CurrencyPipe, SortingPipe ], 
    directives: [ TransactionListComponent ],
    providers: [ TransactionService ],
    template: `
    <div>
        <button (click)="getTransactions()">Fetch Data</button>
        <button (click)="summarize()">Summarize</button>
        <button (click)="doReset()">Reset Filter</button>
        
        <div class="container">
        
            <transaction-list [transactions]="transactionList" (onCategoryFilter)="filterTransactions($event)">
                <p *ngIf="filterBy">Filtered by: {{filterBy}}</p>
            </transaction-list>
            
            <div>
                <h2>Daily Summary</h2>
                <ul>
                    <li *ngFor="let s of summaryList | sortBy : 'date' ">
                        {{s.date}}
                        {{s.totalInDollars | currency }}
                    </li>
                </ul>
            </div>
            
        </div>
        
        
        
        
    </div>
    `
})
export class TransactionsComponent implements OnInit {
    
    transactionList:Transaction[]
    summaryList:any;
    filterBy: string;
    
    constructor(private service:TransactionService) {
        this.transactionList = []
    }

    ngOnInit() { }
    
    getTransactions(){
        this.service.fetchTransactions().then(
            results => {
                this.transactionList = results
                this.summarize();
            }
        )
    }
    
    filterTransactions(ev:{ledger:string}){
        this.filterBy = ev.ledger
        this.transactionList = this.service.filterByLedger(this.transactionList, ev.ledger)
        this.summarize();
    }
    
    doReset(){
        
    }
    
    summarize(){
        this.summaryList = this.service.summarizeByDate(this.transactionList)
    }

}