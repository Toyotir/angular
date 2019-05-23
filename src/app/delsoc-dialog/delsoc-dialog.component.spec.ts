import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DelsocDialogComponent } from './delsoc-dialog.component';

describe('DelsocDialogComponent', () => {
  let component: DelsocDialogComponent;
  let fixture: ComponentFixture<DelsocDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DelsocDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DelsocDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
