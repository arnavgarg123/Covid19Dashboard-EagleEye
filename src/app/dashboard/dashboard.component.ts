import { Component, OnInit } from '@angular/core';
import { ChatService } from '../services/chat.service';
import { SiteLinksComponent } from '../site-links/site-links.component';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  var11 = "none";
  var111 = "none";
  loc: any;
  lat: any;
  lng: any;
  userInput: any;
  send() {
    console.log(this.userInput);
    this.chatService.sendSOS(this.lat, this.lng, this.userInput).subscribe(response => {
      this.var111 = "none";
    });
  }
  change() {
    if (this.var111 == "")
      this.var111 = "none";
    if (this.var11 == "none")
      this.var11 = "";
    else
      this.var11 = "none";
  }
  change1() {
    this.lat = Number(localStorage.getItem("lat"));
    this.lng = Number(localStorage.getItem("lng"));
    if (this.var11 == "")
      this.var11 = "none";
    if (this.var111 == "none")
      this.var111 = "";
    else
      this.var111 = "none";
  }

  constructor(private chatService: ChatService, private rec: SiteLinksComponent) {
  }

  ngOnInit(): void {
  }

}
