import { Component, OnInit } from "@angular/core";
import { TransactionsComponent } from "./transactions/transactions.component";

@Component({
    moduleId: module.id,
    selector: "app",
    styleUrls: ["app.component.css"],
    directives: [ TransactionsComponent ],
    template: `
    <nav class="navbar navbar-inverse navbar-fixed-top">
        <div class="container-fluid">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand" href="#">RestTest</a>
            </div>
            
        </div><!-- /.container-fluid -->
         
    </nav>
    
    <div class="container-fluid" id="content">
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
