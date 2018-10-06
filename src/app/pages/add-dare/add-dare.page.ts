import { Component, OnInit } from '@angular/core';
import { BaseFireStoreService } from '../../core';
import { IDareOpts } from '../../entities';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoggerService } from '../../core/logger';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-add-dare',
  templateUrl: './add-dare.page.html',
  styleUrls: ['./add-dare.page.scss'],
})
export class AddDarePage implements OnInit {
  private form: FormGroup;

  constructor(
    private navCtrl: NavController,
    private baseFireStore: BaseFireStoreService,
    private formBuilder: FormBuilder,
    private logger: LoggerService) { }


  ngOnInit() {
    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
    });

  }

  async submit() {
    if (this.form.invalid) {
      return;
    }
    try {

      await this.baseFireStore.getCollection('dares').add({ ...this.form.getRawValue(), 
        creator: 'Admin',
        createdOn: Date.now()
      });
      this.logger.presentToast('Added Dare');
      this.navCtrl.goBack();
    } catch (err) {
      this.logger.presentToast('Error creating dare');
    }
  }

  cancel() {
    this.navCtrl.navigateRoot('');

  }

}
