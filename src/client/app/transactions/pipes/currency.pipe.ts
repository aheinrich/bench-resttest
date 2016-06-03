import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "basicCurrency"
})

export class CurrencyPipe implements PipeTransform {
    transform(value: any, args: string | any[]): any {
        if (args === "dollars") {
            value = value / 100;
        }

        return value.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    }

}
