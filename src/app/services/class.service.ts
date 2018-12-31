import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError as ObservableThrowError} from 'rxjs';
import { OneClass } from '../models/Class.model';

@Injectable({
    providedIn: 'root'
})
export class ClassService {


    private _urlGetStat: string = 'http://127.0.0.1:8000/api/classes/statistics'
    private _urlGetClassList: string = 'http://127.0.0.1:8000/api/classes/'
    private _urlCreateClass: string = 'http://127.0.0.1:8000/api/classes/new'

    onGetStat(){
        return this.httpClient.get(this._urlGetStat)
                    .pipe(
                        catchError(this.errorHandler)
                    );
    }

    onGetClassList()
    {
        return this.httpClient.get(this._urlGetClassList)
                    .pipe(
                        catchError(this.errorHandler)
                    );
    }

    onCreateClass(oneClass:OneClass)
    {
        return this.httpClient.post(this._urlCreateClass,oneClass)
                    .pipe(
                        catchError(this.errorHandler)
                    );
    }

    errorHandler(error:HttpErrorResponse)
    {
    if (error.error instanceof ErrorEvent) 
    {
    // A client-side or network error occurred. Handle it accordingly.
    console.error('An error occurred:', error.error.message);
    } 
    else 
    {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong,
        console.error(
                `Backend returned code : ${error.status}`);
    }
    return ObservableThrowError(error || "Erreur serveur")
    }

    constructor(private httpClient: HttpClient){}
    }
