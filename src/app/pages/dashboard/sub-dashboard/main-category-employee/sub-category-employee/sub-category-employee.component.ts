import { Component, Input, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { CategoryService } from '../../../../../@service/category/category.service';

@Component({
  selector: 'ngx-sub-category-employee',
  templateUrl: './sub-category-employee.component.html',
  styleUrls: ['./sub-category-employee.component.scss']
})
export class SubCategoryEmployeeComponent implements OnInit {

  @Input() SubCategoryId: number;

  SubCategory = [];

  SubCategoryDetails = {
    categoryName: [],
    cid: []
  }
  
  constructor(
    protected ref: NbDialogRef<SubCategoryEmployeeComponent>,
    private _mainCategory: CategoryService,
  ) { }

  ngOnInit(): void {
    this._mainCategory.MainCategoryByID(this.SubCategoryId).subscribe((data: any) => {
      this.SubCategoryDetails.categoryName = data.Data.categoryName;
      this.SubCategoryDetails.cid = data.Data.cid;
      this.SubCategory = data.Data.subCategoryList;
    })
  }

  dismiss() {
    this.ref.close();
  }

}
