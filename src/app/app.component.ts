import { Component, OnInit } from '@angular/core';
import { TransactionsComponent } from './transactions/transactions.component';

@Component({
    moduleId: module.id,
    selector: 'app',
    styleUrls: ['app.component.css'],
    directives: [ TransactionsComponent ],
    template: `
    <h1>App</h1>
    <transactions></transactions>
    `,
})
export class AppComponent implements OnInit {
    
    constructor() { }

    ngOnInit() {}
    

}