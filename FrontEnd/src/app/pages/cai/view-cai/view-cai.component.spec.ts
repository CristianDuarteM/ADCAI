import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCaiComponent } from './view-cai.component';

describe('ViewCaiComponent', () => {
  let component: ViewCaiComponent;
  let fixture: ComponentFixture<ViewCaiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewCaiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewCaiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
