import { Component, OnInit } from '@angular/core';
import { EventService } from '../shared/event.service'
import { ActivatedRoute } from '@angular/router'
import {IEvent} from "../shared/event.model";

@Component({
    //don't forget this is relative to the base!
    templateUrl: '/app/events/event-details/event-details.component.html',
    styles: [`
        .container { padding-left: 20px; padding-right: 20px; }
        .event-image { height: 100px; }
    `]
})
export class EventDetailsComponent implements OnInit {
    event:IEvent

    constructor(private eventService: EventService, private route: ActivatedRoute){}

    ngOnInit(): void {
        this.event = this.eventService.getEvent(
            //give us params from route used to access this component, the + is a number cast operator. 'id' must match the same param name in the route
            +this.route.snapshot.params['id']
        );
    }

}