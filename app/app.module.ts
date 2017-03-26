//basic angular module
import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
//top component / container component for app
import { EventsAppComponent } from './events-app.component'
import { EventsListComponent } from './events/events-list.component'
import { EventThumbnailComponent } from './events/event-thumbnail.component'
import { NavBarComponent } from './nav/navbar.component'
import { EventService } from './events/shared/event.service'
import { ToastrService } from "./common/toastr.service";
import {EventDetailsComponent} from "./events/event-details/event-details.component";
import {RouterModule} from "@angular/router";
import {appRoutes} from "./routes";
import {CreateEventComponent} from "./events/create-event.component";
import {Error404Component} from "./errors/404-component";
import {EventRouteActivatorService} from "./events/shared/event-route-activator";
import {EventsListResolverService} from "./events/events-list-resolver.service";

@NgModule({
    imports: [BrowserModule,RouterModule.forRoot(appRoutes)],
    //components are declared within a module
    declarations: [EventsAppComponent, EventsListComponent, EventThumbnailComponent, NavBarComponent, EventDetailsComponent, CreateEventComponent, Error404Component], //if you forget this, you'll see an error that says this is not a known element
    //this is the component that bootstraps our module
    bootstrap: [EventsAppComponent],
    providers: [EventService, ToastrService, EventRouteActivatorService,
        { provide: 'canDeactivateCreateEvent', useValue: checkDirtyState}, EventsListResolverService
    ]
})
export class AppModule {

}

function checkDirtyState(component:CreateEventComponent) {
    if (component.isDirty){
        return window.confirm('You have not saved this event, do you really want to cancel?')
    }
    return true;
}