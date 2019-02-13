import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgroMapComponent } from './agro-map.component';

describe('AgroMapComponent', () => {
  let component: AgroMapComponent;
  let fixture: ComponentFixture<AgroMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgroMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgroMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
