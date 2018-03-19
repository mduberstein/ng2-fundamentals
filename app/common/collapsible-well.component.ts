import {Component, Input} from '@angular/core'

@Component({
    selector: 'collapsible-well',
    template: `
    <div (click)="toggleContent()" class="well pointable">
        <!--Version 2 - Single Projection slot-->
        <!--<h4 class="well-title">{{title}}</h4>
        <ng-content *ngIf="visible"></ng-content>-->
        <h4>
            <ng-content select="[well-title]"></ng-content>
        </h4>
        <ng-content *ngIf="visible" select="[well-body]"></ng-content>
    </div>
    `
})

export class CollapsibleWellComponent{
    // Version 2 - Single Projection Slot
    //@Input() title:string;
    visible: boolean = true;
    toggleContent(){
        this.visible = !this.visible;
    }
}