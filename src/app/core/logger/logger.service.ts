import { Injectable } from '@angular/core';
import { CoreModule } from '../core.module';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AngularFirestore, QueryFn } from '@angular/fire/firestore';
import { ToastController } from '@ionic/angular';
import { ToastOptions } from '@ionic/core';

@Injectable({
    providedIn: CoreModule
})
export class LoggerService {

    constructor(public toastController: ToastController) { }

    async presentToast(message: string, opts?: ToastOptions) {
        const toast = await this.toastController.create(Object.assign({
            message: message,
            duration: 3000
        }, opts || {}));
        toast.present();
    }

}
