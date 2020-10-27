import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user:User;
  name:string = localStorage.getItem("userName");
  constructor() { }

  ngOnInit(): void {
  }

  showDetails()
  {

  }

}
