import { Component, Input } from '@angular/core'

@Component({
    selector: 'event-thumbnail',
    template:`
        <div class="well hoverwell thumbnail">
            <!--{{event.name}} is interpolation -> 1-way binding, looking for the events-list components class, and then looks for event on that object-->
            <h2>{{event.name}}</h2>
            <div>Date: {{event.date}}</div>
            <div>Time: {{event.time}}</div>
            <div>Price: \${{event.price}}</div>
            <div>
                <span>Location: {{event.locaation.address}}</span>
                <span>&nbsp;</span>
                <span>{{event.location.city}}: {{event.locaation.country}}</span>
            </div>
        </div>
    `
})
export class EventThumbnailComponent {
    @Input() event:any
}