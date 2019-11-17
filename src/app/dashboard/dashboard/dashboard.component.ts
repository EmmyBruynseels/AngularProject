import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Poll, Poll_dto } from 'src/app/polls/models/poll.model';
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
  poll: Poll_dto[];
  pollsAdmin: Poll_dto[];
  pollsUser: Poll_dto[];
  friends: Friend[];
  requests: Friend[];
  friendToAccept: Friend;
  userFriends: User[] = [];

  constructor(private _pollService: PollService, private router: Router) {
  }

  ngOnInit() {
    this.requests= new Array<Friend>();
    this._pollService.getPolls().subscribe(poll => {
      this.poll = poll;
    });
    this._pollService.getPollsAdmin().subscribe(p => {
      console.log(p);
      this.pollsAdmin = p;
    });
    this._pollService.getPollsUitgenodigd().subscribe(p => {
      this.pollsUser = p;
    });
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
    this._pollService.getFriendRequests().subscribe(fr => {
      this.requests = fr;
    })
  }

  vote(poll: Poll_dto) {
    this._pollService.setPollDashboard(poll);
    console.log(poll);
    this.router.navigate(['/vote']);
  }

  goToAddPoll() {
    this.router.navigate(['/addpoll']);
  }

  goToPolls() {
    this.router.navigate(['/poll']);
  }

  goToInviteFriend() {
    this.router.navigate(['/invite']);
  }
  accept(id: number) {
    console.log(id);
    this._pollService.getFriend(id).subscribe(f => {
      this.friendToAccept = f;

      this.friendToAccept.accepted = true;
      this._pollService.updateFriend(this.friendToAccept).subscribe(f => {
        console.log("updated!");
        this.ngOnInit();
      })
    });
  }
  reject(id: number) {
    console.log(id);
    this._pollService.deleteFriend(id).subscribe( f => {
      console.log(f);
      this.ngOnInit();
    });
  }
}
