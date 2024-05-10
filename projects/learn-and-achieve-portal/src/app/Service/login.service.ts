import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Admin } from '../Model/admin';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }

  user :Admin=new Admin();
 
  public isLoggedIn() {
    let user = localStorage.getItem('admin');
    return (user === undefined || user === '' || user === null) ? false : true;
  }

  public logout() {
    localStorage.removeItem('admin');
    return true;
  }

  public setUser(user: any) {
    this.user.userId = user.id;
   this.user.userName = user.userName;
   this.user.userEmail=user.userEmail;
   this.user.userPhone=user.userPhone;
   this.user.userRole=user.userRole;
   this.user.userProfile=user.userProfile;
    localStorage.setItem('admin', JSON.stringify(user));
  }

  public getUser() {
    let userStr = localStorage.getItem('admin');
    if (userStr != null) {
      return JSON.parse(userStr);
    }
    else {
      this.logout();
      return null;
    }
  }

  getUserId() {
    let userStr = localStorage.getItem('admin');
    let user = JSON.parse(userStr!)
    return user.userId
  }
}
