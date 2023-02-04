import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddManualSubjectComponent } from './add-manual-subject.component';

describe('AddManualSubjectComponent', () => {
  let component: AddManualSubjectComponent;
  let fixture: ComponentFixture<AddManualSubjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddManualSubjectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddManualSubjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
