import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesShowCase } from './product-categories.component';

describe('ProductCategoriesComponent', () => {
  let component: CategoriesShowCase;
  let fixture: ComponentFixture<CategoriesShowCase>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoriesShowCase ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoriesShowCase);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
