import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { User } from './users/models/user.model';
import { PollService } from './polls/poll.service';
import { AuthenticateService } from './security/services/authenticate.service';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Project';
  currentUser: User;

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer, private _pollService: PollService,private _authenticateService: AuthenticateService) {
    iconRegistry.addSvgIcon(
      'poll',
      sanitizer.bypassSecurityTrustResourceUrl('assets/img/poll.svg'));
    iconRegistry.addSvgIcon(
      'friends',
      sanitizer.bypassSecurityTrustResourceUrl('assets/img/people.svg'));
    iconRegistry.addSvgIcon(
      'account',
      sanitizer.bypassSecurityTrustResourceUrl('assets/img/person.svg'));

      _authenticateService.isLoggedin.subscribe(e=> {
        var userID = localStorage.getItem("userID");
        if (+userID != 0) {
          this._pollService.getUser(+userID).subscribe(user => {
            console.log(user.username);
            this.currentUser = user;
          });
        }
      });

  
  }
  logoff(){
    this._authenticateService.logout();
  }


  
}
