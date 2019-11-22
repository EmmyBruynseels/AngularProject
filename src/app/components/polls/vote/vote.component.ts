import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Stem_dto } from 'src/app/models/stem.model';
import { Poll_dto } from 'src/app/models/poll.model';
import { Antwoord } from 'src/app/models/antwoord.model';
import { User } from 'src/app/models/user.model';
import { PollService } from 'src/app/services/poll.service';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.scss']
})
export class VoteComponent implements OnInit {

  stemToAdd: Stem_dto;
  poll: Poll_dto;
  alleAntwoorden: Antwoord[];
  antwoordenBijPoll: Antwoord[];
  gestemd: boolean = false;
  totaalStemmen: number = 0;
  users: User[] = [];

  constructor(private _pollService: PollService, private router: Router) { }

  ngOnInit() {
    this._pollService.getPoll().subscribe(result => {
      this.poll = result;
      
      this.poll.antwoorden.map(a => {
        a.stemmen.map(s => {
          this.totaalStemmen++;
          if (s.userID == +localStorage.getItem("userID")) {
            this.gestemd = true;
          }
        });
      });
      this.poll.users.map(u => {
        this._pollService.getUser(u.userID).subscribe(user => {
          this.users.push(user);
        });
      });
    });
  }

  stem(antwoordID: number) {
    this.stemToAdd = new Stem_dto(0, antwoordID, +localStorage.getItem("userID"));
    this._pollService.addStem(this.stemToAdd).subscribe(
      stem => {
        this.ngOnInit();
      });
  }

  stemAnnuleren() {
    this.poll.antwoorden.map(a => {
      a.stemmen.map(s => {
        if (s.userID == +localStorage.getItem("userID")) {
          this._pollService.deleteStem(s.stemID).subscribe();
          this.gestemd = false;
        }
      });
    });
  }
}