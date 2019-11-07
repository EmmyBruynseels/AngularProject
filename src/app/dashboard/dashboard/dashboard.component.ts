import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Poll, Poll2 } from 'src/app/polls/models/poll.model';
import { PollService } from 'src/app/polls/poll.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  polls: Observable<Poll[]>;
  poll: Poll2[];

  constructor(private _pollService: PollService, private router: Router) {
  }

  ngOnInit() {
    this._pollService.getPolls().subscribe(poll => {
      this.poll = poll;
    });
  }
  
  vote(id: number) {
    console.log(id);
    this._pollService.getPoll(id).subscribe(poll => {
      console.log(poll);
      this.router.navigate(['/vote'],{state: {data: {poll: poll}}});
    })
  
  }

  goToAddPoll() {
    this.router.navigate(['/addpoll']);
  }

  goToPolls() {
    this.router.navigate(['/poll']);
  }

}
