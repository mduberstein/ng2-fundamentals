import {Routes} from '@angular/router'
import {
    EventsListComponent,
    EventDetailsComponent,
    CreateEventComponent,
    //EventRouteActivator,
    EventResolver,
    EventsListResolver,
    CreateSessionComponent
} from './events/index'
import {Error404Component} from './errors/404.component'

export const appRoutes:Routes = [
    //before resolving this route by displaying the component, call EventListResolver's method resolve() and then assign the return value to the property events of the route's data which can be accessed by EventListComponent in its ngOnInit as this.route.snapshot.data['events'] where route is ActivatedRoute
    {path: 'events', component: EventsListComponent, resolve:{events:EventsListResolver}},
    //canDeactivateCreateEvent is a provider in the app.module.ts defined as {provide: 'canDeactivateCreateEvent', useValue: checkDirty} where checkDirty is a function
    {path: 'events/new', component: CreateEventComponent, canDeactivate: ['canDeactivateCreateEvent']},
    //{path: 'events/:id', component: EventDetailsComponent, canActivate: [EventRouteActivator]},
    {path: 'events/:id', component: EventDetailsComponent, resolve:{event:EventResolver}},
    {path:'events/session/new', component: CreateSessionComponent},
    {path: '404', component: Error404Component},
    {path: '', redirectTo: '/events', pathMatch:'full'},
    //lazy loadable feature module, path is URL prefix, loadChildren before the # is path to file with the module, after the # the name of the module class
    {path: 'user', loadChildren: 'app/user/user.module#UserModule'},

]