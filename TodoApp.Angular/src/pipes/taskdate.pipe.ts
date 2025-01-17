import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'taskdate',
  standalone: true
})
export class TaskdatePipe implements PipeTransform {

  transform(date: Date | string, format: string = 'mediumDate'): string | null {

    if(date == null){
      return 'Без срока'
    }

    // дата, которая поставлена в задаче
    const taskdate = new Date(date)

    if(taskdate.toDateString() === new Date().toDateString()){
      return 'Сегодня'
    }

    var currentDate = new Date()  //31.12.2024

    var tomorrow = currentDate;
    tomorrow.setDate(tomorrow.getDate() + 1);  //1.01.2025

    var subtomorrow = new Date();
    subtomorrow.setDate(subtomorrow.getDate() + 2);  //1.01.2025

    var yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);  //30.12.2024

    if(tomorrow.toDateString() == taskdate.toDateString()){
      return 'Завтра'
    }

    if(subtomorrow.toDateString() == taskdate.toDateString()){
      return 'Послезавтра'
    }

    if(yesterday.toDateString() == taskdate.toDateString()){
      return 'Вчера'
    } 

    // else{
    //   var tomorrow = new Date("2020.01.01");
    //   tomorrow.setDate(tomorrow.getDate() - 1);
    //   console.log(tomorrow)
    // }

    return new DatePipe('en').transform(date,format);

  }


}
