import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { Friend } from '../models/friend.model';
import { PollService } from 'src/app/polls/poll.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-friendrequest',
  templateUrl: './friendrequest.component.html',
  styleUrls: ['./friendrequest.component.scss']
})
export class FriendrequestComponent implements OnInit {
  requests: User[];
  friendToAccept: Friend;
  constructor(private _pollService: PollService, private router: Router) { }

  ngOnInit() {
    this._pollService.getFriendRequests().subscribe(fr => {
      this.requests = fr;
    });
  }

  accept(id: number) {
    console.log(id);
    this._pollService.getFriend(id).subscribe(f => {
      this.friendToAccept = f;
      
      this.friendToAccept.accepted = true;
      this._pollService.updateFriend(this.friendToAccept).subscribe(f => {
        console.log("updated!");
        this.router.navigate(['/dashboard']);
      })
    });
  }

  reject(id: number) {
    console.log(id);
    this._pollService.deleteFriend(id).subscribe( f => {
      console.log(f);
      this.router.navigate(['/dashboard']);
    });
  }

}
