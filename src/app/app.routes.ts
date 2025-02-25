import { Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {ContactComponent} from "./contact/contact.component";
import {CalendarComponent} from "./calendar/calendar.component";

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Home page',
  },
  {
    path: 'calendar',
    component: CalendarComponent,
    title: 'Calendar page',
  },
  {
    path: 'contact',
    component: ContactComponent,
    title: 'Contact page',
  },
];
