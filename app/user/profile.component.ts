import { Component, OnInit, Inject } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { AuthService } from './auth.service'
import { Router } from '@angular/router'
//to produce Debug Info on the form
import { JsonPipe } from '@angular/common'
import { TOASTR_TOKEN, Toastr } from '../common/toastr.service'

@Component({
  templateUrl: '/app/user/profile.component.html',
  styles: [`
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
  private firstName: FormControl
  private lastName: FormControl

  // in Angular 1 dependency injection was string based, not typed based
  // angular.module('app).service('myservice', ...) where my service is the name of the service
  constructor(private auth: AuthService, private route: Router, @Inject(TOASTR_TOKEN) private toastr: Toastr) {
  }
  ngOnInit() {
    this.firstName = new FormControl(this.auth.currentUser.firstName, [Validators.required, Validators.pattern('[a-zA-Z].*')]);
    this.lastName = new FormControl(this.auth.currentUser.lastName, Validators.required);
    this.profileForm = new FormGroup({
      firstName: this.firstName,
      lastName: this.lastName
    });
  }
  saveProfile(formValues) {
    if (this.profileForm.valid) {
      this.auth.updateCurrentUser(formValues.firstName, formValues.lastName).subscribe(() => {
        this.toastr.success('Profile Saved')
      })
      //this.route.navigate(['/events']);
    }
  }

  logout(){
    //example of subscribing in component to take action upon return of the call from the server, as opposed to the subscribing in methods of auth.service, ex. AuthService.checkAuthenticationStatus()
    this.auth.logout().subscribe(()=>{
      this.route.navigate(['/user/login'])
    })
  }

  validateLastName() {
    return this.lastName.valid || this.lastName.untouched;
  }

  validateFirstName() {
    return this.firstName.valid || this.firstName.untouched;
  }

  cancel() {
    this.route.navigate(['/events']);
  }
}