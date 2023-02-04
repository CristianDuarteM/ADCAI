import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchedTeacherComponent } from './searched-teacher.component';

describe('SearchedTeacherComponent', () => {
  let component: SearchedTeacherComponent;
  let fixture: ComponentFixture<SearchedTeacherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchedTeacherComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchedTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
