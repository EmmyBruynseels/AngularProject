import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Poll, Poll2 } from 'src/app/polls/models/poll.model';
import { PollService } from 'src/app/polls/poll.service';
import { Router } from '@angular/router';
import { User } from 'src/app/users/models/user.model';
import { Friend } from 'src/app/users/models/friend.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  polls: Observable<Poll[]>;
  poll: Poll2[];
  pollsAdmin: Poll2[];
  pollsUser: Poll2[];
  friends: User[];
  requests: User[];
  friendToAccept: Friend;

  constructor(private _pollService: PollService, private router: Router) {
  }

  ngOnInit() {
    this._pollService.getPolls().subscribe(poll => {
      this.poll = poll;
    });
    this._pollService.getPollsAdmin().subscribe( p => {
      this.pollsAdmin = p ;
    });
    this._pollService.getPollsUitgenodigd().subscribe( p => {
      this.pollsUser = p;
    });
    this._pollService.getFriends().subscribe(friend => {
      this.friends = friend;
    });
    this._pollService.getFriendRequests().subscribe(fr => {
      this.requests = fr;
    })
  }

  vote(id: number) {
    console.log(id);
    this._pollService.getPoll(id).subscribe(poll => {
      console.log(poll);
      //this.router.navigate(['/vote'],{state: {data: {poll: poll}}});
    })

  }
  goToAddPoll() {
    this.router.navigate(['/addpoll']);
  }

  goToPolls() {
    this.router.navigate(['/poll']);
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
}
