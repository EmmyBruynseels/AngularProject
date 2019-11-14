import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule, MatInputModule, MatButtonModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import {MatListModule} from '@angular/material/list';
import {MatDividerModule} from '@angular/material/divider';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatStepperModule} from '@angular/material/stepper';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatSelectModule} from '@angular/material/select';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatListModule,
    MatDividerModule,
    MatGridListModule,
    MatStepperModule,
    MatIconModule,
    MatCardModule,
    MatExpansionModule,
    MatSelectModule
  ],
  exports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatListModule,
    MatDividerModule,
    MatGridListModule,
    MatStepperModule,
    MatIconModule,
    MatCardModule,
    MatExpansionModule,
    MatSelectModule
  ]
})
export class SharedModule { }
