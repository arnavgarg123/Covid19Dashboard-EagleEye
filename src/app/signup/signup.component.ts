import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChatService } from '../services/chat.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  email: string;
  password: string;
  book: string;
  constructor(private router: Router, private chatService: ChatService) { }

  ngOnInit(): void {
  }

  login() {
    this.chatService.newuser(this.email, this.password, this.book).subscribe(response => {
      console.log(response);
      if (response == true) {
        this.router.navigate(['dashboard']);
      }
    });
  }

  login1() {
    localStorage.setItem('userID', this.email);
    localStorage.setItem('pass', this.password);
    this.router.navigate(['dashboard']);



  }

}
