import { Component, OnInit } from '@angular/core';
import { Poll_dto } from 'src/app/models/poll.model';
import { PollService } from 'src/app/services/poll.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Antwoord_dto2, Antwoord } from 'src/app/models/antwoord.model';
import { Stem } from 'src/app/models/stem.model';
import { PollGebruiker_dto, PollGebruiker } from 'src/app/models/poll-gebruiker.model';
import { MatSnackBar } from '@angular/material';
import { User } from 'src/app/models/user.model';

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

  constructor(private _pollService: PollService, private router: Router, private _formBuilder: FormBuilder, private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.userID = +localStorage.getItem("userID");

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
          if (f.sender.username != null) {
            this.userFriends.push(f.sender);
          }
        }
        else {
          if (f.ontvanger.username != null) {
            this.userFriends.push(f.ontvanger);
          }
        }

      })
    });
  }

  addAntwoord() {
    //antwoord toevoegen aan poll
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
    //antwoord uit poll verwijderen
    //minstens 2 antwoorden laten staan
    if (this.poll.antwoorden.length > 2) {
      this._pollService.deleteAntwoord(antwoordID).subscribe(result => {
        this.ngOnInit();
      });
    }
    else {
      this._snackBar.open("Min 2 antwoorden nodig, voeg een antwoord toe.", "OK", {
        duration: 3000,
      });
    }
  }


  addFriendToPoll(friendID) {
    //user toevoegen aan poll / tabel pollgebruikers
    this.pgToAdd = new PollGebruiker_dto(this.poll.pollID, friendID, false);
    this._pollService.addPollGebruiker2(this.pgToAdd).subscribe(result => {
      if (result == null) {
        this._snackBar.open("Deze user is al toegevoegd aan de poll " + this.poll.naam, "OK", {
          duration: 3000,
        });
      }
      this.ngOnInit();
    });
  }
  deleteUser(userID: number) {
    //user verwijderen uit poll /(uit tabel pollgebruikers)

    if (userID != this.userID) {
      //jezelf niet kunnen verwijderen
      this._pollService.deletePollGebruiker(this.poll.pollID, userID).subscribe(pg => {
        this.ngOnInit();
      });
    }

  }
  deletePoll() {
    //poll verwijderen
    this._pollService.deletePoll(this.poll.pollID).subscribe(result => {
      this.router.navigate(['/dashboard']);
    });
  }
  goToDashboard() {
    this.router.navigate(['/dashboard']);
  }
}
