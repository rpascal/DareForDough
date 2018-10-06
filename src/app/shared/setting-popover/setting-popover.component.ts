import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-setting-popover',
  templateUrl: './setting-popover.component.html',
  styleUrls: ['./setting-popover.component.scss']
})
export class SettingPopoverComponent implements OnInit {

  constructor(public afAuth: AngularFireAuth,
    private navCtrl: NavController,
    private router: Router) { }

  ngOnInit() {
  }


  async logout() {
    try {

      await this.afAuth.auth.signOut();
      window.location.href = '/';
      // this.router.navigateByUrl('/');
      // await this.navCtrl.navigateRoot('/');
      console.log('ksdjklsad');
    } catch (err) {
      console.log(err);
    }
  }
}
