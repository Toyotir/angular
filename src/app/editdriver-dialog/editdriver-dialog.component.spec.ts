import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditdriverDialogComponent } from './editdriver-dialog.component';

describe('EditdriverDialogComponent', () => {
  let component: EditdriverDialogComponent;
  let fixture: ComponentFixture<EditdriverDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditdriverDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditdriverDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
