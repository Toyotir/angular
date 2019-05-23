import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SocaddDialogComponent } from './socadd-dialog.component';

describe('SocaddDialogComponent', () => {
  let component: SocaddDialogComponent;
  let fixture: ComponentFixture<SocaddDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SocaddDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocaddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
