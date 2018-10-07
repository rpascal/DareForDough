import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, DocumentChangeAction } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { NavController, PopoverController } from '@ionic/angular';
import { BaseFireStoreService, NavService } from '../../core';
import { IDareOpts } from '../../entities';
import { SettingPopoverComponent } from '../../shared/setting-popover/setting-popover.component';
import { map } from 'rxjs/operators';

export interface Item { name: string; }

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  dares: Observable<IDareOpts[]>;

  constructor(public navCtrl: NavController,
    private baseFireStore: BaseFireStoreService,
    private popoverController: PopoverController,
    private navService: NavService<IDareOpts>) {
  }


  ngOnInit() {
    this.dares = this.baseFireStore.getCollection<IDareOpts>('dares').snapshotChanges()
      .pipe(map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as IDareOpts;
          const id = a.payload.doc.id;
          return { id: id, ...data };
        });
      }));
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

  selectDare(dare: IDareOpts) {
    this.navService.data = dare;
    this.navCtrl.navigateForward("/dare");
  }

}
