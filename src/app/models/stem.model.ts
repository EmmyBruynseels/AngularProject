import { Antwoord } from './antwoord.model';
import { User } from './user.model';

export class Stem {
    constructor(public stemID: number,public antwoordID: number,public userID: number, public antwoord: Antwoord, public user: User){
    }
}
export class Stem_dto {
    constructor(public stemID : number, public antwoordID: number, public userID: number){
    }
}
