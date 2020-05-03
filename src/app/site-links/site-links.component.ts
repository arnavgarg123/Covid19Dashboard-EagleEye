import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ChatService } from '../services/chat.service';
@Component({
  selector: 'app-site-links',
  templateUrl: './site-links.component.html',
  styleUrls: ['./site-links.component.css']
})
export class SiteLinksComponent implements OnInit {
  data: Array<{ dat }> = [];
  m1: any;
  m2: any;
  m3: any;
  rec() {

    this.m1 = this.data[0]['dat'];
    this.ref.detectChanges();
  }
  recom() {
    this.chatService.getBook().subscribe(response => {
      if (response) {
        this.data.push({ dat: JSON.stringify(JSON.parse(response.toString())[0]['original_title']) });
        this.data.push({ dat: JSON.stringify(JSON.parse(response.toString())[1]['original_title']) });
        this.data.push({ dat: JSON.stringify(JSON.parse(response.toString())[2]['original_title']) });
        this.m1 = JSON.stringify(JSON.parse(response.toString())[0]['original_title']);
        this.m2 = JSON.stringify(JSON.parse(response.toString())[1]['original_title']);
        this.m3 = JSON.stringify(JSON.parse(response.toString())[2]['original_title']);
        console.log(JSON.parse(response.toString()));
      }//this.rec();
    });

    //this.m1=;
    //this.m2=;
    //this.m3=;
  }
  constructor(private chatService: ChatService, private ref: ChangeDetectorRef) {
    this.m1 = "Loading";
    this.m2 = "Loading";
    this.m3 = "Loading";
  }

  ngOnInit(): void {

    this.recom();
  }

}
