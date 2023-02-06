import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEvaluateCaiComponent } from './view-evaluate-cai.component';

describe('ViewEvaluateCaiComponent', () => {
  let component: ViewEvaluateCaiComponent;
  let fixture: ComponentFixture<ViewEvaluateCaiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewEvaluateCaiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewEvaluateCaiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
