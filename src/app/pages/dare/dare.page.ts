import { Component, OnInit, OnDestroy } from '@angular/core';
import { IDareOpts } from '../../entities';
import { NavService, BaseFireStoreService } from '../../core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable, forkJoin, zip, Subject } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';
import { FirebaseAuth } from '@angular/fire';
import { AngularFireAuth } from '@angular/fire/auth';
import { NavController, Platform } from '@ionic/angular';
import { MediaCapture, MediaFile, CaptureError, CaptureImageOptions } from '@ionic-native/media-capture/ngx';
import { File } from '@ionic-native/file/ngx';


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

  isCordova: boolean = false;

  isUploading = false;

  constructor(private navService: NavService<IDareOpts>,
    private navCtrl: NavController,
    private baseFireStore: BaseFireStoreService,
    private auth: AngularFireAuth,
    private storage: AngularFireStorage,
    private platform: Platform,
    private mediaCapture: MediaCapture,
    private file: File) {
    this.stop$ = new Subject<void>();
    this.isCordova = this.platform.is("cordova");
  }

  recordVid() {
    if (this.isCordova) {
      this.mediaCapture.captureVideo({
        duration: 10000
      })
        .then(
          (data: MediaFile[]) => {
            data.forEach(async item => {
              this.isUploading = true;
              try {
                const path = item.fullPath.replace(item.name, '');
                const blob2 = await this.file.readAsArrayBuffer(path, item.name);
                var blob = new Blob([blob2], { type: "video/mp4" });
                const filePath = this.baseFireStore.getId();
                const fileRef = this.storage.ref(filePath);
                const task = fileRef.put(blob);
                this.uploadFileToFirebase(task, fileRef);

              } catch (err) {
                alert(JSON.stringify(err));
              }
            })
          },
          (err: CaptureError) => console.error(err)
        );
    }
  }

  uploadFile(event) {
    this.isUploading = true;

    const file = event.target.files[0];
    const filePath = this.baseFireStore.getId();
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    this.uploadFileToFirebase(task, fileRef);
  }


  uploadFileToFirebase(task, fileRef) {


    // observe percentage changes
    this.uploadPercent = task.percentageChanges().pipe(takeUntil(this.stop$));
    // get notified when the download URL is available
    task.snapshotChanges().pipe(
      takeUntil(this.stop$),
      finalize(() => {
        zip(
          this.auth.user,
          fileRef.getDownloadURL()
        ).pipe(takeUntil(this.stop$)).subscribe(data => {
          const user = data[0];
          const downloadUrl = data[1];
          if (user && downloadUrl) {
            this.baseFireStore.getDocument(`dares/${this.navService.data.id}`).collection('vids').add({
              videoUrl: downloadUrl,
              from: user.email
            }).then(res => {
              console.log(res);
              this.isUploading = false;

            }).catch(err => {
              this.isUploading = false;

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
