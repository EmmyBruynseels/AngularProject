import { Antwoord } from './antwoord.model';
import { User } from 'src/app/users/models/user.model';

export class Stem {
    constructor(public stemID: number,public antwoordID: number,public userID: number, public antwoord: Antwoord, public user: User){
    }
}
export class Stem2 {
    constructor(public antwoordID: number, public userID: number){
    }
}
