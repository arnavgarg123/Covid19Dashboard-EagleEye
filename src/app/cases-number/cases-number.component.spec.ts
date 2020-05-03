import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CasesNumberComponent } from './cases-number.component';

describe('CasesNumberComponent', () => {
  let component: CasesNumberComponent;
  let fixture: ComponentFixture<CasesNumberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CasesNumberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CasesNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
