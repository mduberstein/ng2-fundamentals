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
// before opaque token usage
// import {ToastrService} from './common/toastr.service'
import {TOASTR_TOKEN, Toastr} from './common/toastr.service'
import {CollapsibleWellComponent} from './common/collapsible-well.component'
import {appRoutes} from './routes'
import {Error404Component} from './errors/404.component'
import {AuthService} from './user/auth.service'

declare let toastr: Toastr

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
    providers:[EventService, //shorthand for {provide: EventService, useValue: EventService}
    // ToastrService, //before OpaqueToken
    {provide: TOASTR_TOKEN, useValue: toastr},
     // EventRouteActivator, //equivalent to below long form used often when the useClass value is a derived class of a provide value
    {provide: EventRouteActivator, useClass: EventRouteActivator},
    EventsListResolver,
    AuthService,
    //route guard used by CreateNewEvent route, see routes.ts
    {provide: 'canDeactivateCreateEvent', useValue: checkDirtyState}

    //fictitious example when IMinimalLogger is an interface that is implemented by a FileLogger, where Logger has 20 methods, but IMinimalLogger has 5 methods. This will inject a instance of class Logger, while intellisense will only show 5 methods of IMinimalLogger
    //{provide IMinimalLogger, useExisting: Logger}
    /*fictitious example of useFactory
    function loggerFactory(type:number):ILogger{
        switch(type)
        {
            case 1: return new FileLogger();
            case 2: return new EventLogger();
            default: return new ConsoleLogger();
        }
    }
    {provide ILogger, useFactory: factory(1)}
    */

    ],
    bootstrap:[EventsAppComponent]
})
export class AppModule {}

function checkDirtyState(component:CreateEventComponent)
{
    if(component.isDirty)
        return window.confirm('You have not saved this event, do you really want to cancel?')
    return true
}
