import {Routes} from '@angular/router'
import {
    EventsListComponent,
    EventDetailsComponent,
    CreateEventComponent,
    EventRouteActivator,
    EventsListResolver,
    CreateSessionComponent
} from './events/index'
import {Error404Component} from './errors/404.component'

export const appRoutes:Routes = [
    //before resolving this route by displaying the component, call EventListResolver and then assign the return value to the property events of the route which can be accessed by EventListComponent in its ngOnInit as this.route.snapshot.data['events'] where route is ActivatedRoute
    {path: 'events', component: EventsListComponent, resolve:{events:EventsListResolver}},
    {path: 'events/new', component: CreateEventComponent, canDeactivate: ['canDeactivateCreateEvent']},
    {path: 'events/:id', component: EventDetailsComponent, canActivate: [EventRouteActivator]},
    {path:'events/session/new', component: CreateSessionComponent},
    {path: '404', component: Error404Component},
    {path: '', redirectTo: '/events', pathMatch:'full'},
    {path: 'user', loadChildren: 'app/user/user.module#UserModule'},
]