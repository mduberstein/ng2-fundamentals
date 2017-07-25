import {NgModule} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'
import {RouterModule} from '@angular/router'
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import{
    EventsListComponent,
    EventThumbnailComponent,
    EventService,
    EventDetailsComponent,
    CreateEventComponent,
    EventRouteActivator,
    EventsListResolver,
    CreateSessionComponent,
    SessionListComponent,
    DurationPipe
} from './events/index'

import {EventsAppComponent} from './events-app.component'
import {NavBarComponent} from './nav/navbar.component'
import {ToastrService} from './common/toastr.service'
import {CollapsibleWellComponent} from './common/collapsible-well.component'
import {appRoutes} from './routes'
import {Error404Component} from './errors/404.component'
import {AuthService} from './user/auth.service'

@NgModule({
    imports: [BrowserModule, FormsModule, ReactiveFormsModule,
        RouterModule.forRoot(appRoutes)
    ],
    declarations: [
        EventsAppComponent,
        EventsListComponent,
        EventThumbnailComponent,
        NavBarComponent,
        EventDetailsComponent,
        CreateEventComponent,
        Error404Component,
        CreateSessionComponent,
        SessionListComponent,
        CollapsibleWellComponent,
        DurationPipe
        ],
    providers:[EventService //shorthand for {provide: EventService, useValue: EventService}
    , ToastrService, EventRouteActivator, EventsListResolver,
    AuthService,
    //route guard used by CreateNewEvent route, see routes.ts
    {provide: 'canDeactivateCreateEvent', useValue: checkDirtyState}],
    bootstrap:[EventsAppComponent]
})
export class AppModule {}

function checkDirtyState(component:CreateEventComponent)
{
    if(component.isDirty)
        return window.confirm('You have not saved this event, do you really want to cancel?')
    return true
}
