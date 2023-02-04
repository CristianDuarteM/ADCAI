import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemInvestigationComponent } from './item-investigation.component';

describe('ItemInvestigationComponent', () => {
  let component: ItemInvestigationComponent;
  let fixture: ComponentFixture<ItemInvestigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemInvestigationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemInvestigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
