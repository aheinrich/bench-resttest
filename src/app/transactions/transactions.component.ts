import { Component, OnInit } from '@angular/core';

import { TransactionListComponent } from './transaction-list.component';
import { TransactionBalanceComponent } from './transaction-balance.component';

import { TransactionService } from './services/transactions.service'
import { Transaction } from './models/transactions.models'
import { CurrencyPipe } from './pipes/currency.pipe' 
import { SortingPipe } from './pipes/sorting.pipe' 


@Component({
    moduleId: module.id,
    selector: 'transactions',
    styleUrls: ['transactions.component.css'],
    pipes: [ CurrencyPipe, SortingPipe ], 
    directives: [ TransactionListComponent, TransactionBalanceComponent ],
    providers: [ TransactionService ],
    template: `
    <div>
    
        <h2>My Submission</h2>
        <p>This is my submission for Bench's RestTest</p>

        <h2>Requirements</h2>
        <ol>
            <li>We would like you to write an app that connects to an API, downloads all the data, and has a function that will calculate the total balance</li>
        </ol>

        <h2>Additional Features</h2>
        <ol>
            <li>As a user, I need vendor names to be easily readable. Make the vendor names more readable, remove garbage from names.</li>
            <li>As a user, I do not want to have any duplicated transactions in the list. Use the data provided to detect and identify duplicate transactions.</li>
            <li>As a user, I need to get a list expense categories. For each category I need a list of transactions, and the total expenses for that category.</li>
            <li>As a user, I need to calculate daily calculated balances. A running total for each day. For example, if I have 3 transactions for the 5th 6th 7th, each for $5, then the daily balance on the 6th would be $10.</li>
        </ol>
       
        <button (click)="getTransactions()">Get Started - Fetch Data</button>
        <button (click)="doSummary()">Toggle Summary</button>
        <button (click)="doBalance()">Toggle Balance</button>
        <button (click)="doReset()">Reset View</button>

        <hr>
        
        <div class="container">
        
            <transaction-list [transactions]="transactionList" (onCategoryFilter)="filterTransactions($event)">
                <p *ngIf="filterBy">Filtered by: {{filterBy}}</p>
            </transaction-list>
            
            <transaction-balance *ngIf="showBalance" [transactions]="transactionList"></transaction-balance>
            
            <div *ngIf="showSummary">
                <h2>Daily Summary</h2>
                <ul>
                    <li *ngFor="let s of summaryList | sortBy : 'date' " (click)="s.showTransactions=!s.showTransactions">
                        {{ s.date | date }}
                        {{ s.totalInDollars | currency }}
                        <ul *ngIf="s.showTransactions">
                            <li *ngFor="let t of s.transactions">
                                {{ t.amountInDollars | currency }} :: {{ t.company }}
                            </li>
                        </ul>
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
    showSummary:boolean;
    showBalance:boolean;
    
    constructor(private service:TransactionService) {
        this.transactionList = []
    }

    ngOnInit() {
        this.doReset()
    }
    
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
        this.showSummary = false;
        this.showBalance = false;
        this.filterBy = undefined;
        this.getTransactions()
    }
    
    doSummary(){
        this.showSummary = !this.showSummary
    }
    
    doBalance(){
        this.showBalance = !this.showBalance
    }
    
    private summarize(){
        this.summaryList = this.service.summarizeByDate(this.transactionList)
    }

}