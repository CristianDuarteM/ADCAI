import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadFileSignatureComponent } from './load-file-signature.component';

describe('LoadFileSignatureComponent', () => {
  let component: LoadFileSignatureComponent;
  let fixture: ComponentFixture<LoadFileSignatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoadFileSignatureComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoadFileSignatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
