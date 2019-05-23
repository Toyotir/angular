import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeldriverDialogComponent } from './deldriver-dialog.component';

describe('DeldriverDialogComponent', () => {
  let component: DeldriverDialogComponent;
  let fixture: ComponentFixture<DeldriverDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeldriverDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeldriverDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
