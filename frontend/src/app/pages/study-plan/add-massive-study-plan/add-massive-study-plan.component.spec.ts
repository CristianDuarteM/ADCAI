import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMassiveStudyPlanComponent } from './add-massive-study-plan.component';

describe('AddMassiveStudyPlanComponent', () => {
  let component: AddMassiveStudyPlanComponent;
  let fixture: ComponentFixture<AddMassiveStudyPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMassiveStudyPlanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddMassiveStudyPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
