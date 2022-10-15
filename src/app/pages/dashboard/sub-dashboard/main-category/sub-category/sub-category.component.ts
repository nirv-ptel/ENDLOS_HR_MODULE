import { Component, Input, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { CategoryService } from '../../../../../@service/category/category.service';

@Component({
  selector: 'ngx-sub-category',
  templateUrl: './sub-category.component.html',
  styleUrls: ['./sub-category.component.scss']
})
export class SubCategoryComponent implements OnInit {

  @Input() SubCategoryId: number;

  SubCategory = [];

  SubCategoryDetails = {
    categoryName: [],
    cid: []
  }
  constructor(
    protected ref: NbDialogRef<SubCategoryComponent>,
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
