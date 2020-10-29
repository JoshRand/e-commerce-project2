import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerType: boolean = (localStorage.getItem("role") === "user" || localStorage.getItem("role") === null);
  rol:string;
  uname:string;
  pass:string;
  user:User;
  public registerForm: FormGroup;
  constructor(private userService: UserService) {
    //localStorage.clear();
    this.registerForm = new FormGroup({
      uname: new FormControl(""),
      pass: new FormControl(""),
      rol: new FormControl("")
    });
   }
  ngOnInit(): void {
  }
  onSubmit()
  {
    if(localStorage.getItem("role") === "user" || localStorage.getItem("role") === null)
    {
      console.log("adding new User");
      this.userService.register(this.registerForm.value.uname,this.registerForm.value.pass).subscribe(json => {
      });
    }
    else if(localStorage.getItem("role") === "admin")
    {
      this.userService.registerAdmin(this.registerForm.value.uname,this.registerForm.value.pass,this.registerForm.value.rol).subscribe(json => {
      });
    }
      window.location.reload();
    
  }

}
