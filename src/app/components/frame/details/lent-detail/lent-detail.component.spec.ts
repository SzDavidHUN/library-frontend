import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {LentDetailComponent} from './lent-detail.component';

describe('LentDetailComponent', () => {
  let component: LentDetailComponent;
  let fixture: ComponentFixture<LentDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LentDetailComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LentDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
