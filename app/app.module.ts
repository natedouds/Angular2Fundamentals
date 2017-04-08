//basic angular module
import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
//top component / container component for app
import { EventsAppComponent } from './events-app.component'
import { EventThumbnailComponent } from './events/event-thumbnail.component'
import { NavBarComponent } from './nav/navbar.component'
import { ToastrService } from "./common/toastr.service";
import { RouterModule } from "@angular/router";
import { appRoutes } from "./routes";
import { Error404Component } from "./errors/404-component";
import { EventsListComponent, EventService, EventDetailsComponent, CreateEventComponent, EventRouteActivatorService, EventsListResolverService, CreateSessionComponent } from './events/index'
import {AuthService} from "./user/auth.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SessionListComponent} from "./events/event-details/session-list.component";
import {CollapsibleWellComponent} from "./common/collapsible-well.component";

@NgModule({
    imports: [BrowserModule, FormsModule, ReactiveFormsModule,RouterModule.forRoot(appRoutes)],
    //components are declared within a module
    declarations: [
        EventsAppComponent,
        EventsListComponent,
        EventThumbnailComponent,
        NavBarComponent,
        EventDetailsComponent,
        CreateEventComponent,
        Error404Component,
        CreateSessionComponent,
        SessionListComponent,
        CollapsibleWellComponent
    ], //if you forget this, you'll see an error that says this is not a known element
    //this is the component that bootstraps our module
    bootstrap: [EventsAppComponent],
    providers: [
        EventService,
        ToastrService,
        EventRouteActivatorService,
        AuthService,
        EventsListResolverService,
        { provide: 'canDeactivateCreateEvent', useValue: checkDirtyState}
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