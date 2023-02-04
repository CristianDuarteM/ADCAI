import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateRequestCaiComponent } from './update-request-cai.component';

describe('UpdateRequestCaiComponent', () => {
  let component: UpdateRequestCaiComponent;
  let fixture: ComponentFixture<UpdateRequestCaiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateRequestCaiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateRequestCaiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
