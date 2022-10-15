import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubCategoryEmployeeComponent } from './sub-category-employee.component';

describe('SubCategoryEmployeeComponent', () => {
  let component: SubCategoryEmployeeComponent;
  let fixture: ComponentFixture<SubCategoryEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubCategoryEmployeeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubCategoryEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
