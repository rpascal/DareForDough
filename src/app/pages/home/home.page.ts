import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { NavController } from '@ionic/angular';

export interface Item { name: string; }

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  private itemDoc: AngularFirestoreDocument<Item>;
  item: Observable<Item>;
  constructor(private afs: AngularFirestore, public navCtrl: NavController) {
    this.itemDoc = afs.doc<Item>('items/1');
    this.item = this.itemDoc.valueChanges();
  }

  update(item: Item) {
    this.itemDoc.update(item);
  }

  addDare() {
    this.navCtrl.navigateForward('add-dare');
  }


}
