import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { Poll, Poll2 } from '../models/poll.model';
import { PollService } from '../poll.service';
import { Router } from '@angular/router';
import { Antwoord } from '../models/antwoord.model';
import { Stem2 } from '../models/stem.model';


@Component({
  selector: 'app-poll',
  templateUrl: './poll.component.html',
  styleUrls: ['./poll.component.scss'],
  providers: [PollService]
})
export class PollComponent implements OnInit {

  polls: Observable<Poll[]>;
  poll: Poll2[];
  pollsAdmin: Poll2[];
  pollsUser: Poll2[];
  stemToAdd: Stem2;
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

  vote(poll: Poll2) {
    console.log(poll);
    this.router.navigate(['/vote'], { state: { data: { poll: poll } } });
  }

  goToAddPoll() {
    this.router.navigate(['/addpoll']);
  }
}
