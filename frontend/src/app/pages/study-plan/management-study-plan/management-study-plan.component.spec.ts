import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementStudyPlanComponent } from './management-study-plan.component';

describe('ManagementStudyPlanComponent', () => {
  let component: ManagementStudyPlanComponent;
  let fixture: ComponentFixture<ManagementStudyPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagementStudyPlanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagementStudyPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
