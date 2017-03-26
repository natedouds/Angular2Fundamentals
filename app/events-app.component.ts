//angular core import is coming from system.js
import { Component } from '@angular/core'

//this class represents the main (top level) component
@Component({
    //pull this component into the page with a HTML selector
    selector: 'events-app',
    //what html to display when this component is loaded
    template: `
        <nav-bar></nav-bar>
        <router-outlet></router-outlet>`
})
export class EventsAppComponent {

}