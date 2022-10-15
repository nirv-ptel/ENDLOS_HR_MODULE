import { Component, EventEmitter, OnDestroy, OnInit, Output, TemplateRef } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';
import { NbDialogService, NbThemeService } from '@nebular/theme';
import { CalenderComponent } from './calender/calender.component';

interface CardSettings {
  title: string;
  iconClass: string;
  type: string;
}

@Component({
  selector: 'ngx-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit, OnDestroy {
  NbDialogRef = null;

  @Output() countChanged: EventEmitter<any> =   new EventEmitter();
  constructor(
    private dialogService: NbDialogService,
  ) {  }

  events: any = 
  [
    {
      title: "Long Event",
      start: "2022-10-10",
      end: "2022-10-15", background: "linear-gradient(90deg, pink 80%, cyan 0%)"
    },
    { title: 'absent', date: '2022-10-06', color: '#ff00ff' },
    { title: 'aaaabsent', date: '2022-10-06', color: '#ff00ff' },
    { title: 'vvvvv', date: '2022-10-06', color: '#ff00ff' },
    { title: 'wwwww', date: '2022-10-06', color: '#ff00ff' },
    { title: 'Present', date: '2022-10-07', color: '#0000ff' },
  ]

  PresentDay: number = 0;
  AbsentDay: number = 0;

  ngOnInit(): void {
    this.events.forEach((e: { [x: string]: string; }) => {
      if (e["title"] == 'Present') {
        this.PresentDay++;
      } else {
        this.AbsentDay++;
      }
    })
  }

  // calendarOptions: CalendarOptions = {
  //   initialView: 'dayGridMonth',
  //   dayMaxEvents: true,
  //   height:700,
  //   headerToolbar: {
  //     left: 'prev,next today',
  //     center: 'title',
  //     right: 'dayGridMonth,dayGridWeek,dayGridDay listDay',
  //   },
  //   views: {
  //     listDay: { buttonText: 'list day' },
  //     listWeek: { buttonText: 'list week' },
  //     listMonth: { buttonText: 'list month' }
  //   },
  //   dateClick: this.handleDateClick.bind(this), // bind is important!
  //   events: this.events,
  //   eventDidMount: function (info) {
  //     if (info.event.extendedProps.background) {
  //       info.el.style.background = info.event.extendedProps.background;
  //     }
  //   },
  // };

  calendarOptions: CalendarOptions = {
   timeZone: 'UTC',
    themeSystem: 'bootstrap5',
    height:700,
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,dayGridWeek,dayGridDay,listMonth'
    },
    dateClick: this.handleDateClick.bind(this),
    weekNumbers: true,
    dayMaxEvents: true, // allow "more" link when too many events
    events: this.events,
}

  handleDateClick(arg) {
    this.NbDialogRef = this.dialogService.open(
      CalenderComponent,
      {
        context: {
          EventDate: arg.dateStr
        },
        closeOnBackdropClick: false,
      }).onClose.subscribe((data) => {
       if(data != null) {
        this.events.push(data);
       }
      }
      )
    // let event =  { title: 'Present', date: arg.dateStr}
    // this.events.push(event);
  }

  ngOnDestroy() {
  }
}
