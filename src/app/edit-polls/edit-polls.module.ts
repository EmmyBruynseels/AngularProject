import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { EditPollsComponent } from './edit-polls/edit-polls.component';



@NgModule({
  declarations: [EditPollsComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class EditPollsModule { }
