import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "sortBy"
})

export class SortingPipe implements PipeTransform {
    transform(value: any, args: string): any {

        if (!value) {
            return value;
        }

        if (!args) {
            return value;
        }

        let sortAsc = (a: any, b: any) => {
            if (a[args] < b[args]) return -1;
            if (a[args] > b[args]) return 1;
            return 0;
        };

        let sortDesc = (a: any, b: any) => {
            if (a[args] < b[args]) return 1;
            if (a[args] > b[args]) return -1;
            return 0;
        };

        let compareFn: any;

        if (args.startsWith("+")) {
            compareFn = sortAsc;
            args = args.slice(1);
        } else if (args.startsWith("-")) {
            compareFn = sortDesc;
            args = args.slice(1);
        } else {
            compareFn = sortAsc;
        }

        return value.sort(compareFn);

    }
}
