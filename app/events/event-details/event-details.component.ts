import { Component, OnInit } from '@angular/core';
import { EventService } from '../shared/event.service'
import { ActivatedRoute } from '@angular/router'
import {IEvent, ISession} from "../shared/event.model";

@Component({
    //don't forget this is relative to the base!
    templateUrl: '/app/events/event-details/event-details.component.html',
    styles: [`
        .container { padding-left: 20px; padding-right: 20px; }
        .event-image { height: 100px; }
        a { cursor:pointer }
    `]
})
export class EventDetailsComponent implements OnInit {
    event:IEvent;
    addMode: boolean;
    filterBy: string = 'all';
    sortBy: string = 'votes';

    constructor(private eventService: EventService, private route: ActivatedRoute){}

    ngOnInit(): void {
        this.event = this.eventService.getEvent(
            //give us params from route used to access this component, the + is a number cast operator. 'id' must match the same param name in the route
            +this.route.snapshot.params['id']
        );
    }

    addSession(): void {
        this.addMode = true
    }

    saveNewSessionToDetails(session:ISession) {
        const nextId = Math.max.apply(null, this.event.sessions.map(s => s.id));
        session.id = nextId + 1;
        this.event.sessions.push(session);
        this.eventService.updateEvent(this.event);
        this.addMode = false;
    }

    cancelAddSessionDetailsComponent(): void {
        this.addMode = false;
    }

}