import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ClassService } from '../services/class.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent implements OnInit,OnDestroy {

  classSubscription: Subscription;
  errorMessage : Object = null;
  statistics = null;

  constructor(private classService:ClassService,private router: Router) { }

  ngOnInit() {
    this.onGetStat()
  }

  ngOnDestroy(){
    this.classSubscription.unsubscribe();
  }

  onGetStat()
  {
    this.classSubscription = this.classService.onGetStat().subscribe
      (
        (value) => {
          this.statistics = value
          // console.log('voici le stat : '+this.statistics)
        },
        (errors) => {
          if(errors.status === 401) {
            // this.router.navigate(['auth']);
            localStorage.removeItem('userToken');// the token has expired
          }
          this.errorMessage = errors.error['detail']; // the last error proprety provide from the backend
          console.log('Erreur ! : ' +this.errorMessage);

        }
      );
  }

}
