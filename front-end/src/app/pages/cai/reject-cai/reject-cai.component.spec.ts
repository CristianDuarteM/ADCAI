import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectCaiComponent } from './reject-cai.component';

describe('RejectCaiComponent', () => {
  let component: RejectCaiComponent;
  let fixture: ComponentFixture<RejectCaiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RejectCaiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RejectCaiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
