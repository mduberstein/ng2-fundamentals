import {ActivatedRouteSnapshot, CanActivate, Router} from '@angular/router'
import {Injectable} from '@angular/core'
import {EventService} from '../shared/event.service'

@Injectable()
export class EventRouteActivator implements CanActivate{
    constructor(private eventService:EventService, private router:Router){

    }
    //see event-details.component.ts, its ActivatedRoute.snapshot property corresponds to ActivatedRoute here
    canActivate(route:ActivatedRouteSnapshot){
        const eventExists = !!this.eventService.getEvent(+route.params['id'])

        if(!eventExists){
            this.router.navigate(['/404']);
        }
        return eventExists
    }
}
