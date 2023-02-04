import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemRepresentationComponent } from './item-representation.component';

describe('ItemRepresentationComponent', () => {
  let component: ItemRepresentationComponent;
  let fixture: ComponentFixture<ItemRepresentationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemRepresentationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemRepresentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
