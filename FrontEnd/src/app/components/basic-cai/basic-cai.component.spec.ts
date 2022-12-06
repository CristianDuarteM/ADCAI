import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicCaiComponent } from './basic-cai.component';

describe('BasicCaiComponent', () => {
  let component: BasicCaiComponent;
  let fixture: ComponentFixture<BasicCaiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasicCaiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BasicCaiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
