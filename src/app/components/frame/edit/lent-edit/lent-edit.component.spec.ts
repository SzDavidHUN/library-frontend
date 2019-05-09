import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {LentEditComponent} from './lent-edit.component';

describe('LentEditComponent', () => {
  let component: LentEditComponent;
  let fixture: ComponentFixture<LentEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LentEditComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LentEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
