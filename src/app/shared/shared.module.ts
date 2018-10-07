import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingPopoverComponent } from './setting-popover/setting-popover.component';
import { IonicModule } from '@ionic/angular';
import { CountDownTimerComponent } from './count-down-timer/count-down-timer.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
  ],
  declarations: [SettingPopoverComponent, CountDownTimerComponent],
  entryComponents: [SettingPopoverComponent],
  exports: [SettingPopoverComponent, CountDownTimerComponent]
})
export class SharedModule { }
