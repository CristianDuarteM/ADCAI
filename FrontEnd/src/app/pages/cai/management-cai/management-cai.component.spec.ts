import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementCaiComponent } from './management-cai.component';

describe('ManagementCaiComponent', () => {
  let component: ManagementCaiComponent;
  let fixture: ComponentFixture<ManagementCaiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagementCaiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagementCaiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
