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
  stemToAdd: Stem2;
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

  stem(antwoordID: number) {
    console.log(antwoordID);
    var userID = localStorage.getItem("userID");
    this.stemToAdd = new Stem2(antwoordID, +userID);
    console.log(this.stemToAdd);
    this._pollService.addStem(this.stemToAdd).subscribe(
      stem =>{ 
        console.log(stem);
        this.router.navigate(['/poll']);
      });
  }
}
