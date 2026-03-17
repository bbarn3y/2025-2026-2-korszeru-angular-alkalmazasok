import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'name',
  standalone: false,
  pure: true // true is the default
})
export class NamePipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    if (!value) return value;
    const split = value.trim().split(/\s+/);
    if (split.length === 2) {
      return `${split[1]}, ${split[0]}`;
    }
    return value;
  }

}
