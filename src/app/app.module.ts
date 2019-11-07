import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { PollComponent } from './polls/polls/poll.component';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { SecurityInterceptor } from './security/security.interceptor';
import { SecurityModule } from './security/security/security.module';
import { SecurityComponent } from './security/security/security/security.component';
import { MatSidenavModule, MatListModule } from '@angular/material';

import { PollsModule } from './polls/polls.module';
import { AddPollModule } from './add-polls/add-poll.module';
import { VoteComponent } from './votes/vote/vote.component';
import { VoteModule } from './votes/vote/vote.module';
import { SignupComponent } from './users/signup/signup.component';
import { UserModule } from './users/user.module';
import { CreatePollComponent } from './add-polls/create-poll/create-poll.component';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { SharedModule } from './shared/shared.module';

const appRoutes: Routes = [
  {
    path: '',
    component: SecurityComponent
  },
  { path: 'security',
   component: SecurityComponent },
  { path: 'poll', 
  component: PollComponent },
  { path: 'addpoll',
   component: CreatePollComponent },
  { path: 'vote',
   component: VoteComponent },
  { path: 'signup', component: SignupComponent }
];

@NgModule({
  declarations: [
    AppComponent
    //SignupComponent
    //PollComponent,
    //VoteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SecurityModule,
    MatSidenavModule,
    MatListModule,
    RouterModule.forRoot(appRoutes, { enableTracing: true }),
    BrowserAnimationsModule,
    HttpClientModule,
    PollsModule,
    AddPollModule,
    VoteModule,
    UserModule,
    SharedModule
  ],
  providers: [
    {
      provide: [HTTP_INTERCEPTORS, STEPPER_GLOBAL_OPTIONS],
      useClass: SecurityInterceptor,
      multi: true,
      useValue: { showError: true }
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
