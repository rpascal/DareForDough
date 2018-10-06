import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingPopoverComponent } from './setting-popover/setting-popover.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
  ],
  declarations: [SettingPopoverComponent],
  entryComponents: [SettingPopoverComponent],
  exports: [SettingPopoverComponent]
})
export class SharedModule { }
