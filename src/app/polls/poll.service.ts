import { Injectable } from '@angular/core';
import { Poll } from './models/poll.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Antwoord, Antwoord2 } from './models/antwoord.model';
import { Stem2, Stem } from './models/stem.model';
import { PollGebruiker2 } from './models/poll-gebruiker.model';
import { User2, User } from '../users/models/user.model';


@Injectable({
  providedIn: 'root'
})
export class PollService {

  constructor(private http: HttpClient) { }

  getPolls(): Observable<Poll[]> {
    return this.http.get<Poll[]>("https://localhost:5001/api/poll", {
      headers: new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("token"))
    });
  }
  getPoll(pollID:number) {
    return this.http.get<Poll>("https://localhost:5001/api/poll/" +pollID, {
      headers : new HttpHeaders().set("Authorization", "Bearer " +localStorage.getItem("toke,"))
    });
  }

  addPoll(poll: Poll) {
    return this.http.post<Poll>("https://localhost:5001/api/poll", poll, {
      headers: new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("token"))
    });
  }

  getAntwoorden(): Observable<Antwoord[]> {
    return this.http.get<Antwoord[]>("https://localhost:5001/api/antwoord", {
      headers: new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("token"))
    });
  }
  addAntwoord(antwoord: Antwoord2) {
    return this.http.post<Antwoord2>("https://localhost:5001/api/antwoord", antwoord, {
      headers: new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("token"))
    });
  }

  addStem(stem: Stem2) {
    return this.http.post<Stem2>("https://localhost:5001/api/stem", stem, {
      headers: new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("token"))
    });
  }
  getStemmen(): Observable<Stem[]> {
    return this.http.get<Stem[]>("https://localhost:5001/api/stem", {
      headers: new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("token"))
    });
  }


  addPollGebruiker(pg: PollGebruiker2){
    return this.http.post<PollGebruiker2>("https://localhost:5001/api/pollgebruiker", pg, {
      headers: new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("token"))
    });
  }

  addUser(user: User){
    console.log("addUser", user);
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
