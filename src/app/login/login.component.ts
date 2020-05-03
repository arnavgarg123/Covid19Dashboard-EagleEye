import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  sign() {
    this.router.navigate(['signup']);
  }

  login() {
    localStorage.setItem('userID', this.email);
    localStorage.setItem('pass', this.password);

    this.router.navigate(['dashboard']);



  }
}
