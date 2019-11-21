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

@Component({
  selector: 'app-edit-polls',
  templateUrl: './edit-polls.component.html',
  styleUrls: ['./edit-polls.component.scss']
})
export class EditPollsComponent implements OnInit {

  poll: Poll_dto;
  pollID: number;
  users: User[];
  addAntwoordFormGroup: FormGroup;
  addFriendFormGroup: FormGroup;
  antwoordToAdd: Antwoord_dto2;
  stemmen: Stem[];
  antwoorden: Antwoord[];
  pgToAdd: PollGebruiker_dto;
  friends: Friend[];
  userFriends: User[];
  userID: number;
  pollUsers: PollGebruiker[];
  melding: String;

  constructor(private _pollService: PollService, private router: Router, private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.userID = +localStorage.getItem("userID");

    this.poll = this._pollService.getPollDashboard();
    // this.pollID = this._pollService.getPollEdit();
    // this._pollService.getPoll(this.pollID).subscribe(result => {
    //   this.poll = result;

    this.users = [];
    this.poll.users.map(u => {
      this._pollService.getUser(u.userID).subscribe(user => {
        this.users.push(user);
      });
    });
    // });

    this.addAntwoordFormGroup = this._formBuilder.group({
      antwoord: ['', Validators.required]
    });
    this.addFriendFormGroup = this._formBuilder.group({
      friend: ['', Validators.required]
    });

    //enkel mogelijk toe te voegen laten zien
    this.userFriends = [];
    this._pollService.getFriendAndRequest().subscribe(f => {
      this.friends = f;
      this.friends.map(f => {
        // this.poll.users.map(u => {

        // if (u.userID != f.ontvangerID && u.userID != f.senderID) {
        if (f.ontvangerID == this.userID) {
          this.userFriends.push(f.sender);
        }
        else {
          this.userFriends.push(f.ontvanger);
        }
        // }
        // });
      })
    });
  }

  addAntwoord() {
    const { antwoord } = this.addAntwoordFormGroup.value;
    if (antwoord != "") {
      this.antwoordToAdd = new Antwoord_dto2(antwoord, this.poll.pollID);
      this._pollService.addAntwoord(this.antwoordToAdd).subscribe(
        antwoord => console.log(antwoord)
      );

      //form leegmaken
      // this.addAntwoordFormGroup.patchValue({
      //   antwoord: ''
      // });
    }
    this.ngOnInit();
  }

  deleteAntwoord(antwoordID: number) {
    if (this.poll.antwoorden.length > 2) {
      //stemmen eerst verwijderen bij antwoord
      this._pollService.getStemmen().subscribe(result => {
        this.stemmen = result;
        this.stemmen.map(stem => {
          if (stem.antwoordID == antwoordID) {
            this._pollService.deleteStem(stem.stemID);
          }
        });
      });
      //antwoord verwijderen
      this._pollService.deleteAntwoord(antwoordID).subscribe();
    }
    else {
      this.melding = "Min 2 antwoorden nodig, voeg een antwoord toe."
    }
    this.ngOnInit();
  }


  addFriendToPoll(friendID) {
    //als al instaat -> melding
    let altoegevoegd = false;
    this._pollService.getPollGebruikers().subscribe(result => {
      this.pollUsers = result;
      this.pollUsers.map(pg => {
        if (pg.pollID == this.poll.pollID) {
          console.log(pg.userID, friendID);
          if (pg.userID == friendID) {
            this.melding = "Deze user is al uitgenodigd voor deze poll";
            altoegevoegd = true;
          }
        }
      });
      if (altoegevoegd == false) {
        this.pgToAdd = new PollGebruiker_dto(this.poll.pollID, friendID, false);
        this._pollService.addPollGebruiker(this.pgToAdd).subscribe(pg => {
          console.log(pg);
        });
      }
    });
    this.ngOnInit();
  }
  deleteUser(id: number) {
    if (id != this.userID) {
      this._pollService.getPollGebruikers().subscribe(result => {
        this.pollUsers = result;
        this.pollUsers.map(pg => {
          if (pg.pollID == this.poll.pollID && pg.userID == id) {
            this._pollService.deletePollGebruiker(pg.pollGebruikerID).subscribe();
          }
        });
      });
    }
  }
  deletePoll() {
    this._pollService.getAntwoorden().subscribe(result => {
      this.antwoorden = result;
      this.antwoorden.map(a => {
        if (a.poll.pollID == this.poll.pollID) {

          this._pollService.getStemmen().subscribe(result => {
            this.stemmen = result;
            this.stemmen.map(stem => {
              if (stem.antwoordID == a.antwoordID) {
                this._pollService.deleteStem(stem.stemID);
              }
            });
          });
          this._pollService.deleteAntwoord(a.antwoordID).subscribe();

        }
      })
    });
    this._pollService.getPollGebruikers().subscribe(result => {
      this.pollUsers = result;
      this.pollUsers.map(pg => {
        if (pg.pollID == this.poll.pollID) {
          this._pollService.deletePollGebruiker(pg.pollGebruikerID).subscribe();
        }
      })
    });
    this._pollService.deletePoll(this.poll.pollID);
    this.router.navigate(['/dashboard']);
  }
}
