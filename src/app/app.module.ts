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
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { AuthGuard } from './security/guards/auth.guard';
import { FriendComponent } from './users/friend/friend.component';
import { InviteComponent } from './users/invite/invite.component';
import { HomeComponent } from './home/home/home.component';
import { EditPollsComponent } from './edit-polls/edit-polls/edit-polls.component';
import { EditPollsModule } from './edit-polls/edit-polls.module';

const appRoutes: Routes = [
  {
    path: '',
    component: SecurityComponent
  },
  {
    path: 'security',
    component: SecurityComponent
  },
  {
    path: 'poll',
    component: PollComponent, canActivate: [AuthGuard]
  },
  {
    path: 'addpoll',
    component: CreatePollComponent, canActivate: [AuthGuard]
  },
  {
    path: 'vote',
    component: VoteComponent, canActivate: [AuthGuard]
  },
  {
    path: 'edit',
    component: EditPollsComponent, canActivate: [AuthGuard]
  },
  { path: 'signup', component: SignupComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'friend', component: FriendComponent, canActivate: [AuthGuard] },
  { path: 'invite', component: InviteComponent, canActivate: [AuthGuard] },
  { path: 'home', component: HomeComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HomeComponent
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
    SharedModule,
    EditPollsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SecurityInterceptor,
      multi: true
    },
    {
     provide: STEPPER_GLOBAL_OPTIONS,
       useValue: { showError: true }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
