import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {RouterModule} from '@angular/router'
// FormsModule is needed for template-driven forms, specifically for
// directives: ngModel and ngForm.
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import {userRoutes} from './user.routes'
import {ProfileComponent} from './profile.component'
import {LoginComponent} from './login.component'

//lazy loadable feature module, two differences from app.module.
@NgModule({
    imports:[
        CommonModule, //unlike BrowserModule in app.module.ts
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(userRoutes) //unlike RouteModule.forRoot(routes) in the app.module.ts
    ],
    declarations:[
        ProfileComponent
       , LoginComponent
    ],
    providers:[

    ]
})

export class UserModule{}