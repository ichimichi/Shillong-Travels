import { Pipe, PipeTransform } from '@angular/core';
import { String, StringBuilder } from 'typescript-string-operations';

@Pipe({
  name: 'time'
})
export class TimePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let min = parseInt(value)%100;
    let hour = parseInt(value)/100;
    let result = new StringBuilder("");
    if(hour<9){
      result.Append("0");
    }
    result.Append(hour.toString()+":");
    if(min<10){
      result.Append("0");
    }
    result.Append(min.toString());
    if(hour<12){
      result.Append(" AM");
    }else{
      result.Append(" PM");
    }
    let final = result.ToString();
    
    return final;
  }

}
