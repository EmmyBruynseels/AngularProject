import { Antwoord, Antwoord2 } from './antwoord.model';
import { User } from 'src/app/users/models/user.model';

export class Poll {
    constructor(public pollID: number, public naam: string, public antwoorden : Antwoord[]){
    }
}

export class Poll2 {
    constructor(public pollID: number, public naam: string, public antwoorden : Antwoord2[], public users: User[]){
    }
}
