import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingPopoverComponent } from './setting-popover.component';

describe('SettingPopoverComponent', () => {
  let component: SettingPopoverComponent;
  let fixture: ComponentFixture<SettingPopoverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingPopoverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingPopoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
