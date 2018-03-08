import { AuthService } from './../services/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService) { }


  signout() {
    // this.authService.logout().subscribe((res) => {
    //   console.log("token deleted")
    //   console.log("logged out")
    // }, (err) => {
    //   console.log("could not delete token")
    // })
    localStorage.clear();
    this.router.navigate(['/']);
  }


  ngOnInit() {
    console.log(this.authService.loggedIn());
  }

}
