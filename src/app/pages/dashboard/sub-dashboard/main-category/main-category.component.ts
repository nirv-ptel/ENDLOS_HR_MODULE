import { Component, OnInit } from '@angular/core';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import { CategoryService } from '../../../../@service/category/category.service';
import { SubCategoryComponent } from './sub-category/sub-category.component';

@Component({
  selector: 'ngx-main-category',
  templateUrl: './main-category.component.html',
  styleUrls: ['./main-category.component.scss']
})
export class MainCategoryComponent implements OnInit {

  MainCategorySource: [];
  NbDialogRef: any;

  constructor(
    protected ref: NbDialogRef<MainCategoryComponent>,
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
      SubCategoryComponent,
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
