import {Component, Input, OnChanges} from '@angular/core';
import {ISession} from "../shared/event.model";

@Component({
    selector: 'session-list',
    templateUrl: '/app/events/event-details/session-list.component.html'
})
export class SessionListComponent implements OnChanges {
    ngOnChanges(): void {
        //don't filter until sessions are set
        if (this.sessions) {
            this.filterSessions(this.filterBy);
            this.sortBy === 'name' ? this.visibleSessions.sort(sortByNameAsc)
                : this.visibleSessions.sort(sortByVotesDesc);
        }
    }

    @Input() sessions: ISession[];
    @Input() filterBy: string;
    @Input() sortBy: string;
    visibleSessions: ISession[] = [];

    private filterSessions(filter: string) {
        if (filter === 'all') {
            //slicing from the first element creates a true duplicate
            this.visibleSessions = this.sessions.slice(0);
        } else {
            //filter also creates a new array
            this.visibleSessions = this.sessions.filter(session => {
                //any sessions that have a level that match the filter will be included
                return session.level.toLocaleLowerCase() === filter;
            })
        }
    }
}

function sortByNameAsc(s1: ISession, s2: ISession) {
    if (s1.name > s2.name) return 1;
    else if (s1.name === s2.name) return 0;
    else return -1;
}

function sortByVotesDesc(s1: ISession, s2: ISession) {
    return s2.voters.length - s1.voters.length;
}