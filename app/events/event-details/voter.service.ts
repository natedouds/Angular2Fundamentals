import {Injectable} from '@angular/core';
import {ISession} from "../shared/event.model";

@Injectable()
export class VoterService {

    deleteVoter(session: ISession, voterName: string) {
        //filter out voterName;
        session.voters = session.voters.filter(voter => voter !== voterName);
    }

    addVoter(session: ISession, voterName: string) {
        session.voters.push(voterName);
    }

    userHasVoted(session: ISession, voterName: string) {
        //does array contain at least based on expression (think .Any())
        return session.voters.some(voter => voter === voterName);
    }
}