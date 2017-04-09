import {Component, Inject, Input, OnChanges} from '@angular/core';
import {ISession} from "../shared/event.model";
import {AuthService} from "../../user/auth.service";
import {VoterService} from "./voter.service";

@Component({
    selector: 'session-list',
    templateUrl: '/app/events/event-details/session-list.component.html'
})
export class SessionListComponent implements OnChanges {
    @Input() sessions: ISession[];
    @Input() filterBy: string;
    @Input() sortBy: string;
    visibleSessions: ISession[] = [];

    constructor(private auth: AuthService, private voterService: VoterService) {
    }

    ngOnChanges(): void {
        //don't filter until sessions are set
        if (this.sessions) {
            this.filterSessions(this.filterBy);
            this.sortBy === 'name' ? this.visibleSessions.sort(sortByNameAsc)
                : this.visibleSessions.sort(sortByVotesDesc);
        }
    }

    toggleVote(session: ISession) {
        if (this.userHasVoted(session)) {
            this.voterService.deleteVoter(session, this.auth.currentUser.userName);
        } else {
            this.voterService.addVoter(session, this.auth.currentUser.userName);
        }
        if (this.sortBy === 'votes') {
            this.visibleSessions.sort(sortByVotesDesc);
        }
    }

    userHasVoted(session: ISession) {
        return this.voterService.userHasVoted(session, this.auth.currentUser.userName);
    }

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