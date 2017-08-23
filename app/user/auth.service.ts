import { Injectable } from '@angular/core'
import { IUser } from './user.model'
import { Observable } from 'rxjs/RX'
import { Http, Response, Headers, RequestOptions } from '@angular/http'

@Injectable()
export class AuthService {
    currentUser: IUser

    constructor(private http: Http) { }
    loginUser(userName: string, password: string) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        //names of the properties must be lowercase
        let loginInfo = { username: userName, password: password };
        return this.http.post('/api/login', JSON.stringify(loginInfo), options)
            .do(resp => {
                if (resp) {
                    this.currentUser = <IUser>resp.json().user;
                }
            }).catch(error => {
                return Observable.of(false);
            })

        // let nameParts = userName.split(' ')
        // let fn = nameParts[0]
        // let ln = nameParts[1]
        // this.currentUser = {
        //     id: 1,
        //     userName: userName,
        //     firstName: fn,
        //     lastName: ln
        // }
    }
    isAuthenticated() {
        return !!this.currentUser;
    }

    updateCurrentUser(firstName: string, lastName: string) {
        this.currentUser.firstName = firstName
        this.currentUser.lastName = lastName
        this.currentUser.userName = firstName + ' ' + lastName

        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.put(`/api/users/${this.currentUser.id}`, JSON.stringify(this.currentUser), options);
    }

    checkAuthenticationStatus() {
        //the get.. call to the server with this URL returns nothing if user is not authenticated, it returns current user if a user is authenticated, we convert the string returne from the server to an object - user object if authenticated and empty object if not
        //(response: any) is required because the Response object doesn't have _body property, but the object returned from the server does
        return this.http.get('/api/currentIdentity').map((response: any) => {
            if (response._body) {
                return response.json(); //user object
            } else {
                return {}
            }
        })
            .do(currentUser => {
                if (!!currentUser.userName) {
                    this.currentUser = currentUser;
                }
            })
            .subscribe()
    }

    logout() {
        this.currentUser = undefined;
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        //mistakenly used .put which was not implemented on the server and thus wasted a lot of time
        return this.http.post('/api/logout', JSON.stringify({}), options)
    }
}