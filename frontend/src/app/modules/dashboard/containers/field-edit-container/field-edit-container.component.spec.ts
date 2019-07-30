import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldEditContainerComponent } from './field-edit-container.component';

describe('FieldEditContainerComponent', () => {
  let component: FieldEditContainerComponent;
  let fixture: ComponentFixture<FieldEditContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FieldEditContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldEditContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
