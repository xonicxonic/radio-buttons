import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'ordinal'})

export class OrdinalPipe implements PipeTransform {
    transform(n: number) {
        const ones = +n % 10, tens = +n % 100 - ones;
        return n + ["th","st","nd","rd"][ tens === 10 || ones > 3 ? 0 : ones ];
    }
}