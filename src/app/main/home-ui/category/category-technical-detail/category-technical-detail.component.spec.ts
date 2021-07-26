import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryTechnicalDetailComponent } from './category-technical-detail.component';

describe('CategoryTechnicalDetailComponent', () => {
  let component: CategoryTechnicalDetailComponent;
  let fixture: ComponentFixture<CategoryTechnicalDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryTechnicalDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryTechnicalDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
