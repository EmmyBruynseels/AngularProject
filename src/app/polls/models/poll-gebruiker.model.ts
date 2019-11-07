import { Poll } from './poll.model';
import { User } from 'src/app/users/models/user.model';

export class PollGebruiker {
    constructor(public pollGebruikerID: number, public pollID: number,public userID:number, public poll: Poll, public user: User) {
    }
}
export class PollGebruiker2 {
    constructor(public pollID: number, public userID: number) {
    }
}