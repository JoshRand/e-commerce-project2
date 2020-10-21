import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
const GET_USERS_API_REQUEST_ROUTE = 'http://localhost:8081/users';
const USER_API_REQUEST_ROUTE = 'http://localhost:8081/user';

export class UserService implements OnInit{

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }
  callServer() {
    const headers = new HttpHeaders()
          .set('Authorization', 
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjcsImlhdCI6MTYwMzMwNDMyMSwiZXhwIjoxNjAzMzExNTIxfQ.rhq-pRb1m6a7JYC1CMr3tND_AgGyFgzwmEwktVkW07g')
          .set('Content-Type', 'application/json');

    this.http.get(USER_API_REQUEST_ROUTE, , {
      headers: headers
    })
    .subscribe(data => {
      console.log(data);
    });
}