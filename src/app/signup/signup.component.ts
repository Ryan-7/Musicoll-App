import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Headers } from '@angular/http' 
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  name: string;
  email: string; 
  password: string;

  working = false;
  redirecting = false;
  errorMessage = false;

  signup() {
    let userInfo = {
      name: this.name,
      email: this.email,
      password: this.password
    }
    this.working = true;
    this.errorMessage = false;

    this.authService.signup(userInfo).subscribe((res) => {
      localStorage.setItem('musicollAuth', res.headers.get('musicoll-auth')); // Grab the token from the response and set it in local storage.
      
        this.working = false;
        this.router.navigate(['projects']);


    }, (err) => {
      this.working = false;
      this.errorMessage = true;
    })
  }

  ngOnInit() {
  }

}
 