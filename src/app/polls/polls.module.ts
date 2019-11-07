import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { PollService } from './poll.service';

import { PollComponent } from './polls/poll.component';

import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material';


@NgModule({
  declarations: [PollComponent],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    MatFormFieldModule
  ],
  providers: [PollService]
})
export class PollsModule { 
}
