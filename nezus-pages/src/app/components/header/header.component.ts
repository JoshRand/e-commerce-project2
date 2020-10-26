import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user:User = JSON.parse(localStorage.getItem('user'));
  name:string = this.user.userName;
  firstButton:string = "Home";
  secondButton:string = "Contact";
  thirdButton:string = "Register";
  fourthButton:string = "Login";
  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }
  onHome()
  {
    console.log("Home clicked");
  }
  onContact()
  {
    console.log("Contact clicked");
  }
  onRegister()
  {
    console.log("Register clicked");
  }
  onLogin()
  {
   
    console.log("Login clicked");
    localStorage.setItem("pageCondition","login");
    window.location.reload();
  }
}
