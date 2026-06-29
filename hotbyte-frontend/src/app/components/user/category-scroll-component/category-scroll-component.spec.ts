import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryScrollComponent } from './category-scroll-component';

describe('CategoryScrollComponent', () => {
  let component: CategoryScrollComponent;
  let fixture: ComponentFixture<CategoryScrollComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryScrollComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CategoryScrollComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
