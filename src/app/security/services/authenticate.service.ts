import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';


import { Observable } from 'rxjs';
import { UserLogin } from 'src/app/users/models/user-login.model';
import { User } from 'src/app/users/models/user.model';



@Injectable({
    providedIn: 'root'
})

export class AuthenticateService {

    constructor(private _httpClient: HttpClient) { }
    authenticate(userLogin: UserLogin): Observable<User> {
        return this._httpClient.post<User>("https://localhost:5001/api/User/authenticate", userLogin);
    }
}