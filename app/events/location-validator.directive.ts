//Custom Validator 2

import {Directive} from '@angular/core';
import {Validator, FormGroup, NG_VALIDATORS} from '@angular/forms';
@Directive({
    selector: '[validateLocation]',
    //Dependency Injection: provider in component example, for providers in module see app.module.ts,
    //multi prevents the complete replacement of the list of services that angular has under NG_Validators with LocationValidator, thus adding the latter to the list of former
    providers: [{provide: NG_VALIDATORS, useExisting: LocationValidator, multi: true}]
})

export class LocationValidator implements Validator {
    validate(formGroup:FormGroup):{[key:string]: any;} {
        let addressControl = formGroup.controls['address'];
        let cityControl = formGroup.controls['city'];
        //MD: alternative, should be the same Javascript wise
        let countryControl = formGroup.controls.country;
        let onlineUrlControl = (<FormGroup>formGroup.root).controls.onlineUrl;

        if((addressControl && addressControl.value && cityControl && cityControl.value && countryControl && countryControl.value) || (onlineUrlControl && onlineUrlControl.value)){
            return null;
        }else{
            return {validateLocation: false}
        }
    }
}