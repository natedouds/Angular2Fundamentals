import { Component } from '@angular/core'

@Component({
    selector: 'events-list',
    //[event] corresponds to the event in the event-thumbnail component
    //i.e. this event-thumbnail has an @Input property named event, and we want to pass our event1 value to the input
    template: `
        <div>
            <h1>Upcoming Angular 2 Events</h1>
            <hr/>
            <event-thumbnail [event]="event1"></event-thumbnail>
        </div>
    `
})
export class EventsListComponent{
    event1 = {
        id: 1,
        name: 'Angular Connect',
        date: '9/26/2036',
        time: '10:00 am',
        price: 599.99,
        imageUrl: '/app/assets/images/angularconnect-shield.png',
        location: {
            address: '1057 DT',
            city: 'London',
            country: 'England'
        }
    }
}