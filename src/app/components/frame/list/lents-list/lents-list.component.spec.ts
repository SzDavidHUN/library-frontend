import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {LentsListComponent} from './lents-list.component';

describe('LentsListComponent', () => {
  let component: LentsListComponent;
  let fixture: ComponentFixture<LentsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LentsListComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LentsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
