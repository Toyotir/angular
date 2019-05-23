import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapsheetComponent } from './mapsheet.component';

describe('MapsheetComponent', () => {
  let component: MapsheetComponent;
  let fixture: ComponentFixture<MapsheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapsheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapsheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
