import { Component, OnInit, Input } from '@angular/core';
import { interval, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-count-down-timer',
  templateUrl: './count-down-timer.component.html',
  styleUrls: ['./count-down-timer.component.scss']
})
export class CountDownTimerComponent implements OnInit {

  @Input() date: any;
  counter$: Observable<any>;

  constructor() { }

  ngOnInit() {
    console.log(this.date);
    this.counter$ = this.getCounter();
  }

  getCounter() {
    const createdOn = new Date(this.date);
    createdOn.setDate(createdOn.getDate() + 1);
    return interval(1000).pipe(
      map((x) => {
        const milliSeconds = createdOn.getTime() - new Date().getTime();

        const seconds = (milliSeconds / 1000) % 60;
        const minutes = ((milliSeconds / (1000 * 60)) % 60);
        const hours = ((milliSeconds / (1000 * 60 * 60)) % 24);
        return {
          seconds: Math.floor(seconds),
          mins: Math.floor(minutes),
          hours: Math.floor(hours)
        }
      }));
  }

}
