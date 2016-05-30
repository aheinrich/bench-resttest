import { Component, OnInit } from "@angular/core";
import { TransactionsComponent } from "./transactions/transactions.component";

@Component({
    moduleId: module.id,
    selector: "app",
    styleUrls: ["app.component.css"],
    directives: [TransactionsComponent],
    template: `
    <nav class="navbar navbar-default">
        <div class="navbar-header">
            <h1>Header</h1>
        </div>
            <ul class="nav navbar-nav">
                <li><a href="#">Link</a></li>
                <li><a href="#">Link</a></li>
                <li><a href="#">Link</a></li>
            </ul>
    </nav>
    
    <div class='container'>
        <transactions></transactions>
    </div>
    `,
})
export class AppComponent implements OnInit {

    constructor() {
        //Nothing to do here...
    }

    ngOnInit() {
        //Nothing to do here...
    }
}
