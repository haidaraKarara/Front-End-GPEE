import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ClassService } from '../services/class.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent implements OnInit {

  classSubscription: Subscription;
  errorMessage : Object = null;
  statistics : Object = null;
  onGetStat()
  {
    this.classSubscription = this.classService.onGetStat().subscribe
      (
        (value) => {
          this.statistics = value
          console.log('voici le stat : '+this.statistics)
        },
        (errors) => {
          this.errorMessage = errors.error['detail']; // the last error proprety provide from the backend
          console.log('Erreur ! : ' +this.errorMessage);

        }
      );
  }

  constructor(private classService:ClassService) { }

  ngOnInit() {
  }

}
