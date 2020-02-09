import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Poll_dto, Poll } from '../models/poll.model';
import { Antwoord, Antwoord_dto2 } from '../models/antwoord.model';
import { Stem_dto, Stem } from '../models/stem.model';
import { PollGebruiker_dto, PollGebruiker } from '../models/poll-gebruiker.model';
import { User } from '../models/user.model';
import { Friend, Friend_dto } from '../models/friend.model';



@Injectable({
  providedIn: 'root'
})
export class PollService {

  poll: Poll_dto;
  pollID: number;

  constructor(private http: HttpClient) { }

  // getPollEdit() {
  //   return this.pollID;
  // }
  setPoll(pollID: number) {
    this.pollID = pollID;
  }

  //POLLS
  getPolls(): Observable<Poll_dto[]> {
    /* return this.http.get<Poll2[]>("https://localhost:5001/api/poll", {
       headers: new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("token"))
     });*/
    var userID = localStorage.getItem("userID");
    return this.http.get<Poll_dto[]>("https://polllabs.azurewebsites.net/api/Poll/polls?userID=" + +userID);
  }
  getPollsAdmin() {
    var userID = localStorage.getItem("userID");
    return this.http.get<Poll_dto[]>("https://polllabs.azurewebsites.net/api/Poll/pollsAdmin?userID=" + +userID);
  }
  getPollsUitgenodigd() {
    var userID = localStorage.getItem("userID");
    return this.http.get<Poll_dto[]>("https://polllabs.azurewebsites.net/api/Poll/pollsUser?userID=" + +userID);
  }
  getPoll() {
    return this.http.get<Poll_dto>("https://polllabs.azurewebsites.net/api/Poll/" + this.pollID);
  }
  deletePoll(pollID: number) {
    return this.http.delete<Poll>("https://polllabs.azurewebsites.net/api/Poll/" + pollID);
  }
  addPoll(poll: Poll) {
    return this.http.post<Poll>("https://polllabs.azurewebsites.net/api/poll", poll);
  }
  getAllPolls() {
    return this.http.get<Poll_dto[]>("https://polllabs.azurewebsites.net/api/Poll");
  }
  getAantalPolls() {
    return this.http.get<number>("https://polllabs.azurewebsites.net/api/Poll/aantalPolls");
  }

  //ANTWOORD
  getAntwoorden(): Observable<Antwoord[]> {
    return this.http.get<Antwoord[]>("https://polllabs.azurewebsites.net/api/antwoord");
  }
  addAntwoord(antwoord: Antwoord_dto2) {
    return this.http.post<Antwoord_dto2>("https://polllabs.azurewebsites.net/api/antwoord", antwoord);
  }
  deleteAntwoord(antwoordID: number) {
    return this.http.delete<Antwoord>("https://polllabs.azurewebsites.net/api/Antwoord/" + antwoordID);
  }

  //STEMMEN
  addStem(stem: Stem_dto) {
    return this.http.post<Stem_dto>("https://polllabs.azurewebsites.net/api/stem", stem);
  }
  getStemmen(): Observable<Stem[]> {
    return this.http.get<Stem[]>("https://polllabs.azurewebsites.net/api/stem");
  }

  deleteStem(pollID: number) {
    return this.http.delete<Stem>("https://polllabs.azurewebsites.net/api/Stem/ByUserIDAndPollID?userID=" + +localStorage.getItem("userID") + "&pollID=" + pollID);
  }


  //POLLGEBRUIKERS
  addPollGebruiker(pg: PollGebruiker_dto) {
    return this.http.post<PollGebruiker_dto>("https://polllabs.azurewebsites.net/api/pollgebruiker", pg);
  }
  getPollGebruikers() {
    return this.http.get<PollGebruiker[]>("https://polllabs.azurewebsites.net/api/pollgebruiker");
  }
  deletePollGebruiker(pollID: number, userID: number) {
    return this.http.delete<PollGebruiker>("https://polllabs.azurewebsites.net/api/PollGebruiker/ByPollIDAndUserID?userID=" + userID + "&pollID=" + pollID);
  }
  addPollGebruiker2(pg: PollGebruiker_dto) {
    return this.http.post<PollGebruiker_dto>("https://polllabs.azurewebsites.net/api/PollGebruiker/ByUserIDAndPollID", pg);
  }
  

  //USERS
  getUser(userID: number) {
    return this.http.get<User>("https://polllabs.azurewebsites.net/api/user/" + userID);
  }
  getUsers() {
    return this.http.get<User[]>("https://polllabs.azurewebsites.net/api/User");
  }
  addUser(user: User) {
    return this.http.post<User>("https://polllabs.azurewebsites.net/api/user", user);
  }
  updateUser(user: User) {
    return this.http.put<User>("https://polllabs.azurewebsites.net/api/User/" + user.userID, user);
  }
  getUserByEmail(email: string) {
    return this.http.get<User>("https://polllabs.azurewebsites.net/api/User/ByEmail?email=" + email);
  }
  getAantalUsers() {
    return this.http.get<number>("https://polllabs.azurewebsites.net/api/User/aantalUsers");
  }


  //FRIENDS
  getFriendRequests() {
    const userID = localStorage.getItem("userID");
    return this.http.get<Friend[]>("https://polllabs.azurewebsites.net/api/Friend/friendRequests?userID=" + +userID);
  }
  getFriends() {
    const userID = localStorage.getItem("userID");
    return this.http.get<Friend[]>("https://polllabs.azurewebsites.net/api/Friend/friends?userID=" + +userID);
  }
  getFriendAndRequest() {
    const userID = localStorage.getItem("userID");
    return this.http.get<Friend[]>("https://polllabs.azurewebsites.net/api/Friend/allForUser?userID=" + +userID);
  }
  getFriend(friendID: number) {
    return this.http.get<Friend>("https://polllabs.azurewebsites.net/api/Friend/" + friendID);
  }
  getAllFriends() {
    return this.http.get<Friend[]>("https://polllabs.azurewebsites.net/api/Friend");
  }
  updateFriend(friend: Friend) {
    return this.http.put<Friend>("https://polllabs.azurewebsites.net/api/Friend/" + friend.friendID, friend);
  }
  deleteFriend(friendID: number) {
    return this.http.delete<Friend>("https://polllabs.azurewebsites.net/api/Friend/" + friendID);
  }
  addFriend(friend: Friend_dto) {
    return this.http.post<Friend_dto>("https://polllabs.azurewebsites.net/api/Friend", friend);
  }
  deleteFriendByUserIDs(friendID: number) {
    return this.http.delete<Friend>("https://polllabs.azurewebsites.net/api/Friend/ByUserIDAndFriendID?userID=" + +localStorage.getItem("userID") + "&friendID=" + friendID);
  }
}

