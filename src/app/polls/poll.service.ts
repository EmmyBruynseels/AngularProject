import { Injectable } from '@angular/core';
import { Poll, Poll_dto } from './models/poll.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Antwoord, Antwoord_dto, Antwoord_dto2 } from './models/antwoord.model';
import { Stem_dto, Stem } from './models/stem.model';
import { PollGebruiker_dto } from './models/poll-gebruiker.model';
import { User_dto, User } from '../users/models/user.model';
import { Friend, Friend_dto } from '../users/models/friend.model';


@Injectable({
  providedIn: 'root'
})
export class PollService {

  constructor(private http: HttpClient) { }

  getPolls(): Observable<Poll_dto[]> {
    /* return this.http.get<Poll2[]>("https://localhost:5001/api/poll", {
       headers: new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("token"))
     });*/
    var userID = localStorage.getItem("userID");
    return this.http.get<Poll_dto[]>("https://localhost:5001/api/Poll/polls?userID=" + +userID);
  }
  getPollsAdmin() {
    var userID = localStorage.getItem("userID");
    return this.http.get<Poll_dto[]>("https://localhost:5001/api/Poll/pollsAdmin?userID=" + +userID);
  }
  getPollsUitgenodigd() {
    var userID = localStorage.getItem("userID");
    return this.http.get<Poll_dto[]>("https://localhost:5001/api/Poll/pollsUser?userID=" + +userID);
  }
  getPoll(pollID: number) {
    return this.http.get<Poll>("https://localhost:5001/api/Poll/" + pollID
    );
  }

  addPoll(poll: Poll) {
    return this.http.post<Poll>("https://localhost:5001/api/poll", poll);
  }

  getAntwoorden(): Observable<Antwoord[]> {
    return this.http.get<Antwoord[]>("https://localhost:5001/api/antwoord");
  }
  addAntwoord(antwoord: Antwoord_dto2) {
    return this.http.post<Antwoord_dto2>("https://localhost:5001/api/antwoord", antwoord);
  }

  addStem(stem: Stem_dto) {
    return this.http.post<Stem_dto>("https://localhost:5001/api/stem", stem);
  }
  getStemmen(): Observable<Stem[]> {
    return this.http.get<Stem[]>("https://localhost:5001/api/stem");
  }
  deleteStem(stemID: number){
    return this.http.delete<Stem_dto>("https://localhost:5001/api/Stem/" + stemID);
  }

  addPollGebruiker(pg: PollGebruiker_dto) {
    return this.http.post<PollGebruiker_dto>("https://localhost:5001/api/pollgebruiker", pg);
  }

  getUser(userID: number) {
    return this.http.get<User>("https://localhost:5001/api/user/" + userID);
  }
  getUsers() {
    return this.http.get<User[]>("https://localhost:5001/api/User");
  }
  addUser(user: User) {
    return this.http.post<User>("https://localhost:5001/api/user", user);
  }
  updateUser(user: User) {
    return this.http.put<Friend>("https://localhost:5001/api/User/" + user.userID, user);
  }

  getFriendRequests() {
    const userID = localStorage.getItem("userID");
    return this.http.get<Friend[]>("https://localhost:5001/api/Friend/friendRequests?userID=" + +userID);
  }
  getFriends() {
    const userID = localStorage.getItem("userID");
    return this.http.get<Friend[]>("https://localhost:5001/api/Friend/friends?userID=" + +userID);
  }
  getFriendAndRequest() {
    const userID = localStorage.getItem("userID");
    return this.http.get<Friend[]>("https://localhost:5001/api/Friend/allForUser?userID=" + +userID);
  }
  getFriend(friendID: number) {
    return this.http.get<Friend>("https://localhost:5001/api/Friend/" + friendID);
  }
  getAllFriends() {
    return this.http.get<Friend[]>("https://localhost:5001/api/Friend");
  }
  updateFriend(friend: Friend) {
    return this.http.put<Friend>("https://localhost:5001/api/Friend/" + friend.friendID, friend);
  }
  deleteFriend(friendID: number) {
    return this.http.delete<Friend>("https://localhost:5001/api/Friend/" + friendID);
  }

  addFriend(friend: Friend_dto) {
    return this.http.post<Friend_dto>("https://localhost:5001/api/Friend", friend);
  }
}

