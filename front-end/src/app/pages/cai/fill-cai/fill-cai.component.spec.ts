import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FillCaiComponent } from './fill-cai.component';

describe('FillCaiComponent', () => {
  let component: FillCaiComponent;
  let fixture: ComponentFixture<FillCaiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FillCaiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FillCaiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
