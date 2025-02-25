import {Component, OnInit, signal} from '@angular/core';
import {DatePipe, NgForOf} from "@angular/common";
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatIconButton, MatMiniFabButton} from "@angular/material/button";
import {MatCard, MatCardContent} from "@angular/material/card";
import {AppointmentTimeComponent} from "./appointment-time/appointment-time.component";

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
  days: number[] = [];

  ngOnInit() {
    this.generateCalendar();
  }

  generateCalendar() {
    const monthDays = [];
    const year = this.currentStateDate.getFullYear();
    const month = this.currentStateDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay(); // index of first day

    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const emptyDays = Array(firstDay).fill(0);
    for (let i = 1; i <= daysInMonth; i++) {
      monthDays.push(i);
    };

    this.days = [...emptyDays, ...monthDays];
  }

  changeMonth(offset: number) {
    this.currentStateDate = new Date(this.currentStateDate.setMonth(this.currentStateDate.getMonth() + offset));
    this.generateCalendar();
  }

}
