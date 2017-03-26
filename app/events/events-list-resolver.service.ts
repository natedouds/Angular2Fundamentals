import { Injectable } from '@angular/core';
import {Resolve} from "@angular/router";
import {EventService} from "./shared/event.service";

@Injectable()
export class EventsListResolverService implements Resolve<any>{

    constructor(private eventService:EventService) { }

    resolve() {
        //get events returns an observable, then we call map, which gives us access to the results
        return this.eventService.getEvents().map(events => events);
    }

}