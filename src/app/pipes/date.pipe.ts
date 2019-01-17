import { Pipe, PipeTransform } from '@angular/core';
import { String, StringBuilder } from 'typescript-string-operations';
import { StringifyOptions } from 'querystring';

@Pipe({
  name: 'date'
})
export class DatePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return formatDate(value);
  }

}

function formatDate(x: string) {
  let d = new Date(Date.parse(x)),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year =  d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [day, month, year].join('-');
}
