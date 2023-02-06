import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementFacultyComponent } from './management-faculty.component';

describe('ManagementFacultyComponent', () => {
  let component: ManagementFacultyComponent;
  let fixture: ComponentFixture<ManagementFacultyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagementFacultyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagementFacultyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
