import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  getUsersCondition: boolean = (localStorage.getItem("role") === 
  "admin" && localStorage.getItem("pageCondition") === "users");
  loginPageCondition: boolean = (localStorage.getItem("pageCondition") === "login") ;
  homePageCondition: boolean = (localStorage.getItem("pageCondition") === "home" && localStorage.getItem("loggedin")!= null);
  registerPageCondition: boolean = (localStorage.getItem("pageCondition") === "register");
  usersPageCondition: boolean = (localStorage.getItem("pageCondition") === "users" && localStorage.getItem("role") === "admin")
  //&& localStorage.getItem("loggedin")==="false")
  
  constructor() {
  //localStorage.clear();
 
}

  ngOnInit(): void {
    
  }

}
