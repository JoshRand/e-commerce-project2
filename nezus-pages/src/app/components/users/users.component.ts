import { Component, OnInit } from '@angular/core';
import { User } from '../../models/User';
import { UserService } from '../../services/user.service'
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users:User[];
  buttonHide: boolean = false;
  showUsersFlag: boolean = false;
  showRegisterFlag:boolean = false;
  profilePic:string = "../../../assets/";
  constructor(private userService: UserService) { }

 

  ngOnInit(): void {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
    });
  }

  deleteUser(userId)
  {
    console.log(userId);
    this.userService.deleteUser(userId).subscribe();
    window.location.reload();
  }
  buttonReset()
  {
    this.buttonHide = false;
    this.showUsersFlag = false;
    this.showRegisterFlag = false;
  }
  showUsersToggle()
  {
    this.showUsersFlag = !this.showUsersFlag;
    this.showRegisterFlag = false;
    this.buttonHide = true;
    
  }
  registerToggle()
  {
    this.showRegisterFlag = !this.showRegisterFlag;
    this.showUsersFlag = false;
    this.buttonHide = true;
  }
}
