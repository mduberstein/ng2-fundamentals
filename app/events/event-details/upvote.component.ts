import { Component, EventEmitter, Input, Output } from '@angular/core'
import {ISession} from '../shared'

@Component({
    selector: 'upvote',
    styleUrls: ['/app/events/event-details/upvote.component.css'],
    template: `
        <div class="votingWidgetContainer pointable" (click)="onClick()">
            <div class="well votingWidget">
                <div class="votingButton">
                    <!-- before clip; Using @Input Setters
                    <i *ngIf="voted" class="glyphicon glyphicon-heart"></i>
                    <i *ngIf="!voted" class="glyphicon glyphicon-heart-empty"></i>
                    -->
                    <i class="glyphicon glyphicon-heart" [style.color]="iconColor"></i>
                </div>
                <div class="badge badge-inverse votingCount">
                    <div>{{count}}</div>
                </div>
            </div>
        </div>
        `
})

export class UpvoteComponent {
    @Input() session: ISession;
    @Input() count: number;
    //before clip; Using @Input Setters
    //@Input() voted: boolean;
    @Input() set voted(val){
        this.iconColor = val ? 'red' : 'white';
    }
    @Output() vote = new EventEmitter();
    public iconColor:string;

    onClick() {
        this.vote.emit(this.session);
    }

}