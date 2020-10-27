import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

import { User } from '../models/User';
import { Observable } from 'rxjs';

const ADMIN_API_REQUEST_ROUTE = 'http://localhost:8081/user/admin';
const USER_API_REQUEST_ROUTE = 'http://localhost:8081/user';
const LOGIN_API_REQUEST_ROUTE = 'http://localhost:8081/login';
const GET_USERS_API_REQUEST_ROUTE = 'http://localhost:8081/users';
const token = localStorage.getItem("token");
@Injectable({
  providedIn: 'root'
})

export class UserService {
  
  constructor(private http: HttpClient) { }

  getUsers():Observable<User[]> {
    
    const headers = new HttpHeaders()
          .set('Authorization', 
          'Bearer '+token)
          .set('Content-Type', 'application/json');
    const config = {headers};

    return this.http.get<User[]>(GET_USERS_API_REQUEST_ROUTE, config);
  }

  deleteUser(deleteId) {
   const body = {
     "deleteId":deleteId
   }
    const headers = new HttpHeaders()
          .set('Authorization', 
          'Bearer '+token)
          .set('Content-Type', 'application/json');
    const config = {headers,body};
    return this.http.delete(USER_API_REQUEST_ROUTE,config);
  }

  getUser():Observable<User> {
    
    const headers = new HttpHeaders()
          .set('Authorization', 
          'Bearer '+token)
          .set('Content-Type', 'application/json');
    const config = {headers};

    return this.http.get<User>(USER_API_REQUEST_ROUTE, config);
  }

  login(userName, password):Observable<any>
  {
   
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
  