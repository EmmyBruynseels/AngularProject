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

  friends: User[];
  friendToAccept: Friend;
  constructor(private _pollService: PollService, private router: Router) { }

  ngOnInit() {
    this._pollService.getFriends().subscribe(friend => {
      this.friends = friend;
    });
  }
}
