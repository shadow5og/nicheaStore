import { Pipe, PipeTransform } from '@angular/core';
import Alert from '../models/alerts-model';

@Pipe({
  name: 'objectAssign',
})
export class ObjectAssignPipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): any {
    return Object.assign({}, value) as typeof value;
  }
}
