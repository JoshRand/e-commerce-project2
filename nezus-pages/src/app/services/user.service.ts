import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

import { User } from '../models/User';
import { Observable } from 'rxjs';

const ADMIN_API_REQUEST_ROUTE = 'http://localhost:8081/admin';
const USER_API_REQUEST_ROUTE = 'http://localhost:8081/user';
const LOGIN_API_REQUEST_ROUTE = 'http://localhost:8081/login';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  token:string;
  constructor(private http: HttpClient) { }

  getUsers():Observable<User[]> {
   this.token = localStorage.getItem("token");
    const headers = new HttpHeaders()
          .set('Authorization', 
          'Bearer '+this.token)
          .set('Content-Type', 'application/json');
    const config = {headers};

    return this.http.get<User[]>(ADMIN_API_REQUEST_ROUTE, config);
  }

  deleteUser(deleteId) {
    this.token = localStorage.getItem("token");
   const body = {
     "deleteId":deleteId
   }
    const headers = new HttpHeaders()
          .set('Authorization', 
          'Bearer '+this.token)
          .set('Content-Type', 'application/json');
    const config = {headers,body};
    return this.http.delete(USER_API_REQUEST_ROUTE,config);
  }
  deleteUserAdmin(deleteId) {
    this.token = localStorage.getItem("token");
   const body = {
     "deleteId":deleteId
   }
    const headers = new HttpHeaders()
          .set('Authorization', 
          'Bearer '+this.token)
          .set('Content-Type', 'application/json');
    const config = {headers,body};
    return this.http.delete(ADMIN_API_REQUEST_ROUTE,config);
  }
  getUser():Observable<any> {
    this.token = localStorage.getItem("token");
    const headers = new HttpHeaders()
          .set('Authorization', 
          'Bearer '+this.token)
          .set('Content-Type', 'application/json');
    const config = {headers};

    return this.http.get<any>(USER_API_REQUEST_ROUTE, config);
  }

  savePicture(blob)
  {
    this.token = localStorage.getItem("token");
    //console.log(blob);
    const data = {
      "picture":blob
    }
    //console.log(data);
     
     const headers = new HttpHeaders()
           .set('Authorization', 'Bearer '+this.token)
           .set('Content-Type', 'application/json');
     const config = {headers,data};
     return this.http.post<any>(USER_API_REQUEST_ROUTE+"/picture", data, config);
  }

  updateUser(userName, password, repassword):Observable<User>
  {

    this.token = localStorage.getItem("token");
    console.log(this.token);
    const data = {
      "userName":userName,
      "password":password,
      "repassword":repassword
    }
    const headers = new HttpHeaders()
    .set('Authorization', 
    'Bearer '+this.token)
    .set('Content-Type', 'application/json');
    const config = {headers,data};
     return this.http.patch<User>(USER_API_REQUEST_ROUTE,data, config);
  }

  login(userName, password):Observable<any>
  {
    this.token = localStorage.getItem("token");
    const data = {
      "userName":userName,
      "password":password
    }
     const headers = new HttpHeaders()
           .set('Content-Type', 'application/json');
     const config = {headers,data};
     return this.http.post<any>(LOGIN_API_REQUEST_ROUTE,config);
  }
  register(userName,password):Observable<any>
  {
    this.token = localStorage.getItem("token");
    const data = {
      "userName":userName,
      "password":password
    }
     const headers = new HttpHeaders()
           .set('Content-Type', 'application/json');
     const config = {headers,data};
     return this.http.post<any>(USER_API_REQUEST_ROUTE,config);
  }
  registerAdmin(userName,password,rol):Observable<any>
  {
    this.token = localStorage.getItem("token");
    const data = {
      "userName":userName,
      "password":password,
      "role":rol
    }
     const headers = new HttpHeaders()
           .set('Content-Type', 'application/json');
     const config = {headers,data};
     return this.http.post<any>(ADMIN_API_REQUEST_ROUTE,config);
  }
}
  