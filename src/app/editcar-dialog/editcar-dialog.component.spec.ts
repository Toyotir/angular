import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditcarDialogComponent } from './editcar-dialog.component';

describe('EditcarDialogComponent', () => {
  let component: EditcarDialogComponent;
  let fixture: ComponentFixture<EditcarDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditcarDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditcarDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
