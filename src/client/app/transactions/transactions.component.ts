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
    
        <!-- Sidebar nav -->
        <div class="col-md-2 sidebar">
        
            <ul class="nav nav-sidebar">
            
               <li [class.active]="uiState.view == 'intro'" (click)="doView('intro')">
                    <a><i class="fa fa-home fa-lg" aria-hidden="true"></i>&nbsp; Intro</a>
                </li>
                
                <li [class.active]="uiState.view == 'transactions'" (click)="doView('transactions')">
                    <a><i class="fa fa-dollar fa-lg" aria-hidden="true"></i>&nbsp; Transactions</a>
                </li>
                
                <li [class.active]="uiState.view == 'balance'" (click)="doView('balance')">
                    <a><i class="fa fa-calendar fa-lg" aria-hidden="true"></i>&nbsp; Daily Balance</a>
                </li>
                
            </ul>
            
            <h4>By Category</h4>
            <ul class="nav nav-sidebar">
                <li *ngFor="let c of categoryList; let i = index" 
                    [class.active]="uiState.filter == c"
                    (click)="doView('transactions', {'filterBy': c} )">
                    <a>{{c}}</a>
                </li>
            </ul>
            
        </div>
        
        <!-- Main Viewport for components -->
        <div class="col-md-10 content">
            
            <ul class="nav nav-pills bt-pills" *ngIf="uiState.view === 'transactions'">
            
                <li role="presentation" [class.active]="uiState.viewMode == 'table'" (click)="doViewMode('table')">
                    <a><i class="fa fa-table" aria-hidden="true"></i>&nbsp; Table View</a>
                </li>
                
                <li role="presentation" [class.active]="uiState.viewMode == 'list'" (click)="doViewMode('list')">
                    <a><i class="fa fa-list-ul" aria-hidden="true"></i>&nbsp; List View</a>
                </li>
                    
                <li role="presentation" [class.active]="uiState.viewMode == 'summary'" (click)="doViewMode('summary')">
                    <a><i class="fa fa-list-alt" aria-hidden="true"></i>&nbsp; Summary View</a>
                </li>
            </ul>
            
            <!-- Introduction -->
            
            <transaction-intro *ngIf="viewIntro"
                (onButtonEvent)="handleIntroEvent($event)">
            </transaction-intro>
            
            
            <!-- List Component -->
            
            <transaction-list *ngIf="viewTransactionsAsList"
                [transactions]="transactionList" 
                (onCategoryFilter)="handleFilterEvent($event)">
            </transaction-list>
            
            <!-- Table Component -->
            
            <transaction-table *ngIf="viewTransactionsAsTable"
                [transactions]="transactionList" 
                (onCategoryFilter)="handleFilterEvent($event)">
            </transaction-table>
            
            <!-- Summary Component -->
            
            <transaction-summary *ngIf="viewTransactionsAsSummary"
                [transactions]="transactionList">
            </transaction-summary>
            
            <!-- Balance Component -->
            
            <transaction-balance *ngIf="viewBalance" 
                [transactions]="transactionList">
            </transaction-balance>
            
        </div>
        
    </div>
    `
})
export class TransactionsComponent implements OnInit {

    private data: {
        transactions: Transaction[];
        categories: string[];
    }
    
    private uiState: {
        view: string;
        viewMode: string;
        filter: string;
    };

    constructor(private service: TransactionService) {
        this.data = {
            transactions: [],
            categories: []
        };
        
        this.uiState = {
            view: "intro",
            viewMode: "table",
            filter: "",
        }
    }

    /**
     * Lifecycle hooks
     */
    ngOnInit() {
        
        this.getTransactions()
    }

    /**
     * Main UI control bindings
     */
    doView(newView: string, viewOptions:any={}){
        
        console.log(`Request to change view from '${this.uiState.view}' to '${newView}' `)
        
        switch (newView) {
            
            case "intro": {
                this._setView(newView);
                this._setFilter("");
                break;
            }
            
            case "transactions": {
                this._setView(newView);
                
                if (viewOptions.filterBy){
                    this._setFilter(viewOptions.filterBy);
                    console.log(`Filter by: '${viewOptions.filterBy}' `)
                } else {
                    this._setFilter("");
                    console.log(`No filter...`)
                }
                
                break;
            }
            
            case "balance": {
                this._setView(newView);
                this._setFilter("");
                break;
            }
            
            default: {
                console.log(`Requested view '${newView}' not recognized'`)
            }
        }
    }
    
    
    doViewMode(modeSelected:string){
        this._setViewMode(modeSelected)
    }
    
    
    
    /**
     * UI view control attributes
     */
    get viewIntro(){
        return (this.uiState.view ==='intro') ? true : false;
    }
    
    get viewTransactionsAsList() {
        return (this.uiState.view === "transactions" && this.uiState.viewMode === "list") ? true : false;
    }
    
    get viewTransactionsAsTable() {
        return (this.uiState.view === "transactions" && this.uiState.viewMode === "table") ? true : false;
    }
    
    get viewTransactionsAsSummary() {
        return (this.uiState.view === "transactions" && this.uiState.viewMode === "summary") ? true : false;
    }
    
    get viewBalance(){
        return (this.uiState.view ==='balance') ? true : false;
    }
    
    /**
     * UI data attributes
     */
    
    get transactionList():Transaction[] {

        if (this.uiState.filter){
            return this.service.filterByLedger(this.data.transactions, this.uiState.filter);
        } else {
            return this.data.transactions
        }
    }
    
    get categoryList(): string[]{
        return this.data.categories
    }
       
    /**
     * Event handlers for various components
     * 
     */
    
    // Intro Component
    private handleIntroEvent(ev:{view:string}){
        console.log(`Event: ${JSON.stringify(ev)}`)
        
        if (ev.view == "transactions"){
            this._setView("transactions")
        }
    }
    
    // List and Table Components
    private handleFilterEvent(ev:{ledger:string}){
        console.log(`Event: ${JSON.stringify(ev)}`)
        
        this.doView('transactions', {'filterBy': ev.ledger} )
        
    }
    
    /**
     * Private Conponent functions
     */
    
    private _setView(state:string){
        this.uiState.view = state;
    }
    
    private _setViewMode(mode:string){
        this.uiState.viewMode = mode;
    }
    
    private _setFilter(filter:string){
        this.uiState.filter = filter;
    }
    
    
    
    private getTransactions() {
        this.service.fetchTransactions().then(
            (results:Transaction[]) => {
                this.data.transactions = results;
                this.data.categories = this.getCategories(results)
            }
        );
    }
    
    private getCategories(transactions:Transaction[]){
        return this.service.getCategories(transactions).sort()
    }
    
    logUiState(){
        console.log(`UIView: ${JSON.stringify(this.uiState)}`)
    }
    
}
