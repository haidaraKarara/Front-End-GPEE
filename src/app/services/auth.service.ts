import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/User.model';
import { HttpHeaders } from '@angular/common/http';


@Injectable()
export class AuthService {
    // appareilsSubject = new Subject<Object>();
    token: string;
    httpOptions = {
        headers: new HttpHeaders({
          'Authorization': 'Token 34e3cd56df04f6ec4f25ce985a337daef7c766eb'
        })
      };
    onConnect(user:User){
        return this.httpClient
        .post('http://127.0.0.1:8000/auth/api/login',user)
        
    }

    disconnect(){
        return this.httpClient
        .post('http://127.0.0.1:8000/auth/api/logout','',this.httpOptions)
        }

    constructor(private httpClient: HttpClient){}

    // emitAppareilSubject() {
    //     this.appareilsSubject.next(this.appareils.slice());
    //   }
    
}
// http://127.0.0.1:8000/auth/api/logout