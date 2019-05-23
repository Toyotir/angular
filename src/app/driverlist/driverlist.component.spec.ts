import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverlistComponent } from './driverlist.component';

describe('DriverlistComponent', () => {
  let component: DriverlistComponent;
  let fixture: ComponentFixture<DriverlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DriverlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DriverlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
