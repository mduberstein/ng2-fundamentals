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
        //bug fixed in clip "routing to the same component"
        // this.event = this.eventService.getEvent(+this.route.snapshot.params['id'])
        this.route.params.forEach((params:Params)=>{
            //provide full state reset when navigating to another route on the same page
            this.eventService.getEvent(+params['id']).subscribe((event:IEvent) => {
                this.event = event;
                this.addMode = false;
                this.filterBy = 'all';
                this.sortBy = 'votes';})
            //before Http
            //this.event = this.eventService.getEvent(+params['id']);
            //this.addMode = false;
            //this.filterBy = 'all'
            //this.sortBy = 'votes'
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
        this.eventService.updateEvent(this.event)
        this.addMode = false
    }
    cancelAddSession(){
        this.addMode = false
    }
}