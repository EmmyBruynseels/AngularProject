import { Component, OnInit } from '@angular/core';
import { PollService } from 'src/app/services/poll.service';
import { Router } from '@angular/router';
import { Friend } from 'src/app/models/friend.model';
import { User } from 'src/app/models/user.model';


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
    this.userFriends = [];
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
    //delete friend-object - friendID en current user(in functie toegevoegd)
    this._pollService.deleteFriendByUserIDs(fr.userID).subscribe(f => {
      this.ngOnInit();
    });

  }
}
