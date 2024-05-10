import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Optrequest } from '../Payload/optrequest';
import { AppRoutes } from '../Util/app-routes';
import { LoginRequest } from '../Payload/login-request';
import { ForgetPasswordRequest } from '../Payload/forget-password-request';
import { Subject } from 'rxjs';
import { ChangePasswordRequest } from '../Payload/change-password-request';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  public loginSubject = new Subject<boolean>();

  public loginUser(loginUser: Optrequest) {
    return this.http.post(AppRoutes.USER_LOGIN, loginUser);
  }

  public getOtpByEmail(email: string) {
    return this.http.get(AppRoutes.GET_OTP_EMAIL + email);
  }

  getVerifiedForLogin(loginRequest: LoginRequest) {
    return this.http.post(AppRoutes.GET_VERIFY_LOGIN, loginRequest);
  }

  verifiedOtpForForgetPassword(loginRequest: LoginRequest) {
    return this.http.post(AppRoutes.VERIFY_OTP_FORPASSWORD, loginRequest)
  }
  generatePassword(request: ForgetPasswordRequest) {
    return this.http.post(AppRoutes.GENERATE_NEW_PASSWORD, request);

  }
  updateUser(user:any,image:File){
    const formData: FormData = new FormData();
    typeof image!=='string'
    formData.append('file', image);
    formData.append('user', JSON.stringify(user));
    return this.http.put(AppRoutes.UPDATEUSER,formData);
  }

  changePassword(request:any,userId:any){
    return this.http.post(AppRoutes.CHANGEPASSWORD+userId,request);
  }

  getUser(id:any){
    return this.http.get(AppRoutes.GET_USER+"/"+id)
  }
}
