import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Poll, Poll_dto } from 'src/app/models/poll.model';
import { PollService } from 'src/app/services/poll.service';
import { Router } from '@angular/router';
import { Friend } from 'src/app/models/friend.model';
import { User } from 'src/app/models/user.model';


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
    this.requests = new Array<Friend>();
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
    this._pollService.setPoll(poll.pollID);
    this.router.navigate(['/vote']);
  }
  edit(poll: Poll_dto) {
    this._pollService.setPoll(poll.pollID);
    this.router.navigate(['/edit']);
  }

  goToAddPoll() {
    this.router.navigate(['/addpoll']);
  }

  goToInviteFriend() {
    this.router.navigate(['/invite']);
  }

  accept(id: number) {
    //Friend-object ophalen, accepted naar true zetten en opslaan
    this._pollService.getFriend(id).subscribe(f => {
      this.friendToAccept = f;

      this.friendToAccept.accepted = true;
      this._pollService.updateFriend(this.friendToAccept).subscribe(f => {
        this.ngOnInit();
      })
    });
  }
  reject(id: number) {
    //friend-object verwijderen
    this._pollService.deleteFriend(id).subscribe(f => {
      this.ngOnInit();
    });
  }
}
