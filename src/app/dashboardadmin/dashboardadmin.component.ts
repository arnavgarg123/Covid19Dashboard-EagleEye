import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboardadmin',
  templateUrl: './dashboardadmin.component.html',
  styleUrls: ['./dashboardadmin.component.css']
})
export class DashboardadminComponent implements OnInit {

  var11 = "none";
  var111 = "none";
  loc: any;
  change() {
    if (this.var11 == "none")
      this.var11 = "";
    else
      this.var11 = "none";
  }
  change1() {
    this.loc = localStorage.getItem("loc");
    if (this.var111 == "none")
      this.var111 = "";
    else
      this.var111 = "none";
  }

  constructor() {
  }

  ngOnInit(): void {
  }

}
