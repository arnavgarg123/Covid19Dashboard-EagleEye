import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';


@Component({
  selector: 'app-action-detect',
  templateUrl: './action-detect.component.html',
  styleUrls: ['./action-detect.component.css']
})


export class ActionDetectComponent implements OnInit {
  @ViewChild('canvas1', { static: true })
  canvas1: ElementRef<HTMLCanvasElement>;
  @ViewChild('canvas2', { static: true })
  canvas2: ElementRef<HTMLCanvasElement>;
  @ViewChild('canvas3', { static: true })
  canvas3: ElementRef<HTMLCanvasElement>;
  @ViewChild('canvas4', { static: true })
  canvas4: ElementRef<HTMLCanvasElement>;
  @ViewChild('canvas5', { static: true })
  canvas5: ElementRef<HTMLCanvasElement>;
  @ViewChild('canvas6', { static: true })
  canvas6: ElementRef<HTMLCanvasElement>;
  @ViewChild('canvas7', { static: true })
  canvas7: ElementRef<HTMLCanvasElement>;
  @ViewChild('canvas8', { static: true })
  canvas8: ElementRef<HTMLCanvasElement>;
  private ctx1: CanvasRenderingContext2D;
  private ctx2: CanvasRenderingContext2D;
  private ctx3: CanvasRenderingContext2D;
  private ctx4: CanvasRenderingContext2D;
  private ctx5: CanvasRenderingContext2D;
  private ctx6: CanvasRenderingContext2D;
  private ctx7: CanvasRenderingContext2D;
  private ctx8: CanvasRenderingContext2D;

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

  zoom: any;
  lat: any;
  lng: any;
  locationHover: any;
  // responsePark1AR1: any;
  // responsePark2NAR1: any;
  // responsePark3AR1: any;
  // responePark4AR1: any;
  // objectsIdentified: any;
  // WatsonResArray: any;

  constructor(private elmnt: ElementRef, private http: HttpClient) {
    this.zoom = 15;
    this.lat = -33.871722;
    this.lng = 151.2067078;
    this.locationHover = "Queen Victoria Building";
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

  myOptions = {
    'placement': 'bottom',
    'theme': 'light'
  }


  onMouseOver(a) {
    console.log("On Mouse over : " + a);
    switch (a) {
      case 'canvas1':
        this.lat = -33.909896;
        this.lng = 151.185059;
        this.locationHover = "Sydney Park";
        break;
      case 'canvas2':
        this.lat = -33.847993;
        this.lng = 151.0675829;
        this.locationHover = "Bicentennial Park";
        break;
      case 'canvas3':
        this.lat = -33.8742919;
        this.lng = 151.2092479;
        this.locationHover = "Hyde Park";
        break;
      case 'canvas4':
        this.lat = -33.8269037;
        this.lng = 151.0569839;
        this.locationHover = "Blaxland Riverside Park";
        break;
      case 'canvas5':
        this.lat = -33.8082573;
        this.lng = 151.2894245;
        this.locationHover = "Collins Flat Beach";
        break;
      case 'canvas6':
        this.lat = -33.8565601;
        this.lng = 151.264978;
        this.locationHover = "Milk Beach";
        break;
      case 'canvas7':
        this.lat = -33.5986074;
        this.lng = 151.3086218;
        this.locationHover = "Palm Beach";
        break;
      case 'canvas8':
        this.lat = -33.6287196;
        this.lng = 151.3101907;
        this.locationHover = "Avalon Beach";
        break;
    }
  }

  onMarkerMouseOver(infoWindow, gm) {
    console.log(infoWindow);
    console.log(gm);
    if (gm.lastOpen != null) {
      gm.lastOpen.close();
    }
    gm.lastOpen = infoWindow;
    infoWindow.open();
  }


  ngOnInit(): void {

    this.http.post('http://localhost:3000/CallVisualRecognitionAPI', this.input).subscribe(response => {
      console.log("response ", response);


      this.WatsonRes = response;
      let image1 = new Image();
      this.ctx1 = this.canvas1.nativeElement.getContext('2d');
      this.ctx1.strokeStyle = "#b71c1c";
      this.ctx1.lineWidth = 2;
      image1.onload = () => {
        this.ctx1.drawImage(image1, 0, 0, 370, 265);
        for (let i = 0; i < this.WatsonRes.s1.length; i++) {
          if (this.WatsonRes.s1[i].object != "walk" && this.WatsonRes.s1[i].object != "stand") {
            console.log(this.WatsonRes.s1[i].object);
            console.log(this.WatsonRes.s1[i].location.left, this.WatsonRes.s1[i].location.top, this.WatsonRes.s1[i].location.width, this.WatsonRes.s1[i].location.height);

            const ii = setInterval(() => {
              this.ctx1.drawImage(image1, 0, 0, 370, 265);
              const jj = setInterval(() => {
                const x = 1;
                //console.log((this.WatsonRes[3][0][i][1]) * 370 / 46, (this.WatsonRes[3][0][i][0]) * 265 / 33, 6, 6);
                this.ctx1.rect(this.WatsonRes.s1[i].location.left, this.WatsonRes.s1[i].location.top, this.WatsonRes.s1[i].location.width, this.WatsonRes.s1[i].location.height);
                this.ctx1.strokeStyle = "#b71c1c";
                this.ctx1.lineWidth = 2;
                this.ctx1.stroke();
                clearInterval(jj);
              }, 2500);
            }, 5000);


            this.ctx1.rect(this.WatsonRes.s1[i].location.left, this.WatsonRes.s1[i].location.top, this.WatsonRes.s1[i].location.width, this.WatsonRes.s1[i].location.height);
            this.ctx1.strokeStyle = "#b71c1c";
            this.ctx1.lineWidth = 2;
            this.ctx1.stroke();
          }
        }
      }
      image1.src = "./assets/images/Park1_AR.jpg";

      let image2 = new Image();
      this.ctx2 = this.canvas2.nativeElement.getContext('2d');
      this.ctx2.strokeStyle = "#b71c1c";
      this.ctx2.lineWidth = 2;
      //console.log(response.s1);

      image2.onload = () => {
        this.ctx2.drawImage(image2, 0, 0, 370, 265);
        for (let i = 0; i < this.WatsonRes.s2.length; i++) {
          if (this.WatsonRes.s2[i].object != "walk" && this.WatsonRes.s2[i].object != "stand") {
            console.log("walkkkkkkkkkkkkkkkkk");
            console.log(this.WatsonRes.s2[i].location.left, this.WatsonRes.s2[i].location.top, this.WatsonRes.s2[i].location.width, this.WatsonRes.s2[i].location.height);

            const ii = setInterval(() => {
              this.ctx2.drawImage(image2, 0, 0, 370, 265);
              const jj = setInterval(() => {
                const x = 1;
                //console.log((this.WatsonRes[3][0][i][1]) * 370 / 46, (this.WatsonRes[3][0][i][0]) * 265 / 33, 6, 6);
                this.ctx2.rect(this.WatsonRes.s2[i].location.left, this.WatsonRes.s2[i].location.top, this.WatsonRes.s2[i].location.width, this.WatsonRes.s2[i].location.height);
                this.ctx2.strokeStyle = "#b71c1c";
                this.ctx2.lineWidth = 2;
                this.ctx2.rect(136, 53, 53, 138);
                this.ctx2.stroke();
                clearInterval(jj);
              }, 2500);
            }, 5000);

            this.ctx2.rect(this.WatsonRes.s2[i].location.left, this.WatsonRes.s2[i].location.top, this.WatsonRes.s2[i].location.width, this.WatsonRes.s2[i].location.height);
            this.ctx2.strokeStyle = "#b71c1c";
            this.ctx2.lineWidth = 2;
            this.ctx2.rect(136, 53, 53, 138);
            this.ctx2.stroke();
          }
        }

      }
      image2.src = "./assets/images/Park2_NAR.jpg";

      let image3 = new Image();
      this.ctx3 = this.canvas3.nativeElement.getContext('2d');
      this.ctx3.strokeStyle = "#b71c1c";
      this.ctx3.lineWidth = 2;
      image3.onload = () => {
        this.ctx3.drawImage(image3, 0, 0, 370, 265);
        for (let i = 0; i < this.WatsonRes.s3.length; i++) {
          if (this.WatsonRes.s3[i].object != "walk" && this.WatsonRes.s3[i].object != "stand") {
            console.log(this.WatsonRes.s3[i].object);
            console.log(this.WatsonRes.s3[i].location.left, this.WatsonRes.s3[i].location.top, this.WatsonRes.s3[i].location.width, this.WatsonRes.s3[i].location.height);

            const ii = setInterval(() => {
              this.ctx3.drawImage(image3, 0, 0, 370, 265);
              const jj = setInterval(() => {
                const x = 1;
                //console.log((this.WatsonRes[3][0][i][1]) * 370 / 46, (this.WatsonRes[3][0][i][0]) * 265 / 33, 6, 6);
                this.ctx3.rect(this.WatsonRes.s3[i].location.left, this.WatsonRes.s3[i].location.top, this.WatsonRes.s3[i].location.width, this.WatsonRes.s3[i].location.height);
                this.ctx3.strokeStyle = "#b71c1c";
                this.ctx3.lineWidth = 2;
                this.ctx3.stroke();
                clearInterval(jj);
              }, 2500);
            }, 5000);

            this.ctx3.rect(this.WatsonRes.s3[i].location.left, this.WatsonRes.s3[i].location.top, this.WatsonRes.s3[i].location.width, this.WatsonRes.s3[i].location.height);
            this.ctx3.strokeStyle = "#b71c1c";
            this.ctx3.lineWidth = 2;
            this.ctx3.stroke();
          }
        }
      }
      image3.src = "./assets/images/Park3_AR.jpg";

      let image4 = new Image();
      this.ctx4 = this.canvas4.nativeElement.getContext('2d');
      this.ctx4.strokeStyle = "#b71c1c";
      this.ctx4.lineWidth = 2;
      image4.onload = () => {
        this.ctx4.drawImage(image4, 0, 0, 370, 265);
        for (let i = 0; i < this.WatsonRes.s4.length; i++) {
          if (this.WatsonRes.s4[i].object != "walk" && this.WatsonRes.s4[i].object != "stand") {
            console.log(this.WatsonRes.s4[i].object);
            console.log(this.WatsonRes.s4[i].location.left, this.WatsonRes.s4[i].location.top, this.WatsonRes.s4[i].location.width, this.WatsonRes.s4[i].location.height);

            const ii = setInterval(() => {
              this.ctx4.drawImage(image4, 0, 0, 370, 265);
              const jj = setInterval(() => {
                const x = 1;
                //console.log((this.WatsonRes[3][0][i][1]) * 370 / 46, (this.WatsonRes[3][0][i][0]) * 265 / 33, 6, 6);
                this.ctx4.rect(this.WatsonRes.s4[i].location.left, this.WatsonRes.s4[i].location.top, this.WatsonRes.s4[i].location.width, this.WatsonRes.s4[i].location.height);
                this.ctx4.strokeStyle = "#b71c1c";
                this.ctx4.lineWidth = 2;
                this.ctx4.stroke();
                clearInterval(jj);
              }, 2500);
            }, 5000);

            this.ctx4.rect(this.WatsonRes.s4[i].location.left, this.WatsonRes.s4[i].location.top, this.WatsonRes.s4[i].location.width, this.WatsonRes.s4[i].location.height);
            this.ctx4.strokeStyle = "#b71c1c";
            this.ctx4.lineWidth = 2;
            this.ctx4.stroke();
          }
        }
      }
      image4.src = "./assets/images/Park4_AR.jpg";

      let image5 = new Image();
      this.ctx5 = this.canvas5.nativeElement.getContext('2d');
      this.ctx5.strokeStyle = "#b71c1c";
      this.ctx5.lineWidth = 2;
      image5.onload = () => {
        this.ctx5.drawImage(image5, 0, 0, 370, 265);
        for (let i = 0; i < this.WatsonRes.s5.length; i++) {
          if (this.WatsonRes.s5[i].object != "walk" && this.WatsonRes.s5[i].object != "stand") {
            console.log(this.WatsonRes.s5[i].object);
            console.log(this.WatsonRes.s5[i].location.left, this.WatsonRes.s5[i].location.top, this.WatsonRes.s5[i].location.width, this.WatsonRes.s5[i].location.height);
            const ii = setInterval(() => {
              this.ctx5.drawImage(image5, 0, 0, 370, 265);
              const jj = setInterval(() => {
                const x = 1;
                //console.log((this.WatsonRes[3][0][i][1]) * 370 / 46, (this.WatsonRes[3][0][i][0]) * 265 / 33, 6, 6);
                this.ctx5.rect(this.WatsonRes.s5[i].location.left, this.WatsonRes.s5[i].location.top, this.WatsonRes.s5[i].location.width, this.WatsonRes.s5[i].location.height);
                this.ctx5.strokeStyle = "#b71c1c";
                this.ctx5.lineWidth = 2;
                this.ctx5.stroke();
                clearInterval(jj);
              }, 2500);
            }, 5000);
            this.ctx5.rect(this.WatsonRes.s5[i].location.left, this.WatsonRes.s5[i].location.top, this.WatsonRes.s5[i].location.width, this.WatsonRes.s5[i].location.height);
            this.ctx5.strokeStyle = "#b71c1c";
            this.ctx5.lineWidth = 2;
            this.ctx5.stroke();
          }
        }
      }
      image5.src = "./assets/images/Beach1_AR.jpg";

      let image6 = new Image();
      this.ctx6 = this.canvas6.nativeElement.getContext('2d');
      this.ctx6.strokeStyle = "#b71c1c";
      this.ctx6.lineWidth = 2;
      image6.onload = () => {
        this.ctx6.drawImage(image6, 0, 0, 370, 265);
        for (let i = 0; i < this.WatsonRes.s6.length; i++) {
          if (this.WatsonRes.s6[i].object != "walk" && this.WatsonRes.s6[i].object != "stand") {
            console.log(this.WatsonRes.s6[i].object);
            console.log(this.WatsonRes.s6[i].location.left, this.WatsonRes.s6[i].location.top, this.WatsonRes.s6[i].location.width, this.WatsonRes.s6[i].location.height);
            const ii = setInterval(() => {
              this.ctx6.drawImage(image6, 0, 0, 370, 265);
              const jj = setInterval(() => {
                const x = 1;
                //console.log((this.WatsonRes[3][0][i][1]) * 370 / 46, (this.WatsonRes[3][0][i][0]) * 265 / 33, 6, 6);
                this.ctx6.rect(this.WatsonRes.s6[i].location.left, this.WatsonRes.s6[i].location.top, this.WatsonRes.s6[i].location.width, this.WatsonRes.s6[i].location.height);
                this.ctx6.strokeStyle = "#b71c1c";
                this.ctx6.lineWidth = 2;
                this.ctx6.stroke();
                clearInterval(jj);
              }, 2500);
            }, 5000);
            this.ctx6.rect(this.WatsonRes.s6[i].location.left, this.WatsonRes.s6[i].location.top, this.WatsonRes.s6[i].location.width, this.WatsonRes.s6[i].location.height);
            this.ctx6.strokeStyle = "#b71c1c";
            this.ctx6.lineWidth = 2;
            this.ctx6.stroke();
          }
        }
      }
      image6.src = "./assets/images/Beach2_NAR.jpg";

      let image7 = new Image();
      this.ctx7 = this.canvas7.nativeElement.getContext('2d');
      this.ctx7.strokeStyle = "#b71c1c";
      this.ctx7.lineWidth = 2;
      image7.onload = () => {
        this.ctx7.drawImage(image7, 0, 0, 370, 265);
        for (let i = 0; i < this.WatsonRes.s7.length; i++) {
          if (this.WatsonRes.s7[i].object != "walk" && this.WatsonRes.s7[i].object != "stand") {
            console.log(this.WatsonRes.s7[i].object);
            console.log(this.WatsonRes.s7[i].location.left, this.WatsonRes.s7[i].location.top, this.WatsonRes.s7[i].location.width, this.WatsonRes.s7[i].location.height);
            const ii = setInterval(() => {
              this.ctx7.drawImage(image7, 0, 0, 370, 265);
              const jj = setInterval(() => {
                const x = 1;
                //console.log((this.WatsonRes[3][0][i][1]) * 370 / 46, (this.WatsonRes[3][0][i][0]) * 265 / 33, 6, 6);
                this.ctx7.rect(this.WatsonRes.s7[i].location.left, this.WatsonRes.s7[i].location.top, this.WatsonRes.s7[i].location.width, this.WatsonRes.s7[i].location.height);
                this.ctx7.strokeStyle = "#b71c1c";
                this.ctx7.lineWidth = 2;
                this.ctx7.stroke();
                clearInterval(jj);
              }, 2500);
            }, 5000);
            this.ctx7.rect(this.WatsonRes.s7[i].location.left, this.WatsonRes.s7[i].location.top, this.WatsonRes.s7[i].location.width, this.WatsonRes.s7[i].location.height);
            this.ctx7.strokeStyle = "#b71c1c";
            this.ctx7.lineWidth = 2;
            this.ctx7.stroke();
          }
        }
      }
      image7.src = "./assets/images/Beach3_AR.jpg";

      let image8 = new Image();
      this.ctx8 = this.canvas8.nativeElement.getContext('2d');
      this.ctx8.strokeStyle = "#b71c1c";
      this.ctx8.lineWidth = 2;
      image8.onload = () => {
        this.ctx8.drawImage(image8, 0, 0, 370, 265);
        for (let i = 0; i < this.WatsonRes.s8.length; i++) {
          if (this.WatsonRes.s8[i].object != "walk" && this.WatsonRes.s8[i].object != "stand") {
            console.log(this.WatsonRes.s8[i].object);
            console.log(this.WatsonRes.s8[i].location.left, this.WatsonRes.s8[i].location.top, this.WatsonRes.s8[i].location.width, this.WatsonRes.s8[i].location.height);
            const ii = setInterval(() => {
              this.ctx8.drawImage(image8, 0, 0, 370, 265);
              const jj = setInterval(() => {
                const x = 1;
                //console.log((this.WatsonRes[3][0][i][1]) * 370 / 46, (this.WatsonRes[3][0][i][0]) * 265 / 33, 6, 6);
                this.ctx8.rect(this.WatsonRes.s8[i].location.left, this.WatsonRes.s8[i].location.top, this.WatsonRes.s8[i].location.width, this.WatsonRes.s8[i].location.height);
                this.ctx8.strokeStyle = "#b71c1c";
                this.ctx8.lineWidth = 2;
                this.ctx8.stroke();
                clearInterval(jj);
              }, 2500);
            }, 5000);
            this.ctx8.rect(this.WatsonRes.s8[i].location.left, this.WatsonRes.s8[i].location.top, this.WatsonRes.s8[i].location.width, this.WatsonRes.s8[i].location.height);
            this.ctx8.strokeStyle = "#b71c1c";
            this.ctx8.lineWidth = 2;
            this.ctx8.stroke();
          }
        }
      }
      image8.src = "./assets/images/Beach4_NAR.jpg";
      this.WatsonRes = response;
      console.log(Object.keys(this.WatsonRes).length);
      console.log(this.WatsonRes.s1);
      console.log(this.WatsonRes.s1.length);
      console.log(this.WatsonRes.s1.map(o => o.object).join(', '));

      const stringTooltip_s1 = this.CheckifExists(this.WatsonRes.s1);
      const stringTooltip_s2 = this.CheckifExists(this.WatsonRes.s2);
      const stringTooltip_s3 = this.CheckifExists(this.WatsonRes.s3);
      const stringTooltip_s4 = this.CheckifExists(this.WatsonRes.s4);
      const stringTooltip_s5 = this.CheckifExists(this.WatsonRes.s5);
      const stringTooltip_s6 = this.CheckifExists(this.WatsonRes.s6);
      const stringTooltip_s7 = this.CheckifExists(this.WatsonRes.s7);
      const stringTooltip_s8 = this.CheckifExists(this.WatsonRes.s8);

      this.Park1AR1_FinalStats = (stringTooltip_s1 == "") ? "No objects detected" : "People are " + stringTooltip_s1;
      this.Park2NAR1_FinalStats = (stringTooltip_s2 == "") ? "No objects detected" : "People are " + stringTooltip_s2;
      this.Park3AR1_FinalStats = (stringTooltip_s3 == "") ? "No objects detected" : "People are " + stringTooltip_s3;
      this.Park4AR1_FinalStats = (stringTooltip_s4 == "") ? "No objects detected" : "People are " + stringTooltip_s4;

      this.Beach1AR1_FinalStats = (stringTooltip_s5 == "") ? "No objects detected" : "People are " + stringTooltip_s5;
      this.Beach2NAR1_FinalStats = (stringTooltip_s6 == "") ? "No objects detected" : "People are " + stringTooltip_s6;
      this.Beach3AR1_FinalStats = (stringTooltip_s7 == "") ? "No objects detected" : "People are " + stringTooltip_s7;
      this.Beach4NAR1_FinalStats = (stringTooltip_s8 == "") ? "No objects detected" : "People are " + stringTooltip_s8;

    });

  }

  private CheckifExists(objectarray) {
    var finalSring = "";
    if (objectarray.map(o => o.object).includes('walk')) {
      finalSring += "Walking";
    }
    if (objectarray.map(o => o.object).includes('sit')) {
      if (finalSring != "")
        finalSring += ", Sitting";
      else
        finalSring += "Sitting";
    }
    if (objectarray.map(o => o.object).includes('sleep')) {
      if (finalSring != "")
        finalSring += ", Sleeping";
      else
        finalSring += "Sleeping";
    }
    return finalSring;
  }
}
