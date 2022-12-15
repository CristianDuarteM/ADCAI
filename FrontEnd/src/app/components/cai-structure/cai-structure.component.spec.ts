import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaiStructureComponent } from './cai-structure.component';

describe('CaiStructureComponent', () => {
  let component: CaiStructureComponent;
  let fixture: ComponentFixture<CaiStructureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CaiStructureComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CaiStructureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
