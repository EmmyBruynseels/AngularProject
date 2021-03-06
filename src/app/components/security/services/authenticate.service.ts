import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { UserLogin } from 'src/app/models/user-login.model';
import { User } from 'src/app/models/user.model';



@Injectable({
    providedIn: 'root'
})

export class AuthenticateService {

    isLoggedin = new BehaviorSubject(false);

    constructor(private _httpClient: HttpClient, private router: Router) { }
    authenticate(userLogin: UserLogin): Observable<User> {
        return this._httpClient.post<User>("https://polllabs.azurewebsites.net/api/User/authenticate", userLogin);
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