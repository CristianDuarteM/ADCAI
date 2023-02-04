import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMassiveSubjectComponent } from './add-massive-subject.component';

describe('AddMassiveSubjectComponent', () => {
  let component: AddMassiveSubjectComponent;
  let fixture: ComponentFixture<AddMassiveSubjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMassiveSubjectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddMassiveSubjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
