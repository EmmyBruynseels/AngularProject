import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { SignupComponent } from './signup/signup.component';
import { MatFormFieldModule } from '@angular/material';



@NgModule({
  declarations: [SignupComponent],
  exports: [SignupComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    SharedModule,
    FormsModule
  ]
})
export class UserModule { }
