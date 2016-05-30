import {it, describe, expect, beforeEach, inject} from "@angular/core/testing";
import { AppComponent } from "./app.component";

describe("app component", () => {

    let component:AppComponent;
    
    beforeEach(() => {
        component = new AppComponent();
    });
    
    it("Should start a test...", () => {
        expect(true).toEqual(true);
    });
    
    it("Should init...", () => {
        component.ngOnInit();
        expect(component.ready).toEqual(true)
    });
    
    


    // let service:MyService = new MyService();
    // it('Should return a list of dogs', () => {
    //     var items = service.getDogs(4);

    //     expect(items).toEqual(['golden retriever', 'french bulldog', 'german shepherd', 'alaskan husky']);
    // });
    // it('Should get all dogs available', () => {
    //     var items = service.getDogs(100);
    //     expect(items).toEqual(['golden retriever', 'french bulldog', 'german shepherd', 'alaskan husky', 'jack russel terrier', 'boxer', 'chow chow', 'pug', 'akita', 'corgi', 'labrador']);
    // });
});
