import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddcarDialogComponent } from './addcar-dialog.component';

describe('AddcarDialogComponent', () => {
  let component: AddcarDialogComponent;
  let fixture: ComponentFixture<AddcarDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddcarDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddcarDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
