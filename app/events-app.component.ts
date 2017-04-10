//angular core import is coming from system.js
import {Component, OnInit} from '@angular/core'
import {AuthService} from './user/auth.service';

//this class represents the main (top level) component
@Component({
    //pull this component into the page with a HTML selector
    selector: 'events-app',
    //what html to display when this component is loaded
    template: `
        <nav-bar></nav-bar>
        <router-outlet></router-outlet>`
})
export class EventsAppComponent implements OnInit {
    constructor(private auth: AuthService) {
    }

    ngOnInit() {
        this.auth.checkAuthenticationStatus();
    }

}