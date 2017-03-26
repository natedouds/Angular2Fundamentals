import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router'
import { EventService } from '../shared/event.service'

@Injectable()
export class EventRouteActivatorService implements CanActivate{

    constructor(private eventService: EventService, private router:Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
            const eventExists = !!this.eventService.getEvent(+route.params['id']);

            if(!eventExists){
                this.router.navigate(['/404']);
            }
        return eventExists;
    }

}