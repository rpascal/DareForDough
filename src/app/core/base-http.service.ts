import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CoreModule } from './core.module';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
    providedIn: CoreModule
})
export class BaseHttpService {
    private headers = new HttpHeaders().set('Content-Type', 'application/json');

    constructor(protected http: HttpClient) {
    }


    getRawValue<T>(endpoint: string, queryString?: string): Observable<T> {
        return this.get(endpoint, queryString).pipe(
            map(x => {
                if (x.body) {
                    return x.body as T;
                } else {
                    throw Error('No body found');
                }
            })
        );
    }

    get<T>(
        endpoint: string,
        queryString?: string
    ): Observable<HttpResponse<T>> {
        const url =
            `${endpoint}` + (queryString ? `?${queryString}` : '');

        return this.http.get<T>(url, {
            headers: this.headers,
            observe: 'response'
        }).pipe(catchError(this.handleError));
    }

    getSingle<T>(
        endpoint: string,
        key: number,
        queryString?: string
    ): Observable<HttpResponse<T>> {
        const url =
            `${endpoint}(${key})` +
            (queryString ? `?${queryString}` : '');

        return this.http.get<T>(url, {
            headers: this.headers,
            observe: 'response'
        }).pipe(catchError(this.handleError));
    }

    post<T>(endpoint: string, item: any): Observable<HttpResponse<T>> {
        const url = `${endpoint}`;
        const entity = JSON.stringify(item);

        return this.http
            .post<T>(url, entity, { headers: this.headers, observe: 'response' })
            .pipe(catchError(this.handleError));
    }


    private handleError(errorResponse: HttpErrorResponse): Observable<never> {
        if (errorResponse.error instanceof ErrorEvent) {
            // A client-side or network error occurred.
        } else if (errorResponse.status === 400) {
            // Server returned an unsuccessful response code. Parse response to see what happened.

            const hasValidationErrors =
                (errorResponse.error as Object).hasOwnProperty('error') &&
                (errorResponse.error.error as Object).hasOwnProperty('innererror');

            const msg = hasValidationErrors
                ? errorResponse.error.error.innererror.message
                : errorResponse.error.error.message;

            return throwError(
                msg ||
                'Sorry, something is wrong.'
            );
        }

        return throwError(errorResponse);
    }
}
