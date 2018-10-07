import { Component, OnInit, OnDestroy } from '@angular/core';
import { IDareOpts } from '../../entities';
import { NavService, BaseFireStoreService } from '../../core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable, forkJoin, zip, Subject } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';
import { FirebaseAuth } from '@angular/fire';
import { AngularFireAuth } from '@angular/fire/auth';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-dare',
  templateUrl: './dare.page.html',
  styleUrls: ['./dare.page.scss'],
})
export class DarePage implements OnInit, OnDestroy {

  dare: IDareOpts;

  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;

  vids: Observable<any[]>;

  stop$: Subject<void>;

  constructor(private navService: NavService<IDareOpts>,
    private navCtrl: NavController,
    private baseFireStore: BaseFireStoreService,
    private auth: AngularFireAuth,
    private storage: AngularFireStorage) { 
      this.stop$ = new Subject<void>();
    }

  uploadFile(event) {
    const file = event.target.files[0];
    const filePath = this.baseFireStore.getId();
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    // observe percentage changes
    this.uploadPercent = task.percentageChanges().pipe(takeUntil(this.stop$));
    // get notified when the download URL is available
    task.snapshotChanges().pipe(
      takeUntil(this.stop$),
      finalize(() => {
        console.log("data");

        zip(
          this.auth.user,
          fileRef.getDownloadURL()
        ).pipe(takeUntil(this.stop$)).subscribe(data => {
          const user = data[0];
          const downloadUrl = data[1];
          console.log(data);
          if (user && downloadUrl) {

            this.baseFireStore.getDocument(`dares/${this.navService.data.id}`).collection('vids').add({
              videoUrl: downloadUrl,
              from: user.email
            }).then(res => {
              console.log(res);
            }).catch(err => {
              console.log(err);
            });
          }
        })

      })
    )
      .subscribe()
  }

  ngOnInit() {
    this.dare = this.navService.data;
    if (!this.dare) {
      this.navCtrl.navigateRoot('/');
    } else {
      this.vids = this.baseFireStore.getCollection<any>(`dares/${this.navService.data.id}/vids`).valueChanges();
    }
  }

  ngOnDestroy() {
    this.stop$.next();
    this.stop$.unsubscribe();
  }

}
