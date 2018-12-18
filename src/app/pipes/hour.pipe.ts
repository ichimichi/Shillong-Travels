import { Pipe, PipeTransform } from '@angular/core';
import { String, StringBuilder } from 'typescript-string-operations';

@Pipe({
  name: 'hour'
})
export class HourPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let hour = parseInt(value)/100;
    let result = new StringBuilder("");
    result.Append(hour.toString()+" hrs");
    let final = result.ToString();
    
    return final;
  }

}
