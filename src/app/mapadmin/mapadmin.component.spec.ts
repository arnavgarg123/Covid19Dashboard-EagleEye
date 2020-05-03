import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapadminComponent } from './mapadmin.component';

describe('MapadminComponent', () => {
  let component: MapadminComponent;
  let fixture: ComponentFixture<MapadminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapadminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
