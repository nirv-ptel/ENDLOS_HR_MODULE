import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
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

  constructor(
    private dialogService: NbDialogService,
  ) {
  }

  events: any = [
    {
      title: "Long Event",
      start: "2022-10-10",
      end: "2022-10-15", background: "linear-gradient(90deg, pink 80%, cyan 0%)"
    },
    { title: 'absent', date: '2022-10-06', color: '#ff00ff' },
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

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    dayMaxEvents: true,
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,dayGridWeek,dayGridDay',
    },
    dateClick: this.handleDateClick.bind(this), // bind is important!
    events: this.events,
    eventDidMount: function (info) {
      if (info.event.extendedProps.background) {
        info.el.style.background = info.event.extendedProps.background;
      }
    },
   
  };

  handleDateClick(arg) {
    this.NbDialogRef = this.dialogService.open(
      CalenderComponent,
      {
        context: {
          EventDate: arg.dateStr
        },
        closeOnBackdropClick: false,
      }).onClose.subscribe((data) => {
        this.ngOnInit();
      }
      )
    // let event =  { title: 'Present', date: arg.dateStr}
    // this.events.push(event);
  }

  ngOnDestroy() {
  }
}
