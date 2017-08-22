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
    updateCurrentUser(firstName: string, lastName: string) {
        this.currentUser.firstName = firstName
        this.currentUser.lastName = lastName
        this.currentUser.userName = firstName + ' ' + lastName
    }
    isAuthenticated() {
        return !!this.currentUser;
    }

}