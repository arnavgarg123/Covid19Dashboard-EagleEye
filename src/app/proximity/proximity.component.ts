import { Component, OnInit } from '@angular/core';
import { ChatService } from '../services/chat.service';
@Component({
  selector: 'app-proximity',
  templateUrl: './proximity.component.html',
  styleUrls: ['./proximity.component.css']
})
export class ProximityComponent implements OnInit {
  var1: any;
  var2: any;
  var3: any;
  var11: any;
  var22: any;
  var33: any;
  color1: any;
  color2: any;
  color3: any;
  color11: any;
  color22: any;
  color33: any;
  zoom: any;
  lat: any;
  lng: any;
  constructor(private chatService: ChatService) {
    this.zoom = 15;
    this.lat = -23.8779431;
    this.lng = -49.8046873;
    this.color1 = "";
    this.color2 = "";
    this.color3 = "";
    this.var1 = "Loading";
    this.var2 = "Loading";
    this.var3 = "Loading";
    this.var11 = "Loading";
    this.var22 = "Loading";
    this.var33 = "Loading";
    this.chatService.getProx().subscribe(response => {
      console.log(response);
      this.var1 = response[1][1];
      this.var2 = response[2][1];
      this.var3 = response[3][1];
      this.var11 = response[1][2];
      this.var22 = response[2][2];
      this.var33 = response[3][2];
      if (this.var1 > 30) {
        this.color1 = "red";
      }
      if (this.var11 > 4) {
        this.color11 = "red";
      }
      if (this.var2 > 30) {
        this.color2 = "red";
      }
      if (this.var22 > 4) {
        this.color22 = "red";
      }
      if (this.var3 > 30) {
        this.color3 = "red";
      }
      if (this.var33 > 4) {
        this.color33 = "red";
      }
    });
  }

  ngOnInit(): void {
  }

}
