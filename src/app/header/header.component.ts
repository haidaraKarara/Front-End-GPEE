import { Component, OnInit } from '@angular/core';
import { AuthGuard } from '../auth/auth.guard';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isAuth = false

  constructor(private authGuard:AuthGuard,private authService:AuthService,private router: Router) { }

  ngOnInit() {
    this.isAuth = this.authGuard.getIsAuth()
  }

  onSignOut()
  {
    this.authService.onSignOut().subscribe(
      (value) => {
          this.router.navigate(['auth']);
          localStorage.removeItem('userToken');
          // console.log('Deconnexion -> message de retour : '+value)
       
      },
      (errors) => {
        console.log('Erreur ! : ' +errors.error['detail']);
      }
    );
  }
}
