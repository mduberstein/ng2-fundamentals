import {Routes} from '@angular/router'
import {EventsListComponent} from './events/events-list.component'
import {EventDetailsComponent} from './events/event-details/event-details.component'
import {CreateEventComponent} from
'./events/create-event.component'
import {Error404Component} from './errors/404.component'
import {EventRouteActivator} from './events/event-details/event-route-activator.service'
import {EventsListResolver} from './events/events-list-resolver.service'

export const appRoutes:Routes = [
    //before resolving this route by displaying the component, call EventListResolver and then assign the return value to the property events of the route which can be accessed by EventListComponent in its ngOnInit as this.route.snapshot.data['events'] where route is ActivatedRoute
    {path: 'events', component: EventsListComponent, resolve:{events:EventsListResolver}},
    {path: 'events/new', component: CreateEventComponent, canDeactivate: ['canDeactivateCreateEvent']},
    {path: 'events/:id', component: EventDetailsComponent, canActivate: [EventRouteActivator]},
    {path: '404', component: Error404Component},
    {path: '', redirectTo: '/events', pathMatch:'full'}
]