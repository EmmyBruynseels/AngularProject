import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PollService } from 'src/app/services/poll.service';
import { Poll_dto } from 'src/app/models/poll.model';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  aantalUsers : number;
  aantalPolls: number;
  constructor(private _pollService: PollService, private router: Router) { }

  ngOnInit() {
    this._pollService.getAantalPolls().subscribe( p =>{
      this.aantalPolls = p;
    });
    this._pollService.getAantalUsers().subscribe( u=> {
      this.aantalUsers = u;
    });
  }

  goToSignup() {
    this.router.navigate(['/signup']);
  }

  goToLogin() {
    this.router.navigate(['/security']);
  }
}
