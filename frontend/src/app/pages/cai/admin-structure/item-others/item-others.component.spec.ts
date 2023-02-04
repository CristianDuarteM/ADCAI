import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemOthersComponent } from './item-others.component';

describe('ItemOthersComponent', () => {
  let component: ItemOthersComponent;
  let fixture: ComponentFixture<ItemOthersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemOthersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemOthersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
