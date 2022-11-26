import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrincipalRowComponent } from './principal-row.component';

describe('PrincipalRowComponent', () => {
  let component: PrincipalRowComponent;
  let fixture: ComponentFixture<PrincipalRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrincipalRowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrincipalRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
