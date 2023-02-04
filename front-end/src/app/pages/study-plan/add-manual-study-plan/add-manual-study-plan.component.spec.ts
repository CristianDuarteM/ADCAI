import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddManualStudyPlanComponent } from './add-manual-study-plan.component';

describe('AddManualStudyPlanComponent', () => {
  let component: AddManualStudyPlanComponent;
  let fixture: ComponentFixture<AddManualStudyPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddManualStudyPlanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddManualStudyPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
