import { Component, Output, EventEmitter } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'transaction-intro',
    template: `
    <h2>My Submission</h2>
    <p>This is my submission for Bench's RestTest</p>
    
    <button class="btn btn-primary bt-button" (click)="doGetStarted()">Get Started</button>
    
    <h2>Requirements</h2>
    <ol>
        <li>We would like you to write an app that connects to an API, downloads all the data, and has a function that will calculate
        the total balance</li>
    </ol>
    <h2>Additional Features</h2>
    <ol>
        <li>As a user, I need vendor names to be easily readable. Make the vendor names more readable, remove garbage from names.</li>
        <li>As a user, I do not want to have any duplicated transactions in the list. Use the data provided to detect and identify 
        duplicate transactions.</li>
        <li>As a user, I need to get a list expense categories. For each category I need a list of transactions, and the total 
        expenses for that category.</li>
        <li>As a user, I need to calculate daily calculated balances. A running total for each day. For example, if I have 3 
        transactions for the 5th 6th 7th, each for $5, then the daily balance on the 6th would be $10.</li>
    </ol>
    
    
    `
})
export class TransactionIntroComponent {
    @Output() onButtonEvent = new EventEmitter();
    
    
    doGetStarted(){
        this.onButtonEvent.emit({
            view: "transactions"
        });
    }
    
}