import {Component, OnInit} from '@angular/core'
import {FormControl, FormGroup, Validators} from '@angular/forms'
import {ISession} from "../index"

@Component({
    templateUrl:
    'app/events/event-details/create-session.component.html'
    ,
      styles:[`
        em {float: right; color:#E05C65; padding-left:10px;}
        .error input, .error select, .error textarea{background-color:#E3C3C5;}
        .error ::-webkit-input-placeholder {color:#999;}
        .error ::-moz-placeholder {color:#999;}
        .error :-mos-placeholder {color:#999;}
        .error :ms-input-placeholder {color:#999;}
    `
  ]
})

export class CreateSessionComponent{
    //all methods are public to be directly accessible in the template
    name:FormControl
    presenter:FormControl
    duration:FormControl
    level:FormControl
    abstract:FormControl
    newSessionForm: FormGroup

    ngOnInit(){
        this.name = new FormControl('', Validators.required);
        this.presenter = new FormControl('', Validators.required);
        this.duration = new FormControl('', Validators.required);
        this.level = new FormControl('', Validators.required);
        this.abstract = new FormControl('', [Validators.required, Validators.maxLength(400), this.restrictedWords]);

        this.newSessionForm = new FormGroup({
            name: this.name,
            presenter: this.presenter,
            duration: this.duration,
            level: this.level,
            abstract: this.abstract
        })
    }
    //validator function
    private restrictedWords(control: FormControl):{[key: string]: any}
    {   //return error object contains a key matching the validator name
        return control.value.includes('foo')?{'restrictedWords':'foo'}:null
    }
    
    saveSession(formValues){
        //console.log(formValues);
        debugger;
        let session:ISession = <ISession> {
            id:undefined,
            name: formValues.name,
            presenter: formValues.presenter,
            duration: +formValues.duration,
            level:formValues.level,
            abstract:formValues.abstract,
            voters:[]
        }
        console.log(session)
    }
}
