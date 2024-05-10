import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginRequest } from '../../Payload/login-request';
import { AuthService } from '../../Service/auth.service';
import Toast from '../../Util/helper';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../Service/login.service';

@Component({
  selector: 'app-verified-otp',
  templateUrl: './verified-otp.component.html',
  styleUrls: ['./verified-otp.component.css']
})
export class VerifiedOtpComponent implements OnInit{


  loginRequest:LoginRequest=new LoginRequest();
  otpForm!: FormGroup;
  constructor(private loginService:LoginService,private route:Router,private fb: FormBuilder,private activeRoutes:ActivatedRoute,private authService:AuthService){
   
  }

  ngOnInit(){
  
    this.initializeForm();
   this.activeRoutes.params.subscribe((data:any)=>{
      this.loginRequest.userEmail=data.email;
    })
  }
  
  initializeForm() {
    this.otpForm = this.fb.group({
      digit1: ['', Validators.required],
      digit2: ['', Validators.required],
      digit3: ['', Validators.required],
      digit4: ['', Validators.required],
      digit5: ['', Validators.required],
      digit6: ['', Validators.required]
    });
  }

  submitForm() {
    if (this.otpForm.valid) {
      const otp = Object.values(this.otpForm.value).join('');
      this.loginRequest.otp=otp;
      this.authService.getVerifiedForLogin(this.loginRequest).subscribe((data:any)=>{
      this.loginService.setUser(data.currentUser);
      this.route.navigate(['dashboard']);     
      }, (error) => {
        Toast.fire({
          icon: 'error',
          title: error.error.message
        })
      });
    } 
    else {
      alert('Please enter a valid 6-digit OTP.');
    }
  }

  resentOTP(){
    this.authService.getOtpByEmail(this.loginRequest.userEmail).subscribe((data: any) => {
      Toast.fire({
        icon: 'success',
        title: 'Otp Generated <span style="color: red;">' + data.OTP + '</span>',
      })
    }, (error) => {
      Toast.fire({
        icon: 'error',
        title: error.error.message
      })
    });
  }
}
