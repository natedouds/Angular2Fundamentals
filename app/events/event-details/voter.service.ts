import {Injectable} from '@angular/core';
import {ISession} from "../shared/event.model";
import {RequestOptions, Headers, Http, Response} from "@angular/http";
import {Observable} from "rxjs/Rx";

@Injectable()
export class VoterService {

    constructor(private http: Http) {
    }

    deleteVoter(eventId: number, session: ISession, voterName: string) {
        //filter out voterName;
        session.voters = session.voters.filter(voter => voter !== voterName);
        let url = `/api/events/${eventId}/sessions/${session.id}/voters/${voterName}`;
        this.http.delete(url).catch(this.handleError).subscribe(); //note: this is a self-subscription, it means that the call is instantly placed and does not allow for the caller to do any custom mapping
    }

    addVoter(eventId: number, session: ISession, voterName: string) {
        session.voters.push(voterName);

        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});
        let url = `/api/events/${eventId}/sessions/${session.id}/voters/${voterName}`;
        this.http.post(url, JSON.stringify({}), options)
            .catch(this.handleError).subscribe(); //as above, self-subscription
    }

    userHasVoted(session: ISession, voterName: string) {
        //does array contain at least based on expression (think .Any())
        return session.voters.some(voter => voter === voterName);
    }

    private handleError(error: Response) {
        return Observable.throw(error.statusText);
    }
}