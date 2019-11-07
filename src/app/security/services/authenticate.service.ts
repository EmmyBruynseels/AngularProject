import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';


import { Observable, BehaviorSubject } from 'rxjs';
import { UserLogin } from 'src/app/users/models/user-login.model';
import { User } from 'src/app/users/models/user.model';
import { Router } from '@angular/router';



@Injectable({
    providedIn: 'root'
})

export class AuthenticateService {

    isLoggedin = new BehaviorSubject(false);

    constructor(private _httpClient: HttpClient, private router: Router) { }
    authenticate(userLogin: UserLogin): Observable<User> {
        return this._httpClient.post<User>("https://localhost:5001/api/User/authenticate", userLogin);
    }

    logout() {
        localStorage.removeItem("token");
        localStorage.removeItem("userID");
        this.isLoggedin.next(false);
        this.router.navigate(['/security']);
    }
    isLoggedIn() {
        if (localStorage.getItem("token")) {
            return true;
        } else {
            return false;
        }
    }
}