import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostOrderComponent } from './post-order.component';

describe('PostOrderComponent', () => {
  let component: PostOrderComponent;
  let fixture: ComponentFixture<PostOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
