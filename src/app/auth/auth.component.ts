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
  errorMessage : Object = null;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private authService:AuthService) { }

  ngOnInit() {
    this.initForm();
  }

  ngOnDestroy() {
    this.autSubscription.unsubscribe();
  }

  initForm() {
    this.loginForm = this.formBuilder.group({
      username: new FormControl('',[Validators.required,Validators.minLength(4)]),
      password: new FormControl('',[Validators.required])
    });
  }

  onSignIn() 
  {
    if(this.loginForm.valid)
    {
      const username = this.loginForm.get('username').value
      const password = this.loginForm.get('password').value
      this.user = new User(username,password)
      this.autSubscription = this.authService.onSignIn(this.user).subscribe
      (
        (value) => {
          this.token = value['token']
          localStorage.setItem('userToken',this.token.toString())
          this.router.navigate(['home']);
          // console.log('voici le token : '+this.token)
        },
        (error) => {
          this.errorMessage = error.error['detail'];
          console.log("Erreur :" +this.errorMessage);
        }
      );
    }
  }
}
