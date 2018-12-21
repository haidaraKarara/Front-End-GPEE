import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError as ObservableThrowError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClassService {

  
  private _urlGetStat: string = 'http://127.0.0.1:8000/api/classes/statistics'
  // private _urlDisconnect:string = 'http://127.0.0.1:8000/api/auth/logout'

  onGetStat(){
      return this.httpClient.get(this._urlGetStat)
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
