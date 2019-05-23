import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DelcarDialogComponent } from './delcar-dialog.component';

describe('DelcarDialogComponent', () => {
  let component: DelcarDialogComponent;
  let fixture: ComponentFixture<DelcarDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DelcarDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DelcarDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
