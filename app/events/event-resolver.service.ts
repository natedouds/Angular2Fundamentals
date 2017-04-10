import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from "@angular/router";
import {EventService} from "./shared/event.service";

@Injectable()
export class EventsResolverService implements Resolve<any> {

    constructor(private eventService: EventService) {
    }

    resolve(route: ActivatedRouteSnapshot) {
        //get events returns an observable, then we call map, which gives us access to the results
        return this.eventService.getEvent(route.params['id']);
    }

}

