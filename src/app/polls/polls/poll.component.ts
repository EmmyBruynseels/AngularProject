import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { Poll } from '../models/poll.model';
import { PollService } from '../poll.service';
import { Router } from '@angular/router';
import { Antwoord } from '../models/antwoord.model';


@Component({
  selector: 'app-poll',
  templateUrl: './poll.component.html',
  styleUrls: ['./poll.component.scss'],
  providers: [PollService]
})
export class PollComponent implements OnInit {

  polls: Observable<Poll[]>;
  poll: Poll[];
  constructor(private _pollService: PollService, private router: Router) {
  }

  ngOnInit() {
    
    this._pollService.getPolls().subscribe(poll => {
      console.log(poll);
      this.poll = poll;
    });
  }

  vote(id: number) {
    console.log(id);
    this._pollService.getPoll(id).subscribe(poll => {
      console.log(poll);
      this.router.navigate(['/vote'],{state: {data: {poll: poll}}});
    })
  }

  goToAddPoll() {
    this.router.navigate(['/addpoll']);
  }

}
