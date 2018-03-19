import {Component, OnInit} from '@angular/core'
import {EventService, IEvent} from './shared/index'
//second level barrel doesn't work!!!
//import {EventService, IEvent} from './index'
// before Opaque Token dependency injection
// import {ToastrService} from '../common/toastr.service'
import {ActivatedRoute} from '@angular/router'

@Component({
    //does not have selector because it has an entry in the routes.ts route table
    //thus is called a routed module, and is displayed in <router-outlet> of events-app.component.ts
    template: `
        <div>
            <h1>Upcoming Angular 2 Events</h1>
            <hr/>
            <div class="row">
                <div *ngFor="let event of events" class="col-md-5">
                    <!--click is preempted by [routerLink] on event-thumbnail component
                    <event-thumbnail (click)="handleThumbnailClick(event.name)" [event]="event"></event-thumbnail>-->
                    <event-thumbnail [event]="event"></event-thumbnail>
                </div>
            </div>
        </div>
        `
})

export class EventsListComponent implements OnInit {
    events:IEvent[]
    constructor (private eventService: EventService,
    //private toastr: ToastrService,
    private route: ActivatedRoute){
    }
    ngOnInit(){
        //this.eventService.getEvents().subscribe(events=>{this.events = events;});

        //the below will be called acynchronously after EventListResolver.resolve() returns, i.e. when the EventService.getEvents() returned Observable returns stream of events, so ngOnInit() will not return
        //'events' below match resolve.events property on the route './events'
        this.events = this.route.snapshot.data['events'];
    }

    // handleThumbnailClick(eventName){
    //     this.toastr.success(eventName)
    // }
}