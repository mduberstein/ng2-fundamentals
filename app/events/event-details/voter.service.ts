import { Injectable } from '@angular/core'
// import {ISession} from '../shared/index'
import { ISession } from '../shared/event.model'
import { Observable } from 'rxjs/Observable'

import { Http, Response, Headers, RequestOptions } from '@angular/http'

@Injectable()
export class VoterService {
  constructor(private http: Http) { }
  deleteVoter(eventId: number, session: ISession, voterName: string) {
    session.voters = session.voters.filter(voter => voter !== voterName);
    let url = `/api/events/${eventId}/sessions/${session.id}/voters/${voterName}`;
    //self-subscribe example, if not subscribed here on in the session-list.component.ts in toggle.vote, no data will be changed on the server. Use this method if no data from Response is of interest
    this.http.delete(url).catch(this.handleError).subscribe();
  }

  //addVoter could have been of the same signature as DeleteVoter, i.e. return void, I tried an alternative when the caller is interested in the contents of the respone
  addVoter(eventId: number, session: ISession, voterName: string): Observable<Response> {
    session.voters.push(voterName);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    let url = `/api/events/${eventId}/sessions/${session.id}/voters/${voterName}`;
    return this.http.post(url, JSON.stringify({}), options).catch(this.handleError);
  }

  userHasVoted(session: ISession, voterName: string) {
    return session.voters.some(voter => voter === voterName);
  }

  private handleError(error: Response) {
    return Observable.throw(error.statusText);
  }
}