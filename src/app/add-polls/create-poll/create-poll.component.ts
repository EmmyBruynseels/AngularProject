import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Poll, Poll_dto } from 'src/app/polls/models/poll.model';
import { PollService } from 'src/app/polls/poll.service';
import { Antwoord_dto, Antwoord_dto2 } from 'src/app/polls/models/antwoord.model';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { PollGebruiker_dto } from 'src/app/polls/models/poll-gebruiker.model';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { Friend } from 'src/app/users/models/friend.model';
import { User } from 'src/app/users/models/user.model';

@Component({
  selector: 'app-create-poll',
  templateUrl: './create-poll.component.html',
  styleUrls: ['./create-poll.component.scss']
})
export class CreatePollComponent implements OnInit {
  isLinear = true;
  addPollFormGroup: FormGroup;
  addAntwoordFormGroup: FormGroup;
  pollToAdd: Poll;
  addedPoll: Poll;
  antwoordToAdd: Antwoord_dto2;
  pgToAdd: PollGebruiker_dto;
  friends: Friend[];
  userFriends: User[] = [];

  pollBeingCreated: Poll_dto;
  constructor(private _formBuilder: FormBuilder, private _pollService: PollService, private router: Router, iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {

    iconRegistry.addSvgIcon(
      'create',
      sanitizer.bypassSecurityTrustResourceUrl('assets/img/create.svg'));
    iconRegistry.addSvgIcon(
      'done',
      sanitizer.bypassSecurityTrustResourceUrl('assets/img/done.svg'));
  }

  ngOnInit() {
    this.addPollFormGroup = this._formBuilder.group({
      naam: ['', Validators.required]
    });
    this.addAntwoordFormGroup = this._formBuilder.group({
      antwoord: ['', Validators.required]
    });
    this._pollService.getFriendAndRequest().subscribe(friends => {
      friends.map(f => {
        if (f.ontvangerID.toString() == localStorage.getItem("userID")) {
          this.userFriends.push(f.sender);
        }
        else {
          this.userFriends.push(f.ontvanger);
        }
      })
    });
  }

  createPoll() {
    const { naam } = this.addPollFormGroup.value;
    if (naam != "") {
      let antwoorden = [];
      this.pollToAdd = new Poll(0, naam, antwoorden);
      this._pollService.addPoll(this.pollToAdd).subscribe(
        poll => {
          this.addedPoll = poll;

          this.pgToAdd = new PollGebruiker_dto(poll.pollID, +localStorage.getItem("userID"), true);
          this._pollService.addPollGebruiker(this.pgToAdd).subscribe();
        });
    }
  }

  createAntwoord() {
    const { antwoord } = this.addAntwoordFormGroup.value;
    if (antwoord != "") {
      this.antwoordToAdd = new Antwoord_dto2(antwoord, this.addedPoll.pollID);
      this._pollService.addAntwoord(this.antwoordToAdd).subscribe();

      //form leegmaken
      this.addAntwoordFormGroup.patchValue({
        antwoord: ''
      });
    }
  }

  addAntwoord() {
    const { antwoord } = this.addAntwoordFormGroup.value;
    if (antwoord != "") {
      this.antwoordToAdd = new Antwoord_dto2(antwoord, this.addedPoll.pollID);
      this._pollService.addAntwoord(this.antwoordToAdd).subscribe();
    }
  }

  sendToDashboard() {
    this.router.navigate(['/dashboard']);
  }

  addFriendToPoll(friendID) {
    this.pgToAdd = new PollGebruiker_dto(this.addedPoll.pollID, friendID, false);
    this._pollService.addPollGebruiker(this.pgToAdd).subscribe(pg => {
      console.log(pg);
    });
  }
}