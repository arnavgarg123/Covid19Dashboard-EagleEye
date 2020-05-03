import { Component, OnInit } from '@angular/core';
import { ChatService } from '../services/chat.service';
@Component({
  selector: 'app-cases-number',
  templateUrl: './cases-number.component.html',
  styleUrls: ['./cases-number.component.css']
})
export class CasesNumberComponent implements OnInit {
  data: any;
  cases: any;
  death: any;
  recover: any;
  Location: any;
  lat: any;
  lng: any;
  loc: any;
  res: any;
  country: any;
  state: any;
  area: any;
  constructor(private chatService: ChatService) {
    localStorage.setItem("len", "0");
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.chatService.getloc(this.lat, this.lng).subscribe(response => {
          this.res = response;
          localStorage.setItem('loc', ((this.res.results[0].formatted_address)).toString());
          if (this.res)
            for (let index = 0; index < this.res.results.length; index++) {
              for (let index1 = 0; index1 < this.res.results[index].types.length; index1++) {
                if (this.res.results[index].types[index1] == 'locality') {
                  localStorage.setItem('len', ((this.res.results[index].address_components.length - 1)).toString());

                  for (let i = this.res.results[index].address_components.length - 1; i >= 0; i--)
                    localStorage.setItem(i.toString(), this.res.results[index].address_components[i].long_name);
                }
              }
            }
          this.chatService.getData().subscribe(response => {
            this.data = response;
            if (localStorage.getItem(localStorage.getItem("len"))) {
              this.country = localStorage.getItem(localStorage.getItem("len"));
            }
            if (localStorage.getItem((Number(localStorage.getItem("len")) - 1).toString())) {
              this.state = localStorage.getItem((Number(localStorage.getItem("len")) - 1).toString());
            }
            if (localStorage.getItem((Number(localStorage.getItem("len")) - 2).toString())) {
              if ((Number(localStorage.getItem("len")) - 3).toString())
                this.area = localStorage.getItem((Number(localStorage.getItem("len")) - 3).toString());
              else
                this.area = localStorage.getItem((Number(localStorage.getItem("len")) - 2).toString());
            }
            if (this.data[this.state].districtData[this.area]) {
              this.Location = this.area;
              this.cases = this.data[this.state].districtData[this.area].confirmed;
              this.death = this.data[this.state].districtData[this.area].deceased;
              this.recover = this.data[this.state].districtData[this.area].recovered;
            }
            else {
              this.chatService.getData1().subscribe(response => {
                this.data = response;
                for (let i = 0; i < this.data.data.regional.length; i++) {
                  //console.log(this.data.data.regional[i]);
                  if (this.data.data.regional[i].loc == this.state) {
                    this.Location = this.state;
                    this.cases = this.data.data.regional[i].totalConfirmed;
                    this.death = this.data.data.regional[i].deaths;
                    this.recover = this.data.data.regional[i].discharged;
                  }
                }
              })
            }
          })
        })
      });
    }

    if (!this.Location)
      this.Location = "Global";
  }

  ngOnInit(): void {
  }

}
