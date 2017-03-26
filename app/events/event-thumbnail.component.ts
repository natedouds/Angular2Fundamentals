import {Component, Input} from '@angular/core'

@Component({
    selector: 'event-thumbnail',
    template:`
        <!--routerLink will bind the router link to this whole well, passing in the correct id-->
        <div [routerLink]="['/events', event?.id]" class="well hoverwell thumbnail">
            <!--{{event.name}} is interpolation -> 1-way binding, looking for the events-list components class, and then looks for event on that object-->
            <h2>{{event?.name}}</h2>
            <div>Date: {{event?.date}}</div>
            <div [ngClass]="getStartTimeClass()" [ngSwitch]="event?.time">Time: {{event?.time}}
                <span *ngSwitchCase="'8:00 am'">(Early Start)</span>
                <span *ngSwitchCase="'10:00 am'">(Late Start)</span>
                <span *ngSwitchDefault>(Normal Start)</span>
            </div>
            <div>Price: \${{event?.price}}</div>
            <div *ngIf="event?.location">
                <span>Location: {{event?.location?.address}}</span>
                <span class="pad-left">{{event?.location?.city}}: {{event?.location?.country}}</span>
            </div>
            <div *ngIf="event?.onlineUrl">
                Online URL: {{event?.onlineUrl}}
            </div>
        </div>
    `,
    styles: [`
    .thumbnail {min-height: 210px;}
    .pad-left { margin-left: 10px; }
    .well div { color: #bbb}
    .green {color: #003300 !important;}
        .bold {font-weight: bold}
    `]
})
export class EventThumbnailComponent {
    @Input() event:any

    getStartTimeClass() {
        const isEarlyStart = this.event && this.event.time === '8:00 am'
        return {green: isEarlyStart, bold: isEarlyStart}
    }
}