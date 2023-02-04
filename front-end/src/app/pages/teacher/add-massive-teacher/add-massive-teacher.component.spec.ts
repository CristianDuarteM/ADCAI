import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMassiveTeacherComponent } from './add-massive-teacher.component';

describe('AddMassiveTeacherComponent', () => {
  let component: AddMassiveTeacherComponent;
  let fixture: ComponentFixture<AddMassiveTeacherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMassiveTeacherComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddMassiveTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
