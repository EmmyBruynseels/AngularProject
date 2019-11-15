import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { PollService } from 'src/app/polls/poll.service';
import { User, User2 } from '../models/user.model';
import { send } from 'q';
import { Friend2, Friend } from '../models/friend.model';

@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.scss']
})
export class InviteComponent implements OnInit {

  inviteFriendFG: FormGroup;
  users: User[];
  emailBestaat : boolean = false;
  friendIDBestaat : number;
  userToAdd : User;
  friendToAdd : Friend2;
  melding: String;
  friendBestaatAl: boolean = false;

  constructor(private _formBuilder: FormBuilder, private _pollService: PollService, private router: Router) { }

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
        if (user.email == email){
          this.emailBestaat = true;
          this.friendIDBestaat = user.userID;
        }
      });

      if (this.emailBestaat == false) {
        this.userToAdd = new User(0,null, email,null,null);
        this._pollService.addUser(this.userToAdd).subscribe( u => {
          console.log(u);
          this.sendFriendRequest(u.userID);
          this.melding = "Friend toegevoegd";
        });
      }
      else {
        this.sendFriendRequest(this.friendIDBestaat);
        this.melding = "Friendrequest verstuurd";
      }
    });
  }

  sendFriendRequest(friendID) {
    let userID = localStorage.getItem("userID");

    this._pollService.getAllFriends().subscribe(f => {
      let friends: Friend[] = f;
      friends.map( friend => {
        if((friend.ontvangerID == friendID || friend.senderID == friendID) && (friend.senderID == +userID || friend.ontvangerID == +userID) ) {
          this.friendBestaatAl = true;
        }
      });
      if (this.friendBestaatAl == false){
        this.friendToAdd = new Friend2(+userID,friendID,false);
        this._pollService.addFriend(this.friendToAdd).subscribe(f => {
          console.log(f);
        });
      }
      else{
        this.melding = "Friend bestaat al";
      }
     });
  }
}
