import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { PollService } from 'src/app/services/poll.service';
import { MatSnackBar } from '@angular/material';
import { User } from 'src/app/models/user.model';
import { Friend_dto } from 'src/app/models/friend.model';

@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.scss']
})
export class InviteComponent implements OnInit {

  inviteFriendFG: FormGroup;
  users: User[];
  emailBestaat: boolean = false;
  friendIDBestaat: number;
  userToAdd: User;
  friendToAdd: Friend_dto;
  friendBestaatAl: boolean = false;

  constructor(private _formBuilder: FormBuilder, private _pollService: PollService, private router: Router, private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.inviteFriendFG = this._formBuilder.group({
      email: ['', Validators.required]
    });
  }
  inviteFriend() {
    const { email } = this.inviteFriendFG.value;
    this._pollService.getUsers().subscribe(u => {
      this.users = u;
      this.users.map(user => {
        if (user.email == email) {
          this.emailBestaat = true;
          this.friendIDBestaat = user.userID;
        }
      });
      if (this.emailBestaat == false) {
        //email bestaat nog niet
        //user-object met deze email aanmaken
        //Friendrequest sturen
        this.userToAdd = new User(0, null, email, null, null);
        this._pollService.addUser(this.userToAdd).subscribe(u => {
          this.sendFriendRequest(u.userID);
          this._snackBar.open("Friend toegevoegd & Friendrequest verstuurd", "OK", {
            duration: 3000,
          });
        });
      }
      else {
        //email bestaat al
        //friendrequest sturen naar user met deze email
        this.sendFriendRequest(this.friendIDBestaat);
        this._snackBar.open("Friendrequest verstuurd", "OK", {
          duration: 3000,
        });
      }
    });
  }

  sendFriendRequest(friendID) {
    let userID = localStorage.getItem("userID");

    this._pollService.getAllFriends().subscribe(friends => {
      friends.map(friend => {
        if ((friend.ontvangerID == friendID || friend.senderID == friendID) && (friend.senderID == +userID || friend.ontvangerID == +userID)) {
          this.friendBestaatAl = true;
        }
      });
      if (this.friendBestaatAl == false) {
        this.friendToAdd = new Friend_dto(+userID, friendID, false);
        this._pollService.addFriend(this.friendToAdd).subscribe(f => {
          console.log(f);
        });
      }
      else {
        this._snackBar.open("Friend bestaat al", "OK", {
          duration: 3000,
        });

      }
    });
  }
}
