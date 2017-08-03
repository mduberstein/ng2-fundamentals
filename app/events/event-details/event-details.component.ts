import {Component, OnInit} from '@angular/core'
import {EventService} from '../shared/event.service'
import {ActivatedRoute, Params} from '@angular/router'
import {IEvent, ISession} from '../shared/index'

@Component({
    templateUrl: '/app/events/event-details/event-details.component.html',
    styles:[`
        .container {padding-left:20px; padding-right:20px;}
        .event-image {height:100px;}
        a {cursor: pointer}
    `
    ]
})

export class EventDetailsComponent{
    event:IEvent
    addMode: boolean
    filterBy: string = 'all';
    sortBy: string = 'votes';
    constructor(private eventService:EventService, private route:ActivatedRoute){}
    ngOnInit(){
        // This component ROUTES TO ITSELF
        // //bug fixed in clip "routing to the same component"
        // this.event = this.eventService.getEvent(+this.route.snapshot.params['id'])

        // This will only refresh the this.event the first time the page routed to
        // this.route.params.forEach((params:Params)=>{
        //     this.event = this.route.snapshot.data['event']
        this.route.data.forEach((data)=>{
            this.event = data['event'];
            this.addMode = false;
            this.filterBy = 'all'
            this.sortBy = 'votes'
        // Alt 2: before replacing EventRouteActivator with EventListResolver
        // provide full state reset when navigating to another route on the same page
        //     this.eventService.getEvent(+params['id']).subscribe((event:IEvent) => {
        //         this.event = event;
        //         this.addMode = false;
        //         this.filterBy = 'all';
        //         this.sortBy = 'votes';})
        //     //Alt 1: before Http
        //     //this.event = this.eventService.getEvent(+params['id']);
        //     //this.addMode = false;
        //     //this.filterBy = 'all'
        //     //this.sortBy = 'votes'
        })
    }
    // display create session component in <create-session> selector right in the event-details.component.html
    addSession(){
        this.addMode = true
    }
    saveNewSession(session:ISession){
        const nextId = Math.max.apply(null, this.event.sessions.map(s=>s.id))
        session.id = nextId + 1
        this.event.sessions.push(session)
        // BEFORE HTTP
        //this.eventService.updateEvent(this.event)
        this.eventService.saveEvent(this.event).subscribe({next: (event) => this.addMode = false} );
        // BEFORE HTTP
        // this.addMode = false
    }
    cancelAddSession(){
        this.addMode = false
    }
}