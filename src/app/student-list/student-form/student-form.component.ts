import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Student } from 'src/app/models/Student.model';
import { StudentService } from 'src/app/services/student.service';
import { Subscription } from 'rxjs';
import { ClassService } from 'src/app/services/class.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss']
})
export class StudentFormComponent implements OnInit,OnDestroy {

  classSubscription: Subscription;
  newStudentForm: FormGroup;
  errorMessage : Object = null;
  student : Student;
  listeSexe = ['M','F']
  listeClasse = null
  firstnameCtrl : FormControl
  lastnameCtrl : FormControl
  birthdayCtrl : FormControl
  placeOfBirthCtrl : FormControl
  sexCtrl : FormControl
  classOfStudentCtrl : FormControl
  tutorCtrl : FormControl
  telephoneCtrl : FormControl
  addressCtrl : FormControl
  oldSchoolCtrl : FormControl



  constructor(private formBuilder: FormBuilder,private studentService: StudentService,
              private classService:ClassService) 
    { }

  ngOnInit() {
    this.initForm();
    this.onGetClassList();
  }

  ngOnDestroy(){
    this.classSubscription.unsubscribe()
  }
  
  onCreateStudent()
  {
    if(this.newStudentForm.valid)
    {
      const penom = this.newStudentForm.get('firstname').value
      const nom = this.newStudentForm.get('lastname').value
      const date_naissance = this.newStudentForm.get('birthday').value
      const lieu_naissance = this.newStudentForm.get('placeOfBirth').value
      const sexe = this.newStudentForm.get('sex').value
      const classe = this.newStudentForm.get('classOfStudent').value
      const tuteur = this.newStudentForm.get('tutor').value
      const telephone = this.newStudentForm.get('telephone').value
      const adresse = this.newStudentForm.get('address').value
      const ancienne_ecole = this.newStudentForm.get('oldSchool').value
      const student = new Student(penom,nom,date_naissance,lieu_naissance,sexe,
                                  classe,tuteur,Number(telephone),adresse,ancienne_ecole)
      Swal({
          title: 'Voulez-vous ajouter un élève ?',
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
              this.getStudentService(student);
            }
          })
    }
    else 
    {
      console.log('Formulaire Non valide')
    }
  }

  private getStudentService(student: Student) {
      this.studentService.onCreateStudent(student).subscribe(
        (value) => {
        Swal('Ajouté!', "L'élève a bien été ajouté !", 'success');
        this.newStudentForm.reset(); // vider le formulaire
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

  initForm() {

  this.firstnameCtrl = this.formBuilder.control('',[Validators.required,Validators.minLength(2)])
  this.lastnameCtrl = this.formBuilder.control('',[Validators.required,Validators.minLength(2)])
  this.birthdayCtrl = this.formBuilder.control('',[Validators.required])
  this.placeOfBirthCtrl = this.formBuilder.control('',[Validators.required])
  this.sexCtrl = this.formBuilder.control('',[Validators.required,Validators.maxLength(1)])
  this.classOfStudentCtrl = this.formBuilder.control('',[Validators.required])
  this.tutorCtrl = this.formBuilder.control('',[Validators.minLength(2)])
  this.telephoneCtrl = this.formBuilder.control('')
  this.oldSchoolCtrl = this.formBuilder.control('',[Validators.minLength(2)])
  this.addressCtrl = this.formBuilder.control('',[Validators.minLength(2)])

    this.newStudentForm = this.formBuilder.group({
      firstname: this.firstnameCtrl,
      lastname: this.lastnameCtrl,
      birthday: this.birthdayCtrl,
      placeOfBirth: this.placeOfBirthCtrl,
      sex: this.sexCtrl,
      classOfStudent: this.classOfStudentCtrl,
      tutor: this.tutorCtrl,
      telephone: this.telephoneCtrl,
      address: this.addressCtrl,
      oldSchool: this.oldSchoolCtrl,
    });
  }
}
// public firstname: string,
// public lastname: string,
// public birthday: Date,
// public placeOfBirth: string,
// public sex: string,
// public classOfStudent: string,
// public tutor?: string,
// public telephone?: number,
// public address?: String,
// public oldSchool?: string

// this.studentSubscription = this.studentService.onCreateStudent(student).subscribe
      // (
      //   (value) => {
      //     console.log('Eleve cree avec succes : '+value)
      //   },
      //   (errors) => {
      //     if(errors.status === 401) {
      //       localStorage.removeItem('userToken');// the token has expired
      //       // this.router.navigate(['auth']);
      //     }
      //     this.errorMessage = Object.values(errors.error) // the last error proprety provide from the backend
      //     console.log('Erreur ! : ' +this.errorMessage);
      //   }
      // );
