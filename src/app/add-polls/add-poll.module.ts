import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule} from '@angular/material/form-field';
import { SharedModule } from '../shared/shared.module';

import { CreatePollComponent } from './create-poll/create-poll.component';


@NgModule({
  declarations: [ CreatePollComponent],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    MatFormFieldModule
  ]
})
export class AddPollModule { }
