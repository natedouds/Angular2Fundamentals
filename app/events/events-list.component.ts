import { Component, OnInit } from '@angular/core'
import { EventService } from '../shared/event.service'
import { ToastrService } from "../common/toastr.service";


@Component({
    selector: 'events-list',
    //[event] corresponds to the event in the event-thumbnail component
    //i.e. this event-thumbnail has an @Input property named event, and we want to pass our event1 value to the input
    template: `
        <div>
            <h1>Upcoming Angular 2 Events</h1>
            <hr/>
            <div class="col-md-5" *ngFor="let event of events">
                <event-thumbnail [event]="event" (click)="handleThumbnailClick(event.name)"></event-thumbnail>
            </div>
        </div>
    `
})
export class EventsListComponent implements OnInit{
    events: any[]
    constructor(private eventService: EventService, private toastr: ToastrService) {

    }

    ngOnInit() {
        this.events = this.eventService.getEvents()
    }

    handleThumbnailClick(name) {
        this.toastr.info(name);
    }
}