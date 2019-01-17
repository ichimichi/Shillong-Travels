import { Pipe, PipeTransform } from '@angular/core';
import { String, StringBuilder } from 'typescript-string-operations';

@Pipe({
  name: 'hour'
})
export class HourPipe implements PipeTransform {
//Tue Jan 15 2019 09:00:00 GMT+0530 (India Standard Time)Tue Jan 15 2019 06:00:00 GMT+0530 (India Standard Time)
  transform(value: any, args?: any): any {
    console.log(value);
    // let arrival = new Date(Date.parse(value.substring(0,55)));
    // let departure = new Date(Date.parse(value.substring(55,110)));
    // console.log(dsa);
    // console.log(dsd);
    let arrival = Date.parse(value.substring(0,55));
    let departure = Date.parse(value.substring(55,110));
    let ms = (arrival - departure);
    let hours = ms/(60*60*1000);
    ms=ms-hours*(60*60*1000);
    let mins = ms/(60*1000);

    // let hours = arrival.getHours() - departure.getHours();
    // let mins = arrival.getMinutes
    let result = new StringBuilder("");
    result.Append(hours.toString()+" hrs");
    let final = result.ToString();
    
    return final;
  }

}
