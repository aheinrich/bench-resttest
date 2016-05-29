import { Component, OnInit, Input } from '@angular/core';
import { Transaction } from './models/transactions.models'
import * as _ from 'lodash';

@Component({
    moduleId: module.id,
    selector: 'transaction-balance',
    template: `
    <div>
        <h2>Balance Sheet</h2>
        
        Starting Balance: {{balance.startingBalance}}
        
        <ul>
            <li *ngFor="let d of balance.dailyBalance ; let i = index" >
                {{ d.date | date }} - {{ d.balance }}
            </li>
        </ul>
    </div>
    `
})
export class TransactionBalanceComponent implements OnInit {
    
    @Input() transactions: Transaction[]
    
    constructor() { }

    ngOnInit() {
        console.log(`There are ${this.transactions.length} transactions`)
        
        let groupByTimestamp: _.Dictionary<any> = _.groupBy(this.transactions, 'dateTimestamp')
        
        console.log(`Group by date timestamp, there are ${Object.keys(groupByTimestamp).length} groups of transactions`)
        
    }
    
    
    balanceDate(index:number, group:any) {
        console.log(group)
        return group.date ;
    }
    
    get balance() {
        let groupByTimestamp: _.Dictionary<any> = _.groupBy(this.transactions, 'dateTimestamp')
        let dailyBalance = Object.keys(groupByTimestamp).sort()
        
        let balance = 0
        let r = dailyBalance.map( timestamp => {
            let dailyTotal = _.reduce(groupByTimestamp[timestamp].map( (t:Transaction) => t.amount), (sum:number ,n:number) => {
                return sum+n    
            }, 0)
            
            balance = balance + dailyTotal
            return {
                date: new Date(Number.parseInt(timestamp)),
                total: dailyTotal,
                balance: balance
            }
        })
        
        return {
            startingBalance: 0,
            dailyBalance: r
        }
    }

}