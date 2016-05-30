import { Component, OnInit } from "@angular/core";

import {
    CurrencyPipe,
    SortingPipe,
    Transaction,
    TransactionService,
    TransactionListComponent,
    TransactionTableComponent,
    TransactionSummaryComponent,
    TransactionBalanceComponent} from "./index";

@Component({
    moduleId: module.id,
    selector: "transactions",
    styleUrls: ["transactions.component.css"],
    pipes: [
        CurrencyPipe,
        SortingPipe
    ],
    directives: [
        TransactionListComponent,
        TransactionTableComponent,
        TransactionSummaryComponent,
        TransactionBalanceComponent
    ],
    providers: [TransactionService],
    template: `
    <div>
    
        <h2>My Submission</h2>
        <p>This is my submission for Bench's RestTest</p>

        <h2>Requirements</h2>
        <ol>
            <li>We would like you to write an app that connects to an API, downloads all the data, and has a function that will calculate
             the total balance</li>
        </ol>

        <h2>Additional Features</h2>
        <ol>
            <li>As a user, I need vendor names to be easily readable. Make the vendor names more readable, remove garbage from names.</li>
            <li>As a user, I do not want to have any duplicated transactions in the list. Use the data provided to detect and identify 
              duplicate transactions.</li>
            <li>As a user, I need to get a list expense categories. For each category I need a list of transactions, and the total 
              expenses for that category.</li>
            <li>As a user, I need to calculate daily calculated balances. A running total for each day. For example, if I have 3 
              transactions for the 5th 6th 7th, each for $5, then the daily balance on the 6th would be $10.</li>
        </ol>
       
        <button (click)="getTransactions()">Get Started - Fetch Data</button>
        <button (click)="doList()">Toggle List</button>
        <button (click)="doTable()">Toggle Table</button>
        <button (click)="doSummary()">Toggle Summary</button>
        <button (click)="doBalance()">Toggle Balance</button>
        <button (click)="doReset()">Reset View</button>

        <hr>
        
        <div *ngIf="filterBy">
            <h3 >Filtered by: {{filterBy}}</h3>
            <button (click)="getTransactions()" >Clear</button>
        </div>
        
        <div class="container">
            
            <transaction-list *ngIf="showList" 
                [transactions]="transactionList" 
                (onCategoryFilter)="filterTransactions($event)">
            </transaction-list>
            
            <transaction-table *ngIf="showTable" 
                [transactions]="transactionList" 
                (onCategoryFilter)="filterTransactions($event)">
            </transaction-table>
            
            <transaction-balance *ngIf="showBalance" [transactions]="transactionList"></transaction-balance>
            
            <transaction-summary *ngIf="showSummary" [transactions]="transactionList"></transaction-summary>
            
        </div>
        
        
        
        
    </div>
    `
})
export class TransactionsComponent implements OnInit {

    transactionList: Transaction[];
    summaryList: any;
    filterBy: string;

    showList: boolean;
    showTable: boolean;
    showSummary: boolean;
    showBalance: boolean;

    constructor(private service: TransactionService) {
        this.transactionList = [];
    }

    ngOnInit() {
        this.doReset();
    }

    getTransactions() {
        this.filterBy = undefined;
        this.service.fetchTransactions().then(
            (results:any) => {
                this.transactionList = results;
                this.summarize();
            }
        );
    }

    filterTransactions(ev: { ledger: string }) {
        this.filterBy = ev.ledger;
        this.transactionList = this.service.filterByLedger(this.transactionList, ev.ledger);
        this.summarize();
    }

    doReset() {
        this.showList = true;
        this.showTable = false;
        this.showSummary = false;
        this.showBalance = false;
        this.filterBy = undefined;
        this.getTransactions();
    }


    doList() {
        this.showList = !this.showList;
    }

    doTable() {
        this.showTable = !this.showTable;
    }

    doSummary() {
        this.showSummary = !this.showSummary;
    }

    doBalance() {
        this.showBalance = !this.showBalance;
    }

    private summarize() {
        this.summaryList = this.service.summarizeByDate(this.transactionList);
    }

}
