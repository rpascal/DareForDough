import { Injectable } from '@angular/core';
import { CoreModule } from '../core.module';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AngularFirestore, QueryFn } from '@angular/fire/firestore';

@Injectable({
    providedIn: CoreModule
})
export class BaseFireStoreService {

    constructor(private afs: AngularFirestore) {
    }

    getCollection(path: string, queryFn?: QueryFn) {
        return this.afs.collection(path, queryFn);
    }

    getDocument(path: string) {
        return this.afs.doc(path);
    }



}
