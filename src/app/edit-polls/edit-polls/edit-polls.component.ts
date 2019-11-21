import { Component, OnInit } from '@angular/core';
import { Poll_dto } from 'src/app/polls/models/poll.model';
import { PollService } from 'src/app/polls/poll.service';
import { Router } from '@angular/router';
import { User } from 'src/app/users/models/user.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Antwoord_dto2, Antwoord } from 'src/app/polls/models/antwoord.model';
import { Stem } from 'src/app/polls/models/stem.model';
import { PollGebruiker_dto, PollGebruiker } from 'src/app/polls/models/poll-gebruiker.model';
import { Friend } from 'src/app/users/models/friend.model';
import { DashboardComponent } from 'src/app/dashboard/dashboard/dashboard.component';

@Component({
  selector: 'app-edit-polls',
  templateUrl: './edit-polls.component.html',
  styleUrls: ['./edit-polls.component.scss']
})
export class EditPollsComponent implements OnInit {

  poll: Poll_dto;
  users: User[];
  addAntwoordFormGroup: FormGroup;
  addFriendFormGroup: FormGroup;
  antwoordToAdd: Antwoord_dto2;
  pgToAdd: PollGebruiker_dto;

  userFriends: User[];
  userID: number;
  melding: String;

  constructor(private _pollService: PollService, private router: Router, private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.userID = +localStorage.getItem("userID");

    // let pollID = this._pollService.getPollEdit();
    this._pollService.getPoll().subscribe(result => {
      this.poll = result;

      this.users = [];
      this.poll.users.map(u => {
        this._pollService.getUser(u.userID).subscribe(user => {
          this.users.push(user);
        });
      });
    });

    this.addAntwoordFormGroup = this._formBuilder.group({
      antwoord: ['', Validators.required]
    });
    this.addFriendFormGroup = this._formBuilder.group({
      friend: ['', Validators.required]
    });

    this.userFriends = [];
    this._pollService.getFriendAndRequest().subscribe(friends => {
      friends.map(f => {

        if (f.ontvangerID == this.userID) {
          this.userFriends.push(f.sender);
        }
        else {
          this.userFriends.push(f.ontvanger);
        }

      })
    });
  }

  addAntwoord() {
    const { antwoord } = this.addAntwoordFormGroup.value;
    if (antwoord != "") {
      this.antwoordToAdd = new Antwoord_dto2(antwoord, this.poll.pollID);
      this._pollService.addAntwoord(this.antwoordToAdd).subscribe(
        antwoord => {
          this.ngOnInit();
        });
    }
  }

  deleteAntwoord(antwoordID: number) {
    if (this.poll.antwoorden.length > 2) {
      this._pollService.deleteAntwoord(antwoordID).subscribe(result => {
        this.ngOnInit();
      });
    }
    else {
      this.melding = "Min 2 antwoorden nodig, voeg een antwoord toe."
    }
  }


  addFriendToPoll(friendID) {
    let altoegevoegd = false;
    this.poll.users.map(u => {
      u.userID == friendID ? altoegevoegd = true : this.melding = "Deze user is al toegevoegd aan de poll";
    });
    if (altoegevoegd == false) {
      this.pgToAdd = new PollGebruiker_dto(this.poll.pollID, friendID, false);
      this._pollService.addPollGebruiker(this.pgToAdd).subscribe(pg => {
        this.ngOnInit();
      });
    }

  }
  deleteUser(id: number) {
    this._pollService.getPollGebruikers().subscribe(pollUsers => {
      pollUsers.map(pg => {

        if (pg.pollID == this.poll.pollID && pg.userID == id && id != this.userID) {

          this._pollService.deletePollGebruiker(pg.pollGebruikerID).subscribe(result => {
            this.ngOnInit();
          });
        }
      });
    });

  }
  deletePoll() {
    this._pollService.deletePoll(this.poll.pollID).subscribe(result => {
      this.router.navigate(['/dashboard']);
    });
  }
}
