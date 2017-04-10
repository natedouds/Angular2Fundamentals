import {Component, OnInit} from '@angular/core';
import {EventService} from '../shared/event.service'
import {ActivatedRoute, Params} from '@angular/router'
import {IEvent, ISession} from "../shared/event.model";

@Component({
    //don't forget this is relative to the base!
    templateUrl: '/app/events/event-details/event-details.component.html',
    styles: [`
        .container {
            padding-left: 20px;
            padding-right: 20px;
        }

        .event-image {
            height: 100px;
        }

        a {
            cursor: pointer
        }
    `]
})
export class EventDetailsComponent implements OnInit {
    event: IEvent;
    addMode: boolean;
    filterBy: string = 'all';
    sortBy: string = 'votes';

    constructor(private eventService: EventService, private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.route.data.forEach((data) => {
            //
            this.event = data['event'];
            //make sure that we keep track of all state properties, for example, addMode wasn't being updated on url changes, so you have to explicitly state it here
            this.addMode = false;
        });
    }

    addSession(): void {
        this.addMode = true
    }

    saveNewSessionToDetails(session: ISession) {
        const nextId = Math.max.apply(null, this.event.sessions.map(s => s.id));
        session.id = nextId + 1;
        this.event.sessions.push(session);
        this.eventService.saveEvent(this.event).subscribe(); //being optimistic here, assuming POST is successful, therefore aren't providing a callback to place addMode in on success
        this.addMode = false;
    }

    cancelAddSessionDetailsComponent(): void {
        this.addMode = false;
    }

}