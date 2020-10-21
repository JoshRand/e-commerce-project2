import { Component, OnInit } from '@angular/core';
import { User } from '../../models/User';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users:User[];
  constructor() { }

  ngOnInit(): void {
    this.users = [
      {
        userId: 1,
        userName: "momo@gmail.com",
        password: "momo",
        role: "admin"
      },
      {
        userId: 2,
        userName: "meme@gmail.com",
        password: "momo",
        role: "admin"
      },
      {
        userId: 3,
        userName: "mqmq@gmail.com",
        password: "momo",
        role: "admin"
      }
    ]
  }

}
