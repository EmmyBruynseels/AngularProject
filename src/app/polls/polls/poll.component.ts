import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { Poll, Poll_dto } from '../models/poll.model';
import { PollService } from '../poll.service';
import { Router } from '@angular/router';
import { Antwoord } from '../models/antwoord.model';
import { Stem_dto } from '../models/stem.model';


@Component({
  selector: 'app-poll',
  templateUrl: './poll.component.html',
  styleUrls: ['./poll.component.scss'],
  providers: [PollService]
})
export class PollComponent implements OnInit {

  polls: Observable<Poll[]>;
  poll: Poll_dto[];
  pollsAdmin: Poll_dto[];
  pollsUser: Poll_dto[];
  stemToAdd: Stem_dto;
  constructor(private _pollService: PollService, private router: Router) {
  }

  ngOnInit() {

    this._pollService.getPolls().subscribe(poll => {
      this.poll = poll;
    });
    this._pollService.getPollsAdmin().subscribe(p => {
      this.pollsAdmin = p;
    });
    this._pollService.getPollsUitgenodigd().subscribe(p => {
      this.pollsUser = p;
    });
  }

  vote(poll: Poll_dto) {
    // this._pollService.setPollDashboard(poll);
    this.router.navigate(['/vote']);
  }

  goToAddPoll() {
    this.router.navigate(['/addpoll']);
  }
}
