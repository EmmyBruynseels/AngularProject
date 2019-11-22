import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatSidenavModule, MatListModule } from '@angular/material';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';

import { PollsModule } from './components/polls/polls.module';
import { HomeComponent } from './components/home/home/home.component';
import { SecurityComponent } from './components/security/security/security/security.component';
import { CreatePollComponent } from './components/polls/create-poll/create-poll.component';
import { AuthGuard } from './components/security/guards/auth.guard';
import { VoteComponent } from './components/polls/vote/vote.component';
import { EditPollsComponent } from './components/polls/edit-polls/edit-polls.component';
import { SignupComponent } from './components/users/signup/signup.component';
import { DashboardComponent } from './components/dashboard/dashboard/dashboard.component';
import { FriendComponent } from './components/users/friend/friend.component';
import { InviteComponent } from './components/users/invite/invite.component';
import { SecurityModule } from './components/security/security/security.module';
import { UserModule } from './components/users/user.module';
import { SharedModule } from './components/shared/shared.module';
import { SecurityInterceptor } from './components/security/security.interceptor';





const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'security',
    component: SecurityComponent
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
    
    MatSidenavModule,
    MatListModule,
    RouterModule.forRoot(appRoutes, { enableTracing: true }),
    BrowserAnimationsModule,
    HttpClientModule,
    SecurityModule,
    PollsModule,
    UserModule,
    SharedModule,

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
