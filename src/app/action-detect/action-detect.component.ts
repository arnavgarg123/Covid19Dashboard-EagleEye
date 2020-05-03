import { Component, OnInit, ElementRef } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-action-detect',
  templateUrl: './action-detect.component.html',
  styleUrls: ['./action-detect.component.css']
})
export class ActionDetectComponent implements OnInit {
  Park1AR1: any;
  Park2NAR1: any;
  Park3AR1: any;
  Park4AR1: any;

  Park1AR1_FinalStats: any;
  Park2NAR1_FinalStats: any;
  Park3AR1_FinalStats: any;
  Park4AR1_FinalStats: any;

  Beach1AR1: any;
  Beach2NAR1: any;
  Beach3AR1: any;
  Beach4NAR1: any;

  Beach1AR1_FinalStats: any;
  Beach2NAR1_FinalStats: any;
  Beach3AR1_FinalStats: any;
  Beach4NAR1_FinalStats: any;

  WatsonRes: any;
  color1: any;
  color2: any;
  color3: any;
  color4: any;
  color5: any;
  color6: any;
  color7: any;
  color8: any;
  // responsePark1AR1: any;
  // responsePark2NAR1: any;
  // responsePark3AR1: any;
  // responePark4AR1: any;
  // objectsIdentified: any;
  // WatsonResArray: any;

  constructor(private elmnt: ElementRef, private http: HttpClient) {
    this.color1 = "white";
    this.color2 = "white";
    this.color3 = "white";
    this.color4 = "white";
    this.color5 = "white";
    this.color6 = "white";
    this.color7 = "white";
    this.color8 = "white";
    this.Park1AR1 = "Loading";
    this.Park2NAR1 = "Loading";
    this.Park3AR1 = "Loading";
    this.Park4AR1 = "Loading";

    this.Beach1AR1 = "Loading";
    this.Beach2NAR1 = "Loading";
    this.Beach3AR1 = "Loading";
    this.Beach4NAR1 = "Loading";
  }

  public input = { Park1AR1path: "", Park2NAR1path: "", Park3AR1path: "", Park4AR1path: "" };

  ngAfterViewInit() {
  }


  ngOnInit(): void {
    // var Park1AR1path = "assets/images/Park1_AR.jpg";
    // var Park2NAR1path = "assets/images/Park2_NAR.jpg";
    // var Park3AR1path = "assets/images/Park3_AR.jpg";
    // var Park4AR1path = "assets/images/Park4_AR.jpg";

    // this.input.Park1AR1path = Park1AR1path;
    // this.input.Park2NAR1path = Park2NAR1path;
    // this.input.Park3AR1path = Park3AR1path;
    // this.input.Park4AR1path = Park4AR1path;

    this.http.post('http://localhost:3000/CallVisualRecognitionAPI', this.input).subscribe(response => {
      console.log("response ", response);
      this.WatsonRes = response;


      console.log(Object.keys(this.WatsonRes).length);
      console.log(this.WatsonRes.s1);
      console.log(this.WatsonRes.s1.length);
      console.log(this.WatsonRes.s1.map(o => o.object).join(', '));

      // This is to join the objects detected.
      this.Park1AR1 = this.WatsonRes.s1.map(o => o.object).join(', ');
      this.Park2NAR1 = this.WatsonRes.s2.map(o => o.object).join(', ');
      this.Park3AR1 = this.WatsonRes.s3.map(o => o.object).join(', ');
      this.Park4AR1 = this.WatsonRes.s4.map(o => o.object).join(', ');


      this.Beach1AR1 = this.WatsonRes.s5.map(o => o.object).join(', ');;
      this.Beach2NAR1 = this.WatsonRes.s6.map(o => o.object).join(', ');
      this.Beach3AR1 = this.WatsonRes.s7.map(o => o.object).join(', ');
      this.Beach4NAR1 = this.WatsonRes.s8.map(o => o.object).join(', ');


      // Now check if only walk object available.
      this.AssignStatus();


    });

  }


  private AssignStatus() {
    if (this.Park1AR1.trim() == "walk") {
      this.Park1AR1_FinalStats = "No Action Needed";
    }
    else {
      this.Park1AR1_FinalStats = "Need Immediate Attention";
      this.color1 = "red";
    }

    if (this.Park2NAR1.trim() == "walk") {
      this.Park2NAR1_FinalStats = "No Action Needed";
    }
    else {
      this.Park2NAR1_FinalStats = "Need Immediate Attention";
      this.color2 = "red";
    }

    if (this.Park3AR1.trim() == "walk") {
      this.Park3AR1_FinalStats = "No Action Needed";
    }
    else {
      this.Park3AR1_FinalStats = "Need Immediate Attention";
      this.color3 = "red";
    }

    if (this.Park4AR1.trim() == "walk") {
      this.Park4AR1_FinalStats = "No Action Needed";
    }
    else {
      this.Park4AR1_FinalStats = "Need Immediate Attention";
      this.color4 = "red";
    }

    if (this.Beach1AR1.trim() == "walk") {
      this.Beach1AR1_FinalStats = "No Action Needed";
    }
    else {
      this.Beach1AR1_FinalStats = "Need Immediate Attention";
      this.color5 = "red";
    }

    if (this.Beach2NAR1.trim() == "walk") {
      this.Beach2NAR1_FinalStats = "No Action Needed";
    }
    else {
      this.Beach2NAR1_FinalStats = "Need Immediate Attention";
      this.color6 = "red";
    }

    if (this.Beach3AR1.trim() == "walk") {
      this.Beach3AR1_FinalStats = "No Action Needed";
    }
    else {
      this.Beach3AR1_FinalStats = "Need Immediate Attention";
      this.color7 = "red";
    }

    if (this.Beach4NAR1.trim() == "walk") {
      this.Beach4NAR1_FinalStats = "No Action Needed";
    }
    else {
      this.Beach4NAR1_FinalStats = "Need Immediate Attention";
      this.color8 = "red";
    }
  }
}
