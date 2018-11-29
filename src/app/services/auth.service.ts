import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { User } from '../models/User.model';
import { HttpHeaders } from '@angular/common/http';
import { throwError as ObservableThrowError} from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable()
export class AuthService 
{

    private _urlConnect: string = 'http://127.0.0.1:8000/auth/api/login'
    private _urlDisconnect:string = 'http://127.0.0.1:8000/auth/api/logout'

    onSignIn(user:User){
        return this.httpClient.post(this._urlConnect,user)
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

    onSignOut(){
        return this.httpClient
        .post(this._urlDisconnect,'')
        }

    constructor(private httpClient: HttpClient){}
    
}
