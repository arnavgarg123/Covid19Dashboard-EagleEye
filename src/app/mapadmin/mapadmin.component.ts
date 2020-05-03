import { Component, OnInit } from '@angular/core';
import { ChatService } from '../services/chat.service';
@Component({
  selector: 'app-mapadmin',
  templateUrl: './mapadmin.component.html',
  styleUrls: ['./mapadmin.component.css']
})
export class MapadminComponent implements OnInit {

  texto: string = 'Wenceslau Braz - Cuidado com as cargas';
  lat1: Array<{ lt, log, msg }> = [];
  zoom: number = 13;
  text: any;
  lat: number = 12.986601700000001;
  lng: number = 77.7101303;
  message: any;
  dis: any;
  disp: any;

  onMouseOver(a) {
    this.disp = 'none';
    this.dis = '';
    for (let i = 0; i < this.lat1.length; i++) {
      if (a == this.lat1[i].lt) {
        this.message = this.lat1[i].msg;
      }
    }
  }

  constructor(private chatService: ChatService) {

    if (localStorage.getItem('userID') == 'admin')
      this.text = "Help Required";
    else
      this.text = "Hospitals Near By"
    this.chatService.getLoc().subscribe(response => {
      console.log(response);
      for (let i = 0; i < response['length']; i++) {
        this.lat1.push({ lt: response[i].lat, log: response[i].long, msg: response[i].message });
        console.log(this.lat1[0].lt);
      }
    });
    console.log(this.lat1);
  }

  ngOnInit(): void {
    this.dis = 'none';
    this.disp = '';
  }

}
