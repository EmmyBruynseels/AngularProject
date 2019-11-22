import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SecurityComponent } from './security/security.component';

import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule} from '@angular/material/form-field';
import { SharedModule } from '../../shared/shared.module';



@NgModule({
  declarations: [SecurityComponent],
  exports: [SecurityComponent],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    MatFormFieldModule
  ]
})
export class SecurityModule { }
