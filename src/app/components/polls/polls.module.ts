import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material';
import { CreatePollComponent } from './create-poll/create-poll.component';
import { EditPollsComponent } from './edit-polls/edit-polls.component';
import { VoteComponent } from './vote/vote.component';



@NgModule({
  declarations: [CreatePollComponent,EditPollsComponent,VoteComponent],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    MatFormFieldModule
  ]
})
export class PollsModule { }
