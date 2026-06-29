import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopRatedDishes } from './top-rated-dishes';

describe('TopRatedDishes', () => {
  let component: TopRatedDishes;
  let fixture: ComponentFixture<TopRatedDishes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopRatedDishes],
    }).compileComponents();

    fixture = TestBed.createComponent(TopRatedDishes);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
