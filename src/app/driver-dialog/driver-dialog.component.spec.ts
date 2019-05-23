import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverDialogComponent } from './driver-dialog.component';

describe('DriverDialogComponent', () => {
  let component: DriverDialogComponent;
  let fixture: ComponentFixture<DriverDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DriverDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DriverDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
