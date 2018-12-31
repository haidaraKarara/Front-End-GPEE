import { Component, OnInit, Input } from '@angular/core';
import { ClassService } from 'src/app/services/class.service';
import { Subscription } from 'rxjs';
import { OneClass } from 'src/app/models/Class.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-class-form',
  templateUrl: './class-form.component.html',
  styleUrls: ['./class-form.component.scss']
})

export class ClassFormComponent implements OnInit {

  @Input() classInput: string // The class that will be going to create
  listeClasse = null
  errorMessage: object = null
  classSubscription: Subscription;
  

  onCreateClass(classForm:any)
  {
    console.log('yes '+this.classInput)
    const classe = new OneClass(this.classInput)
    Swal({
      title: 'Voulez-vous ajouter une classe ?',
      // text: "You won't be able to revert this!",
      type: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui !'
      }).then((result) => 
      {
        if (result.value) 
        {
          this.classService.onCreateClass(classe).subscribe(
            (value) => {
            Swal('Ajouté!', "La classe a bien été ajoutée !", 'success');
            classForm.reset(); // vider le formulaire
            // console.log('Eleve cree avec succes : '+value)
            },
            (errors) => {
            if (errors.status === 401) {
              localStorage.removeItem('userToken'); // the token has expired
            }
            this.errorMessage = Object.values(errors.error); // the last error proprety provide from the backend
            console.log('Erreur ! : ' + this.errorMessage);
          });
        }
      })
  }

  onGetClassList()
  {
    this.classSubscription = this.classService.onGetClassList().subscribe
      (
        (value) => {
          this.listeClasse = value['results']
          // console.log('voici la liste des classe : '+this.listeClasse)
        },
        (errors) => {
          if(errors.status === 401) {
            localStorage.removeItem('userToken');// the token has expired
          }
          this.errorMessage = Object.values(errors.error); // the last error proprety provide from the backend
          console.log('Erreur ! : ' +this.errorMessage);
        }
      );
  }

  constructor(private classService:ClassService) { }

  ngOnInit() {
    this.onGetClassList()
  }

}
