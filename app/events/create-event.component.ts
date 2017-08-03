import {Component} from '@angular/core'
import {Router} from '@angular/router'
import {NgModelGroup} from '@angular/forms'
import {EventService} from './shared/index'


@Component({
    templateUrl: '/app/events/create-event.component.html',
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

export class CreateEventComponent{
    isDirty:boolean = true
    event: any ={location:{}}
    constructor(private router:Router, private eventService: EventService){}

    // Makes it a create form with default values
    ngOnInit(){
        this.event = {
            name: 'Ng Spectacular',
            date: '8/8/2028',
            time: '10am',
            price: '799.99',
            location:{
                // address: '456 Happy St',
                // city: 'Felicity',
                // country: 'Angularstan'
            },
            onlineUrl: 'http://ngSpectacular.com',
            imageUrl: 'http://ngSpectacular.com/logo.png'
        }
    }
    saveEvent(formValues){
        this.eventService.saveEvent(formValues).subscribe(event=>{
        this.isDirty = false;
        this.router.navigate(['/events'])
        });

    }
    cancel(){
        this.router.navigate(['/events'])
    }

    //triggerValidationOfLocationGroup(locationGroup: NgModelGroup){
    triggerValidationOfLocationGroup(locationGroup: any){
        locationGroup.control.controls.address.updateValueAndValidity();
    }
}