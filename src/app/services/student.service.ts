import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError as ObservableThrowError} from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Student } from '../models/Student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private _urlCreateStudent: string = 'http://127.0.0.1:8000/api/classes/students/new'

  onCreateStudent(student:Student){
    // console.log('deconnexion yes')
    return this.httpClient.post(this._urlCreateStudent,student)
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
        if(error.status === 401) localStorage.removeItem('userToken');// the token has expired
        // console.log('type de lobjet error '+typeof(error.status))
        // console.error(
        //         `Backend returned code : ${error.status}`);
        // console.error(
        //             `Backend returned message : ${error.statusText}`);
    }
    return ObservableThrowError(error || "Erreur serveur")
    }

    constructor(private httpClient: HttpClient) { }
    }
