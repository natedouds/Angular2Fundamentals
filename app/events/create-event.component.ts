import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
    moduleId: module.id,
    selector: 'selector',
    template: `
    <h1>New Event</h1>
        <hr>
        <div class="col-md-6">
            <h3>[Create Event Form will go here</h3>
            <br/>
            <br/>
            <button type="submit" class="btn btn-primary">Save</button>
            <button type="submit" class="btn btn-default" (click)="cancel()">Cancel</button>
        </div>
    `
})
export class CreateEventComponent implements OnInit {
    public isDirty: boolean = true;

    constructor(private router: Router) { }

    ngOnInit() { }

    cancel() {
        //nav from code
        this.router.navigateByUrl('/events')
    }

}