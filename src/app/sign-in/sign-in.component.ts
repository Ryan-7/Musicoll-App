import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Headers } from '@angular/http' 
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {


  email: string;
  password: string;
  loading: boolean = false;
  errorMessage: boolean = false;
  


  constructor(private authService: AuthService, private router: Router) { }

  signin() {
    let userInfo = {
      email: this.email,
      password: this.password 
    }
    this.errorMessage = false;
    this.loading = true;
    this.authService.login(userInfo).subscribe((res) => {
      localStorage.clear();
      localStorage.setItem('musicollAuth', res.headers.get('musicoll-auth'));
      this.router.navigate(['projects']);
    }, (err) => {
      this.loading = false;
      this.errorMessage = true;
      console.log(err);
    })
  }

  ngOnInit() { 
  }

}
