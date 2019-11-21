import { Component, OnInit } from '@angular/core';
import { PollService } from 'src/app/polls/poll.service';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { Friend } from '../models/friend.model';

@Component({
  selector: 'app-friend',
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.scss']
})
export class FriendComponent implements OnInit {

  friendToAccept: Friend;
  userFriends: User[];

  constructor(private _pollService: PollService, private router: Router) { }

  ngOnInit() {
    this.userFriends= [];
    this._pollService.getFriends().subscribe(friends => {
      friends.map(f => {
        if (f.ontvangerID.toString() == localStorage.getItem("userID")) {
          this.userFriends.push(f.sender);
        }
        else {
          this.userFriends.push(f.ontvanger);
        }
      })
    });
  }

  goToInviteFriend() {
    this.router.navigate(['/invite']);
  }

  delete(fr: User) {
    let userID = +localStorage.getItem("userID");

    this._pollService.getFriends().subscribe(friends => {
      friends.map(f => {
        if ((f.ontvangerID == userID && f.senderID == fr.userID) || (f.senderID == userID && f.ontvangerID == fr.userID)) {
          this._pollService.deleteFriend(f.friendID).subscribe();
        }
      });
    });
    this.ngOnInit();
  }
}
