import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDarePage } from './add-dare.page';

describe('AddDarePage', () => {
  let component: AddDarePage;
  let fixture: ComponentFixture<AddDarePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDarePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDarePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
