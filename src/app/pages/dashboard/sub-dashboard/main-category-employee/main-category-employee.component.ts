import { Component, OnInit } from '@angular/core';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import { CategoryService } from '../../../../@service/category/category.service';
import { SubCategoryEmployeeComponent } from './sub-category-employee/sub-category-employee.component';

@Component({
  selector: 'ngx-main-category-employee',
  templateUrl: './main-category-employee.component.html',
  styleUrls: ['./main-category-employee.component.scss']
})
export class MainCategoryEmployeeComponent implements OnInit {

  MainCategorySource: [];
  NbDialogRef: any;

  constructor(
    protected ref: NbDialogRef<MainCategoryEmployeeComponent>,
    private _mainCategory: CategoryService,
    private dialogService: NbDialogService,
  ) { }

  ngOnInit(): void {
    this._mainCategory.ViewMainCategory().subscribe((data: any) => {
      this.MainCategorySource = data.Data;
    })
  }

  dismiss() {
    this.ref.close();
  }

  subcategory(event) {
    this.NbDialogRef = this.dialogService.open(
      SubCategoryEmployeeComponent,
      {
        context: {
          SubCategoryId: event
        },
        closeOnBackdropClick: false,
      }).onClose.subscribe((data) => {
        this.ngOnInit();
      }
      )
  }

}
