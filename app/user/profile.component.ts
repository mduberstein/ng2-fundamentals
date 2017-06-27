import { Component, OnInit } from '@angular/core'
import {FormControl, FormGroup, Validators} from '@angular/forms'
import {AuthService} from './auth.service'
import {Router} from '@angular/router'

@Component({
  templateUrl: '/app/user/profile.component.html',
  styles:[`
    em {float: right; color:#E05C65; padding-left:10px;}
    .error input {background-color:#E3C3C5;}
    .error ::-webkit-input-placeholder {color:#999;}
    .error ::-moz-placeholder {color:#999;}
    .error :-mos-placeholder {color:#999;}
    .error :ms-input-placeholder {color:#999;}
  `
  ]
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup

  constructor(private auth: AuthService, private route:Router){

  }
  ngOnInit(){
    let firstname = new FormControl(this.auth.currentUser.firstName, Validators.required);
    let lastname = new FormControl(this.auth.currentUser.lastName, Validators.required);
    this.profileForm = new FormGroup({
      firstName: firstname,
      lastName: lastname
    });
  }
  saveProfile(formValues){
    if(this.profileForm.valid){
      this.auth.upadateCurrentUser(formValues.firstname, formValues.lastname)
    this.route.navigate(['/events']);
    }

  }
  cancel(){
    this.route.navigate(['/events']);
  }
}