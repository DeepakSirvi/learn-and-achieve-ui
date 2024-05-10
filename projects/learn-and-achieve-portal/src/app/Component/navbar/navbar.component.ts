import { Component } from '@angular/core';
import { LoginService } from '../../Service/login.service';
import Swal from 'sweetalert2';
import Toast from '../../Util/helper';
import { AuthService } from '../../Service/auth.service';
import { Admin } from '../../Model/admin';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(private logicService:LoginService,private authService:AuthService){
    this.authService.loginSubject.asObservable().subscribe(data=>{
      this.user=this.logicService.getUser();
    })
  }
  ngOnInit(){
    this.user=this.logicService.getUser();
    this.authService.loginSubject.asObservable().subscribe(data=>{
      this.user=this.logicService.getUser();
    })
  }
  user:Admin=new Admin();

  public logout() {
    this.logicService.logout();
        Toast.fire({
          icon: 'success',
          title: 'LogOut Successfull',
        })
        location.reload();
   
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
    ),  confirmPassword: new FormControl(
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

  updatePassword(){
    if(!(this.changePassword.value.newPassword===null ||this.changePassword.value.confirmPassword===null||this.changePassword.value.currentPassword===null ||
      this.changePassword.value.newPassword===undefined ||this.changePassword.value.confirmPassword===undefined||this.changePassword.value.currentPassword===undefined)){
    this.authService.changePassword(this.changePassword.value,this.user.userId).subscribe((data:any)=>{
      Toast.fire({
        icon: 'success',
        title: data.message,
      })
    }, (error) => {
      Toast.fire({
        icon: 'error',
        title: error.error.message
      })
    })
  }
  }

}
