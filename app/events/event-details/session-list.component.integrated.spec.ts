import { TestBed, async, ComponentFixture } from '@angular/core/testing'
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core'
import { SessionListComponent } from './session-list.component'
import { UpvoteComponent } from './upvote.component'
import { DurationPipe } from '../shared/duration.pipe'
import { CollapsibleWellComponent } from '../../common/collapsible-well.component'
import { AuthService } from '../../user/auth.service'
import { VoterService } from './voter.service'
import { ISession } from '../shared/event.model'
import { By } from '@angular/platform-browser';

describe('SessionListComponent', () => {
    let fixture: ComponentFixture<SessionListComponent>,
        component: SessionListComponent,
        element: HTMLElement,
        debugEl: DebugElement

    //async fuction uses the magic of Async Test Zone in Angular a synchronously execute asynchronous function and is a necessary piece of any integration test
    //from https://angular.io/guide/testing
    //async arranges for the body of the beforeEach to run in a special async test zone that hides the mechanics of asynchronous execution of TestBed.compileComponents();
    beforeEach(async(() => {
        let mockAuthService = {
            isAuthenticated: () => true,
            currentUser: {userName: 'Joe'},
        };
        let mockVoterService = {userHasVoted: () => true};

        //similar to app.module.ts
        //compileComponents() compiles the templates and stylesheets of a component. It is not needed when using webpack (where webpack does the job for us), but is necessary when using SystemJs.
        TestBed.configureTestingModule({
            imports: [],
            declarations: [
                SessionListComponent,
                // Shallow Testing: prevent errors from being thrown when angular encounters html tags for which components have not been added to testingModule's declarations property
                //UpvoteComponent,
                DurationPipe
                //, CollapsibleWellComponent
            ],
            providers: [
                { provide: AuthService, useValue: mockAuthService },
                { provide: VoterService, useValue: mockVoterService }
            ],
            // Shallow Testing: prevent errors from being thrown when angular encounters html tags for which components have not been added to testingModule's declarations property
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();
    }))

    beforeEach(() => {
        //after the call below, TestBed.configureTestingModule or TestBed.override... methods can no longer be called
        fixture = TestBed.createComponent(SessionListComponent);
        component = fixture.componentInstance;
        debugEl = fixture.debugElement;
        element = fixture.nativeElement;
    })

    describe('initial display', () => {
        it('should have the correct session title', () => {
            //Arrange
            component.sessions = [{ id: 3, name: 'Session 1', presenter: 'Joe', duration: 1, level: 'beginner', abstract: 'abstract', voters: ['john', 'bob'] }];
            component.filterBy = 'all';
            component.sortBy = 'name';
            component.eventId = 4;

            //Act, ngOnInit gets fired on its own. ngOnChanges is not fired on its own because the input properties are not set from parent component in a test situation, so the test has to call this method directly
            component.ngOnChanges();
            //changes are rerendered to html, testModule does not automatically detect changes by design
            fixture.detectChanges();

            // Version: before Clip "Using DebugElement"
            //expect(element.querySelector('[well-title]').textContent).toContain('Session 1');
            // Equivalent version after Clip: 'Using DebugElement'
            expect(debugEl.query(By.css('[well-title]')).nativeElement.textContent).toContain('Session 1');
        })
    })
})


