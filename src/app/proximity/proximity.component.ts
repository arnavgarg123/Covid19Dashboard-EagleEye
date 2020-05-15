import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ChatService } from '../services/chat.service';
@Component({
  selector: 'app-proximity',
  templateUrl: './proximity.component.html',
  styleUrls: ['./proximity.component.css']
})
export class ProximityComponent implements OnInit {
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
  tes1: any;
  tes2: any;
  tes3: any;
  tes4: any;
  tes5: any;
  tes6: any;
  tes7: any;
  tes8: any;
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
  locationHover: any;
  WatsonRes: any;
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
        this.lat = -37.835670;
        this.lng = 145.120575;
        this.locationHover = "Box Hill";
        break;
      case 'canvas6':
        this.lat = -33.887488;
        this.lng = 151.125610;
        this.locationHover = "Ashfield Station";
        break;
      case 'canvas7':
        this.lat = -33.970240;
        this.lng = 151.115380;
        this.locationHover = "Allawah Station";
        break;
      case 'canvas8':
        this.lat = -33.808860;
        this.lng = 151.184800;
        this.locationHover = "Artarmon Station";
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
  constructor(private chatService: ChatService) {
    this.zoom = 15;
    this.lat = -33.871722;
    this.lng = 151.2067078;
    this.locationHover = "Queen Victoria Building";
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
      this.WatsonRes = response;


      let image1 = new Image();
      this.ctx1 = this.canvas1.nativeElement.getContext('2d');
      this.ctx1.strokeStyle = "red";
      this.ctx1.lineWidth = 2;
      image1.onload = () => {
        this.ctx1.drawImage(image1, 0, 0, 370, 265);
        for (let i = 0; i < this.WatsonRes[1][0].length; i++) {
          //console.log(this.WatsonRes[1][0][i][0], this.WatsonRes[1][0][i][0] * 265 / 33, this.WatsonRes[1][0][i][1], this.WatsonRes[1][0][i][1] * 370 / 46);
          this.ctx1.fillStyle = "#FF0000";
          this.ctx1.fillRect((this.WatsonRes[1][0][i][1]) * 370 / 46, (this.WatsonRes[1][0][i][0]) * 265 / 33, 6, 6);
          const ii = setInterval(() => {
            this.ctx1.drawImage(image1, 0, 0, 370, 265);
            const jj = setInterval(() => {
              const x = 1;
              //console.log((this.WatsonRes[3][0][i][1]) * 370 / 46, (this.WatsonRes[3][0][i][0]) * 265 / 33, 6, 6);
              this.ctx1.fillRect((this.WatsonRes[1][0][i][1]) * 370 / 46, (this.WatsonRes[1][0][i][0]) * 265 / 33, 6, 6);
              clearInterval(jj);
            }, 2500);
          }, 5000);
          //[[3, 3], [12, 18], [15, 18], [17, 41], [22, 16]]
          //[[5, 5], [15, 20], [18, 20], [18, 44], [23, 18]]
          this.ctx1.strokeStyle = "red";
          this.ctx1.lineWidth = 2;
          this.ctx1.stroke();

        }
      }
      //image1.src = "./assets/images/1.jpg";
      image1.src = "./assets/images/1.jpg";




      let image2 = new Image();
      this.ctx2 = this.canvas2.nativeElement.getContext('2d');
      this.ctx2.strokeStyle = "red";
      this.ctx2.lineWidth = 2;
      image2.onload = () => {
        this.ctx2.drawImage(image2, 0, 0, 370, 265);
        for (let i = 0; i < this.WatsonRes[2][0].length; i++) {
          //console.log(this.WatsonRes[2][0][i][0], this.WatsonRes[2][0][i][0] * 265 / 33, this.WatsonRes[2][0][i][1], this.WatsonRes[2][0][i][1] * 370 / 46);
          this.ctx2.fillStyle = "#FF0000";
          this.ctx2.fillRect((this.WatsonRes[2][0][i][1]) * 370 / 46, (this.WatsonRes[2][0][i][0]) * 265 / 33, 6, 6);
          const ii = setInterval(() => {
            this.ctx2.drawImage(image2, 0, 0, 370, 265);
            const jj = setInterval(() => {
              const x = 1;
              //console.log((this.WatsonRes[3][0][i][1]) * 370 / 46, (this.WatsonRes[3][0][i][0]) * 265 / 33, 6, 6);
              this.ctx2.fillRect((this.WatsonRes[2][0][i][1]) * 370 / 46, (this.WatsonRes[2][0][i][0]) * 265 / 33, 6, 6);
              clearInterval(jj);
            }, 2500);
          }, 5000);
          //[[3, 3], [12, 18], [15, 18], [17, 41], [22, 16]]
          //[[5, 5], [15, 20], [18, 20], [18, 44], [23, 18]]
          this.ctx2.strokeStyle = "red";
          this.ctx2.lineWidth = 2;
          this.ctx2.stroke();

        }
      }
      //image1.src = "./assets/images/1.jpg";
      image2.src = "./assets/images/new1.jpg";



      let image3 = new Image();
      this.ctx3 = this.canvas3.nativeElement.getContext('2d');
      this.ctx3.strokeStyle = "red";
      this.ctx3.lineWidth = 2;
      image3.onload = () => {
        this.ctx3.drawImage(image3, 0, 0, 370, 265);
        for (let i = 0; i < this.WatsonRes[3][0].length; i++) {
          //console.log(this.WatsonRes[3][0][i][0], this.WatsonRes[3][0][i][0] * 265 / 33, this.WatsonRes[3][0][i][1], this.WatsonRes[3][0][i][1] * 370 / 46);
          this.ctx3.fillStyle = "#FF0000";
          this.ctx3.fillRect((this.WatsonRes[3][0][i][1]) * 370 / 46, (this.WatsonRes[3][0][i][0]) * 265 / 33, 6, 6);
          const ii = setInterval(() => {
            this.ctx3.drawImage(image3, 0, 0, 370, 265);
            const jj = setInterval(() => {
              const x = 1;
              //console.log((this.WatsonRes[3][0][i][1]) * 370 / 46, (this.WatsonRes[3][0][i][0]) * 265 / 33, 6, 6);
              this.ctx3.fillRect((this.WatsonRes[3][0][i][1]) * 370 / 46, (this.WatsonRes[3][0][i][0]) * 265 / 33, 6, 6);
              clearInterval(jj);
            }, 2500);
          }, 5000);
          //[[3, 3], [12, 18], [15, 18], [17, 41], [22, 16]]
          //[[5, 5], [15, 20], [18, 20], [18, 44], [23, 18]]
          this.ctx3.strokeStyle = "red";
          this.ctx3.lineWidth = 2;
          this.ctx3.stroke();

        }
      }
      //image1.src = "./assets/images/1.jpg";
      image3.src = "./assets/images/3.jpg";



      let image4 = new Image();
      this.ctx4 = this.canvas4.nativeElement.getContext('2d');
      this.ctx4.strokeStyle = "red";
      this.ctx4.lineWidth = 2;
      image4.onload = () => {
        this.ctx4.drawImage(image4, 0, 0, 370, 265);
        for (let i = 0; i < this.WatsonRes[4][0].length; i++) {
          //console.log(this.WatsonRes[4][0][i][0], this.WatsonRes[4][0][i][0] * 265 / 33, this.WatsonRes[4][0][i][1], this.WatsonRes[4][0][i][1] * 370 / 46);
          this.ctx4.fillStyle = "#FF0000";
          this.ctx4.fillRect((this.WatsonRes[4][0][i][1]) * 370 / 46, (this.WatsonRes[4][0][i][0]) * 265 / 33, 6, 6);
          const ii = setInterval(() => {
            this.ctx4.drawImage(image4, 0, 0, 370, 265);
            const jj = setInterval(() => {
              const x = 1;
              //console.log((this.WatsonRes[3][0][i][1]) * 370 / 46, (this.WatsonRes[3][0][i][0]) * 265 / 33, 6, 6);
              this.ctx4.fillRect((this.WatsonRes[4][0][i][1]) * 370 / 46, (this.WatsonRes[4][0][i][0]) * 265 / 33, 6, 6);
              clearInterval(jj);
            }, 2500);
          }, 5000);
          //[[3, 3], [12, 18], [15, 18], [17, 41], [22, 16]]
          //[[5, 5], [15, 20], [18, 20], [18, 44], [23, 18]]
          this.ctx4.strokeStyle = "red";
          this.ctx4.lineWidth = 2;
          this.ctx4.stroke();

        }
      }
      //image1.src = "./assets/images/1.jpg";
      image4.src = "./assets/images/new11.jpg";


      let image5 = new Image();
      this.ctx5 = this.canvas5.nativeElement.getContext('2d');
      this.ctx5.strokeStyle = "red";
      this.ctx5.lineWidth = 2;
      image5.onload = () => {
        this.ctx5.drawImage(image5, 0, 0, 370, 265);
        for (let i = 0; i < this.WatsonRes[5][0].length; i++) {
          //console.log(this.WatsonRes[5][0][i][0], this.WatsonRes[5][0][i][0] * 265 / 33, this.WatsonRes[5][0][i][1], this.WatsonRes[5][0][i][1] * 370 / 46);
          this.ctx5.fillStyle = "#FF0000";
          this.ctx5.fillRect((this.WatsonRes[5][0][i][1]) * 370 / 46, (this.WatsonRes[5][0][i][0]) * 265 / 33, 6, 6);
          const ii = setInterval(() => {
            this.ctx5.drawImage(image5, 0, 0, 370, 265);
            const jj = setInterval(() => {
              const x = 1;
              //console.log((this.WatsonRes[3][0][i][1]) * 370 / 46, (this.WatsonRes[3][0][i][0]) * 265 / 33, 6, 6);
              this.ctx5.fillRect((this.WatsonRes[5][0][i][1]) * 370 / 46, (this.WatsonRes[5][0][i][0]) * 265 / 33, 6, 6);
              clearInterval(jj);
            }, 2500);
          }, 5000);
          //[[3, 3], [12, 18], [15, 18], [17, 41], [22, 16]]
          //[[5, 5], [15, 20], [18, 20], [18, 44], [23, 18]]
          this.ctx5.strokeStyle = "red";
          this.ctx5.lineWidth = 2;
          this.ctx5.stroke();

        }
      }
      //image1.src = "./assets/images/1.jpg";
      image5.src = "./assets/images/new111.jpg";


      let image6 = new Image();
      this.ctx6 = this.canvas6.nativeElement.getContext('2d');
      this.ctx6.strokeStyle = "red";
      this.ctx6.lineWidth = 2;
      image6.onload = () => {
        this.ctx6.drawImage(image6, 0, 0, 370, 265);
        for (let i = 0; i < this.WatsonRes[6][0].length; i++) {
          //console.log(this.WatsonRes[5][0][i][0], this.WatsonRes[5][0][i][0] * 265 / 33, this.WatsonRes[5][0][i][1], this.WatsonRes[5][0][i][1] * 370 / 46);
          this.ctx6.fillStyle = "#FF0000";
          this.ctx6.fillRect((this.WatsonRes[6][0][i][1]) * 370 / 46, (this.WatsonRes[6][0][i][0]) * 265 / 33, 6, 6);
          const ii = setInterval(() => {
            this.ctx6.drawImage(image6, 0, 0, 370, 265);
            const jj = setInterval(() => {
              const x = 1;
              //console.log((this.WatsonRes[3][0][i][1]) * 370 / 46, (this.WatsonRes[3][0][i][0]) * 265 / 33, 6, 6);
              this.ctx6.fillRect((this.WatsonRes[6][0][i][1]) * 370 / 46, (this.WatsonRes[6][0][i][0]) * 265 / 33, 6, 6);
              clearInterval(jj);
            }, 2500);
          }, 5000);
          //[[3, 3], [12, 18], [15, 18], [17, 41], [22, 16]]
          //[[5, 5], [15, 20], [18, 20], [18, 44], [23, 18]]
          this.ctx6.strokeStyle = "red";
          this.ctx6.lineWidth = 2;
          this.ctx6.stroke();

        }
      }
      //image1.src = "./assets/images/1.jpg";
      image6.src = "./assets/images/test6.jpg";




      let image7 = new Image();
      this.ctx7 = this.canvas7.nativeElement.getContext('2d');
      this.ctx7.strokeStyle = "red";
      this.ctx7.lineWidth = 2;
      image7.onload = () => {
        this.ctx7.drawImage(image7, 0, 0, 370, 265);
        for (let i = 0; i < this.WatsonRes[7][0].length; i++) {
          //console.log(this.WatsonRes[2][0][i][0], this.WatsonRes[2][0][i][0] * 265 / 33, this.WatsonRes[2][0][i][1], this.WatsonRes[2][0][i][1] * 370 / 46);
          this.ctx7.fillStyle = "#FF0000";
          this.ctx7.fillRect((this.WatsonRes[7][0][i][1]) * 370 / 46, (this.WatsonRes[7][0][i][0]) * 265 / 33, 6, 6);
          const ii = setInterval(() => {
            this.ctx7.drawImage(image7, 0, 0, 370, 265);
            const jj = setInterval(() => {
              const x = 1;
              //console.log((this.WatsonRes[3][0][i][1]) * 370 / 46, (this.WatsonRes[3][0][i][0]) * 265 / 33, 6, 6);
              this.ctx7.fillRect((this.WatsonRes[7][0][i][1]) * 370 / 46, (this.WatsonRes[7][0][i][0]) * 265 / 33, 6, 6);
              clearInterval(jj);
            }, 2500);
          }, 5000);
          //[[3, 3], [12, 18], [15, 18], [17, 41], [22, 16]]
          //[[5, 5], [15, 20], [18, 20], [18, 44], [23, 18]]
          this.ctx7.strokeStyle = "red";
          this.ctx7.lineWidth = 2;
          this.ctx7.stroke();

        }
      }
      //image1.src = "./assets/images/1.jpg";
      image7.src = "./assets/images/test7.jpg";




      let image8 = new Image();
      this.ctx8 = this.canvas8.nativeElement.getContext('2d');
      this.ctx8.strokeStyle = "red";
      this.ctx8.lineWidth = 2;
      image8.onload = () => {
        this.ctx8.drawImage(image8, 0, 0, 370, 265);
        for (let i = 0; i < this.WatsonRes[8][0].length; i++) {
          //console.log(this.WatsonRes[2][0][i][0], this.WatsonRes[2][0][i][0] * 265 / 33, this.WatsonRes[2][0][i][1], this.WatsonRes[2][0][i][1] * 370 / 46);
          this.ctx8.fillStyle = "#FF0000";
          this.ctx8.fillRect((this.WatsonRes[8][0][i][1]) * 370 / 46, (this.WatsonRes[8][0][i][0]) * 265 / 33, 6, 6);
          const ii = setInterval(() => {
            this.ctx8.drawImage(image8, 0, 0, 370, 265);
            const jj = setInterval(() => {
              const x = 1;
              //console.log((this.WatsonRes[3][0][i][1]) * 370 / 46, (this.WatsonRes[3][0][i][0]) * 265 / 33, 6, 6);
              this.ctx8.fillRect((this.WatsonRes[8][0][i][1]) * 370 / 46, (this.WatsonRes[8][0][i][0]) * 265 / 33, 6, 6);
              clearInterval(jj);
            }, 2500);
          }, 5000);
          //[[3, 3], [12, 18], [15, 18], [17, 41], [22, 16]]
          //[[5, 5], [15, 20], [18, 20], [18, 44], [23, 18]]
          this.ctx8.strokeStyle = "red";
          this.ctx8.lineWidth = 2;
          this.ctx8.stroke();

        }
      }
      //image1.src = "./assets/images/1.jpg";
      image8.src = "./assets/images/test8.jpg";



      this.tes1 = (this.WatsonRes[1][2]).toString() + " people are in the frame";
      this.tes2 = (this.WatsonRes[2][2]).toString() + " people are in the frame";
      this.tes3 = (this.WatsonRes[3][2]).toString() + " people are in the frame";
      this.tes4 = (this.WatsonRes[4][2]).toString() + " people are in the frame";
      this.tes5 = (this.WatsonRes[5][2]).toString() + " people are in the frame";
      this.tes6 = (this.WatsonRes[6][2]).toString() + " people are in the frame";
      this.tes7 = (this.WatsonRes[7][2]).toString() + " people are in the frame";
      this.tes8 = (this.WatsonRes[8][2]).toString() + " people are in the frame";

      //this.var1 = response[1][1];
      //this.var2 = response[2][1];
      //this.var3 = response[3][1];
      //this.var11 = response[1][2];
      //this.var22 = response[2][2];
      //this.var33 = response[3][2];
      //if (this.var1 > 30) {
      //  this.color1 = "red";
      //}
      //if (this.var11 > 4) {
      //  this.color11 = "red";
      //}
      //if (this.var2 > 30) {
      //  this.color2 = "red";
      //}
      //if (this.var22 > 4) {
      //  this.color22 = "red";
      //}
      //if (this.var3 > 30) {
      //  this.color3 = "red";
      //}
      //if (this.var33 > 4) {
      //  this.color33 = "red";
      //}
    });
  }

  ngOnInit(): void {
  }

}
