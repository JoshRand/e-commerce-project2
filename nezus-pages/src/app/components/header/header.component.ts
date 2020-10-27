import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  admin:boolean = (localStorage.getItem("role") === "admin");
  user:User = JSON.parse(localStorage.getItem('user'));
  name:string = localStorage.getItem("userName");
  
  firstButton:string = localStorage.getItem("fb");
  secondButton:string = localStorage.getItem("sb");
  thirdButton:string = localStorage.getItem("tb");
  fourthButton:string = localStorage.getItem("fob");
  fifthButton:string = localStorage.getItem("fib");
  constructor() {
    // firstButton = localStorage.getItem("fb");
    // secondButton = localStorage.getItem("sb");
    // thirdButton = localStorage.getItem("tb");
    // fourthButton = localStorage.getItem("fob");
    localStorage.setItem("fb","Home");
    localStorage.setItem("sb","Contact");
    localStorage.setItem("tb","Register");
    
    console.log(localStorage.getItem("loggedin"));
    if(localStorage.getItem("loggedin")==="true")
    {
      localStorage.setItem("fob","logout");
    }
    else if(localStorage.getItem("loggedin")===null)
    {
      localStorage.setItem("fob","Login");
    }
    localStorage.setItem("fib","Users");
   
   }

  ngOnInit(): void {
  }
  onHome()
  {
    console.log("Home clicked");
    localStorage.setItem("pageCondition","home");
    window.location.reload();
  }
  onContact()
  {
    console.log("Contact clicked");
    window.location.reload();
  }
  onRegister()
  {
    console.log("Register clicked");
    localStorage.setItem("pageCondition","register");
    window.location.reload();
  }
  onUsers()
  {
    
    console.log("get all users clicked");
    localStorage.setItem("pageCondition","users");
    window.location.reload();
  }
  onLogin()
  {
   if(localStorage.getItem("fob") == "Login")
   {
    console.log("Login clicked");
    localStorage.setItem("pageCondition","login");
    window.location.reload();
   }
   else if(localStorage.getItem("fob") == "logout")
   {
     
    console.log("Logout clicked");
    localStorage.clear();
    localStorage.setItem("fob","Login");
    localStorage.setItem("fb","Home");
    localStorage.setItem("sb","Contact");
    localStorage.setItem("tb","Register");
    
    console.log(localStorage.getItem("loggedin"));
    if(localStorage.getItem("loggedin")==="true")
    {
      localStorage.setItem("fob","logout");
    }
    else if(localStorage.getItem("loggedin")===null)
    {
      localStorage.setItem("fob","Login");
    }
    localStorage.setItem("fib","Users");
    localStorage.setItem("pageCondition","login");
    window.location.reload();
   }
  }
}
