import { Injectable } from '@angular/core';
import { Input } from '../model/input.model';
import { Utterence } from '../model/utterence.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  a: any;
  utterences: Utterence[] = [];
  constructor(private http: HttpClient) { }
  getDateAustralia() {
    return this.http.get("https://coronavirus-19-api.herokuapp.com/countries/Australia")
  }
  getProx() {
    return this.http.post("http://localhost:5000/companies", null);
  }
  getnews() {
    return this.http.post('api/getNews', null)
  }
  sendSOS(a, b, c) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://platform.clickatell.com/messages/http/send?apiKey=Ni31A3NMRHW9tO4bGz3qHA==&to=918217099893&content=" + c, true);
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4 && xhr.status == 200) {
        console.log('success')
      }
    };
    xhr.send();

    return this.http.post('api/setLoc', { lat: a, lng: b, msg: c })
  }
  getBook() {
    return this.http.post('api/getRec', null)
  }
  getLoc() {
    return this.http.post('api/getLoc', null)
  }
  sendChat(inputData: Input) {

    return this.http.post('api/AskWatson', inputData)
  }
  newuser(a, b, c) {
    console.log(a);
    return this.http.post('api/NewUser', { email: a, Password: b, book: c })
  }
  verify() {
    return this.http.post('api/Verify', null)
  }
  getData() {

    return this.http.get("https://api.covid19india.org/state_district_wise.json")

  }
  getGlobal() {
    return this.http.get("https://coronavirus-tracker-api.herokuapp.com/v2/latest")
  }
  getData1() {

    return this.http.get("https://api.rootnet.in/covid19-in/stats/latest")

  }
  getloc(lat, long) {
    return this.http.get("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + long + "&key=AIzaSyBL7PlI3tjq4mbYWrICjswIuFEf-bZgmpI")
  }
  createSession() {

    return this.http.post('api/CreateSession', null)

  }

  pushUtterences(utterence: Utterence) {
    this.utterences.push(utterence);
  }
}
