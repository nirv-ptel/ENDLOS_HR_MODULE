import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainCategoryEmployeeComponent } from './main-category-employee.component';

describe('MainCategoryEmployeeComponent', () => {
  let component: MainCategoryEmployeeComponent;
  let fixture: ComponentFixture<MainCategoryEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainCategoryEmployeeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainCategoryEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
