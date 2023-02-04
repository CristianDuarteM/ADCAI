import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidateCaiComponent } from './validate-cai.component';

describe('ValidateCaiComponent', () => {
  let component: ValidateCaiComponent;
  let fixture: ComponentFixture<ValidateCaiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidateCaiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValidateCaiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
