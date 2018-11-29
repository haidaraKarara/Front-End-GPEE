import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  private isAuth:boolean

  constructor(private router : Router){}  
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean 
    {
      if (localStorage.getItem('userToken') != null)
      {
        this.setIsAuth(true)
        return true;
      }
      this.setIsAuth(false)
      this.router.navigate(['/auth']);
      return false;  
    }

    setIsAuth(isAuth:boolean){
      this.isAuth = isAuth
    }
    getIsAuth():boolean{
      return this.isAuth
    }
    
}
