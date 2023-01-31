import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewStudyPlanComponent } from './view-study-plan.component';

describe('ViewStudyPlanComponent', () => {
  let component: ViewStudyPlanComponent;
  let fixture: ComponentFixture<ViewStudyPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewStudyPlanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewStudyPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
