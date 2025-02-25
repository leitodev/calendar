import { Component } from '@angular/core';
import {NgForOf} from "@angular/common";

interface Appointment {
  title: string;
  startTime: Date;
  endTime: Date;
  position: string;
}

@Component({
  selector: 'app-appointment-time',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './appointment-time.component.html',
  styleUrl: './appointment-time.component.scss'
})
export class AppointmentTimeComponent {
  time: any = [];
  appointments: Appointment[] = [];

  constructor() {
    for (let i = 0; i < 24; i++) {
      this.time.push({label: `${i.toString().padStart(2, '0')}:00`});
    }
  }

  debug() {
    console.log('this.appointments', this.appointments);
  }

  addAppointment(time: string) {
    const [hour, minute] = time.split(':').map(Number);
    this.appointments.push({
      position: time,
      title: 'New Event',
      startTime: new Date(2025, 1, 26, hour, minute),
      endTime: new Date(2025, 1, 26, hour + 1, minute)
    });
  }

}
