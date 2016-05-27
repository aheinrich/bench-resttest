import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'sortBy'
})

export class SortingPipe implements PipeTransform {
    transform(value: any, args: any[]): any {
        console.log(args)
        return value;
    }
}