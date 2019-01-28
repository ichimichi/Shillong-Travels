import { Pipe, PipeTransform } from '@angular/core';
import { String, StringBuilder } from 'typescript-string-operations';

@Pipe({
  name: 'time'
})
export class TimePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let min = value.substring(19, 21);
    let hour = value.substring(16, 18);
    let result = new StringBuilder("");
    if (parseInt(hour) <= 12) {
      result.Append(hour + ":");
    } else {
      let newHour = parseInt(hour) - 12;
      result.Append(newHour + ":");
    }


    result.Append(min);
    if (parseInt(hour) < 12) {
      result.Append(" AM");
    } else {
      result.Append(" PM");
    }
    let final = result.ToString();

    return final;
  }

}
