import { Component, OnInit } from '@angular/core';
import { Poll } from 'src/app/polls/models/poll.model';
import { PollService } from 'src/app/polls/poll.service';
import { Router } from '@angular/router';
import { Stem2 } from 'src/app/polls/models/stem.model';
import { Antwoord } from 'src/app/polls/models/antwoord.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.scss']
})
export class VoteComponent implements OnInit {

  stemToAdd: Stem2;
  poll: Poll;
  alleAntwoorden : Antwoord[];
  antwoordenBijPoll: Antwoord[];
  constructor(private _pollService: PollService, private router: Router) { }

  ngOnInit() {
    console.log(history.state.data.poll);
    this.poll = history.state.data.poll;   
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
