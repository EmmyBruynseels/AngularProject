import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PollService } from 'src/app/services/poll.service';
import { Poll_dto } from 'src/app/models/poll.model';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  users: User[];
  polls: Poll_dto[];
  constructor(private _pollService: PollService, private router: Router) { }

  ngOnInit() {
    this._pollService.getAllPolls().subscribe(polls => {
      this.polls = polls;
    });
    this._pollService.getUsers().subscribe(users => {
      this.users = users;
    })
  }

  goToSignup() {
    this.router.navigate(['/signup']);
  }

  goToLogin() {
    this.router.navigate(['/security']);
  }
}
