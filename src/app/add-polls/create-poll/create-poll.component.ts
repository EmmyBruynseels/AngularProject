import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Poll } from 'src/app/polls/models/poll.model';
import { PollService } from 'src/app/polls/poll.service';
import { Antwoord2, Antwoord3 } from 'src/app/polls/models/antwoord.model';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { PollGebruiker2 } from 'src/app/polls/models/poll-gebruiker.model';

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
  antwoordToAdd: Antwoord3;
  pgToAdd: PollGebruiker2;

  userID: number;

  constructor(private _formBuilder: FormBuilder, private _pollService: PollService,private router: Router,iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {

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
  }

  createPoll() {
    const { naam } = this.addPollFormGroup.value;
    let antwoorden = [];
    this.pollToAdd = new Poll(0, naam, antwoorden);
    this._pollService.addPoll(this.pollToAdd).subscribe(
      poll => {
        this.addedPoll = poll;
        this.userID = +localStorage.getItem("userID");
        this.pgToAdd = new PollGebruiker2(this.addedPoll.pollID, this.userID, true )
        this._pollService.addPollGebruiker(this.pgToAdd).subscribe(
          pg => {
            console.log(pg);
          });
      });
      
     
  }

  createAntwoord() {
    const { antwoord } = this.addAntwoordFormGroup.value;
    this.antwoordToAdd = new Antwoord3(antwoord, this.addedPoll.pollID);
    this._pollService.addAntwoord(this.antwoordToAdd).subscribe(
      antwoord => console.log(antwoord)
    );

    //form leegmaken
    this.addAntwoordFormGroup.patchValue({
      antwoord: ''
    });
  }

  addAntwoord() {
    const { antwoord } = this.addAntwoordFormGroup.value;
    this.antwoordToAdd = new Antwoord3(antwoord, this.addedPoll.pollID);
    this._pollService.addAntwoord(this.antwoordToAdd).subscribe(
      antwoord => {
        console.log(antwoord);
      });
  }

  sendToDashboard() {
    this.router.navigate(['/poll']);
  }
}