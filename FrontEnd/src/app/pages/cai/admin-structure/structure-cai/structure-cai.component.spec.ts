import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StructureCaiComponent } from './structure-cai.component';

describe('StructureCaiComponent', () => {
  let component: StructureCaiComponent;
  let fixture: ComponentFixture<StructureCaiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StructureCaiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StructureCaiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
