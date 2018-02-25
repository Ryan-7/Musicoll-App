import { SignInComponent } from './../sign-in/sign-in.component';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  constructor(private authService: AuthService) { }

  signIn: boolean = false;
  signUp: boolean = false;
  showOptions: boolean = true;

  ngOnInit() {
  }

  onSignUp() {
    this.signIn = false;
    this.signUp = true;
    this.showOptions = false;
  }

  onSignIn() {
    this.signUp = false;
    this.signIn = true;
    this.showOptions = false;
  }
 }
