import {Injectable} from '@angular/core'
import {IUser} from './user.model'

@Injectable()
export class AuthService{
    currentUser:IUser
    loginUser(userName: string, password: string){
        let nameParts = userName.split(' ')
        let fn = nameParts[0]
        let ln = nameParts[1]
        this.currentUser = {
            id: 1,
            userName: userName,
            firstName: fn,
            lastName: ln
        }
    }

    isAuthenticated(){
        return !!this.currentUser;
    }

}