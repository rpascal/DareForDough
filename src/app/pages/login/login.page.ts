import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';
import { NavController, Platform } from '@ionic/angular';
import { Router } from '@angular/router';

import * as firebase from 'firebase/app';

import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { LoggerService } from '../../core/logger';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  err: any;
  form: FormGroup;

  constructor(public afAuth: AngularFireAuth,
    private navCtrl: NavController,
    private router: Router,
    private googlePlus: GooglePlus,
    private logger: LoggerService,
    private platform: Platform,
    private fb: FormBuilder) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });
  }

  async basicLogin() {
    let data = this.form.value;

    if (!data.email) {
      return;
    }

    try {
      await this.afAuth.auth.signInWithEmailAndPassword(data.email, data.password);
      this.navCtrl.navigateRoot('/');

    } catch (err) {
      this.logger.presentToast("Error loggin in check username and password");
    }
  }

  async doRegister() {
    let data = this.form.value;

    if (!data.email) {
      return;
    }

    try {
      await this.afAuth.auth.createUserWithEmailAndPassword(data.email, data.password);
      this.navCtrl.navigateRoot('/');

    } catch (err) {
      this.logger.presentToast("Error registering");
    }
  }

  async login() {
    try {
      if (this.platform.is('cordova')) {
        await this.nativeGoogleLogin();
      } else {
        await this.webGoogleLogin();
      }
      this.logger.presentToast('nav');

      this.navCtrl.navigateRoot('/');
    } catch (err) {
      this.logger.presentToast(JSON.stringify(err));

      this.err = err;
      console.log(err);
    }
  }

  async webGoogleLogin(): Promise<any> {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.afAuth.auth.signInWithPopup(provider);
  }

  async nativeGoogleLogin(): Promise<any> {
    this.logger.presentToast('pre native');
    const gplusUser = await this.googlePlus.login({
      'webClientId': '653958597964-k57ic89a5jsejve498pnuaul6sqm575u.apps.googleusercontent.com',
      'offline': true,
      'scopes': 'profile email'
    })
    this.logger.presentToast('post native');

    return this.afAuth.auth.signInWithCredential(firebase.auth.GoogleAuthProvider.credential(gplusUser.idToken))
  }


}
