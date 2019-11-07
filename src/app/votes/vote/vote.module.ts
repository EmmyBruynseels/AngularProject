import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule} from '@angular/material/form-field';import { SharedModule } from 'src/app/shared/shared.module';
import { VoteComponent } from './vote.component';
import { MatButtonModule } from '@angular/material/button';




@NgModule({
  declarations: [VoteComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    SharedModule
  ]
})
export class VoteModule { }
