import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    CanLoad,
    Route,
    Router,
    RouterStateSnapshot,
    Params,
} from '@angular/router';

import { Observable, of } from 'rxjs';
import { switchMap, tap, map } from 'rxjs/operators';

import { CoreModule } from '../core.module';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
    providedIn: CoreModule
})
export class AuthorizationGuard implements CanActivate {
    constructor(
        private router: Router,
        public afAuth: AngularFireAuth
    ) { }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> {
        return this.authorize(next.queryParams);
    }


    authorize(queryParms: Params): Observable<boolean> {
        return this.afAuth.user.pipe(
            map(user => {
                console.log(user);
                return user !== null;
            }),
            tap(authorized => this.checkRedirect(authorized)));
    }

    private checkRedirect(isAuthorized: boolean): void {
        if (!isAuthorized) {
            this.router.navigate(['/login']);
        }
    }
}
