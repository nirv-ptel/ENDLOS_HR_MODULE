import { Component, OnInit, TemplateRef } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { Chart } from 'chart.js';
import { MainCategoryEmployeeComponent } from './main-category-employee/main-category-employee.component';
import { MainCategoryComponent } from './main-category/main-category.component';

@Component({
  selector: 'ngx-sub-dashboard',
  templateUrl: './sub-dashboard.component.html',
  styleUrls: ['./sub-dashboard.component.scss']
})
export class SubDashboardComponent implements OnInit {

  chart;
  NbDialogRef: any;
  
  constructor(
    private dialogService: NbDialogService,
  ) { }

  ngOnInit(): void {
    const data = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [{
        label: 'Try hiding me',
        data: [65, 59, 80, 81, 26, 55, 40],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
      },
      {
        label: 'Try  me',
        data: [23, 65, 43, 23, 26, 50, 20],
        fill: false,
        borderColor: 'rgb(75, 000, 192)',
      }]
    };

    this.chart = new Chart('canvas', {
      type: 'line',
      data: data,
      options: {
        transitions: {
          show: {
            animations: {
              x: {
                from: 0
              },
              y: {
                from: 0
              }
            }
          },
          hide: {
            animations: {
              x: {
                to: 0
              },
              y: {
                to: 0
              }
            }
          }
        }
      }
    });
    this.chart = new Chart('canvas1', {
      type: 'line',
      data: data,
      options: {
        transitions: {
          show: {
            animations: {
              x: {
                from: 0
              },
              y: {
                from: 0
              }
            }
          },
          hide: {
            animations: {
              x: {
                to: 0
              },
              y: {
                to: 0
              }
            }
          }
        }
      }
    });
    this.chart = new Chart('canvas2', {
      type: 'line',
      data: data,
      options: {
        transitions: {
          show: {
            animations: {
              x: {
                from: 0
              },
              y: {
                from: 0
              }
            }
          },
          hide: {
            animations: {
              x: {
                to: 0
              },
              y: {
                to: 0
              }
            }
          }
        }
      }
    });
  }

  categoryOpenSalary() {
    this.NbDialogRef = this.dialogService.open(
      MainCategoryComponent,
      {
        closeOnBackdropClick: false,
      }).onClose.subscribe((data) => {
        this.ngOnInit();
      }
      )
  }
  categoryOpenEmployee() {
    this.NbDialogRef = this.dialogService.open(
      MainCategoryEmployeeComponent,
      {
        closeOnBackdropClick: false,
      }).onClose.subscribe((data) => {
        this.ngOnInit();
      }
      )
  }
}
