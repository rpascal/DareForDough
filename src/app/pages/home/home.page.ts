import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { NavController, PopoverController } from '@ionic/angular';
import { BaseFireStoreService } from '../../core';
import { IDareOpts } from '../../entities';
import { SettingPopoverComponent } from '../../shared/setting-popover/setting-popover.component';

export interface Item { name: string; }

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  private dares: Observable<IDareOpts[]>;

  constructor(public navCtrl: NavController,
    private baseFireStore: BaseFireStoreService,
    private popoverController: PopoverController) {
  }


  ngOnInit() {
    this.dares = this.baseFireStore.getCollection<IDareOpts>('dares').valueChanges();
  }

  addDare() {
    this.navCtrl.navigateForward('add-dare');
  }

  async presentSettings() {
    const popover = await this.popoverController.create({
      component: SettingPopoverComponent
    });
    return await popover.present();
  }


}
