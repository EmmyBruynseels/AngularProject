import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from 'src/app/security/services/authenticate.service';
import { User2, User } from '../models/user.model';
import { FormBuilder, Validators } from '@angular/forms';
import { PollService } from 'src/app/polls/poll.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  user2ToAdd: User2;
  userToAdd: User;

  users: User[];
  userNodig: User;
  melding: String;

  createUserform = this.fb.group({
    username: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
    //validator matchPasswords
    repeatPassword: ['', Validators.required]
  });

  constructor(private fb: FormBuilder, private _pollService: PollService, private router: Router) {
  }

  ngOnInit() {
  }

  onSubmit() {
    const { username, email, password } = this.createUserform.value;
    let gelukt: boolean = false;
    this._pollService.getUsers().subscribe(u => {
      this.users = u;
      this.users.map(user => {
        if (user.email == email) {
          if (user.password == "" || user.password == null) {
            //signup -> update
            this.userToAdd = new User(user.userID, username, user.email, password, user.token);
            this._pollService.updateUser(this.userToAdd).subscribe( u => {
              console.log(user);
              gelukt = true;
            });
          }
          else if (user.password != "" || user.password != null) {
            this.melding = "User bestaat al, ga naar login";
            gelukt = true;
          }
        }
      });
      if (gelukt = false) {
        this.userToAdd = new User(0, username, email, password, null);
  
            console.log("userToAdd", this.userToAdd);
            this._pollService.addUser(this.userToAdd).subscribe(
              user => {
                console.log("subscribe", user);
              }
            );
      }
    });
    
  }

goToLogin() {
  this.router.navigate(['/security']);
}

}
