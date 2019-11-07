import { Injectable } from '@angular/core';
import { Poll, Poll2 } from './models/poll.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Antwoord, Antwoord2, Antwoord3 } from './models/antwoord.model';
import { Stem2, Stem } from './models/stem.model';
import { PollGebruiker2 } from './models/poll-gebruiker.model';
import { User2, User } from '../users/models/user.model';


@Injectable({
  providedIn: 'root'
})
export class PollService {

  constructor(private http: HttpClient) { }

  getPolls(): Observable<Poll2[]> {
   /* return this.http.get<Poll2[]>("https://localhost:5001/api/poll", {
      headers: new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("token"))
    });*/
    var userID = localStorage.getItem("userID");
    return this.http.get<Poll2[]>("https://localhost:5001/api/Poll/polls?userID=" + +userID);
  }
  getPoll(pollID:number) {
    return this.http.get<Poll>("https://localhost:5001/api/Poll/" +pollID
    );
  }

  addPoll(poll: Poll) {
    return this.http.post<Poll>("https://localhost:5001/api/poll", poll);
  }

  getAntwoorden(): Observable<Antwoord[]> {
    return this.http.get<Antwoord[]>("https://localhost:5001/api/antwoord");
  }
  addAntwoord(antwoord: Antwoord3) {
    return this.http.post<Antwoord3>("https://localhost:5001/api/antwoord", antwoord);
  }

  addStem(stem: Stem2) {
    return this.http.post<Stem2>("https://localhost:5001/api/stem", stem);
  }
  getStemmen(): Observable<Stem[]> {
    return this.http.get<Stem[]>("https://localhost:5001/api/stem");
  }

  addPollGebruiker(pg: PollGebruiker2){
    return this.http.post<PollGebruiker2>("https://localhost:5001/api/pollgebruiker", pg);
  }

  getUser(userID : number) {
    return this.http.get<User>("https://localhost:5001/api/user/" + userID);
  }
  addUser(user: User){
    return this.http.post<User>("https://localhost:5001/api/user", user);
  }

  /*updatePoll(pollID: number, poll: Poll) {
    return this.http.put<Poll>("https://localhost:5001/api/poll/" + pollID, poll, {
      headers: new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("token"))
    });
  }

  deletePoll(pollID: number) {
    return this.http.delete<Poll>("https://localhost:5001/api/poll/" + pollID);
  }*/
}
