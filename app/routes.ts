import {Routes} from '@angular/router'
import {EventsListComponent} from "./events/events-list.component";
import {EventDetailsComponent} from "./events/event-details/event-details.component";
import {CreateEventComponent} from "./events/create-event.component";
import {Error404Component} from "./errors/404-component";
import {EventRouteActivatorService} from "./events/shared/event-route-activator";
import {EventsListResolverService} from "./events/events-list-resolver.service";

export const appRoutes:Routes= [
    //can activate - determine if a user can navigate to a url
    {
        path: 'events', component: EventsListComponent, resolve: {events:EventsListResolverService}
    },
    //order is important here, so that new is processed first, vs trying to parse the id
    {
        path: 'events/new', component: CreateEventComponent, canDeactivate: ['canDeactivateCreateEvent']
    },
    {
        //angular will create a parameter called id, which will be called id and set to that value, passed into the EventDetailsComponent
        path: 'events/:id', component: EventDetailsComponent, canActivate: [EventRouteActivatorService]
    },
    {
        path: '', redirectTo: '/events', pathMatch: 'full'
    },
    {
        path: '404', component: Error404Component
    }
]