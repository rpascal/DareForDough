import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  constructor(public afAuth: AngularFireAuth,
    private navCtrl: NavController,
    private router: Router) {
  }
  async login() {
    try {
      await this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
      this.navCtrl.navigateRoot('/');
    } catch (err) {
      console.log(err);
    }
  }

}
