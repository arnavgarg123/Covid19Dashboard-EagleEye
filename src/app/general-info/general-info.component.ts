import { Component, OnInit } from '@angular/core';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-general-info',
  templateUrl: './general-info.component.html',
  styleUrls: ['./general-info.component.css']
})
export class GeneralInfoComponent implements OnInit {
  data: any;
  constructor(private chatService: ChatService) {
    this.chatService.getnews().subscribe(response => {
      console.log(response);
      this.data = response;
    });
  }

  ngOnInit(): void {
  }

}
