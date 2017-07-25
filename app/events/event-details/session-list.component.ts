import {Component, Input, OnChanges} from '@angular/core'
import {ISession} from '../shared'

@Component({
    selector: 'session-list',
    templateUrl: 'app/events/event-details/session-list.component.html'
})

export class SessionListComponent{
    @Input() sessions:ISession[];
    @Input() filterBy: string;
    @Input() sortBy: string;
    visibleSessions:ISession[] = [];

    // this method is called every time one of the input variables into this component changes, this method is executed before any data field in this class is set, so guard
    ngOnChanges(){
        if(this.sessions){
            this.filterSessions(this.filterBy); //passed in filter to make method stateless
            //sort is mutating array in place
            this.sortBy === 'name' ? this.visibleSessions.sort(sortByNameAsc) : this.visibleSessions.sort(sortByVotesDesc);
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

    function sortByNameAsc(s1: ISession, s2: ISession){
        if(s1.name > s2.name) return 1
        else if(s1.name === s2.name) return 0
        else return -1
    }

    function sortByVotesDesc(s1: ISession, s2: ISession){
        return s2.voters.length - s1.voters.length
    }