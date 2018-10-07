import { Component, OnInit } from '@angular/core';
import { BaseFireStoreService } from '../../core';
import { IDareOpts } from '../../entities';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoggerService } from '../../core/logger';
import { NavController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-add-dare',
  templateUrl: './add-dare.page.html',
  styleUrls: ['./add-dare.page.scss'],
})
export class AddDarePage implements OnInit {
  form: FormGroup;

  constructor(
    private navCtrl: NavController,
    private baseFireStore: BaseFireStoreService,
    private formBuilder: FormBuilder,
    private logger: LoggerService,
    private auth: AngularFireAuth,
  ) { }


  ngOnInit() {
    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
    });

  }

  submit() {
    if (this.form.invalid) {
      return;
    }

    this.auth.user.pipe(first()).subscribe(async user => {
      try {
        if (user) {
          await this.baseFireStore.getCollection('dares').add({
            ...this.form.getRawValue(),
            creator: user.email,
            createdOn: Date.now()
          });
          this.logger.presentToast('Added Dare');
          this.navCtrl.goBack();
        }
      } catch (err) {
        this.logger.presentToast('Error creating dare');
      }

    })
  }

  cancel() {
    this.navCtrl.navigateRoot('');

  }

}
