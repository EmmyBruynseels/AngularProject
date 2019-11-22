import { Poll } from './poll.model';
import { User } from './user.model';

export class PollGebruiker {
    constructor(public pollGebruikerID: number, public pollID: number,public userID:number, public poll: Poll, public user: User, public isAdmin :boolean) {
    }
}
export class PollGebruiker_dto {
    constructor(public pollID: number, public userID: number, public isAdmin :boolean) {
    }
}