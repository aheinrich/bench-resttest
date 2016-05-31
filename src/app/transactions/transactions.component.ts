import { Component, OnInit } from "@angular/core";

import {
    CurrencyPipe,
    SortingPipe,
    Transaction,
    TransactionService,
    TransactionIntroComponent,
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
        TransactionIntroComponent,
        TransactionListComponent,
        TransactionTableComponent,
        TransactionSummaryComponent,
        TransactionBalanceComponent
    ],
    providers: [TransactionService],
    template: `
    <div class='row'>
        <div class="col-md-2">
        
            <ul class="nav nav-pills nav-stacked">
                <li role="presentation" (click)="setState('intro')">
                    <a>Intro</a>
                </li>
                <li role="presentation" (click)="setState('list')">
                    <a>Transactions <span class="badge">36</span></a>
                </li>
            </ul>     
            
            <h4>View by Category</h4>
            <ul class="nav nav-pills nav-stacked">
                <li role="presentation" *ngFor="let c of categoryList; let i = index" (click)="showFilteredList(c)">
                    <a>{{c}}</a>
                </li>
            </ul>
            
            <h4>Other Views</h4>
            <ul class="nav nav-pills nav-stacked">
                <li role="presentation"><a>Daily Balance</a></li>
                <li role="presentation"><a>Clear</a></li>
            </ul> 
                   
        </div>
        <div class="col-md-8">
            
            <ul class="nav nav-pills">
                <li role="presentation"><a>List <span class="badge">4</span></a></li>
                <li role="presentation"><a>Table</a></li>
            </ul>
            
            <transaction-intro *ngIf="uiView==='intro'"></transaction-intro>

            <transaction-list *ngIf="uiView==='list'"
                [transactions]="transactionList" 
                (onCategoryFilter)="filterTransactions($event)">
            </transaction-list>
            
            <transaction-table *ngIf="uiView==='table'"
                [transactions]="transactionList" 
                (onCategoryFilter)="filterTransactions($event)">
            </transaction-table>
            
        </div>
        
        <div class="col-md-2">
            <transaction-balance *ngIf="showBalance" [transactions]="transactionList"></transaction-balance>
        </div>
        
    </div>
    
    <div class="row">
        <div class="col-md-12">
           
            
            
            <transaction-summary *ngIf="showSummary" [transactions]="transactionList"></transaction-summary>
            
        </div>
    </div>
    `
})
export class TransactionsComponent implements OnInit {

    transactionList: Transaction[];
    categoryList: Array<string>;
    summaryList: any;
    filterBy: string;

    uiView:string;
    
    showIntro: boolean;
    showList: boolean;
    showTable: boolean;
    showSummary: boolean;
    showBalance: boolean;

    constructor(private service: TransactionService) {
        this.transactionList = [];
        this.uiView = 'intro'
    }

    ngOnInit() {
        this.doReset();
    }

    setState(state:string){
        this.uiView = state;
        
    }
    getTransactions() {
        this.filterBy = undefined;
        this.service.fetchTransactions().then(
            (results:any) => {
                this.transactionList = results;
                this.summarize();
                this.getCategories()
            }
        );
    }
    
    getCategories(){
        this.categoryList = this.service.getCategories(this.transactionList).sort()
    }

    showFilteredList(ledger:string){
        this.filterTransactions( {ledger} );
        this.setState('list');
    }

    filterTransactions(ev: { ledger: string }) {
        this.service.fetchTransactions().then(
            (results) => {
                this.transactionList = this.service.filterByLedger(this.transactionList, ev.ledger);       
                this.summarize();
            }
        )
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
