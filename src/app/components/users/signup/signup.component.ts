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

  constructor(private fb: FormBuilder, private _pollService: PollService, private router: Router,private _snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  onSubmit() {
    const { username, email, password, repeatPassword } = this.createUserform.value;
    if (password == repeatPassword) {
      let gelukt: boolean = false;
      this._pollService.getUsers().subscribe(u => {
        this.users = u;
        this.users.map(user => {
          if (user.email == email) {
            if (user.password == "" || user.password == null) {
              //signup -> update user
              this.userToAdd = new User(user.userID, username, user.email, password, user.token);
              this._pollService.updateUser(this.userToAdd).subscribe(u => {
                this._snackBar.open("Uw account "+ user.username +" werd aangemaakt al, (ga naar) login om u aan te melden", "OK", {
                  duration: 3000,
                });
                gelukt = true;
              });
            }
            else if (user.password != "" || user.password != null) {
              this._snackBar.open("De user "+ user.username +" bestaat al, (ga naar) login", "OK", {
                duration: 3000,
              });
              gelukt = true;
            }
          }
        });
        if (gelukt = false) {
          this.userToAdd = new User(0, username, email, password, null);
          //user toevoegen
          this._pollService.addUser(this.userToAdd).subscribe(
            user => {
              this._snackBar.open("User met username " + user.username + " werd aangemaakt", "OK", {
                duration: 3000,
              });
            }
          );
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
