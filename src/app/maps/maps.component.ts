import { ViewChild, Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnInit {
  texto: string = 'Wenceslau Braz - Cuidado com as cargas';
  lat: number = -23.8779431;
  lng: number = -49.8046873;
  zoom: number = 15;
  text: any;
  setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.zoom = 15;
        localStorage.setItem('lat', this.lat.toString());
        localStorage.setItem('lng', this.lng.toString());
      });
    }
  }

  constructor() {
    if (localStorage.getItem('userID') == 'admin')
      this.text = "Help Required";
    else
      this.text = "Hospitals Near By"
  }

  ngOnInit(): void {
    this.setCurrentLocation();
  }

}
