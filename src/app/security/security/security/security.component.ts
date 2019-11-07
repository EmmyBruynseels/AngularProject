import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from '../../services/authenticate.service';
import { UserLogin } from 'src/app/users/models/user-login.model';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.scss']
})
export class SecurityComponent implements OnInit {
  submitted: boolean = false;
  //userLogin: UserLogin = new UserLogin("emmy", "test");
  userLogin: UserLogin = new UserLogin("","");

  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });
  
  constructor(private _authenticateService: AuthenticateService,private router: Router, private fb: FormBuilder) { }

  ngOnInit() {
  }

  onSubmit() {
    this.submitted = true;
    const { username,password } = this.loginForm.value;
    this.userLogin.password = password;
    this.userLogin.username = username;

    console.log(this.userLogin);
    this._authenticateService.authenticate(this.userLogin).subscribe(result => {
      localStorage.setItem("token", result.token);
    });
    this.router.navigate(['/poll']);

  }

  goToSignup() {
    this.router.navigate(['/signup']);
  }

}