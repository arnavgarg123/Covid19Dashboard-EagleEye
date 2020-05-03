import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionDetectComponent } from './action-detect.component';

describe('ActionDetectComponent', () => {
  let component: ActionDetectComponent;
  let fixture: ComponentFixture<ActionDetectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionDetectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionDetectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
