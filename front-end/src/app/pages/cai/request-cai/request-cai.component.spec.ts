import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestCaiComponent } from './request-cai.component';

describe('RequestCaiComponent', () => {
  let component: RequestCaiComponent;
  let fixture: ComponentFixture<RequestCaiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestCaiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestCaiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
