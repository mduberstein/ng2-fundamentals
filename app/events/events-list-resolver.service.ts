import {Injectable} from '@angular/core'
import {Resolve} from '@angular/router'
import {EventService} from './shared/event.service'

@Injectable()
export class EventsListResolver implements Resolve<any> {
    constructor(private eventService: EventService){

    }
    resolve(){
        //Before adding Http
        //return this.eventService.getEvents().map(events => events);
        // Module 13, Clip Moving Data Storage to the server states that the Resolver calls subscribe somehow, which it does - tested; Call stack is from zone.Task... not from my code :-(.
        return this.eventService.getEvents();
    }
}