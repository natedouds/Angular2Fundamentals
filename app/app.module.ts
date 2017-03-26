//basic angular module
import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
//top component / container component for app
import { EventsAppComponent } from './events-app.component'
import { EventsListComponent } from './events/events-list.component'
import { EventThumbnailComponent } from './events/event-thumbnail.component'
import { NavBarComponent } from './nav/navbar.component'

@NgModule({
    imports: [BrowserModule],
    //components are declared within a module
    declarations: [EventsAppComponent, EventsListComponent, EventThumbnailComponent, NavBarComponent], //if you forget this, you'll see an error that says this is not a known element
    //this is the component that bootstraps our module
    bootstrap: [EventsAppComponent]
})
export class AppModule {}