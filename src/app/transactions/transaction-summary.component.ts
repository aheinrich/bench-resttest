import { Component, OnInit, Input} from '@angular/core';

import { Transaction, Utilities, CurrencyPipe, SortingPipe } from './index'


@Component({
    moduleId: module.id,
    selector: 'transaction-summary',
    pipes: [ SortingPipe, CurrencyPipe ], 
    template: `
    <div class="box">
        <table>
            <tr>
                <th>Date</th>
                <th>Total</th>
            </tr>
            <tr *ngFor="let s of summaryList | sortBy : 'date' ">
                <td> {{ s.date | date }} </td>
                <td> {{ totalDollars(s.total) | currency }} </td>
            </tr>
        </table>
    </div>
    `
})
export class TransactionSummaryComponent implements OnInit {
    
    @Input() transactions: Transaction[]
    
    constructor() { }

    ngOnInit() { }
    
    get summaryList(){
        return Utilities.calculateDailyTotals(this.transactions)
    }
    
    totalDollars(value:number){
        return value / 100
    }
}