import { Component, OnInit } from "@angular/core";
import { TransactionsComponent } from "./transactions/transactions.component";

@Component({
    moduleId: module.id,
    selector: "app",
    styleUrls: ["app.component.css"],
    directives: [TransactionsComponent],
    template: `
    <nav class="navbar navbar-default navbar-fixed-top">
        <div class="container-fluid">
            <div class="navbar-header">
                <a class="navbar-brand" href="http://resttest.bench.co">
                    <svg class="symbol" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="907px" height="907px" viewBox="0 0 907 907" enable-background="new 0 0 907 907" xml:space="preserve">
                        <g>
                        <g>
                            <path d="M453.5,733.5c-154.384,0-280-125.617-280-280v-280h560v280C733.5,607.883,607.883,733.5,453.5,733.5z M224.413,224.413
                            V453.5c0,126.324,102.755,229.087,229.087,229.087c126.324,0,229.087-102.763,229.087-229.087V224.413H224.413z"></path>
                        </g>
                        <polygon points="580.763,343.196 326.238,343.196 326.238,394.108 361.024,394.108 343.409,535.153 394.709,535.153 
                            412.325,394.108 494.675,394.108 512.292,535.153 563.591,535.153 545.976,394.108 580.763,394.108 	"></polygon>
                        </g>
                    </svg>
                </a>
            </div>
        </div>
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
