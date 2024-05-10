import { Component } from '@angular/core';
import { Admin } from '../../Model/admin';
import { LoginService } from '../../Service/login.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../Service/auth.service';
import Toast from '../../Util/helper';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  constructor(private loginService: LoginService, private route: Router, private fb: FormBuilder, private authService: AuthService) { }
  ngOnInit() {
    this.user.userProfile = "assets/images/temp_img/profile.png";
    this.user = this.loginService.getUser();
    this.initializeForm();
  }

  user: Admin = new Admin();

  profileForm = new FormGroup({
    userEmail: new FormControl(
      '', [
      Validators.required,
      Validators.email
    ]
    ),
    userName: new FormControl(
      '', [
      Validators.required,
    ]
    ), userPhone: new FormControl(
      '', [
      Validators.required,
    ]
    )
  })

  get userEmail() {
    return this.profileForm.get('userEmail');
  }

  get userName() {
    return this.profileForm.get('userName');
  }
  get userPhone() {
    return this.profileForm.get('userPhone');
  }

  initializeForm() {
    this.profileForm = this.fb.group({
      userName: [this.user.userName, Validators.required],
      userPhone: [this.user.userPhone, Validators.required],
      userEmail: [this.user.userEmail, Validators.required],

    });
  }

  updateProfile() {
    if (!(this.profileForm.value.userName === null || this.profileForm.value.userEmail === null || this.profileForm.value.userPhone === null ||
      this.profileForm.value.userName === undefined || this.profileForm.value.userEmail === undefined || this.profileForm.value.userPhone === undefined)) {
      if (this.image === null) {
        return
      }
      this.user.userEmail = this.profileForm.value.userEmail;
      this.user.userName = this.profileForm.value.userName;
      this.user.userPhone = this.profileForm.value.userPhone;
      this.authService.updateUser(this.user, this.image).subscribe((data: any) => {
        Toast.fire({
          icon: 'success',
          title: data.message,
        })
        this.getUserId();

      }, (error) => {
        Toast.fire({
          icon: 'error',
          title: error.error.message
        })
      })
    }
  }


  changePassword = new FormGroup({
    currentPassword: new FormControl(
      '', [
      Validators.required
    ]
    ),
    newPassword: new FormControl(
      '', [
      Validators.required,
    ]
    ), confirmPassword: new FormControl(
      '', [
      Validators.required,
    ]
    )
  })

  get newPassword() {
    return this.changePassword.get('newPassword');
  }

  get currentPassword() {
    return this.changePassword.get('currentPassword');
  }
  get confirmPassword() {
    return this.changePassword.get('confirmPassword');
  }


  updatePassword() {
    if (!(this.changePassword.value.newPassword === null || this.changePassword.value.confirmPassword === null || this.changePassword.value.currentPassword === null ||
      this.changePassword.value.newPassword === undefined || this.changePassword.value.confirmPassword === undefined || this.changePassword.value.currentPassword === undefined)) {
      this.authService.changePassword(this.changePassword.value, this.user.userId).subscribe((data: any) => {
        Toast.fire({
          icon: 'success',
          title: data.message,
        })

        this.route.navigate(['/dashboard'])
      }, (error) => {
        Toast.fire({
          icon: 'error',
          title: error.error.message
        })
      })
    }
  }
  image!: File;
  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.image = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.user.userProfile = reader.result as string; // Update userProfile with new image data
      };
      reader.readAsDataURL(file); // Convert selected file to base64 URL
    }
  }

  getUserId() {
    this.authService.getUser(this.loginService.getUserId()).subscribe((data: any) => {
      this.loginService.setUser(data.currentUser);
      this.authService.loginSubject.next(false);
    })
  }

}
