import {Component, OnInit, signal} from '@angular/core';
import {DatePipe, NgForOf} from "@angular/common";
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatIconButton, MatMiniFabButton} from "@angular/material/button";
import {MatCard, MatCardContent} from "@angular/material/card";
import {AppointmentTimeComponent} from "./appointment-time/appointment-time.component";

type DateData = {
  day: number;
  month: number;
  year: number;
};

type RangeData = [DateData, DateData];

/* TODO
*   range pick
*   settings
* */
@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [
    DatePipe,
    NgForOf,
    MatIcon,
    MatButton,
    MatMiniFabButton,
    MatIconButton,
    MatCardContent,
    MatCard,
    AppointmentTimeComponent
  ],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss'
})
export class CalendarComponent implements OnInit {
  currentDay = new Date().getDate();
  currentMonth = new Date().getMonth();
  currentDate = new Date();
  currentStateDate = new Date();
  days: {day: number, selected: boolean}[] = [];

  private currentSelectedDates: any = {
    order: []
  };
  mode: 'single' | 'range' = 'range';
  private selectedDays = 0;

  isCalendarVisible = false;
  selectedDate = { start: '', end: ''};

  ngOnInit() {
    this.generateCalendar();
  }

  toggleCalendar() {
    this.isCalendarVisible = !this.isCalendarVisible;
  }

  generateCalendar() {
    const monthDays: any = [];
    const year = this.currentStateDate.getFullYear();
    const month = this.currentStateDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay(); // index of first day

    // day of month
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const emptyDays = Array(firstDay).fill({day: 0, selected: false});

    for (let i = 1; i <= daysInMonth; i++) {
      const key = `${i}_${month+1}_${year}`;
      monthDays.push({day: i, selected: this.isSelectedByKey(key)});
    };

    this.days = [...emptyDays, ...monthDays];
  }

  changeMonth(offset: number) {
    this.currentStateDate = new Date(this.currentStateDate.setMonth(this.currentStateDate.getMonth() + offset));
    this.generateCalendar();
  }

  isSelectedByKey(key: string): boolean {
    return this.currentSelectedDates.hasOwnProperty(key);
  }

  selectDay(day: number) {
    this.handleSelectionByMode(this.mode, day);
    console.log(':currentSelectedDates:', this.currentSelectedDates)
  }

  handleSelectionByMode(mode: string, day: number) {
    const month = this.currentStateDate.getMonth() + 1;
    const year = this.currentStateDate.getFullYear();
    const key = `${day}_${month}_${year}`;

    if (mode === 'single') {
      this.currentSelectedDates = {order: []};
      this.currentSelectedDates[key] = {day,month,year};
      this.currentSelectedDates['order'].push({day,month,year});
      this.handleOneDaySelect(day);
    }

    if (mode === 'range' && this.selectedDays < 2) {
      this.currentSelectedDates[key] = {day,month,year};
      this.currentSelectedDates['order'].push({day,month,year});
      this.handleMultiDaySelect(day);
    }
  }

  handleOneDaySelect(day: number) {
    this.days.forEach(item => {
      item.selected = false;
      if (item.day === day) {
        item.selected = true;
      }
    });

    this.getSingleDate();
    this.isCalendarVisible = false;
  }

  handleMultiDaySelect(day: number) {
    this.days.forEach(item => {
      if (item.day === day) {
        item.selected = true;
        this.selectedDays++;
      }
    });

    if (this.selectedDays > 1) {
      this.getRangeDate();
      this.isCalendarVisible = false;
    }
  }

  getSingleDate() {
    const first = this.currentSelectedDates.order[0];

    this.selectedDate = {
      start: new Date(first.year, first.month - 1, first.day).toISOString(),
      end: ''
    };
  }

  getRangeDate() {
    this.selectedDate = this.convertRangeToISODate(this.currentSelectedDates.order);
  }

  convertRangeToISODate(rangeData: RangeData) {
    const first = rangeData[0];
    const last = rangeData[1];

    return {
      start: new Date(first.year, first.month - 1, first.day).toISOString(),
      end: new Date(last.year, last.month - 1, last.day).toISOString()
    };
  }


}
