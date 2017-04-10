//basic angular module
import {NgModule} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'
import {RouterModule} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpModule} from '@angular/http'

//top component / container component for app
import {EventsAppComponent} from './events-app.component'
import {EventThumbnailComponent} from './events/event-thumbnail.component'
import {NavBarComponent} from './nav/navbar.component'
import {
    JQ_TOKEN,
    TOASTR_TOKEN,
    Toastr,
    CollapsibleWellComponent,
    SimpleModalComponent,
    ModalTriggerDirective
} from "./common/index";
import {appRoutes} from "./routes";
import {Error404Component} from "./errors/404-component";
import {
    EventsListComponent,
    EventService,
    EventDetailsComponent,
    CreateEventComponent,
    EventsResolverService,
    EventsListResolverService,
    CreateSessionComponent,
    DurationPipe,
    UpvoteComponent,
    VoterService,
    LocationValidator
} from './events/index';
import {AuthService} from "./user/auth.service";
import {SessionListComponent} from "./events/event-details/session-list.component";

//Tell TS not to worry about toastr, as it exists on the global scope
declare let toastr: Toastr;
declare let jQuery: Object;

@NgModule({
    imports: [BrowserModule, FormsModule, ReactiveFormsModule, HttpModule, RouterModule.forRoot(appRoutes)],
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
        CollapsibleWellComponent,
        SimpleModalComponent,
        ModalTriggerDirective,
        DurationPipe,
        UpvoteComponent,
        LocationValidator
    ], //if you forget this, you'll see an error that says this is not a known element
    //this is the component that bootstraps our module
    bootstrap: [EventsAppComponent],
    //useExisting and useFactor are other ways to provide a svc; neither are terribly useful
    providers: [
        EventService,
        //create new DI registration; when they ask for TOASTR_TOKEN, DI will provide the toastr object
        {provide: TOASTR_TOKEN, useValue: toastr},
        {provide: JQ_TOKEN, useValue: jQuery},
        //note: the above provide / useValue syntax is almost the exact same thing as a normal service registration, but service registrations have a useClass property, for example:
        //I could register EventRouteActivatorService by simply placing it in the providers array, or, I could use the long hand syntax
        //{provide: EventRouteActivatorService, useClass: EventRouteActivatorService}, //when they ask for EventRouteActivatorService, provide the class EventRouteActivatorService
        EventsResolverService,
        AuthService,
        EventsListResolverService,
        VoterService,
        {provide: 'canDeactivateCreateEvent', useValue: checkDirtyState}
    ]
})
export class AppModule {

}

function checkDirtyState(component: CreateEventComponent) {
    if (component.isDirty) {
        return window.confirm('You have not saved this event, do you really want to cancel?')
    }
    return true;
}