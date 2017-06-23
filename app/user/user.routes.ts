import {ProfileComponent} from './profile.component'
import {LoginComponent} from './login.component'

export const userRoutes = [
    //actual Url would be /user/profile, see route.ts
    {path: 'profile', component: ProfileComponent}
   ,    {path: 'login', component: LoginComponent}
]