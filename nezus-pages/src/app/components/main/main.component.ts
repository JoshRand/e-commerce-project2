import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  getUsersCondition: boolean = (localStorage.getItem("role")===
  "admin" && localStorage.getItem("pageCondition") === "getAllUsers");
  loginPageCondition: boolean = (localStorage.getItem("pageCondition") === "login");
  homePageCondition: boolean = (localStorage.getItem("pageCondition") === "home");
  constructor() { }

  ngOnInit(): void {
    
  }

}
