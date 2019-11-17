import { Antwoord, Antwoord_dto } from './antwoord.model';
import { User } from 'src/app/users/models/user.model';

export class Poll {
    constructor(public pollID: number, public naam: string, public antwoorden : Antwoord[]){
    }
}

export class Poll_dto {
    constructor(public pollID: number, public naam: string, public antwoorden : Antwoord_dto[], public users: User[]){
    }
}
