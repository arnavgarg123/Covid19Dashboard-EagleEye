import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  var1: any;
  var11: any;
  var2: any;
  var22: any;
  var222: any;

  a1() {
    localStorage.setItem("number", "1");
    this.var2 = "active";
    this.var22 = "";
    this.var222 = "";
  }
  a2() {
    localStorage.setItem("number", "2");
    this.var22 = "active";
    this.var2 = "";
    this.var222 = "";
  }
  a3() {
    localStorage.setItem("number", "3");
    this.var222 = "active";
    this.var22 = "";
    this.var2 = "";
  }
  constructor() {
    if (!localStorage.getItem("number")) {
      localStorage.setItem("number", "1");
    }
    if (localStorage.getItem('number') == "1") {
      this.a1();
    }
    if (localStorage.getItem('number') == "2") {
      this.a2();
    }
    if (localStorage.getItem('number') == "3") {
      this.a3();
    }
    this.var11 = "none";
    this.var1 = "none";
    if (localStorage.getItem('userID') == "admin") {
      this.var1 = "none";
      this.var11 = "";
    }
    else {
      this.var11 = "none";
      this.var1 = "";
    }
  }

  ngOnInit(): void {
  }

}
