import {Injectable} from '@angular/core';
import {IUser} from './user.model'
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class AuthService {
    currentUser: IUser;

    constructor(private http: Http) {
    }

    //need correct usernames now that we're hitting the login
    //johnpapa is a valid username
    loginUser(userName: string, userPassword: string) {
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});
        let loginInfo = {username: userName, password: userPassword};

        return this.http.post('/api/login', loginInfo, options)
        //do implies your doing something with the data, but not quite like map
            .do(resp => {
                if (resp) {
                    this.currentUser = <IUser>resp.json().user;
                }
            }).catch(error => {
                //handle the error
                return Observable.of(false); //create a new observable with a single value of false
            });
    }

    isAuthenticated() {
        return !!this.currentUser;
    }

    checkAuthenticationStatus() {
        return this.http.get('/api/currentIdentity').map((resp: any) => {
            //response type does not have the _body property, hence the 'any' above
            if (resp._body) {
                return resp.json();
            } else {
                return {}
            }
        }).do(currentUser => {
            if (!!currentUser.userName) {
                this.currentUser = currentUser;
            }
        }).subscribe(); //self subscribe
    }

    updateCurrentUser(firstName: string, lastName: string) {
        this.currentUser.firstName = firstName;
        this.currentUser.lastName = lastName;

        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});

        return this.http.put(`/api/users/${this.currentUser.id}`, this.currentUser, options);
    }

    logout() {
        this.currentUser = undefined;

        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});

        return this.http.post('/api/logout', {}, options);
    }
}