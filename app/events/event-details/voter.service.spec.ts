//isolated test of service using jasmine spy object for faking dependency i.e. http object
//uses jasmine.createSpyObject
import { VoterService } from './voter.service'
import { ISession } from '../shared/event.model'
import { Observable } from 'rxjs/Observable'

describe('VoterService', () => {
    let voterService: VoterService,
        //type can not be easily defined for the mock object, when jasmine is used
        mockHttp;
    beforeEach(() => {
        //creating the mock object, in jasmine parlance - spy object with 2 methods
        mockHttp = jasmine.createSpyObj('mockHttp', ['delete', 'post'])
        voterService = new VoterService(mockHttp);
    });

    describe('deleteVoter', () => {
        //Damp - duplication of code example
        it('should remove the voter from the list of voters', () => {
            var session = { id: 6, voters: ["joe", "john"] };
            //specifying that a mock object returns an Observable that is not used by service or test
            mockHttp.delete.and.returnValue(Observable.of(false));
            voterService.deleteVoter(3, <ISession>session, "joe");
            expect(session.voters.length).toBe(1);
            expect(session.voters[0]).toBe("john");
        })

        it('should call http.delete with the right Url', () => {
            var session = { id: 6, voters: ["joe", "john"] };
            //specifying that a mock object returns an Observable that is not used by service or test           mockHttp.delete.and.returnValue(Observable.of(false));
            voterService.deleteVoter(3, <ISession>session, "joe");
            expect(mockHttp.delete).toHaveBeenCalledWith('/api/events/3/sessions/6/voters/joe');
        })
    })

    describe('addVoter', () => {
        it('should call http.post with the right Url', () => {
            var session = { id: 6, voters: ["john"] };
            //specifying that a mock object returns an Observable
            mockHttp.post.and.returnValue(Observable.of(false));
            voterService.addVoter(3, <ISession>session, "joe");
            //only checking if any object was passed for the options object
            expect(mockHttp.post).toHaveBeenCalledWith
            ('/api/events/3/sessions/6/voters/joe', "{}", jasmine.any(Object));
        })
    })
})