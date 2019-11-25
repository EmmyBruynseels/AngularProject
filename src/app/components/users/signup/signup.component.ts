import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PollService } from 'src/app/services/poll.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { User_dto, User } from 'src/app/models/user.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  user2ToAdd: User_dto;
  userToAdd: User;

  users: User[];
  userNodig: User;
  meldingPassword: String;

  createUserform = this.fb.group({
    username: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
    //validator matchPasswords
    repeatPassword: ['', Validators.required]
  });

  constructor(private fb: FormBuilder, private _pollService: PollService, private router: Router, private _snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  onSubmit() {
    //user-object aanmaken
    const { username, email, password, repeatPassword } = this.createUserform.value;

    //validatie voor wachtwoord
    if (password == repeatPassword) {

      //user met deze email ophalen
      this._pollService.getUserByEmail(email).subscribe(user => {
        console.log(user);
        if (user == null) {
          //email bestaat nog niet
          //nieuwe user toevoegen met deze gegevens
          this.userToAdd = new User(0, username, email, password, null);
          this._pollService.addUser(this.userToAdd).subscribe(
            user => {
              this._snackBar.open("User met username " + user.username + " werd aangemaakt, ga naar login om u met deze gegevens aan te melden", "OK", {
                duration: 3000,
              });
            });
        }
        else {
          //email bestaat al
          if (user.password == null) {
            // als wachtwoord leeg is -> user-object aangemaakt door invite
            // user-object updaten met username & wachtwoord
            this.userToAdd = new User(user.userID, username, user.email, password, user.token);
            this._pollService.updateUser(this.userToAdd).subscribe(u => {
              this._snackBar.open("Uw account " + u.username + " werd aangemaakt, (ga naar) login om u aan te melden", "OK", {
                duration: 3000,
              });
            });
          }
          else {
            //email bestaat al & wachtwoord is niet leeg
            //deze user bestaat al -> naar inloggen
            this._snackBar.open("De user " + user.username + " bestaat al, (ga naar) login", "OK", {
              duration: 3000,
            });
          }
        }
      });
    }
    else {
      this.meldingPassword = "Wachtwoorden komen niet overeen!";
    }
  }

  goToLogin() {
    this.router.navigate(['/security']);
  }

}
