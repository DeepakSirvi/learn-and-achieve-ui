import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Optrequest } from '../../Payload/optrequest';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../Service/auth.service';
import Swal from 'sweetalert2';
import Toast from '../../Util/helper';
import { Router } from '@angular/router';
import { LoginRequest } from '../../Payload/login-request';
import { ForgetPasswordRequest } from '../../Payload/forget-password-request';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  message:string='';
  constructor(private fb: FormBuilder,private authService: AuthService,private route:Router) {

  }
  ngOnInit(): void {
    this.initializeForm();
  }
  otpRequest!: Optrequest;
  otpForm!: FormGroup;
  loginRequest:LoginRequest=new LoginRequest();
  genPassword:ForgetPasswordRequest=new ForgetPasswordRequest();
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
  loginForm = new FormGroup({
    userEmail: new FormControl(
      '', [
      Validators.required,
      Validators.email
    ]
    ),
    userPassword: new FormControl(
      '', [
      Validators.required,
    ]
    )
  })

  get userEmail() {
    return this.loginForm.get('userEmail');
  }

  get userPassword() {
    return this.loginForm.get('userPassword');
  }

  userLogin(login: FormGroup) {
    if(login.value.userEmail===''|| login.value.userEmail===undefined || login.value.userEmail===null)
    {
      this.message="Fields required";
    }
    else  if(login.value.userPassword===''|| login.value.userPassword===undefined || login.value.userPassword===null)
    {
      this.message="Fields required";
    }
    else{
    this.authService.loginUser(login.value).subscribe((data: any) => {
      Toast.fire({
        icon: 'success',
        title: 'Otp Generated <span style="color: red;">' + data.OTP + '</span>',
      })
      this.authService.loginSubject.next(true);
        this.route.navigate(['/verifiedOtp/'+login.value.userEmail]);
    }, (error) => {
      Toast.fire({
        icon: 'error',
        title: error.error.message
      })
    });
  }
  }

  verifiedEmailFormGroup = new FormGroup({
    email: new FormControl(
      '', [
      Validators.required,
      Validators.email
    ]
    )
  })

  get email() {
    return this.verifiedEmailFormGroup.get('email');
  }
  submitForm(){
    if(!(this.verifiedEmailFormGroup.value.email===''|| this.verifiedEmailFormGroup.value.email===undefined || this.verifiedEmailFormGroup.value.email===null))
    {
      this.loginRequest.userEmail=this.verifiedEmailFormGroup.value.email;
      this.authService.getOtpByEmail(this.verifiedEmailFormGroup.value.email).subscribe((data:any)=>{
        Toast.fire({
          icon: 'success',
          title: 'Otp Generated <span style="color: red;">' + data.OTP + '</span>',
        })
        this.btn2Controller()
        // this.route.navigate(['/verifiedOtp/'+this.verifiedEmailFormGroup.value.email]);
         
      }, (error) => {
        Toast.fire({
          icon: 'error',
          title: error.error.message
        })
      })
    }else{
      this.message="Fields required";
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

  submitOtp()
  {
    if (this.otpForm.valid) {
      const otp = Object.values(this.otpForm.value).join('');
      this.loginRequest.otp=otp;
      this.authService.verifiedOtpForForgetPassword(this.loginRequest).subscribe((data:any)=>{
        Toast.fire({
          icon: 'success',
          title: data.message,
        })
        this.btn3Controller();
        
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
  

  button1 = false;
  button2 = false;
  btn2Controller() {
    const btn1Element = document.getElementById("btn1");
    const btn2Element = document.getElementById("btn2");
    const btn3Element = document.getElementById("btn3");
  
    if (btn1Element && btn2Element && btn3Element) {
      if (this.button1 == false && this.button2 == false) {
        console.log(this.button2);
        btn1Element.style.display = "none";
        btn2Element.style.display = "none";
        btn3Element.style.display = "block";
  
        this.button2 = true;
      }
      else if (this.button1 == true && this.button2 == false) {
        console.log(this.button1);
        console.log(this.button2);
        btn2Element.style.display = "none";
        btn1Element.style.display = "none";
        btn3Element.style.display = "block";
        this.button1 = false;
        this.button2 = true;
      }
    } else {
      console.error("One or more elements not found.");
    }
  }

  btn3Controller() {
    const btn1Element = document.getElementById("btn1");
    const btn2Element = document.getElementById("btn2");
    const btn3Element = document.getElementById("btn3");
    const btn4Element = document.getElementById("btn4");
  
    if (btn1Element && btn2Element && btn3Element && btn4Element) {
      if (this.button1 == false && this.button2 == false) {
        console.log(this.button2);
        btn1Element.style.display = "none";
        btn2Element.style.display = "none";
        btn3Element.style.display = "none";
        btn4Element.style.display = "block";
  
        this.button2 = true;
      }
      else if (this.button1 == true && this.button2 == false) {
        console.log(this.button1);
        console.log(this.button2);
        btn3Element.style.display = "none";
        btn2Element.style.display = "none";
        btn1Element.style.display = "none";
        btn4Element.style.display = "block";
  
        this.button1 = false;
        this.button2 = true;
      }
      else if (this.button1 == false && this.button2 == true) {
        console.log(this.button2);
        btn3Element.style.display = "none";
        btn2Element.style.display = "none";
        btn1Element.style.display = "none";
        btn4Element.style.display = "block";
        this.button2 = false;
      }
    } else {
      console.error("One or more elements not found.");
    }
  }
  
  passwordReset = new FormGroup({
    newPassword: new FormControl(
      '', [
      Validators.required,
    ]
    ),
    confirmPassword: new FormControl(
      '', [
      Validators.required,
    ]
    )
  })
  get newPassword() {
    return this.loginForm.get('newPassword');
  }
  get confirmPassword() {
    return this.loginForm.get('confirmPassword');
  }
  generateNewPassword(){
    this.genPassword.otp=this.loginRequest.otp;
    this.genPassword.userEmail=this.loginRequest.userEmail;
    if(!(this.passwordReset.value.newPassword===null || this.passwordReset.value.confirmPassword===null||
      this.passwordReset.value.newPassword==='' || this.passwordReset.value.confirmPassword===''||
      this.passwordReset.value.newPassword===undefined || this.passwordReset.value.confirmPassword===undefined))
    {
      this.genPassword.newPassword=this.passwordReset.value.newPassword;
      this.genPassword.confirmPassword=this.passwordReset.value.confirmPassword;
      this.authService.generatePassword(this.genPassword).subscribe((data:any)=>{
        Toast.fire({
          icon: 'success',
          title: data.message,
        })
        location.reload()
      }, (error) => {
        Toast.fire({
          icon: 'error',
          title: error.error.message
        })
      })
    }

  }
}
  

