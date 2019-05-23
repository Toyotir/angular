import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SoceditDialogComponent } from './socedit-dialog.component';

describe('SoceditDialogComponent', () => {
  let component: SoceditDialogComponent;
  let fixture: ComponentFixture<SoceditDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SoceditDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SoceditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
