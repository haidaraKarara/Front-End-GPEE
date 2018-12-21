import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { User } from '../models/User.model';
import { throwError as ObservableThrowError} from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable()
export class AuthService 
{

    private _urlConnect: string = 'http://127.0.0.1:8000/api/auth/login/'
    private _urlDisconnect:string = 'http://127.0.0.1:8000/api/auth/logout/'
    onSignIn(user:User){
        const httpOptions = {
            headers: new HttpHeaders({authorization: "Basic " + btoa(`${user.username}:${user.password}`)})
            };
        return this.httpClient.post(this._urlConnect,'',httpOptions)
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
            console.error(
                        `Backend returned message : ${error.statusText}`);
        }
        return ObservableThrowError(error || "Erreur serveur")
    }
    
    onSignOut(){
        // console.log('deconnexion yes')
        return this.httpClient.post(this._urlDisconnect,'')
            .pipe(
                catchError(this.errorHandler)
            );
        }

    constructor(private httpClient: HttpClient){}
    
}
