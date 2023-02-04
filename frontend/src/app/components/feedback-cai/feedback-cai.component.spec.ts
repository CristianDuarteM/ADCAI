import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackCaiComponent } from './feedback-cai.component';

describe('FeedbackCaiComponent', () => {
  let component: FeedbackCaiComponent;
  let fixture: ComponentFixture<FeedbackCaiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeedbackCaiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeedbackCaiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
