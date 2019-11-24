import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from '../../services/authenticate.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { UserLogin } from 'src/app/models/user-login.model';

@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.scss']
})
export class SecurityComponent implements OnInit {
  submitted: boolean = false;
  userLogin: UserLogin = new UserLogin("", "");

  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(private _authenticateService: AuthenticateService, private router: Router, private fb: FormBuilder) { }

  ngOnInit() {
  }

  onSubmit() {
    //aanmelden met authenticationService
    //token & userID in localstorage toevoegen
    this.submitted = true;
    const { username, password } = this.loginForm.value;
    this.userLogin.password = password;
    this.userLogin.username = username;

    this._authenticateService.authenticate(this.userLogin).subscribe(result => {
      localStorage.setItem("token", result.token);
      localStorage.setItem("userID", result.userID.toString());
      this._authenticateService.isLoggedin.next(result.token ? true : false);
    });
    this.router.navigate(['/dashboard']);
  }

  goToSignup() {
    this.router.navigate(['/signup']);
  }

}