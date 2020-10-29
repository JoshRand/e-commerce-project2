import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Subscriber } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user:User = JSON.parse(localStorage.getItem("user"));
  name:string = localStorage.getItem("userName");
  pass:string;
  toggleShowDetails: boolean = false;
  public homeForm: FormGroup;
  userId:string;
  userName:string;
  password:string;

  constructor(private userService: UserService) {
    this.userService.getUser().subscribe(data=>{
      this.user = data[0];
      localStorage.setItem("user",JSON.stringify(data[0]));
      console.log(this.user);
     
    },
    err => {
      
    });
    
    //localStorage.clear();
    this.homeForm = new FormGroup({
      
      userId: new FormControl(this.user.userId),
      userName: new FormControl(this.user.userName),
      password: new FormControl(this.user.password),
      repassword: new FormControl(this.user.password),
      role: new FormControl(this.user.role)
    })
    
   }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem("user"));
    this.name = localStorage.getItem("userName");
    
    // this.userService.getUser().subscribe(data=>{
    //   this.user = data[0];
    //  // localStorage.setItem("user",JSON.parse(data[0]))
    //   console.log(this.user);
    // })
  }
  onShowDetails()
  {
    this.toggleShowDetails = !this.toggleShowDetails;
  }

  onUpdate()
  {
   
    console.log(localStorage.getItem("token"));
    this.userService.updateUser(this.homeForm.value.userName,this.homeForm.value.password,this.homeForm.value.repassword).subscribe(data=>{
     
    });
    this.userService.getUser().subscribe(data=>{
      this.user = data[0];
      localStorage.setItem("user",JSON.stringify(data[0]));
      console.log(this.user);
     
    },
    err => {
      
    },
     () => {
       window.location.reload();
    });
// console.log(this.user);
    // this.homeForm.value.userId = this.user.userId;
    // this.homeForm.value.userName = this.user.userName;
    // this.homeForm.value.password = this.user.password;
    // this.homeForm.value.role = this.user.role;
   
  }

}
