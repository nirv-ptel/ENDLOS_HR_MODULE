import { NgModule } from '@angular/core';
import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbTabsetModule,
  NbUserModule,
  NbRadioModule,
  NbSelectModule,
  NbListModule,
  NbIconModule,
  NbInputModule,
  NbDialogModule,
} from '@nebular/theme';
import { NgxEchartsModule } from 'ngx-echarts';
import { FullCalendarModule } from '@fullcalendar/angular'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from '@fullcalendar/interaction'; // a plugin!
import { ThemeModule } from '../../@theme/theme.module';
import { DashboardComponent } from './dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalenderComponent } from './calender/calender.component';
import { CommonModule } from '@angular/common';
import { SubDashboardComponent } from './sub-dashboard/sub-dashboard.component';
import { MainCategoryComponent } from './sub-dashboard/main-category/main-category.component';
import { MainCategoryEmployeeComponent } from './sub-dashboard/main-category-employee/main-category-employee.component';
import { SubCategoryEmployeeComponent } from './sub-dashboard/main-category-employee/sub-category-employee/sub-category-employee.component';
import { SubCategoryComponent } from './sub-dashboard/main-category/sub-category/sub-category.component';

FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin
]);

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ThemeModule,
    NbCardModule,
    NbUserModule,
    NbButtonModule,
    NbTabsetModule,
    NbInputModule,
    NbActionsModule,
    NbRadioModule,
    NbSelectModule,
    NbListModule,
    NbIconModule,
    NbButtonModule,
    NbDialogModule.forChild(),
    ReactiveFormsModule,
    NgxEchartsModule,
    FullCalendarModule 
  ],
  declarations: [
    DashboardComponent,
    CalenderComponent,
    SubDashboardComponent,
    MainCategoryComponent,
    MainCategoryEmployeeComponent,
    SubCategoryEmployeeComponent,
    SubCategoryComponent,
  ],
})
export class DashboardModule { }
