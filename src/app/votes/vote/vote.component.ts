import { Component, OnInit } from '@angular/core';
import { Poll, Poll2 } from 'src/app/polls/models/poll.model';
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
  poll: Poll2;
  alleAntwoorden : Antwoord[];
  antwoordenBijPoll: Antwoord[];
  gestemd : boolean = false;
  totaalStemmen : number = 0;

  constructor(private _pollService: PollService, private router: Router) { }

  ngOnInit() {
    //console.log(history.state.data.poll);
    this.poll = history.state.data.poll;   
    this.poll.antwoorden.map(a => {
      a.stemmen.map(s => {
        this.totaalStemmen++;
        if (s.userID == +localStorage.getItem("userID")) {
          this.gestemd = true;
        }
      });
    });
  }

  stem(antwoordID: number) {
    
    var userID = localStorage.getItem("userID");
    this.stemToAdd = new Stem2(0, antwoordID, +userID);
    console.log(antwoordID);
    console.log(this.stemToAdd);
    this._pollService.addStem(this.stemToAdd).subscribe(
      stem =>{ 
        console.log(stem);
        this.router.navigate(['/poll']);
      });
  }

  stemAnnuleren(){
    console.log(this.poll);
    this.poll.antwoorden.map(a => {
      a.stemmen.map(s => {
        if (s.userID == +localStorage.getItem("userID")) {
          let stemID = s.stemID;
          this._pollService.deleteStem(stemID).subscribe();
          this.gestemd = false;
        }
      });
    });
  }
}
