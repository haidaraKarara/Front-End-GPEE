import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../models/User.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit,OnDestroy {

  loginForm: FormGroup;
  user: User
  token: Object;
  autSubscription: Subscription;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private authService:AuthService) { }

  ngOnInit() {
    this.initForm();
  }

  ngOnDestroy() {
    this.autSubscription.unsubscribe;
  }

  initForm() {
    this.loginForm = this.formBuilder.group({
      username: new FormControl('',[Validators.required,Validators.minLength(4)]),
      password: new FormControl('',[Validators.required])
    });
  }

  onSubmit() 
  {
    if(this.loginForm.valid)
    {
      const username = this.loginForm.value['username']
      const password = this.loginForm.value['password']
      this.user = new User(username,password)
      this.autSubscription = this.authService.onConnect(this.user).subscribe(
        (value) => {
          this.token = value
          console.log('voici le token : '+this.token['token'])
        },
        (error) => {
          console.log('Erreur ! : ' +error);
        }
      );
      // this.router.navigate(['/users']);
    }
    else
    {
      console.log('Rien ne va')
    }
  }
  disconnect()
  {
    this.autSubscription = this.authService.disconnect().subscribe(
      (value) => {
        const resp = value
        console.log('Deconnexion -> message de retour : '+resp['success'])
      },
      (error) => {
        console.log('Erreur ! : ' +error);
      }
    );
  }
}
