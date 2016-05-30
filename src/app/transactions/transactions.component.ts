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
        <div class="col-md-3">
        
            <ul class="nav nav-pills nav-stacked">
                <li role="presentation" (click)="setState('intro')">
                    <a>Intro</a>
                </li>
                <li role="presentation" (click)="setState('list')">
                    <a>Show List</a>
                </li>
                <li role="presentation" (click)="setState('table')">
                    <a>Show Table</a>
                </li>
                <li role="presentation" (click)="doSummary()">
                    <a>Daily Summary</a>
                </li>
                <li role="presentation" (click)="doBalance()">
                    <a>Daily Balance</a>
                </li>
                <li role="presentation" (click)="doReset()">
                    <a>Reset Views</a>
                </li>
            </ul>            
        </div>
        <div class="col-md-9">
            
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
        
    </div>
    
    <div class="row">
        <div class="col-md-12">
            
            
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
