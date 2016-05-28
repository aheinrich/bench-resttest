import { Component, OnInit } from '@angular/core';
import { TransactionsComponent } from './transactions/transactions.component';

import { MdButton } from '@angular2-material/button';
import { MD_LIST_DIRECTIVES } from '@angular2-material/list'
import { MD_SIDENAV_DIRECTIVES } from '@angular2-material/sidenav'
import { MdToolbar } from '@angular2-material/toolbar';
import { MdIcon, MdIconRegistry } from '@angular2-material/icon';

@Component({
    moduleId: module.id,
    selector: 'app',
    styleUrls: ['app.component.css'],
    templateUrl: 'app.component.html',
    directives: [ TransactionsComponent, MD_SIDENAV_DIRECTIVES, MdToolbar, MdButton, MdIcon ],
    providers: [ MdIconRegistry ],
})
export class AppComponent implements OnInit {
    
    constructor() { }

    ngOnInit() {}
    

}