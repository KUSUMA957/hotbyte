import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMenuComponent } from './add-menu-component';

describe('AddMenuComponent', () => {
  let component: AddMenuComponent;
  let fixture: ComponentFixture<AddMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddMenuComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddMenuComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
