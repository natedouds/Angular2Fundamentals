import {Routes} from '@angular/router'
import {Error404Component} from "./errors/404-component";
import {
    EventsListComponent,
    EventDetailsComponent,
    CreateEventComponent,
    EventsListResolverService,
    CreateSessionComponent
} from './events/index'
import {EventsResolverService} from "./events/event-resolver.service";

export const appRoutes: Routes = [
    //can activate - determine if a user can navigate to a url
    {
        path: 'events', component: EventsListComponent, resolve: {events: EventsListResolverService}
    },
    //order is important here, so that new is processed first, vs trying to parse the id
    {
        path: 'events/new', component: CreateEventComponent, canDeactivate: ['canDeactivateCreateEvent']
    },
    {
        //angular will create a parameter called id, which will be called id and set to that value, passed into the EventDetailsComponent
        path: 'events/:id', component: EventDetailsComponent, resolve: {event: EventsResolverService}
    },
    {
        path: 'events/session/new', component: CreateSessionComponent
    },
    {
        path: '', redirectTo: '/events', pathMatch: 'full'
    },
    {
        path: '404', component: Error404Component
    },
    {
        //when a route starts with /user, load the user module from this path
        path: 'user', loadChildren: 'app/user/user.module#UserModule'
    }
]