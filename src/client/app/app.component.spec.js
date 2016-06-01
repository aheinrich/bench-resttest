"use strict";
var testing_1 = require("@angular/core/testing");
var app_component_1 = require("./app.component");
testing_1.describe("app component", function () {
    var component;
    testing_1.beforeEach(function () {
        component = new app_component_1.AppComponent();
    });
    testing_1.it("Should start a test...", function () {
        testing_1.expect(true).toEqual(true);
    });
    testing_1.it("Should init...", function () {
        component.ngOnInit();
        testing_1.expect(component.ready).toEqual(true);
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
