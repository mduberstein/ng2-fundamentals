//isolated test in which mockAuthService and mokeVoterService are undefined objects, because SessionListComponent.ngOnChanges() doesn't excercise them
import { SessionListComponent } from './session-list.component'
import { ISession } from '../shared/event.model'

describe('SessionListComponent', () => {
    let component: SessionListComponent;
    let mockAuthService, mockVoterService;
    beforeEach(() => {
        component = new SessionListComponent(mockAuthService, mockVoterService);
    })

    describe('ngOnChanges', () => {
        it('should filter the sessions correctly', () => {
            //Arrange
            component.sessions = <ISession[]>[
                { name: 'session 1', level: 'intermediate' },
                { name: 'session 2', level: 'intermediate' },
                { name: 'session 3', level: 'beginner' }
            ];
            component.filterBy = 'intermediate';
            component.sortBy = 'name';
            component.eventId = 3;
            //in production this event happens automatically, in the test we have to call it
            //Act
            component.ngOnChanges();
            //Assert
            expect(component.visibleSessions.length).toBe(2);
        })

        it('should sort the sessions correctly', () => {
            //Arrange
            component.sessions = <ISession[]>[
                { name: 'session 1', level: 'intermediate' },
                { name: 'session 3', level: 'intermediate' },
                { name: 'session 2', level: 'beginner' }
            ];
            component.filterBy = 'all';
            component.sortBy = 'name';
            component.eventId = 3;
            //in production this event happens automatically, in the test we have to call it
            //Act
            component.ngOnChanges();
            //Assert
            expect(component.visibleSessions[2].name).toBe('session 3');
        })
    })
})


