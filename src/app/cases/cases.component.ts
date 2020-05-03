import { Component, OnInit } from '@angular/core';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-cases',
  templateUrl: './cases.component.html',
  styleUrls: ['./cases.component.css']
})
export class CasesComponent implements OnInit {
  data: any;
  cases: any;
  death: any;
  recover: any;
  cases2: any;
  death2: any;
  recover2: any;
  cases1: any;
  death1: any;
  recover1: any;
  location: any;
  lat: any;
  lng: any;
  loc: any;
  res: any;
  country: any;
  state: any;
  area: any;
  loc1: any;
  constructor(private chatService: ChatService) {
    this.loc1 = "Country";
    this.location = "State";
    this.chatService.getGlobal().subscribe(response => {
      this.cases2 = response["latest"]["confirmed"];
      this.death2 = response["latest"]["deaths"];
      this.recover2 = response["latest"]["recovered"];
    })
    this.chatService.getData().subscribe(response => {
      this.data = response;

      if (localStorage.getItem((3).toString())) {
        this.country = localStorage.getItem((3).toString());
      }
      if (localStorage.getItem((2).toString())) {
        this.state = localStorage.getItem((2).toString());
      }
      if (localStorage.getItem("0")) {
        this.area = localStorage.getItem("0");
      }
      this.chatService.getData1().subscribe(response => {
        this.data = response;
        for (let i = 0; i < this.data.data.regional.length; i++) {
          //console.log(this.data.data.regional[i]);
          if (this.data.data.regional[i].loc == this.state) {
            this.location = this.state;
            this.cases1 = this.data.data.regional[i].totalConfirmed;
            this.death1 = this.data.data.regional[i].deaths;
            this.recover1 = this.data.data.regional[i].discharged;
          }
        }
        this.loc1 = this.country;
        this.cases = this.data.data.summary.total;
        this.death = this.data.data.summary.deaths;
        this.recover = this.data.data.summary.discharged;
      })
    })
  }

  ngOnInit(): void {
  }

}
