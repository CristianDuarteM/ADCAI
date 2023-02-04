import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemExtensionComponent } from './item-extension.component';

describe('ItemExtensionComponent', () => {
  let component: ItemExtensionComponent;
  let fixture: ComponentFixture<ItemExtensionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemExtensionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemExtensionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
