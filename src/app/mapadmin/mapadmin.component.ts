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
  zoom: number = 14.5;
  text: any;
  lat: number = -33.816536;
  lng: number = 151.003808;
  message: any;
  dis: any;
  disp: any;
  dis1: any;
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
    this.dis1 = "";
    const ii = setInterval(() => {
      this.dis1 = "none";
      const jj = setInterval(() => {
        const x = 1;
        //console.log((this.WatsonRes[3][0][i][1]) * 370 / 46, (this.WatsonRes[3][0][i][0]) * 265 / 33, 6, 6);
        this.dis1 = "";
        clearInterval(jj);
      }, 2500);
    }, 5000);
    if (localStorage.getItem('userID') == 'admin')
      this.text = "Help Required";
    else
      this.text = "Hospitals Near By"
    this.chatService.getLoc().subscribe(response => {
      console.log(response);
      for (let i = 0; i < response['length']; i++) {
        this.lat1.push({ lt: response[i].lat, log: response[i].long, msg: response[i].message });
        console.log(this.lat1);
      }
    });
    console.log(this.lat1);
  }

  ngOnInit(): void {
    this.dis = 'none';
    this.disp = '';
  }

}
