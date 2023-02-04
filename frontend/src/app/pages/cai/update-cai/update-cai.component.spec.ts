import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCaiComponent } from './update-cai.component';

describe('UpdateCaiComponent', () => {
  let component: UpdateCaiComponent;
  let fixture: ComponentFixture<UpdateCaiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateCaiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateCaiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
