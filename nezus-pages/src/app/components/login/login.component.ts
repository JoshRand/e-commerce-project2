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
  constructor(private userService: UserService,private formBuilder:FormBuilder) {
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
  //   this.uname = this.unameControl.value;
  //   this.pass = this.passControl.value;
    console.log("submitted")
    // this.userService.login(value.uname,value.pass).subscribe(json => {
     
    //   console.log(json.token);
    //   this.user = json.user;
    //   localStorage.setItem('pageCondition','home');
    //   console.log(this.user);
    //   localStorage.setItem('user', JSON.stringify(this.user));
    //   localStorage.setItem('userName',this.user.userName);
    //   localStorage.setItem('role', this.user.role);
    //   localStorage.setItem('token', json.token);
    //   localStorage.setItem('pageCondition','home');
    // });
  }
}
