import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStudyPlanComponent } from './add-study-plan.component';

describe('AddStudyPlanComponent', () => {
  let component: AddStudyPlanComponent;
  let fixture: ComponentFixture<AddStudyPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddStudyPlanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddStudyPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
