import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddManualTeacherComponent } from './add-manual-teacher.component';

describe('AddManualTeacherComponent', () => {
  let component: AddManualTeacherComponent;
  let fixture: ComponentFixture<AddManualTeacherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddManualTeacherComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddManualTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
