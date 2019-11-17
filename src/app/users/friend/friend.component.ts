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

  friends: Friend[];
  friendToAccept: Friend;
  userFriends: User[] = [];
  
  constructor(private _pollService: PollService, private router: Router) { }

  ngOnInit() {
    this._pollService.getFriends().subscribe(friend => {
      this.friends = friend;
      this.friends.map(f => {
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
}
