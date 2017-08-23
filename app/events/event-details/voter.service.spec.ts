import {VoterService} from './voter.service'
import {ISession} from '../shared/event.model'
import {Observable} from 'rxjs/Rx'

describe('VoterService', ()=>{
    let voterService: VoterService,
        //type can be easily defined for the mock object, when jasmine is used
        mockHttp;
    beforeEach(()=>{
        //creating the mock object, in jasmine parlance - spy object with 2 methods
        mockHttp = jasmine.createSpyObj('mockHttp', ['delete', 'post'])
        voterService = new VoterService(mockHttp);
    });

    describe('deleteVoter', ()=> {
        it('should remove the voter from the list of voters', ()=>{
            var session = {id: 6, voters: ["joe", "john"]};
            //specifying that a mock object returns an Observable
            mockHttp.delete.and.returnValue(Observable.of(false));
            voterService.deleteVoter(3, <ISession>session, "joe");
            expect(session.voters.length).toBe(1);
            expect(session.voters[0]).toBe("john");

        })
    })
})