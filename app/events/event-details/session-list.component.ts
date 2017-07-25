import {Component, Input, OnChanges} from '@angular/core'
import {ISession} from '../shared'

@Component({
    selector: 'session-list',
    templateUrl: 'app/events/event-details/session-list.component.html'
})

export class SessionListComponent{
    @Input() sessions:ISession[];
    @Input() filterBy: string;
    visibleSessions:ISession[] = [];

    // this method is called every time one of the input variables into this component changes, this method is executed before any data field in this class is set, so guard
    ngOnChanges(){
        if(this.sessions){
            this.filterSessions(this.filterBy); //passed in filter to make method stateless
        }
    }
    filterSessions(filter:string){
        if(filter === 'all'){
            this.visibleSessions = this.sessions.slice(0);
        }else{
            this.visibleSessions = this.sessions.filter(session => session.level.toLocaleLowerCase() === filter )
        }
    }
}