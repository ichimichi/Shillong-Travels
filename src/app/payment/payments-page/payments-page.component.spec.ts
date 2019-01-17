import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentsPageComponent } from './payments-page.component';

describe('PaymentsPageComponent', () => {
  let component: PaymentsPageComponent;
  let fixture: ComponentFixture<PaymentsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
