import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  uname:string;
  pass:string;
  user:User;
  public loginForm: FormGroup;
  constructor(private userService: UserService) {
    this.loginForm = new FormGroup({
      uname: new FormControl(""),
      pass: new FormControl("")
    });
   }

  ngOnInit(): void {
  }

  public onSubmit(): void
    {
      console.log(this.loginForm.value);
      console.log("submitted")
    this.userService.login(this.loginForm.value.uname,this.loginForm.value.pass).subscribe(json => {
      console.log(json.token);
      this.user = json.user;
      localStorage.setItem('pageCondition','home');
      console.log(this.user);
      localStorage.setItem('user', JSON.stringify(this.user));
      localStorage.setItem('userName',this.user.userName);
      localStorage.setItem('role', this.user.role);
      localStorage.setItem('token', json.token);
      localStorage.setItem('pageCondition','home');
      localStorage.setItem('fob', "logout");
      localStorage.setItem("loggedin","true");
      localStorage.setItem("profilePic",json.profilePicture);

      console.log(localStorage.getItem("profilePic"));
      window.location.reload();
    });
  }
}
